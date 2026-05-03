import React, { useState } from 'react';
import { TimePicker } from '@templates/time-picker';

export function TimePickerDemo() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="handwritten-ui flex items-center justify-center p-8">
      <TimePicker selected={date} onChange={(d) => setDate(d)} />
    </div>
  );
}

export function TimePickerVariants() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Inline Time Picker</h4>
        <div className="flex justify-center">
          <TimePicker selected={date} onChange={(d) => setDate(d)} inline />
        </div>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">
          Custom Time Intervals (30 mins)
        </h4>
        <TimePicker
          selected={date}
          onChange={(d) => setDate(d)}
          timeIntervals={30}
        />
      </section>
    </div>
  );
}
