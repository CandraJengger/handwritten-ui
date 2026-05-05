import React from 'react';
import { Popover, PopoverTrigger, PopoverContent } from '@templates/popover';
import { Button } from '@templates/button';
import { Label } from '@templates/label';
import { Input } from '@templates/input';

export function PopoverDemo() {
  return (
    <div className="skeci-ui flex items-center justify-center p-8">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent sideOffset={8} className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="leading-none font-bold">Dimensions</h4>
              <p className="text-sm text-[#666666]">
                Set the dimensions for the layer.
              </p>
            </div>
            <div className="grid gap-2">
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="width">Width</Label>
                <Input
                  id="width"
                  defaultValue="100%"
                  className="col-span-2 h-8"
                />
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <Label htmlFor="maxWidth">Max. width</Label>
                <Input
                  id="maxWidth"
                  defaultValue="300px"
                  className="col-span-2 h-8"
                />
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function PopoverVariants() {
  return (
    <div className="skeci-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Alignment</h4>
        <div className="flex justify-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm">Start</Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <p className="p-2">Aligned to the start.</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm">Center</Button>
            </PopoverTrigger>
            <PopoverContent align="center">
              <p className="p-2">Aligned to the center.</p>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button size="sm">End</Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <p className="p-2">Aligned to the end.</p>
            </PopoverContent>
          </Popover>
        </div>
      </section>
    </div>
  );
}
