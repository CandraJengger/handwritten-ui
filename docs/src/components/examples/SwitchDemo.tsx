import React, { useState } from 'react';
import { Switch } from '@templates/switch';

export function SwitchDemo() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="sketchy-ui flex flex-col gap-6">
      <Switch label="Airplane Mode" checked={enabled} onChange={setEnabled} />
      <div className="text-sm font-medium text-gray-500">
        Status: {enabled ? 'Enabled' : 'Disabled'}
      </div>
    </div>
  );
}

export function SwitchVariants() {
  return (
    <div className="sketchy-ui flex flex-col gap-6">
      <Switch label="Default Switch" />
      <Switch label="Checked by default" checked={true} />
      <Switch label="Disabled" disabled />
      <Switch label="Disabled & Checked" disabled checked={true} />
    </div>
  );
}
