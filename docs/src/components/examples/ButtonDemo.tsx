import React from 'react';
import { Button } from '@templates/button';

export function ButtonDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Button asChild variant="outline" className="w-full">
        <div className="flex h-24 items-center justify-center border-2 border-dashed border-red-200 bg-red-50 p-4 font-bold text-red-600">
          Custom Div (asChild)
        </div>
      </Button>
      <div>
        <Button variant="filled">Filled</Button>
        <Button variant="outline">Outline</Button>
      </div>
    </div>
  );
}

export function ButtonVariants() {
  return (
    <div className="">
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
      <Button border="hachure">Hachure</Button>
      <Button border="normal">Normal</Button>
    </div>
  );
}

export function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
