import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
}

export function Label({
  children,
  disabled = false,
  required = false,
  className = '',
  ...props
}: LabelProps) {
  return (
    <label
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
}
