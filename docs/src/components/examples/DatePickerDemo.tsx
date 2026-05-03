import React, { useState } from 'react';
import { DatePicker } from '@templates/datepicker';

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="sketchy-ui flex items-center justify-center p-8">
      <DatePicker selected={date} onChange={(d) => setDate(d)} />
    </div>
  );
}

export function DatePickerVariants() {
  const [date1, setDate1] = useState<Date | null>(new Date());
  const [date2, setDate2] = useState<Date | null>(new Date());

  return (
    <div className="sketchy-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Inline Mode</h4>
        <div className="flex justify-center">
          <DatePicker selected={date1} onChange={(d) => setDate1(d)} inline />
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Disabled State</h4>
        <DatePicker selected={date2} onChange={(d) => setDate2(d)} disabled />
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Normal Border (Non-Rough)</h4>
        <DatePicker
          selected={date2}
          onChange={(d) => setDate2(d)}
          border="normal"
        />
      </section>
    </div>
  );
}
