import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DateRangePicker } from '../../templates/date-range-picker';

vi.mock('react-datepicker', () => {
  return {
    default: ({ onChange, startDate, endDate, customInput, inline }: any) => {
      if (inline) return <div data-testid="inline-datepicker" />;
      if (customInput) {
        return React.cloneElement(customInput, {
          value: startDate && endDate ? '2023-01-01 - 2023-01-02' : '',
          onClick: () => onChange([new Date(2023, 0, 1), new Date(2023, 0, 2)]),
        });
      }
      return <input data-testid="default-input" />;
    },
  };
});

describe('DateRangePicker Component', () => {
  it('renders correctly with default placeholder', () => {
    const onChange = vi.fn();
    render(<DateRangePicker onChange={onChange} />);
    expect(screen.getByText('Pick a date range')).toBeInTheDocument();
  });

  it('renders selected range (mocked)', () => {
    const start = new Date(2023, 0, 1);
    const end = new Date(2023, 0, 2);
    const onChange = vi.fn();
    render(
      <DateRangePicker startDate={start} endDate={end} onChange={onChange} />,
    );
    expect(screen.getByText('2023-01-01 - 2023-01-02')).toBeInTheDocument();
  });

  it('calls onChange when range is selected (mocked interaction)', () => {
    const onChange = vi.fn();
    render(<DateRangePicker onChange={onChange} />);
    fireEvent.click(screen.getByText('Pick a date range'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders inline version', () => {
    const onChange = vi.fn();
    render(<DateRangePicker inline onChange={onChange} />);
    expect(screen.getByTestId('inline-datepicker')).toBeInTheDocument();
  });

  it('respects disabled prop', () => {
    const onChange = vi.fn();
    render(<DateRangePicker disabled onChange={onChange} />);
    const trigger = screen.getByText('Pick a date range').closest('div');
    expect(trigger).toHaveClass('opacity-50');
  });

  it('handles custom className', () => {
    const onChange = vi.fn();
    const { container } = render(
      <DateRangePicker onChange={onChange} className="custom-range-picker" />,
    );
    expect(container.querySelector('.custom-range-picker')).toBeInTheDocument();
  });
});
