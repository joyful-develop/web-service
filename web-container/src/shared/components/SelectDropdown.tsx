import { useState, useMemo, type ComponentType, type Dispatch, type SetStateAction } from 'react';

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
  { type: 'number', label: '~ 사이', value: 'between' },
  { type: 'string', label: '다음으로 시작', value: 'begins_with' },
  { type: 'string', label: '다음으로 끝', value: 'ends_with' },
  { type: 'common', label: '공백', value: 'blank' },
  { type: 'common', label: '공백이 아닌', value: 'not_blank' },
];

export type SelectDropdownOption = {
  label: string;
  value: string;
  disabled: boolean;
  icon?: ComponentType<{ className?: string }>;
};

interface SelectDropdownProps {
  label?: string;
  options: SelectDropdownOption[];
  onValueChange?: (value: SelectDropdownOption[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  isMultiSelectable?: boolean;
  showBadge?: boolean;
  maxDisplayCount?: number;
  isFilterVerticalAlignment?: boolean;
  isSearchable?: boolean;
  isSimpleSearchable?: boolean;
  isNumberSearchable?: boolean;
  isSelectionReorder?: boolean;
  widthClass?: string;
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
  disabled = false,
  isMultiSelectable = true,
  showBadge = true,
  maxDisplayCount = 1,
  isFilterVerticalAlignment = false,
  isSearchable = true,
  isSimpleSearchable = false,
  isNumberSearchable = false,
  isSelectionReorder = true,
  widthClass = 'h-8 w-32 sm:w-50',
}: SelectDropdownProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    return defaultValue.filter((value) => {
      return options.some((option) => option.value === value);
    });
  });
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
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

  const filteredData = useMemo(() => {
    return options.filter((option) => {
      const runFilter = (label: string, search: string, search2: string, type: string) => {
        if (type !== 'blank' && type !== 'not_blank' && !search && !search2) return true;
        const labelStr = label.toLowerCase();
        const searchStr = search.toLowerCase();
        const labelNum = parseFloat(label);
        const searchNum = parseFloat(search);
        const search2Num = parseFloat(search2);

        switch (type) {
          case 'contains':
            return labelStr.includes(searchStr);
          case 'not_contains':
            return !labelStr.includes(searchStr);
          case 'equals':
            return labelStr === searchStr;
          case 'not_equals':
            return labelStr !== searchStr;
          case 'greater_than':
            return labelNum > searchNum;
          case 'greater_than_or_equal_to':
            return labelNum >= searchNum;
          case 'less_than':
            return labelNum < searchNum;
          case 'less_than_or_equal_to':
            return labelNum <= searchNum;
          case 'between':
            return (search.trim() === '' || labelNum >= searchNum) && (search2.trim() === '' || labelNum <= search2Num);
          case 'begins_with':
            return labelStr.startsWith(searchStr);
          case 'ends_with':
            return labelStr.endsWith(searchStr);
          case 'blank':
            return labelStr.trim() === '';
          case 'not_blank':
            return labelStr.trim() !== '';
          default:
            return true;
        }
      };

      const result1 = runFilter(option.label, filter1.search, filter1.search2, filter1.type);
      if (
        filter2.type !== 'blank' &&
        filter2.type !== 'not_blank' &&
        filter2.search.trim() === '' &&
        filter2.search2.trim() === ''
      )
        return result1;

      const result2 = runFilter(option.label, filter2.search, filter2.search2, filter2.type);
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
  ]);

  const toggleOption = (value: string) => {
    const newSelectedValues = isMultiSelectable
      ? selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value]
      : selectedValues.includes(value)
        ? []
        : [value];
    setSelectedValues(newSelectedValues);
    if (onValueChange) {
      onValueChange(options.filter((option) => newSelectedValues.includes(option.value)));
    }

    const isAllSelected = options.length > 0 && newSelectedValues.length === options.length;
    const isSomeSelected = newSelectedValues.length > 0 && newSelectedValues.length < options.length;
    setAllSelected(isAllSelected ? 'Checked' : isSomeSelected ? 'Indeterminate' : 'Unchecked');

    if (!isMultiSelectable) {
      handleTogglePopover();
    }
  };

  const toggleAllOptions = (isAllClear?: boolean | undefined) => {
    const enabledOptions = options.filter((option) => !option.disabled);
    const isAllSelected =
      (enabledOptions.length > 0 && selectedValues.length === enabledOptions.length) ||
      selectedValues.length === filteredData.length;
    const isNoFiltering = enabledOptions.length > 0 && filteredData.length === enabledOptions.length;

    if (isAllClear || isAllSelected) {
      setSelectedValues([]);
      if (onValueChange) {
        onValueChange([]);
      }
      setAllSelected('Unchecked');
    } else {
      setSelectedValues(enabledOptions.map((option) => option.value));
      if (onValueChange) {
        onValueChange(enabledOptions);
      }
      setAllSelected(isNoFiltering ? 'Checked' : 'Indeterminate');
    }
  };

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  const selectedLabel = () => {
    const selectedOptions = options.filter((option) => {
      return selectedValues.includes(option.value);
    });
    return selectedOptions.map((option) => option.label).join(', ');
  };

  return (
    <div className='flex items-center gap-2 text-sm'>
      <span className='text-foreground truncate'>{label}</span>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            disabled={disabled}
            onClick={handleTogglePopover}
            className={cn(
              'group/button bg-secondary data-[state=open]:ring-primary border-border enabled:hover:ring-primary enabled:focus:ring-primary disabled:bg-muted/50 disabled:text-muted-foreground min-h-6 min-w-28 rounded-sm border enabled:hover:ring enabled:focus:ring data-[state=open]:ring',
              widthClass
            )}>
            {selectedValues.length > 0 ? (
              <div className='flex w-full items-center justify-between overflow-hidden'>
                <div className='flex min-w-0 flex-1 items-center overflow-hidden px-1'>
                  {showBadge ? (
                    <>
                      <div className='flex w-fit items-center justify-between overflow-hidden'>
                        {selectedValues.length !== options.length ? (
                          selectedValues.slice(0, maxDisplayCount).map((value) => {
                            const option = options.find((option) => option.value === value);
                            return (
                              <SelectDropdownBadge key={option?.value} option={option} onToggleOption={toggleOption} />
                            );
                          })
                        ) : (
                          <SelectDropdownBadge onToggleAllOptions={toggleAllOptions} />
                        )}
                      </div>
                      {selectedValues.length > maxDisplayCount && (
                        <SelectDropdownBadge selectedCount={selectedValues.length - maxDisplayCount} />
                      )}
                    </>
                  ) : (
                    <span className='flex-1 truncate px-2 text-start'>{selectedLabel()}</span>
                  )}
                </div>
                <SelectDropdownButton isPopoverOpen={isPopoverOpen} onToggleAllOptions={toggleAllOptions} />
              </div>
            ) : (
              <SelectDropdownButton isPopoverOpen={isPopoverOpen} placeholder={placeholder} />
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className='w-(--radix-popover-trigger-width) p-0' align='start'>
          <Command>
            {isSearchable && (
              <CommandGroup className='mx-1 mt-1'>
                <FieldGroup className='max-w-sm gap-2'>
                  <SelectDropdownSearch
                    filter={filter1}
                    isFilterVerticalAlignment={isFilterVerticalAlignment}
                    isSimpleSearchable={isSimpleSearchable}
                    isNumberSearchable={isNumberSearchable}
                    onSetFilter={setFilter1}
                    onSetShowSecondFilter={setShowSecondFilter}
                  />

                  {!isSimpleSearchable && showSecondFilter && (
                    <SelectDropdownSearch
                      filter={filter2}
                      isFilterVerticalAlignment={isFilterVerticalAlignment}
                      isSimpleSearchable={isSimpleSearchable}
                      isNumberSearchable={isNumberSearchable}
                      filterOperator={filterOperator}
                      onSetFilter={setFilter2}
                      onSetFilterOperator={setFilterOperator}
                    />
                  )}
                </FieldGroup>
              </CommandGroup>
            )}
            {isSearchable && <CommandSeparator className='mx-1 mt-2 mb-1' />}
            {filteredData && filteredData.length > 0 && isMultiSelectable && (
              <CommandGroup>
                <SelectDropdownItem
                  key={'(Select All)'}
                  option={{ label: '(Select All)', value: '(Select All)', disabled: false }}
                  isMultiSelectable={isMultiSelectable}
                  allSelected={allSelected}
                  onToggleAllOptions={toggleAllOptions}
                />
              </CommandGroup>
            )}
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
                              option={option}
                              isMultiSelectable={isMultiSelectable}
                              isSelected={true}
                              onToggleOption={toggleOption}
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
                              option={option}
                              isMultiSelectable={isMultiSelectable}
                              isSelected={false}
                              onToggleOption={toggleOption}
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
                          option={option}
                          isMultiSelectable={isMultiSelectable}
                          isSelected={isSelected}
                          onToggleOption={toggleOption}
                        />
                      );
                    })}
                  </CommandGroup>
                )
              ) : filter1.search.trim().length > 0 || filter2.search.trim().length > 0 ? (
                <CommandEmpty className='p-2 text-start'>일치하는 항목이 없습니다.</CommandEmpty>
              ) : (
                <CommandEmpty className='p-2 text-start'>선택 가능한 항목이 없습니다.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

SelectDropdown.displayName = 'SelectDropdown';

function SelectDropdownButton({
  isPopoverOpen,
  placeholder,
  onToggleAllOptions,
}: {
  isPopoverOpen: boolean;
  placeholder?: string;
  onToggleAllOptions?: (isAllClear: boolean) => void;
}) {
  return (
    <div className='flex min-w-0 shrink-0 items-center justify-between'>
      {onToggleAllOptions && (
        <>
          <div className='bg-border h-4 w-px' />
          <div
            className='text-foreground group-disabled/button:text-muted-foreground group-enabled/button:hover:bg-accent group-enabled/button:hover:text-accent-foreground p-1 group-enabled/button:cursor-pointer'
            onClick={(event) => {
              event.stopPropagation();
              onToggleAllOptions(true);
            }}>
            <X className='h-4 w-4' />
          </div>
        </>
      )}
      {!onToggleAllOptions && <span className='text-muted-foreground mx-3 flex-1 truncate'>{placeholder}</span>}
      <div className='bg-border h-4 w-px' />
      <div className='text-foreground group-disabled/button:text-muted-foreground group-enabled/button:hover:bg-accent group-enabled/button:hover:text-accent-foreground m-1 px-1 group-enabled/button:cursor-pointer'>
        <ChevronDown
          className={cn('h-4 w-4 rotate-0 transform transition-transform duration-100', isPopoverOpen && 'rotate-180')}
        />
      </div>
    </div>
  );
}

function SelectDropdownBadge({
  option,
  selectedCount,
  onToggleOption,
  onToggleAllOptions,
}: {
  option?: SelectDropdownOption;
  selectedCount?: number;
  onToggleOption?: (value: string) => void;
  onToggleAllOptions?: (isAllClear: boolean) => void;
}) {
  return (
    <>
      <Badge
        variant='custom'
        className={cn(
          'bg-background text-foreground group-disabled/button:bg-sub-muted group-disabled/button:text-muted-foreground mx-1 rounded-sm',
          selectedCount ? 'shrink-0' : 'flex min-w-0 flex-1 items-center justify-between'
        )}>
        {option && option?.icon && <option.icon className='mr-1 h-4 w-4' />}
        {selectedCount ? (
          `+${selectedCount}`
        ) : (
          <>
            <span className='flex-1 truncate'>{option ? option.label : 'All'}</span>
            <div
              className='group-enabled/button:hover:bg-sub-accent ml-1 shrink-0 group-enabled/button:cursor-pointer'
              onClick={(event) => {
                event.stopPropagation();
                if (option && onToggleOption) {
                  onToggleOption(option.value);
                }
                if (!option && onToggleAllOptions) {
                  onToggleAllOptions(true);
                }
              }}>
              <X className='h-3 w-3' />
            </div>
          </>
        )}
      </Badge>
    </>
  );
}

function SelectDropdownSearch({
  filter,
  isFilterVerticalAlignment,
  isSimpleSearchable,
  isNumberSearchable,
  filterOperator,
  onSetFilter,
  onSetShowSecondFilter,
  onSetFilterOperator,
}: {
  filter: FilterState;
  isFilterVerticalAlignment: boolean;
  isSimpleSearchable: boolean;
  isNumberSearchable: boolean;
  filterOperator?: string;
  onSetFilter: Dispatch<SetStateAction<FilterState>>;
  onSetShowSecondFilter?: (value: boolean) => void;
  onSetFilterOperator?: Dispatch<SetStateAction<string>>;
}) {
  const typeFilterOptions = useMemo(() => {
    return filterOptions.filter((option) => {
      return isNumberSearchable ? option.type !== 'string' : option.type !== 'number';
    });
  }, [isNumberSearchable]);

  return (
    <Field orientation='vertical' className='items-center justify-between'>
      {onSetFilterOperator && (
        <RadioGroup
          defaultValue={filterOperator}
          className='flex flex-row items-center justify-start'
          onValueChange={(value) => onSetFilterOperator(value)}>
          <div className='flex items-center gap-1'>
            <RadioGroupItem className='border-sub-border size-3.5' value='AND' id='r1' />
            <Label className='text-xs' htmlFor='r1'>
              AND
            </Label>
          </div>
          <div className='ml-2 flex items-center gap-1'>
            <RadioGroupItem className='border-sub-border size-3.5' value='OR' id='r2' />
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
            <SelectTrigger className={cn('border-sub-borderw-full', !isFilterVerticalAlignment && 'w-fit shrink-0')}>
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
            lang='en'
            className='border-sub-border w-full flex-1 rounded-sm border px-2 py-1 focus:outline-none'
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
            lang='en'
            className='border-sub-border w-full flex-1 rounded-sm border px-2 py-1 focus:outline-none'
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
  option,
  isMultiSelectable,
  isSelected,
  allSelected,
  onToggleOption,
  onToggleAllOptions,
}: {
  key: string;
  option: SelectDropdownOption;
  isMultiSelectable: boolean;
  isSelected?: boolean;
  allSelected?: 'Checked' | 'Unchecked' | 'Indeterminate';
  onToggleOption?: (value: string) => void;
  onToggleAllOptions?: () => void;
}) {
  return (
    <CommandItem
      key={key}
      disabled={option.disabled}
      data-checked={!isMultiSelectable && isSelected}
      onSelect={() => {
        if (onToggleOption) {
          onToggleOption(option.value);
        } else if (onToggleAllOptions) {
          onToggleAllOptions();
        }
      }}
      className='hover:bg-accent cursor-pointer'>
      {isMultiSelectable && (
        <div
          className={cn(
            'border-sub-border mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
            isSelected || allSelected === 'Checked'
              ? 'bg-primary text-primary-foreground'
              : allSelected === 'Indeterminate'
                ? 'bg-secondary text-secondary-foreground'
                : 'border-foreground opacity-50 [&_svg]:invisible'
          )}>
          {allSelected === 'Indeterminate' ? (
            <Minus strokeWidth={4} className='size-3' />
          ) : (
            <Check strokeWidth={4} className='size-3' />
          )}
        </div>
      )}
      {option.icon && <option.icon className='text-muted-foreground mr-2 h-4 w-4' />}
      <span className='truncate'>{option.label}</span>
    </CommandItem>
  );
}
