import React from 'react';
import { ButtonGroup, ButtonGroupItem } from '@templates/button-group';
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';

export function ButtonGroupDemo() {
  return (
    <div className="handwritten-ui flex items-center justify-center p-8">
      <ButtonGroup defaultValue={['center']}>
        <ButtonGroupItem client:load value="left">
          <AlignLeft className="h-4 w-4" />
        </ButtonGroupItem>
        <ButtonGroupItem client:load value="center">
          <AlignCenter className="h-4 w-4" />
        </ButtonGroupItem>
        <ButtonGroupItem client:load value="right">
          <AlignRight className="h-4 w-4" />
        </ButtonGroupItem>
        <ButtonGroupItem client:load value="justify">
          <AlignJustify className="h-4 w-4" />
        </ButtonGroupItem>
      </ButtonGroup>
    </div>
  );
}

export function ButtonGroupVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Multiple Selection (Filled)</h4>
        <ButtonGroup
          type="multiple"
          variant="filled"
          defaultValue={['bold', 'italic']}
        >
          <ButtonGroupItem client:load value="bold">
            B
          </ButtonGroupItem>
          <ButtonGroupItem client:load value="italic">
            I
          </ButtonGroupItem>
          <ButtonGroupItem client:load value="underline">
            U
          </ButtonGroupItem>
        </ButtonGroup>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Vertical Orientation</h4>
        <ButtonGroup orientation="vertical">
          <ButtonGroupItem client:load value="top">
            Top
          </ButtonGroupItem>
          <ButtonGroupItem client:load value="middle">
            Middle
          </ButtonGroupItem>
          <ButtonGroupItem client:load value="bottom">
            Bottom
          </ButtonGroupItem>
        </ButtonGroup>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Sizes</h4>
        <div className="flex flex-col gap-4">
          <ButtonGroup size="sm">
            <ButtonGroupItem client:load value="1">
              Small
            </ButtonGroupItem>
            <ButtonGroupItem client:load value="2">
              Small
            </ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="md">
            <ButtonGroupItem client:load value="1">
              Medium
            </ButtonGroupItem>
            <ButtonGroupItem client:load value="2">
              Medium
            </ButtonGroupItem>
          </ButtonGroup>
          <ButtonGroup size="lg">
            <ButtonGroupItem client:load value="1">
              Large
            </ButtonGroupItem>
            <ButtonGroupItem client:load value="2">
              Large
            </ButtonGroupItem>
          </ButtonGroup>
        </div>
      </section>
    </div>
  );
}
