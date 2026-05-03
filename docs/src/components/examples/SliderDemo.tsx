import React, { useState } from 'react';
import { Slider } from '@templates/slider';

export function SliderDemo() {
  const [value, setValue] = useState([50]);

  return (
    <div className="handwritten-ui flex w-full max-w-sm flex-col gap-6">
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={1}
      />
      <div className="text-sm font-medium text-gray-500">
        Value: {value[0]}%
      </div>
    </div>
  );
}

export function SliderVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-sm flex-col gap-10">
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Default
        </h4>
        <Slider defaultValue={[25]} />
      </div>
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Steps (10)
        </h4>
        <Slider defaultValue={[40]} step={10} />
      </div>
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Disabled
        </h4>
        <Slider defaultValue={[75]} disabled />
      </div>
    </div>
  );
}
