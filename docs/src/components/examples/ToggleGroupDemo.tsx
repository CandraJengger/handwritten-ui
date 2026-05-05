import React, { useState } from 'react';
import { ToggleGroup, ToggleGroupItem } from '@templates/toggle-group';
import { Bold, Italic, Underline } from 'lucide-react';

export function ToggleGroupDemo() {
  const [value, setValue] = useState('bold');

  return (
    <div className="skeci-ui flex flex-col items-center gap-6">
      <ToggleGroup type="single" value={value} onValueChange={setValue}>
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
      <div className="text-sm font-medium text-gray-500">
        Active: {value || 'None'}
      </div>
    </div>
  );
}

export function ToggleGroupVariants() {
  return (
    <div className="skeci-ui flex flex-col gap-10">
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Multiple Selection
        </h4>
        <ToggleGroup type="multiple" defaultValue={['bold', 'italic']}>
          <ToggleGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Outline Variant
        </h4>
        <ToggleGroup type="single" variant="outline">
          <ToggleGroupItem value="left">Left</ToggleGroupItem>
          <ToggleGroupItem value="center">Center</ToggleGroupItem>
          <ToggleGroupItem value="right">Right</ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
