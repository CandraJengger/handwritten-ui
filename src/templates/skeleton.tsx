import React from 'react';

interface SkeletonProps {
  width?: number | string;
  height?: number | string;
  shape?: 'rectangle' | 'circle';
  className?: string;
}

export function Skeleton({
  width = '100%',
  height = 20,
  shape = 'rectangle',
  className = '',
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${shape === 'circle' ? 'rounded-full' : 'rounded-sm'} ${className}`.trim()}
      style={{ width, height }}
      aria-busy="true"
      aria-live="polite"
    />
  );
}
