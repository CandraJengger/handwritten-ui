import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@templates/accordion';

export function AccordionDemo() {
  return (
    <div className="handwritten-ui flex w-full items-center justify-center p-8">
      <Accordion type="single" className="w-full max-w-md">
        <AccordionItem client:load value="item-1">
          <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
          <AccordionContent value="item-1">
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem client:load value="item-2">
          <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
          <AccordionContent value="item-2">
            Yes. It has a hand-drawn sketchy aesthetic using RoughJS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem client:load value="item-3">
          <AccordionTrigger value="item-3">Is it animated?</AccordionTrigger>
          <AccordionContent value="item-3">
            Yes. It uses CSS transitions for smooth opening and closing.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AccordionVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Multiple Selection</h4>
        <Accordion type="multiple" className="w-full">
          <AccordionItem client:load value="item-1">
            <AccordionTrigger value="item-1">Multi-item 1</AccordionTrigger>
            <AccordionContent value="item-1">
              You can open multiple items at once in this mode.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem client:load value="item-2">
            <AccordionTrigger value="item-2">Multi-item 2</AccordionTrigger>
            <AccordionContent value="item-2">
              Both me and the one above can be open simultaneously.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
