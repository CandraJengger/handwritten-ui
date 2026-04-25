import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      htmlFor,
      required = false,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        {...props}
        className={`font-virgil text-sm leading-none font-bold tracking-[0.02em] ${
          disabled
            ? 'cursor-not-allowed text-[#999999]'
            : 'cursor-default text-[#333333]'
        } ${className}`.trim()}
      >
        {children}
        {required && (
          <span className="ml-0.5 text-red-500" aria-hidden="true">
            *
          </span>
        )}
      </label>
    );
  },
);

Label.displayName = 'Label';
