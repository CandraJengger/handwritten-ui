import React from 'react';
import { Avatar } from '@templates/avatar';

export function AvatarDemo() {
  return (
    <div className="sketchy-ui flex items-center gap-6">
      <Avatar src="https://github.com/shadcn.png" alt="@shadcn" fallback="SC" />
      <Avatar fallback="JD" />
      <Avatar src="https://invalid-url.com/image.png" fallback="ER" />
    </div>
  );
}

export function AvatarVariants() {
  return (
    <div className="sketchy-ui flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Shapes
        </h4>
        <div className="flex items-center gap-4">
          <Avatar src="https://github.com/shadcn.png" shape="circle" />
          <Avatar src="https://github.com/shadcn.png" shape="square" />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">
          Sizes
        </h4>
        <div className="flex items-center gap-4">
          <Avatar src="https://github.com/shadcn.png" size="sm" />
          <Avatar src="https://github.com/shadcn.png" size="md" />
          <Avatar src="https://github.com/shadcn.png" size="lg" />
        </div>
      </div>
    </div>
  );
}
