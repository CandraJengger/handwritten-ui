import React, { useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '@templates/input-otp';

export function InputOTPDemo() {
  const [value, setValue] = useState('');

  return (
    <div className="sketchy-ui flex flex-col items-center gap-6">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        onComplete={(val) => alert(`Completed: ${val}`)}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
      <div className="text-sm font-medium text-gray-500">Value: {value}</div>
    </div>
  );
}

export function InputOTPVariants() {
  return (
    <div className="sketchy-ui flex flex-col items-center gap-10">
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Small Rounded
        </h4>
        <InputOTP maxLength={4} size="sm" rounded="md">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      <div>
        <h4 className="mb-4 text-center text-xs font-bold tracking-wider text-gray-400 uppercase">
          Large
        </h4>
        <InputOTP maxLength={4} size="lg">
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
