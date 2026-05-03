import React from 'react';
import { Alert } from '@templates/alert';
import { Terminal } from 'lucide-react';

export function AlertDemo() {
  return (
    <div className="handwritten-ui w-full max-w-xl">
      <Alert title="Heads up!">
        You can add components to your app using the npx handwritten-ui command.
      </Alert>
    </div>
  );
}

export function AlertVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-xl flex-col gap-6">
      <Alert variant="info" title="Info">
        A new version of handwritten-ui is available.
      </Alert>
      <Alert variant="success" title="Success">
        Your project has been successfully initialized.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please back up your files before proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        Something went wrong while processing your request.
      </Alert>
      <Alert variant="default" title="Custom Content">
        <div className="flex items-center gap-2">
          <Terminal className="h-4 w-4" />
          <span>Use terminal to debug issues.</span>
        </div>
      </Alert>
    </div>
  );
}
