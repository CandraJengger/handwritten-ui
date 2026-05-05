import React from 'react';
import { Textarea } from '@templates/textarea';

export function TextareaDemo() {
  return (
    <div className="skeci-ui w-full max-w-sm">
      <Textarea
        label="Message"
        placeholder="Type your message here..."
        className="min-h-[120px]"
      />
    </div>
  );
}

export function TextareaVariants() {
  return (
    <div className="skeci-ui flex w-full max-w-sm flex-col gap-6">
      <Textarea label="Default Textarea" placeholder="Default state" />
      <Textarea label="Filled" variant="filled" placeholder="Filled variant" />
      <Textarea
        label="With Error"
        error="This field is required"
        placeholder="Error state"
      />
      <Textarea label="Disabled" disabled placeholder="Disabled state" />
    </div>
  );
}
