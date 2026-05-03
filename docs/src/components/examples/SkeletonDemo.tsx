import React from 'react';
import { Skeleton } from '@templates/skeleton';

export function SkeletonDemo() {
  return (
    <div className="handwritten-ui mx-auto flex w-full max-w-md items-center justify-center p-8">
      <div className="flex w-full items-center space-x-4">
        <Skeleton shape="circle" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton width="100%" height={16} />
          <Skeleton width="80%" height={16} />
        </div>
      </div>
    </div>
  );
}

export function SkeletonVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Card Placeholder</h4>
        <div className="flex flex-col space-y-3">
          <Skeleton height={125} width="100%" className="rounded-xl" />
          <div className="space-y-2">
            <Skeleton height={16} width="100%" />
            <Skeleton height={16} width="75%" />
          </div>
        </div>
      </section>
    </div>
  );
}
