import React from 'react';
import { Dropdown } from '@templates/dropdown';

export function DropdownDemo() {
  const items = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Billing', onClick: () => console.log('Billing clicked') },
    { label: 'Settings', onClick: () => console.log('Settings clicked') },
    { label: 'Logout', onClick: () => console.log('Logout clicked') },
  ];

  return (
    <div className="sketchy-ui flex items-center justify-center p-8">
      <Dropdown label="Options" items={items} />
    </div>
  );
}

export function DropdownVariants() {
  const items = [
    { label: 'Action 1' },
    { label: 'Action 2' },
    { label: 'Action 3' },
  ];

  return (
    <div className="sketchy-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Sizes</h4>
        <div className="flex items-end gap-4">
          <Dropdown label="Small" items={items} size="sm" />
          <Dropdown label="Medium" items={items} size="md" />
          <Dropdown label="Large" items={items} size="lg" />
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Rounded Corners</h4>
        <div className="flex gap-4">
          <Dropdown label="Rounded SM" items={items} rounded="sm" />
          <Dropdown label="Rounded LG" items={items} rounded="lg" />
        </div>
      </section>
    </div>
  );
}
