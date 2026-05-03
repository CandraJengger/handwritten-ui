import React, { useState } from 'react';
import { MonthPicker } from '@templates/month-picker';

export function MonthPickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="sketchy-ui flex items-center justify-center p-8">
      <MonthPicker selected={date} onChange={(d) => setDate(d)} />
    </div>
  );
}

export function MonthPickerVariants() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="sketchy-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Inline Month Picker</h4>
        <div className="flex justify-center">
          <MonthPicker selected={date} onChange={(d) => setDate(d)} inline />
        </div>
      </section>
    </div>
  );
}
