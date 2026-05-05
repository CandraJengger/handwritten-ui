import React from 'react';
import { Separator } from '@templates/separator';

export function SeparatorDemo() {
  return (
    <div className="skeci-ui mx-auto flex w-full max-w-md flex-col items-center justify-center p-8">
      <div className="space-y-1">
        <h4 className="text-sm leading-none font-bold">Handwritten UI</h4>
        <p className="text-sm text-[#888888]">
          A hand-drawn component library for React.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}

export function SeparatorVariants() {
  return (
    <div className="skeci-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Custom Colors & Thickness</h4>
        <div className="flex flex-col gap-6">
          <Separator color="#ef4444" thickness={3} />
          <Separator color="#22c55e" thickness={2} />
          <Separator color="#3b82f6" thickness={1} />
        </div>
      </section>
    </div>
  );
}
