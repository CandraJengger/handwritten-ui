import React from 'react';
import { Badge } from '@templates/badge';

export function BadgeDemo() {
  return (
    <div className="sketchy-ui flex items-center gap-4">
      <Badge>Default</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="solid">Solid</Badge>
      <Badge variant="hachure">Hachure</Badge>
    </div>
  );
}

export function BadgeVariants() {
  return (
    <div className="sketchy-ui flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Colors
        </h4>
        <div className="flex items-center gap-4">
          <Badge color="#ef4444">Destructive</Badge>
          <Badge color="#22c55e">Success</Badge>
          <Badge color="#3b82f6">Primary</Badge>
          <Badge color="#f59e0b">Warning</Badge>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Normal Border
        </h4>
        <div className="flex items-center gap-4">
          <Badge border="none">Default</Badge>
          <Badge border="none" variant="solid" color="#ef4444">
            Destructive
          </Badge>
          <Badge border="none" variant="outline" color="#3b82f6">
            Outline
          </Badge>
        </div>
      </div>
    </div>
  );
}
