import React from 'react';
import { Loader } from '@templates/loader';

export function LoaderDemo() {
  return (
    <div className="skeci-ui flex items-center justify-center p-12">
      <Loader variant="dots" showLabel label="Loading assets..." />
    </div>
  );
}

export function LoaderVariants() {
  return (
    <div className="skeci-ui flex flex-col items-center gap-12">
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Variants
        </h4>
        <div className="flex items-center gap-12">
          <Loader variant="dots" />
          <Loader variant="pulse" />
          <Loader variant="ping" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Sizes
        </h4>
        <div className="flex items-end gap-12">
          <Loader size="sm" showLabel />
          <Loader size="md" showLabel />
          <Loader size="lg" showLabel />
        </div>
      </div>
    </div>
  );
}
