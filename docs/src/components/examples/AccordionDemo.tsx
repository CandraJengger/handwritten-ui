import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@templates/accordion';

export function AccordionDemo() {
  return (
    <div className="sketchy-ui flex w-full items-center justify-center p-8">
      <Accordion type="single" className="w-full max-w-md">
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">Is it accessible?</AccordionTrigger>
          <AccordionContent value="item-1">
            Yes. It adheres to the WAI-ARIA design patterns.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger value="item-2">Is it styled?</AccordionTrigger>
          <AccordionContent value="item-2">
            Yes. It has a hand-drawn look using RoughJS.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger value="item-3">Is it animated?</AccordionTrigger>
          <AccordionContent value="item-3">
            Yes. It uses CSS transitions for smooth opening.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export function AccordionVariants() {
  return (
    <div className="sketchy-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Multiple Selection</h4>
        <Accordion type="multiple">
          <AccordionItem value="item-1">
            <AccordionTrigger value="item-1">
              Can I open multiple?
            </AccordionTrigger>
            <AccordionContent value="item-1">
              Yes, with the `type=&quot;multiple&quot;` prop.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger value="item-2">Is it useful?</AccordionTrigger>
            <AccordionContent value="item-2">
              Very much so for FAQs.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
