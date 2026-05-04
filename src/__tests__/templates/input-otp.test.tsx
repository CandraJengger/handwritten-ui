import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from '../../templates/input-otp';

describe('InputOTP Components', () => {
  it('renders correctly with slots', () => {
    render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    );

    expect(
      screen.getByRole('group', { name: 'One-time password input' }),
    ).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
    // Each slot has a hidden input with type="text"
    const inputs = document.querySelectorAll('input[type="text"]');
    expect(inputs).toHaveLength(4);
  });

  it('handles character input', () => {
    const onChange = vi.fn();
    render(
      <InputOTP maxLength={2} onChange={onChange}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTP>,
    );

    const inputs = document.querySelectorAll('input[type="text"]');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('calls onComplete when all slots are filled', () => {
    const onComplete = vi.fn();
    render(
      <InputOTP maxLength={2} onComplete={onComplete}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTP>,
    );

    const inputs = document.querySelectorAll('input[type="text"]');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });

    expect(onComplete).toHaveBeenCalledWith('12');
  });

  it('handles backspace correctly', () => {
    const onChange = vi.fn();
    render(
      <InputOTP maxLength={2} defaultValue="12" onChange={onChange}>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTP>,
    );

    const inputs = document.querySelectorAll('input[type="text"]');

    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    expect(onChange).toHaveBeenCalledWith('1 ');

    fireEvent.keyDown(inputs[1], { key: 'Backspace' });
    expect(onChange).toHaveBeenLastCalledWith('  ');
  });

  it('respects disabled prop', () => {
    const onChange = vi.fn();
    render(
      <InputOTP maxLength={1} disabled onChange={onChange}>
        <InputOTPSlot index={0} />
      </InputOTP>,
    );

    const input = document.querySelector(
      'input[type="text"]',
    ) as HTMLInputElement;
    expect(input).toBeDisabled();

    fireEvent.change(input, { target: { value: '1' } });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('throws error when used outside InputOTP', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<InputOTPSlot index={0} />)).toThrow(
      'InputOTP components must be wrapped in <InputOTP />',
    );
    spy.mockRestore();
  });
});
