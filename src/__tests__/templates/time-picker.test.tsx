import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TimePicker } from '../../templates/time-picker';

vi.mock('react-datepicker', () => {
  return {
    default: ({ onChange, selected, customInput, inline }: any) => {
      if (inline) return <div data-testid="inline-timepicker" />;
      if (customInput) {
        return React.cloneElement(customInput, {
          value: selected ? '12:00 PM' : '',
          onClick: () => onChange(new Date()),
        });
      }
      return <input data-testid="default-input" />;
    },
  };
});

describe('TimePicker Component', () => {
  it('renders correctly with default placeholder', () => {
    render(<TimePicker />);
    expect(screen.getByText('Pick a time')).toBeInTheDocument();
  });

  it('renders selected time (mocked)', () => {
    const date = new Date();
    render(<TimePicker selected={date} />);
    expect(screen.getByText('12:00 PM')).toBeInTheDocument();
  });

  it('calls onChange when clicked (mocked interaction)', () => {
    const onChange = vi.fn();
    render(<TimePicker onChange={onChange} />);
    fireEvent.click(screen.getByText('Pick a time'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders inline version', () => {
    render(<TimePicker inline />);
    expect(screen.getByTestId('inline-timepicker')).toBeInTheDocument();
  });

  it('respects disabled prop', () => {
    const onChange = vi.fn();
    render(<TimePicker disabled onChange={onChange} />);
    const trigger = screen.getByText('Pick a time').closest('div');
    expect(trigger).toHaveClass('opacity-50');
  });

  it('handles custom className', () => {
    const { container } = render(<TimePicker className="custom-time-picker" />);
    expect(container.querySelector('.custom-time-picker')).toBeInTheDocument();
  });
});
