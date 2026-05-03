import React from 'react';
import { FloatButton } from '@templates/float-button';
import { Plus, MessageSquare, Pencil } from 'lucide-react';

export function FloatButtonDemo() {
  return (
    <div className="sketchy-ui flex items-center justify-center gap-6 p-8">
      <FloatButton icon={<Plus />} />
      <FloatButton icon={<Plus />} label="Create New" rounded="lg" />
    </div>
  );
}

export function FloatButtonVariants() {
  return (
    <div className="sketchy-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Variants</h4>
        <div className="flex items-center gap-6">
          <FloatButton icon={<MessageSquare />} variant="filled" />
          <FloatButton icon={<MessageSquare />} variant="outline" />
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Borders</h4>
        <div className="flex items-center gap-6">
          <FloatButton icon={<Pencil />} border="rough" />
          <FloatButton icon={<Pencil />} border="hachure" variant="outline" />
          <FloatButton icon={<Pencil />} border="normal" />
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Sizes</h4>
        <div className="flex items-end gap-6">
          <FloatButton icon={<Plus />} size="sm" />
          <FloatButton icon={<Plus />} size="md" />
          <FloatButton icon={<Plus />} size="lg" />
        </div>
      </section>
    </div>
  );
}
