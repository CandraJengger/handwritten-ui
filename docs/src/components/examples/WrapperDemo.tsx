import React from 'react';
import { Wrapper } from '@templates/wrapper';

export function WrapperDemo() {
  return (
    <div className="handwritten-ui flex items-center justify-center p-8">
      <Wrapper className="max-w-md">
        <h3 className="mb-2 text-lg font-bold">Hand-drawn Card</h3>
        <p className="text-sm text-[#555555]">
          The Wrapper component provides a container with sketchy borders and
          backgrounds. It supports various fill styles and roughness levels.
        </p>
      </Wrapper>
    </div>
  );
}

export function WrapperVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Fill Styles</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Wrapper fill="#fef3c7" fillStyle="zigzag">
            <h5 className="font-bold">Zigzag Fill</h5>
            <p className="text-xs">A playful yellow zigzag pattern.</p>
          </Wrapper>
          <Wrapper fill="#dcfce7" fillStyle="cross-hatch">
            <h5 className="font-bold">Cross-hatch</h5>
            <p className="text-xs">A structured green cross-hatch.</p>
          </Wrapper>
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Custom Roughness & Stroke</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Wrapper roughness={3} bowing={4}>
            <h5 className="font-bold">Extra Messy</h5>
            <p className="text-xs">High roughness and bowing.</p>
          </Wrapper>
          <Wrapper stroke="#3b82f6" strokeWidth={3}>
            <h5 className="font-bold">Thick Blue</h5>
            <p className="text-xs">Custom stroke color and width.</p>
          </Wrapper>
        </div>
      </section>
    </div>
  );
}
