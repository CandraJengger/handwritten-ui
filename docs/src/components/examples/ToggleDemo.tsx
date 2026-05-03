import React, { useState } from 'react';
import { Toggle } from '@templates/toggle';
import { Bold, Italic } from 'lucide-react';

export function ToggleDemo() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="handwritten-ui flex flex-col items-center gap-6">
      <Toggle
        aria-label="Toggle bold"
        pressed={pressed}
        onPressedChange={setPressed}
        variant="outline"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <div className="text-sm font-medium text-gray-500">
        Status: {pressed ? 'Pressed' : 'Not pressed'}
      </div>
    </div>
  );
}

export function ToggleVariants() {
  return (
    <div className="handwritten-ui flex flex-wrap items-center gap-4">
      <Toggle variant="default" aria-label="Toggle default">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle outline">
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle size="sm" variant="outline">
        SM
      </Toggle>
      <Toggle size="lg" variant="outline">
        LG
      </Toggle>
      <Toggle disabled variant="outline">
        Disabled
      </Toggle>
    </div>
  );
}
