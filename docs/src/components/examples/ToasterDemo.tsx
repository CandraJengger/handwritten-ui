import React from 'react';
import { Toaster, toast } from '@templates/toaster';
import { Button } from '@templates/button';

export function ToasterDemo() {
  return (
    <div className="skeci-ui flex flex-wrap items-center justify-center gap-4 p-8">
      <Toaster />
      <Button
        variant="outline"
        onClick={() =>
          toast('Event has been created', {
            description: 'Sunday, December 03, 2023 at 9:00 AM',
            action: {
              label: 'Undo',
              onClick: () => console.log('Undo'),
            },
          })
        }
      >
        Show Toast
      </Button>
    </div>
  );
}

export function ToasterVariants() {
  return (
    <div className="skeci-ui flex flex-wrap items-center justify-center gap-4">
      <Button
        variant="outline"
        onClick={() =>
          toast.success('Mission accomplished', {
            description: 'Your data has been saved successfully.',
          })
        }
      >
        Success
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.error('Deployment failed', {
            description: 'Check your logs for more information.',
          })
        }
      >
        Error
      </Button>
      <Button
        variant="outline"
        onClick={() =>
          toast.info('New update available', {
            description: 'Version 2.0 is now live.',
          })
        }
      >
        Info
      </Button>
    </div>
  );
}
