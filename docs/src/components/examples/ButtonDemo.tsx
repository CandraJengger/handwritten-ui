import React from 'react';
import { Button } from '@templates/button';

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="filled">Filled</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}

export function ButtonVariants() {
  return (
    <div className="flex flex-wrap items-center gap-4">
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
