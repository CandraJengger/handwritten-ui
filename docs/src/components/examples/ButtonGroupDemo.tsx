import React from 'react';
import { ButtonGroup, ButtonGroupItem } from '@templates/button-group';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline,
} from 'lucide-react';

export function ButtonGroupDemo() {
  const [value, setValue] = React.useState(['center']);

  return (
    <div className="handwritten-ui flex flex-col items-center justify-center gap-4 p-8">
      <ButtonGroup value={value} onValueChange={setValue}>
        <ButtonGroupItem value="left" aria-label="Left align">
          <AlignLeft className="h-4 w-4" />
        </ButtonGroupItem>
        <ButtonGroupItem value="center" aria-label="Center align">
          <AlignCenter className="h-4 w-4" />
        </ButtonGroupItem>
        <ButtonGroupItem value="right" aria-label="Right align">
          <AlignRight className="h-4 w-4" />
        </ButtonGroupItem>
        <ButtonGroupItem value="justify" aria-label="Justify align">
          <AlignJustify className="h-4 w-4" />
        </ButtonGroupItem>
      </ButtonGroup>
      <div className="text-sm font-medium text-gray-500">
        Value: {value.join(', ')}
      </div>
    </div>
  );
}

export function ButtonGroupVariants() {
  const [value, setValue] = React.useState(['bold', 'italic']);

  return (
    <div className="handwritten-ui flex flex-col gap-10">
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Multiple Selection
        </h4>
        <ButtonGroup
          type="multiple"
          value={value}
          onValueChange={setValue}
          className="justify-center"
        >
          <ButtonGroupItem value="bold" aria-label="Toggle bold">
            <Bold className="h-4 w-4" />
          </ButtonGroupItem>
          <ButtonGroupItem value="italic" aria-label="Toggle italic">
            <Italic className="h-4 w-4" />
          </ButtonGroupItem>
          <ButtonGroupItem value="underline" aria-label="Toggle underline">
            <Underline className="h-4 w-4" />
          </ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Vertical Orientation
        </h4>
        <ButtonGroup orientation="vertical" className="items-center">
          <ButtonGroupItem value="top">Top</ButtonGroupItem>
          <ButtonGroupItem value="middle">Middle</ButtonGroupItem>
          <ButtonGroupItem value="bottom">Bottom</ButtonGroupItem>
        </ButtonGroup>
      </div>

      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Sizes
        </h4>
        <div className="flex flex-col items-center gap-6">
          <ButtonGroup size="sm">
            <ButtonGroupItem value="1">SM</ButtonGroupItem>
            <ButtonGroupItem value="2">SM</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="md">
            <ButtonGroupItem value="1">MD</ButtonGroupItem>
            <ButtonGroupItem value="2">MD</ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <ButtonGroupItem value="1">LG</ButtonGroupItem>
            <ButtonGroupItem value="2">LG</ButtonGroupItem>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
