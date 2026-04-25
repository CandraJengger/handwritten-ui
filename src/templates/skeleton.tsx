import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  shape?: 'rectangle' | 'circle';
}

export const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width = '100%',
      height = 20,
      shape = 'rectangle',
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`animate-pulse bg-gray-200 ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'} ${className}`.trim()}
        style={{ width, height }}
        aria-busy="true"
        aria-live="polite"
        {...props}
      />
    );
  },
);
Skeleton.displayName = 'Skeleton';
