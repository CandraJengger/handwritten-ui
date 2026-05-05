import React from 'react';
import { Empty } from '@templates/empty';
import { Button } from '@templates/button';
import { FileQuestion } from 'lucide-react';

export function EmptyDemo() {
  return (
    <div className="skeci-ui flex w-full max-w-md items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-8">
      <Empty
        title="No Products Found"
        description="Try adjusting your filters or search query to find what you're looking for."
        action={<Button variant="outline">Clear Filters</Button>}
      />
    </div>
  );
}

export function EmptyVariants() {
  return (
    <div className="skeci-ui flex w-full max-w-md flex-col items-center gap-12">
      <div className="w-full rounded-xl border-2 border-dashed border-gray-200">
        <Empty />
      </div>
      <div className="w-full rounded-xl border-2 border-dashed border-gray-200">
        <Empty
          title="Missing Component"
          description="We couldn't find the requested component in the registry."
          icon={
            <FileQuestion className="h-16 w-16 stroke-[1.5] text-gray-400" />
          }
        />
      </div>
    </div>
  );
}
