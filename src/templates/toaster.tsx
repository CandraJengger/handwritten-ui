// @ts-expect-error - sonner is a peer dependency and might not be installed in the template source
import { Toaster as Sonner } from 'sonner';
import React from 'react';

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-white group-[.toaster]:text-[#333333] group-[.toaster]:border-2 group-[.toaster]:border-[#333333] group-[.toaster]:shadow-[4px_4px_0_0_#333] group-[.toaster]:rounded-none font-virgil text-base tracking-wide',
          description: 'group-[.toast]:text-gray-500 text-sm',
          actionButton:
            'group-[.toast]:bg-[#333333] group-[.toast]:text-white font-bold rounded-none',
          cancelButton:
            'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 rounded-none',
          error:
            'group-[.toaster]:bg-red-50 group-[.toaster]:border-red-500 group-[.toaster]:text-red-600 group-[.toaster]:shadow-[4px_4px_0_0_#ef4444]',
          success:
            'group-[.toaster]:bg-green-50 group-[.toaster]:border-green-500 group-[.toaster]:text-green-600 group-[.toaster]:shadow-[4px_4px_0_0_#22c55e]',
        },
      }}
      {...props}
    />
  );
};

// @ts-expect-error - sonner is a peer dependency and might not be installed in the template source
export { toast } from 'sonner';
