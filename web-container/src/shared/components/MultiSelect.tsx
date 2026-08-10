import * as React from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronDown, XIcon } from 'lucide-react';

import { Badge } from '@/shared/components/shadcn-ui/badge.tsx';
import { Button } from '@/shared/components/shadcn-ui/button.tsx';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shared/components/shadcn-ui/command.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/shadcn-ui/popover.tsx';
import { Separator } from '@/shared/components/shadcn-ui/separator.tsx';
import { cn } from '@/shared/utils/shadcn/utils.ts';

const multiSelectVariants = cva('m-1 transition-all duration-300 ease-in-out hover:scale-105', {
  variants: {
    variant: {
      default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
      secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
      destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      inverted: 'inverted',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof multiSelectVariants> {
  label: string;
  options: { label: string; value: string; icon?: React.ComponentType<{ className?: string }> }[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  animation?: number;
  maxCount?: number;
  modalPopover?: boolean;
  asChild?: boolean;
  className?: string;
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      label,
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = 'Select options',
      maxCount = 3,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const comboLabelId = React.useId();

    React.useEffect(() => {
      if (JSON.stringify(defaultValue) !== JSON.stringify(selectedValues)) {
        setSelectedValues(defaultValue);
      }
    }, [defaultValue]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setIsPopoverOpen(true);
      } else if (event.key === 'Backspace' && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    return (
      <div className='flex items-center gap-2'>
        {/* ♿ 접근성: 스크린 리더가 이 텍스트와 콤보박스를 연관지어 읽도록 id 부여 */}
        <span id={comboLabelId} className='text-muted-foreground text-xs font-medium whitespace-nowrap'>
          {label}
        </span>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              variant='outline'
              ref={ref}
              {...props}
              onClick={handleTogglePopover}
              className={cn(
                'focus-visible:ring-user-theme h-8 justify-between px-3 text-xs font-light focus-visible:ring-2',
                className
              )}>
              {selectedValues.length > 0 ? (
                <div className='flex w-full items-center justify-between'>
                  <div className='flex flex-wrap items-center'>
                    {selectedValues.slice(0, maxCount).map((value) => {
                      const option = options.find((o) => o.value === value);
                      const IconComponent = option?.icon;
                      return (
                        <Badge key={value} className={cn(multiSelectVariants({ variant }))}>
                          {IconComponent && <IconComponent className='mr-2 h-4 w-4' />}
                          {option?.label}
                          <XIcon
                            className='ml-2 h-4 w-4 cursor-pointer'
                            onClick={(event) => {
                              event.stopPropagation();
                              toggleOption(value);
                            }}
                          />
                        </Badge>
                      );
                    })}
                    {selectedValues.length > maxCount && (
                      <Badge
                        className={cn(
                          'text-foreground border-foreground/10 bg-transparent hover:bg-transparent',
                          multiSelectVariants({ variant })
                        )}>
                        {`+ ${selectedValues.length - maxCount} more`}
                        <XIcon
                          className='ml-2 h-4 w-4 cursor-pointer'
                          onClick={(event) => {
                            event.stopPropagation();
                            clearExtraOptions();
                          }}
                        />
                      </Badge>
                    )}
                  </div>
                  <div className='flex items-center justify-between'>
                    <XCircle
                      className='text-muted-foreground mx-2 h-4 w-4 cursor-pointer'
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <Separator orientation='vertical' className='flex h-full min-h-6' />
                    <ChevronDown className='text-muted-foreground mx-2 h-4 w-4 cursor-pointer' />
                  </div>
                </div>
              ) : (
                <div className='mx-auto flex w-full items-center justify-between'>
                  <span className='text-muted-foreground mx-3 text-sm'>{placeholder}</span>
                  <ChevronDown className='text-muted-foreground mx-2 h-4 w-4 cursor-pointer' />
                </div>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-(--radix-popover-trigger-width) p-0' align='start'>
            <Command>
              <CommandInput placeholder='Search...' onKeyDown={handleInputKeyDown} />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {options.map((option) => {
                    const isSelected = selectedValues.includes(option.value);
                    return (
                      <CommandItem
                        key={option.value}
                        onSelect={() => toggleOption(option.value)}
                        className='cursor-pointer'>
                        <div
                          className={cn(
                            'border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border',
                            isSelected ? 'bg-primary text-primary-foreground' : 'opacity-50 [&_svg]:invisible'
                          )}>
                          <CheckIcon className='h-4 w-4' />
                        </div>
                        {option.icon && <option.icon className='text-muted-foreground mr-2 h-4 w-4' />}
                        <span>{option.label}</span>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup>
                  <div className='flex items-center justify-between space-x-2 p-1'>
                    <Button variant='outline' size='sm' onClick={handleClear} className='w-full justify-center'>
                      Clear all
                    </Button>
                    <Button
                      variant='default'
                      size='sm'
                      onClick={() => setIsPopoverOpen(false)}
                      className='w-full justify-center'>
                      Close
                    </Button>
                  </div>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';
