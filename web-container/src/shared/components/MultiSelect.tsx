import { useState, useId, useMemo, type ComponentType } from 'react';

import { Eraser, CheckIcon, ChevronDown, ListChevronsDownUp, ListChevronsUpDown, XIcon, X } from 'lucide-react';

import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/shadcn-ui/command.tsx';
import { Field, FieldGroup, FieldLabel } from '@/shared/components/shadcn-ui/field.tsx';
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
  { label: '일치', value: 'equals' },
  { label: '불 일치', value: 'does_not_equal' },
  { label: '포함', value: 'contains' },
  { label: '미 포함', value: 'not_contains' },
  { label: '보다 큰', value: 'greater_than' },
  { label: '보다 크거나 같은', value: 'greater_than_or_equal_to' },
  { label: '보다 작은', value: 'less_than' },
  { label: '보다 작거나 같은', value: 'less_than_or_equal_to' },
  { label: '범위', value: 'between' },
  { label: '공백', value: 'blank' },
  { label: '공백이 아닌', value: 'not_blank' },
];

interface MultiSelectProps {
  label: string;
  options: { label: string; value: string; icon?: ComponentType<{ className?: string }> }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  widthClass?: string;
}

const initialFilterState = { search: '', type: 'contains' };

export function MultiSelect({
  label,
  options,
  onValueChange,
  defaultValue = [],
  placeholder = 'Select options',
  maxCount = 3,
  widthClass = 'w-28 sm:w-32',
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const comboLabelId = useId();
  const [filter1, setFilter1] = useState(initialFilterState);
  const [filter2, setFilter2] = useState(initialFilterState);
  const [filterOperator, setFilterOperator] = useState('AND');
  const [showSecondFilter, setShowSecondFilter] = useState(false);

  const handleResetFilters = () => {
    setFilter1(initialFilterState);
    setFilter2(initialFilterState);
    setFilterOperator('AND');
    setShowSecondFilter(false);
  };

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    setSelectedValues(newSelectedValues);
    onValueChange(newSelectedValues);
  };

  const filteredData = useMemo(() => {
    return options.filter((item) => {
      const runFilter = (val: string, search: string, type: string) => {
        if (!search) return true;
        const itemValue = val.toLowerCase();
        const searchValue = search.toLowerCase();
        const itemNum = parseFloat(val);
        const searchNum = parseFloat(search);

        switch (type) {
          case 'equals':
            return itemValue === searchValue;
          case 'not_equals':
            return itemValue !== searchValue;
          case 'contains':
            return itemValue.includes(searchValue);
          case 'not_contains':
            return !itemValue.includes(searchValue);
          case 'less_than':
            return itemNum < searchNum;
          case 'less_than_equal':
            return itemNum <= searchNum;
          case 'greater_than':
            return itemNum > searchNum;
          case 'greater_than_equal':
            return itemNum >= searchNum;
          default:
            return true;
        }
      };

      const result1 = runFilter(item.value, filter1.search, filter1.type);
      if (!showSecondFilter) return result1;

      const result2 = runFilter(item.value, filter2.search, filter2.type);
      return filterOperator === 'AND' ? result1 && result2 : result1 || result2;
    });
  }, [filter1.search, filter1.type, filter2.search, filter2.type, filterOperator, options, showSecondFilter]);

  const handleClear = (isAllChecked: boolean) => {
    if (isAllChecked) {
      setSelectedValues(filteredData.map((opt) => opt.value));
      onValueChange(filteredData.map((opt) => opt.value));
    } else {
      setSelectedValues([]);
      onValueChange([]);
    }
  };

  const handleTogglePopover = () => {
    setIsPopoverOpen((prev) => !prev);
  };

  return (
    <div className='flex items-center gap-2 text-sm'>
      <span id={comboLabelId} className='text-muted-foreground truncate font-medium'>
        {label}
      </span>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
        <PopoverTrigger asChild>
          <button
            onClick={handleTogglePopover}
            className={cn(
              'border-border hover:ring-user-theme focus:ring-user-theme min-h-5 min-w-28 rounded-sm border hover:ring focus:ring',
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
                            className='bg-user-theme/50 mx-1 flex min-w-0 flex-1 items-center justify-between rounded-sm font-light'>
                            {IconComponent && <IconComponent className='mr-1 h-4 w-4' />}
                            <span className='flex-1 truncate'>{option?.label}</span>
                            <div
                              className='hover:bg-user-theme/30 ml-1 shrink-0 cursor-pointer'
                              onClick={(event) => {
                                event.stopPropagation();
                                toggleOption(value);
                              }}>
                              <XIcon className='h-3 w-3' />
                            </div>
                          </Badge>
                        );
                      })
                    ) : (
                      <Badge
                        key={'All'}
                        className='bg-user-theme/50 mx-1 flex min-w-0 flex-1 items-center justify-between rounded-sm font-light'>
                        <span className='flex-1 truncate'>All</span>
                        <div
                          className='hover:bg-user-theme/30 ml-1 shrink-0 cursor-pointer'
                          onClick={(event) => {
                            event.stopPropagation();
                            handleClear(false);
                          }}>
                          <XIcon className='h-3 w-3' />
                        </div>
                      </Badge>
                    )}
                  </div>
                  {selectedValues.length > maxCount && (
                    <Badge className='bg-user-theme/50 mr-1 shrink-0 rounded-sm font-light'>{`+${selectedValues.length - maxCount}`}</Badge>
                  )}
                </div>
                <div className='flex min-w-0 shrink-0 items-center justify-between'>
                  <div className='bg-border h-5 w-px' />
                  <div
                    className='text-muted-foreground m-1 cursor-pointer p-1'
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear(false);
                    }}>
                    <X className='h-4 w-4 hover:text-red-500' />
                  </div>
                  <div className='bg-border h-5 w-px' />
                  <ChevronDown
                    className={cn(
                      'text-muted-foreground mx-2 h-4 w-4 rotate-0 transform cursor-pointer transition-transform duration-100',
                      isPopoverOpen && 'rotate-180'
                    )}
                  />
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
            <CommandGroup className='mx-1 mt-2'>
              <FieldGroup className='max-w-sm'>
                <Field orientation='vertical' className='items-center justify-between'>
                  <div className='flex flex-row items-center justify-between'>
                    <FieldLabel htmlFor='checkout-7j9-card-name-43j'>필터</FieldLabel>
                    <div className='flex flex-row items-center justify-between'>
                      <button className='icon-button' onClick={() => setShowSecondFilter(!showSecondFilter)}>
                        {showSecondFilter ? (
                          <ListChevronsDownUp className='h-4 w-4' />
                        ) : (
                          <ListChevronsUpDown className='h-4 w-4' />
                        )}
                      </button>
                      <button className='icon-button' onClick={handleResetFilters}>
                        <Eraser className='h-4 w-4' />
                      </button>
                    </div>
                  </div>
                  <Select value={filter1.type} onValueChange={(v) => setFilter1((prev) => ({ ...prev, type: v }))}>
                    <SelectTrigger id='checkout-exp-month-ts6'>
                      <SelectValue placeholder='필터 타입' />
                    </SelectTrigger>
                    <SelectContent position='popper' align='start'>
                      <SelectGroup>
                        {filterOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <input
                    className='border-border hover:border-sub-border focus:border-sub-border w-full flex-1 rounded-sm border px-2 py-1 text-sm font-light focus:outline-none'
                    placeholder='filter...'
                    value={filter1.search}
                    onChange={(e) => setFilter1((prev) => ({ ...prev, search: e.target.value }))}
                  />
                </Field>

                {showSecondFilter && (
                  <Field orientation='vertical' className='items-center justify-between'>
                    <RadioGroup
                      defaultValue={filterOperator}
                      className='flex flex-row items-center justify-start'
                      onValueChange={(value) => setFilterOperator(value)}>
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
                    <Select value={filter2.type} onValueChange={(v) => setFilter2((prev) => ({ ...prev, type: v }))}>
                      <SelectTrigger id='checkout-exp-month-ts6'>
                        <SelectValue placeholder='필터 타입' />
                      </SelectTrigger>
                      <SelectContent position='popper' align='start'>
                        <SelectGroup>
                          {filterOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <input
                      className='border-border hover:border-sub-border focus:border-sub-border w-full flex-1 rounded-sm border px-2 py-1 text-sm font-light focus:outline-none'
                      placeholder='filter...'
                      value={filter2.search}
                      onChange={(e) => setFilter2((prev) => ({ ...prev, search: e.target.value }))}
                    />
                  </Field>
                )}
              </FieldGroup>
            </CommandGroup>
            <CommandSeparator className='mx-1 my-2' />
            <CommandGroup className='mx-1'>
              <FieldGroup className='max-w-sm'>
                <Field orientation='horizontal' className='items-center justify-between'>
                  <Button variant='outline' type='button' onClick={() => handleClear(true)}>
                    Select all
                  </Button>
                  <Button variant='outline' type='button' onClick={() => handleClear(false)}>
                    Clear all
                  </Button>
                </Field>
              </FieldGroup>
            </CommandGroup>
            <CommandSeparator className='mx-1 my-2' />
            <CommandList>
              <CommandEmpty>선택 가능한 항목이 없습니다.</CommandEmpty>
              <CommandGroup>
                {filteredData.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className='hover:bg-accent cursor-pointer'>
                      <div
                        className={cn(
                          'border-sub-border group-hover/command-item:border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                          isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                        )}>
                        <CheckIcon className='h-4 w-4' />
                      </div>
                      {option?.icon && <option.icon className='text-muted-foreground mr-2 h-4 w-4' />}
                      <span className='truncate'>{option.label}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

MultiSelect.displayName = 'MultiSelect';
