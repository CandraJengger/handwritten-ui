import React, { useState } from 'react';
import { RadioGroup, RadioGroupItem } from '@templates/radio-group';

export function RadioGroupDemo() {
  const [value, setValue] = useState('option-one');

  return (
    <div className="handwritten-ui flex flex-col gap-6">
      <RadioGroup value={value} onValueChange={setValue}>
        <RadioGroupItem
          value="option-one"
          label="Option One"
          description="The first choice available."
        />
        <RadioGroupItem
          value="option-two"
          label="Option Two"
          description="The second choice available."
        />
        <RadioGroupItem
          value="option-three"
          label="Option Three"
          description="The third choice available."
        />
      </RadioGroup>
      <div className="text-sm font-medium text-gray-500">Selected: {value}</div>
    </div>
  );
}

export function RadioGroupVariants() {
  return (
    <div className="handwritten-ui flex flex-col gap-8">
      <div>
        <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">
          Horizontal
        </h4>
        <RadioGroup defaultValue="1" orientation="horizontal">
          <RadioGroupItem value="1" label="One" />
          <RadioGroupItem value="2" label="Two" />
          <RadioGroupItem value="3" label="Three" />
        </RadioGroup>
      </div>
      <div>
        <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-400 uppercase">
          Disabled Group
        </h4>
        <RadioGroup defaultValue="1" disabled>
          <RadioGroupItem value="1" label="One" />
          <RadioGroupItem value="2" label="Two" />
        </RadioGroup>
      </div>
    </div>
  );
}
