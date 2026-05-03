import React, { useState } from 'react';
import { DateRangePicker } from '@templates/date-range-picker';

export function DateRangePickerDemo() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  const onChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="handwritten-ui flex items-center justify-center p-8">
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onChange={onChange}
      />
    </div>
  );
}

export function DateRangePickerVariants() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="handwritten-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <h4 className="mb-4 text-sm font-bold">Inline Mode</h4>
        <div className="flex justify-center">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={([s, e]) => {
              setStartDate(s);
              setEndDate(e);
            }}
            inline
          />
        </div>
      </section>
    </div>
  );
}
