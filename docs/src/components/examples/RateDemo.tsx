import React, { useState } from 'react';
import { Rate } from '@templates/rate';

export function RateDemo() {
  const [value, setValue] = useState(3);

  return (
    <div className="skeci-ui flex flex-col items-center gap-6">
      <Rate value={value} onChange={setValue} />
      <div className="text-sm font-medium text-gray-500">
        Rating: {value} / 5
      </div>
    </div>
  );
}

export function RateVariants() {
  return (
    <div className="skeci-ui flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Sizes
        </h4>
        <div className="flex flex-col items-center gap-4">
          <Rate size="sm" defaultValue={2} />
          <Rate size="md" defaultValue={3} />
          <Rate size="lg" defaultValue={4} />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Readonly & Disabled
        </h4>
        <div className="flex flex-col items-center gap-4">
          <Rate defaultValue={4} readonly />
          <Rate defaultValue={2} disabled />
        </div>
      </div>
      <div className="flex flex-col items-center gap-2">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Custom Count (10 stars)
        </h4>
        <Rate count={10} defaultValue={7} />
      </div>
    </div>
  );
}
