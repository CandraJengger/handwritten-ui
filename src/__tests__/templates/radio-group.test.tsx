import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RadioGroup, RadioGroupItem } from '../../templates/radio-group';

describe('RadioGroup Components', () => {
  it('renders correctly with default value', () => {
    render(
      <RadioGroup defaultValue="apple">
        <RadioGroupItem value="apple" label="Apple" />
        <RadioGroupItem value="orange" label="Orange" />
      </RadioGroup>,
    );

    const appleInput = screen.getByLabelText('Apple') as HTMLInputElement;
    const orangeInput = screen.getByLabelText('Orange') as HTMLInputElement;

    expect(appleInput.checked).toBe(true);
    expect(orangeInput.checked).toBe(false);
  });

  it('handles value change on click', () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup onValueChange={onValueChange}>
        <RadioGroupItem value="apple" label="Apple" />
        <RadioGroupItem value="orange" label="Orange" />
      </RadioGroup>,
    );

    fireEvent.click(screen.getByText('Orange'));
    expect(onValueChange).toHaveBeenCalledWith('orange');
  });

  it('respects group disabled state', () => {
    render(
      <RadioGroup disabled>
        <RadioGroupItem value="apple" label="Apple" />
      </RadioGroup>,
    );

    const input = screen.getByLabelText('Apple') as HTMLInputElement;
    expect(input).toBeDisabled();
    expect(screen.getByText('Apple').closest('.inline-flex')).toHaveClass(
      'cursor-not-allowed',
    );
  });

  it('respects individual item disabled state', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="apple" label="Apple" disabled />
        <RadioGroupItem value="orange" label="Orange" />
      </RadioGroup>,
    );

    expect(screen.getByLabelText('Apple')).toBeDisabled();
    expect(screen.getByLabelText('Orange')).not.toBeDisabled();
  });

  it('renders with horizontal orientation', () => {
    render(
      <RadioGroup orientation="horizontal" data-testid="group">
        <RadioGroupItem value="1" />
      </RadioGroup>,
    );
    expect(screen.getByTestId('group')).toHaveClass('flex-row');
  });

  it('renders description for items', () => {
    render(
      <RadioGroup>
        <RadioGroupItem value="1" label="One" description="First item" />
      </RadioGroup>,
    );
    expect(screen.getByText('First item')).toBeInTheDocument();
  });

  it('throws error when item is not in group', () => {
    // Suppress console.error for this test
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<RadioGroupItem value="1" />)).toThrow(
      'RadioGroupItem must be wrapped in <RadioGroup />',
    );
    spy.mockRestore();
  });

  it('handles custom className', () => {
    render(<RadioGroup className="custom-group" data-testid="group" />);
    expect(screen.getByTestId('group')).toHaveClass('custom-group');
  });
});
