import React from 'react';
import { Input } from '@templates/input';

export function InputDemo() {
  return (
    <div className="handwritten-ui w-full max-w-sm">
      <Input label="Email" placeholder="Email" type="email" />
    </div>
  );
}

export function InputVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-sm flex-col gap-6">
      <Input label="Outline" placeholder="Outline" variant="outline" />
      <Input label="Filled" placeholder="Filled" variant="filled" />
      <Input
        label="With Error"
        placeholder="Error"
        error="Invalid email address"
      />
    </div>
  );
}
