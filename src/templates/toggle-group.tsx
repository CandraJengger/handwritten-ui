import React, { createContext, useContext, useState } from 'react';
import { Toggle, type ToggleProps } from './toggle';

interface ToggleGroupContextProps {
  value: string | string[];
  onItemClick: (value: string) => void;
  type: 'single' | 'multiple';
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
  border?: ToggleProps['border'];
}

const ToggleGroupContext = createContext<ToggleGroupContextProps | null>(null);

export interface ToggleGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'single' | 'multiple';
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: any) => void;
  variant?: ToggleProps['variant'];
  size?: ToggleProps['size'];
  border?: ToggleProps['border'];
  disabled?: boolean;
}

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      className = '',
      type,
      value,
      defaultValue,
      onValueChange,
      variant = 'default',
      size = 'default',
      border = 'rough',
      disabled = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(
      defaultValue || (type === 'multiple' ? [] : ''),
    );

    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;

    const handleItemClick = (itemValue: string) => {
      if (disabled) return;

      let nextValue: string | string[];

      if (type === 'single') {
        nextValue = currentValue === itemValue ? '' : itemValue;
      } else {
        const currentArr = Array.isArray(currentValue) ? currentValue : [];
        nextValue = currentArr.includes(itemValue)
          ? currentArr.filter((v) => v !== itemValue)
          : [...currentArr, itemValue];
      }

      if (!isControlled) {
        setInternalValue(nextValue);
      }
      onValueChange?.(nextValue);
    };

    return (
      <div
        ref={ref}
        className={`flex items-center justify-center gap-1 ${className}`.trim()}
        {...props}
      >
        <ToggleGroupContext.Provider
          value={{
            value: currentValue,
            onItemClick: handleItemClick,
            type,
            variant,
            size,
            border,
          }}
        >
          {children}
        </ToggleGroupContext.Provider>
      </div>
    );
  },
);

ToggleGroup.displayName = 'ToggleGroup';

export interface ToggleGroupItemProps extends Omit<ToggleProps, 'value'> {
  value: string;
}

export const ToggleGroupItem = React.forwardRef<
  HTMLButtonElement,
  ToggleGroupItemProps
>(
  (
    {
      className = '',
      children,
      value,
      variant,
      size,
      border,
      disabled,
      ...props
    },
    ref,
  ) => {
    const context = useContext(ToggleGroupContext);

    if (!context) {
      throw new Error('ToggleGroupItem must be used within a ToggleGroup');
    }

    const isPressed =
      context.type === 'single'
        ? context.value === value
        : Array.isArray(context.value) && context.value.includes(value);

    return (
      <Toggle
        ref={ref}
        pressed={isPressed}
        onPressedChange={() => context.onItemClick(value)}
        variant={variant || context.variant}
        size={size || context.size}
        border={border || context.border}
        disabled={disabled}
        className={className}
        {...props}
      >
        {children}
      </Toggle>
    );
  },
);

ToggleGroupItem.displayName = 'ToggleGroupItem';
