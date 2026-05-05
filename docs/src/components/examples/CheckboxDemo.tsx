import React, { useState } from 'react';
import { Checkbox } from '@templates/checkbox';

export function CheckboxDemo() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="skeci-ui flex flex-col gap-6">
      <Checkbox
        id="terms"
        label="Accept terms and conditions"
        description="You agree to our Terms of Service and Privacy Policy."
        checked={checked}
        onCheckedChange={setChecked}
      />
      <div className="text-sm font-medium text-gray-500">
        Status: {checked ? 'Accepted' : 'Not accepted'}
      </div>
    </div>
  );
}

export function CheckboxVariants() {
  return (
    <div className="skeci-ui flex flex-col gap-6">
      <Checkbox label="Default Checkbox" />
      <Checkbox label="Checked by default" defaultChecked />
      <Checkbox label="Disabled" disabled />
      <Checkbox label="Disabled & Checked" disabled defaultChecked />
      <Checkbox
        label="With Description"
        description="This is a more detailed explanation of the setting."
      />
    </div>
  );
}
