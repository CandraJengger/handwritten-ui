import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { DatePicker } from '../../templates/datepicker';

vi.mock('react-datepicker', () => {
  return {
    default: ({ onChange, selected, customInput, inline }: any) => {
      if (inline) return <div data-testid="inline-datepicker" />;
      if (customInput) {
        return React.cloneElement(customInput, {
          value: selected ? '2023-01-01' : '',
          onClick: () => onChange(new Date(2023, 0, 1)),
        });
      }
      return <input data-testid="default-input" />;
    },
  };
});

describe('DatePicker Component', () => {
  it('renders correctly with default placeholder', () => {
    render(<DatePicker selected={null} />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders selected date (mocked)', () => {
    const date = new Date(2023, 0, 1);
    render(<DatePicker selected={date} />);
    expect(screen.getByText('2023-01-01')).toBeInTheDocument();
  });

  it('calls onChange when clicked (mocked interaction)', () => {
    const onChange = vi.fn();
    render(<DatePicker selected={null} onChange={onChange} />);
    fireEvent.click(screen.getByText('Pick a date'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders inline version', () => {
    render(<DatePicker inline />);
    expect(screen.getByTestId('inline-datepicker')).toBeInTheDocument();
  });

  it('respects disabled prop', () => {
    render(<DatePicker disabled />);
    const trigger = screen.getByText('Pick a date').closest('div');
    expect(trigger).toHaveClass('opacity-50');
  });

  it('handles custom className', () => {
    const { container } = render(<DatePicker className="custom-datepicker" />);
    expect(container.querySelector('.custom-datepicker')).toBeInTheDocument();
  });
});
