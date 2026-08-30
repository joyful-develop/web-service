import { useState, useId, useMemo, type ComponentType, type Dispatch, type SetStateAction } from 'react';

import { Check, ChevronDown, X, Minus } from 'lucide-react';

import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/shadcn-ui/command.tsx';
import { Field, FieldGroup } from '@/shared/components/shadcn-ui/field.tsx';
import { Label } from '@/shared/components/shadcn-ui/label.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn-ui/popover.tsx';
import { RadioGroup, RadioGroupItem } from '@/shared/components/shadcn-ui/radio-group.tsx';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/shadcn-ui/select.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

const filterOptions = [
  { type: 'string', label: '포함', value: 'contains' },
  { type: 'string', label: '미 포함', value: 'does_not_contains' },
  { type: 'common', label: '일치', value: 'equals' },
  { type: 'common', label: '불 일치', value: 'does_not_equal' },
  { type: 'number', label: '보다 큰', value: 'greater_than' },
  { type: 'number', label: '보다 크거나 같은', value: 'greater_than_or_equal_to' },
  { type: 'number', label: '보다 작은', value: 'less_than' },
  { type: 'number', label: '보다 작거나 같은', value: 'less_than_or_equal_to' },
  { type: 'number', label: '범위', value: 'between' },
  { type: 'string', label: '다음으로 시작', value: 'begins_with' },
  { type: 'string', label: '다음으로 끝', value: 'ends_with' },
  { type: 'common', label: '공백', value: 'blank' },
  { type: 'common', label: '공백이 아닌', value: 'not_blank' },
];

interface SelectDropdownProps {
  label: string;
  options: { label: string; value: string; icon?: ComponentType<{ className?: string }> }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  widthClass?: string;
  isSearchable?: boolean;
  isSimpleSearchable?: boolean;
  isNumberSearchable?: boolean;
  isFilterVerticalAlignment?: boolean;
  isSelectionReorder?: boolean;
}

type FilterState = { search: string; search2: string; type: string };
const initialFilterState: FilterState = { search: '', search2: '', type: 'contains' };
const initialNumberFilterState: FilterState = { search: '', search2: '', type: 'equals' };

export function SelectDropdown({
  label,
  options,
  onValueChange,
  defaultValue = [],
  placeholder = 'Select options',
  maxCount = 1,
  widthClass = 'h-8 w-32 sm:w-50',
  isSearchable = true,
  isSimpleSearchable = false,
  isNumberSearchable = false,
  isFilterVerticalAlignment = false,
  isSelectionReorder = true,
}: SelectDropdownProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    return defaultValue.filter((value) => {
      return options.some((item) => item.value === value);
    });
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const comboLabelId = useId();
  const [filter1, setFilter1] = useState(
    !isSimpleSearchable && isNumberSearchable ? initialNumberFilterState : initialFilterState
  );
  const [filter2, setFilter2] = useState(
    !isSimpleSearchable && isNumberSearchable ? initialNumberFilterState : initialFilterState
  );
  const [filterOperator, setFilterOperator] = useState('AND');
  const [showSecondFilter, setShowSecondFilter] = useState(false);
  const [allSelected, setAllSelected] = useState<'Checked' | 'Unchecked' | 'Indeterminate'>(() => {
    if (options.length === 0) return 'Unchecked';
    if (selectedValues.length === options.length) return 'Checked';
    if (selectedValues.length > 0 && selectedValues.length < options.length) return 'Indeterminate';
    return 'Unchecked';
  });

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);

    const isAllSelected = options.length > 0 && newSelectedValues.length === options.length;
    const isSomeSelected = newSelectedValues.length > 0 && newSelectedValues.length < options.length;
    setAllSelected(isAllSelected ? 'Checked' : isSomeSelected ? 'Indeterminate' : 'Unchecked');
  };

  const filteredData = useMemo(() => {
    return options.filter((item) => {
      const runFilter = (val: string, search: string, search2: string, type: string) => {
        if (type !== 'blank' && type !== 'not_blank' && !search && !search2) return true;
        const itemValue = val.toLowerCase();
        const searchValue = search.toLowerCase();
        const itemNum = parseFloat(val);
        const searchNum = parseFloat(search);
        const search2Num = parseFloat(search2);

        switch (type) {
          case 'contains':
            return itemValue.includes(searchValue);
          case 'not_contains':
            return !itemValue.includes(searchValue);
          case 'equals':
            return itemValue === searchValue;
          case 'not_equals':
            return itemValue !== searchValue;
          case 'greater_than':
            return itemNum > searchNum;
          case 'greater_than_or_equal_to':
            return itemNum >= searchNum;
          case 'less_than':
            return itemNum < searchNum;
          case 'less_than_or_equal_to':
            return itemNum <= searchNum;
          case 'between': {
            const fromResult = search.trim() === '' || itemNum >= searchNum;
            const toResult = search2.trim() === '' || itemNum <= search2Num;
            return fromResult && toResult;
          }
          case 'begins_with':
            return itemValue.startsWith(searchValue);
          case 'ends_with':
            return itemValue.endsWith(searchValue);
          case 'blank':
            return itemValue.trim() === '';
          case 'not_blank':
            return itemValue.trim() !== '';
          default:
            return true;
        }
      };

      const result1 = runFilter(item.value, filter1.search, filter1.search2, filter1.type);
      if (
        filter2.type !== 'blank' &&
        filter2.type !== 'not_blank' &&
        filter2.search.trim() === '' &&
        filter2.search2.trim() === ''
      )
        return result1;

      const result2 = runFilter(item.value, filter2.search, filter2.search2, filter2.type);
      return filterOperator === 'AND' ? result1 && result2 : result1 || result2;
    });
  }, [
    filter1.search,
    filter1.search2,
    filter1.type,
    filter2.search,
    filter2.search2,
    filter2.type,
    filterOperator,
    options,
    showSecondFilter,
  ]);

  const toggleAllOptions = (isAllClear?: boolean | undefined) => {
    const isAllSelected =
      (options.length > 0 && selectedValues.length === options.length) || selectedValues.length === filteredData.length;
    const isNoFiltering = options.length > 0 && filteredData.length === options.length;

    if (isAllClear || isAllSelected) {
      setSelectedValues([]);
      onValueChange([]);
      setAllSelected('Unchecked');
    } else {
      setSelectedValues(filteredData.map((opt) => opt.value));
      onValueChange(filteredData.map((opt) => opt.value));
      setAllSelected(isNoFiltering ? 'Checked' : 'Indeterminate');
    }
  };

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <div className='flex items-center gap-2 text-sm'>
      <span id={comboLabelId} className='text-foreground truncate'>
        {label}
      </span>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleTogglePopover}
            className={cn(
              'border-border hover:ring-sub-accent focus:ring-sub-accent min-h-5 min-w-28 rounded-sm border hover:ring focus:ring',
              widthClass
            )}>
            {selectedValues.length > 0 ? (
              <div className='flex w-full items-center justify-between overflow-hidden'>
                <div className='flex min-w-0 flex-1 items-center overflow-hidden px-1'>
                  <div className='flex w-fit items-center justify-between overflow-hidden'>
                    {selectedValues.length !== options.length ? (
                      selectedValues.slice(0, maxCount).map((value) => {
                        const option = options.find((o) => o.value === value);
                        const IconComponent = option?.icon;
                        return (
                          <Badge
                            key={value}
                            className='bg-secondary text-secondary-foreground mx-1 flex min-w-0 flex-1 items-center justify-between rounded-sm'>
                            {IconComponent && <IconComponent className='mr-1 h-4 w-4' />}
                            <span className='flex-1 truncate'>{option?.label}</span>
                            <div
                              className='hover:bg-sub-accent ml-1 shrink-0 cursor-pointer'
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}>
                              <X className='h-3 w-3' />
                            </div>
                          </Badge>
                        );
                      })
                    ) : (
                      <Badge
                        key={'All'}
                        className='bg-secondary text-secondary-foreground mx-1 flex min-w-0 flex-1 items-center justify-between rounded-sm'>
                        <span className='flex-1 truncate'>All</span>
                        <div
                          className='hover:bg-sub-accent ml-1 shrink-0 cursor-pointer'
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleAllOptions(true);
                          }}>
                          <X className='h-3 w-3' />
                        </div>
                      </Badge>
                    )}
                  </div>
                  {selectedValues.length > maxCount && (
                    <Badge className='bg-secondary text-secondary-foreground mr-1 shrink-0 rounded-sm'>{`+${selectedValues.length - maxCount}`}</Badge>
                  )}
                </div>
                <div className='flex min-w-0 shrink-0 items-center justify-between'>
                  <div className='bg-border h-5 w-px' />
                  <div
                    className='text-foreground hover:bg-accent hover:text-accent-foreground m-1 cursor-pointer p-1'
                    onClick={(event) => {
                      event.stopPropagation();
                      toggleAllOptions(true);
                    }}>
                    <X className='h-4 w-4' />
                  </div>
                  <div className='bg-border h-5 w-px' />
                  <div className='text-foreground hover:bg-accent hover:text-accent-foreground m-1 cursor-pointer p-1'>
                    <ChevronDown
                      className={cn(
                        'h-4 w-4 rotate-0 transform transition-transform duration-100',
                        isPopoverOpen && 'rotate-180'
                      )}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className='mx-auto flex w-full items-center justify-between'>
                <span className={cn('text-muted-foreground mx-3 flex-1 truncate')}>{placeholder}</span>
                <ChevronDown
                  className={cn(
                    'text-muted-foreground mx-2 h-4 w-4 rotate-0 transform cursor-pointer transition-transform duration-100',
                    isPopoverOpen && 'rotate-180'
                  )}
                />
              </div>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popover-trigger-width) p-0' align='start'>
          <Command>
            {isSearchable && (
              <CommandGroup className='mx-1 mt-1'>
                <FieldGroup className='max-w-sm gap-2'>
                  <SelectDropdownSearch
                    key={''}
                    filter={filter1}
                    isSimpleSearchable={isSimpleSearchable}
                    isNumberSearchable={isNumberSearchable}
                    isFilterVerticalAlignment={isFilterVerticalAlignment}
                    onSetFilter={setFilter1}
                    onSetShowSecondFilter={setShowSecondFilter}
                  />

                  {!isSimpleSearchable && showSecondFilter && (
                    <SelectDropdownSearch
                      key={''}
                      filter={filter2}
                      isSimpleSearchable={isSimpleSearchable}
                      isNumberSearchable={isNumberSearchable}
                      isFilterVerticalAlignment={isFilterVerticalAlignment}
                      onSetFilter={setFilter2}
                      filterOperator={filterOperator}
                      onSetFilterOperator={setFilterOperator}
                    />
                  )}
                </FieldGroup>
              </CommandGroup>
            )}
            {isSearchable && <CommandSeparator className='mx-1 mt-2 mb-1' />}
            <CommandGroup>
              <SelectDropdownItem
                key={'(Select All)'}
                value={'(Select All)'}
                label={'(Select All)'}
                onToggleAllOptions={toggleAllOptions}
                allSelected={allSelected}
              />
            </CommandGroup>
            <CommandList>
              {filteredData && filteredData.length > 0 ? (
                isSelectionReorder ? (
                  <>
                    <CommandGroup className='py-0'>
                      {filteredData
                        .filter((option) => selectedValues.includes(option.value))
                        .map((option) => {
                          return (
                            <SelectDropdownItem
                              key={option.value}
                              value={option.value}
                              label={option.label}
                              Icon={option?.icon}
                              onToggleOption={toggleOption}
                              isSelected={true}
                            />
                          );
                        })}
                    </CommandGroup>
                    {selectedValues.length > 0 && <CommandSeparator className='mx-1 my-1' />}
                    <CommandGroup>
                      {filteredData
                        .filter((option) => !selectedValues.includes(option.value))
                        .map((option) => {
                          return (
                            <SelectDropdownItem
                              key={option.value}
                              value={option.value}
                              label={option.label}
                              Icon={option?.icon}
                              onToggleOption={toggleOption}
                              isSelected={false}
                            />
                          );
                        })}
                    </CommandGroup>
                  </>
                ) : (
                  <CommandGroup>
                    {filteredData.map((option) => {
                      const isSelected = selectedValues.includes(option.value);
                      return (
                        <SelectDropdownItem
                          key={option.value}
                          value={option.value}
                          label={option.label}
                          Icon={option?.icon}
                          onToggleOption={toggleOption}
                          isSelected={isSelected}
                        />
                      );
                    })}
                  </CommandGroup>
                )
              ) : filter1.search.trim().length > 0 || filter2.search.trim().length > 0 ? (
                <CommandEmpty className='px-2 pt-2 pb-4 text-start'>일치하는 항목이 없습니다.</CommandEmpty>
              ) : (
                <CommandEmpty className='px-2 pt-2 pb-4 text-start'>선택 가능한 항목이 없습니다.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

SelectDropdown.displayName = 'MultiSelectDropdown';

function SelectDropdownSearch({
  filter,
  isSimpleSearchable,
  isNumberSearchable,
  isFilterVerticalAlignment,
  onSetFilter,
  onSetShowSecondFilter,
  filterOperator,
  onSetFilterOperator,
}: {
  filter: FilterState;
  isSimpleSearchable: boolean;
  isNumberSearchable: boolean;
  isFilterVerticalAlignment: boolean;
  onSetFilter: Dispatch<SetStateAction<FilterState>>;
  onSetShowSecondFilter?: (value: boolean) => void;
  filterOperator?: string;
  onSetFilterOperator?: Dispatch<SetStateAction<string>>;
}) {
  const typeFilterOptions = useMemo(() => {
    return filterOptions.filter((item) => {
      return isNumberSearchable ? item.type !== 'string' : item.type !== 'number';
    });
  }, [isNumberSearchable]);

  return (
    <Field orientation='vertical' className='items-center justify-between'>
      {onSetFilterOperator && (
        <RadioGroup
          defaultValue={filterOperator}
          className='mb-1.5 flex flex-row items-center justify-start'
          onValueChange={(value) => onSetFilterOperator(value)}>
          <div className='flex items-center gap-1'>
            <RadioGroupItem className='size-3' value='AND' id='r1' />
            <Label className='text-xs' htmlFor='r1'>
              AND
            </Label>
          </div>
          <div className='ml-2 flex items-center gap-1'>
            <RadioGroupItem className='size-3' value='OR' id='r2' />
            <Label className='text-xs' htmlFor='r2'>
              OR
            </Label>
          </div>
        </RadioGroup>
      )}
      <div className={cn('flex w-full flex-col gap-1', !isFilterVerticalAlignment && 'flex-row')}>
        {!isSimpleSearchable && (
          <Select
            value={filter.type}
            onValueChange={(value) => {
              onSetFilter((prev) => ({ ...prev, type: value }));
              if (onSetShowSecondFilter && (value === 'blank' || value === 'not_blank')) {
                onSetShowSecondFilter(true);
              }
            }}>
            <SelectTrigger
              className={cn('w-full', !isFilterVerticalAlignment && 'w-fit shrink-0')}
              id='checkout-exp-month-ts6'>
              <SelectValue placeholder='필터 타입' />
            </SelectTrigger>
            <SelectContent position='popper' align='start'>
              <SelectGroup>
                {typeFilterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
        {filter && filter.type !== 'blank' && filter.type !== 'not_blank' && (
          <input
            className='border-border hover:border-sub-border focus:border-sub-border w-full flex-1 rounded-sm border px-2 py-1 text-sm font-light focus:outline-none'
            placeholder={isSimpleSearchable ? 'Search...' : filter && filter.type === 'between' ? 'From' : 'Filter...'}
            value={filter.search}
            onChange={(e) => {
              onSetFilter((prev) => ({ ...prev, search: e.target.value }));
              if (onSetShowSecondFilter && !isSimpleSearchable) {
                onSetShowSecondFilter(e.target.value.trim().length > 0);
              }
            }}
          />
        )}
        {!isSimpleSearchable && filter && filter.type === 'between' && (
          <input
            className='border-border hover:border-sub-border focus:border-sub-border w-full flex-1 rounded-sm border px-2 py-1 text-sm font-light focus:outline-none'
            placeholder='To'
            value={filter.search2}
            onChange={(e) => {
              onSetFilter((prev) => ({ ...prev, search2: e.target.value }));
            }}
          />
        )}
      </div>
    </Field>
  );
}

function SelectDropdownItem({
  key,
  value,
  label,
  Icon,
  onToggleOption,
  onToggleAllOptions,
  isSelected,
  allSelected,
}: {
  key: string;
  value: string;
  label: string;
  Icon?: ComponentType<{ className?: string }>;
  onToggleOption?: (value: string) => void;
  onToggleAllOptions?: () => void;
  isSelected?: boolean;
  allSelected?: 'Checked' | 'Unchecked' | 'Indeterminate';
}) {
  return (
    <CommandItem
      key={key}
      onSelect={() => {
        if (onToggleOption) {
          onToggleOption(value);
        } else if (onToggleAllOptions) {
          onToggleAllOptions();
        }
      }}
      className='hover:bg-accent cursor-pointer'>
      <div
        className={cn(
          'border-border mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
          isSelected || allSelected === 'Checked'
            ? 'bg-primary text-primary-foreground'
            : allSelected === 'Indeterminate'
              ? 'bg-secondary text-secondary-foreground'
              : 'border-foreground opacity-50 [&_svg]:invisible'
        )}>
        {allSelected === 'Indeterminate' ? <Minus className='h-4 w-4' /> : <Check className='h-4 w-4' />}
      </div>
      {Icon && <Icon className='text-muted-foreground mr-2 h-4 w-4' />}
      <span className='truncate'>{label}</span>
    </CommandItem>
  );
}
