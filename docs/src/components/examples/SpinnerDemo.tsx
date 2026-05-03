import React from 'react';
import { Spinner } from '@templates/spinner';

export function SpinnerDemo() {
  return (
    <div className="handwritten-ui flex items-center justify-center p-8">
      <Spinner />
    </div>
  );
}

export function SpinnerVariants() {
  return (
    <div className="handwritten-ui flex flex-col items-center gap-8">
      <div className="flex items-center gap-8">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
      </div>
      <div className="flex items-center gap-4 rounded-md bg-gray-900 p-4">
        <Spinner className="text-white" />
        <span className="font-virgil text-sm text-white">Dark Background</span>
      </div>
    </div>
  );
}
