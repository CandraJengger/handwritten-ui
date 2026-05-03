import React from 'react';
import { Wrapper } from '@templates/wrapper';

export function WrapperDemo() {
  return (
    <div className="handwritten-ui flex items-center justify-center p-8">
      <Wrapper client:load className="max-w-md">
        <h3 className="mb-2 text-lg font-bold">Hand-Drawn Card</h3>
        <p className="text-[#666666]">
          This card is wrapped in a Wrapper component. It features a sketchy
          border and a subtle hover effect that feels organic and alive.
        </p>
      </Wrapper>
    </div>
  );
}

export function WrapperVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Different Fill Styles</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Wrapper client:load fill="#fef3c7" fillStyle="zigzag">
            <h5 className="font-bold">Zigzag Fill</h5>
            <p className="text-sm">Organic yellow background</p>
          </Wrapper>
          <Wrapper client:load fill="#dcfce7" fillStyle="cross-hatch">
            <h5 className="font-bold">Cross-Hatch Fill</h5>
            <p className="text-sm">Sketchy green background</p>
          </Wrapper>
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Roughness & Bowing</h4>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Wrapper client:load roughness={3} bowing={4}>
            <h5 className="font-bold">Extra Rough</h5>
            <p className="text-sm">High roughness and bowing</p>
          </Wrapper>
          <Wrapper client:load stroke="#3b82f6" strokeWidth={3}>
            <h5 className="font-bold">Thick Blue Stroke</h5>
            <p className="text-sm">Custom color and width</p>
          </Wrapper>
        </div>
      </section>
    </div>
  );
}
