import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MonthPicker } from '../../templates/month-picker';

vi.mock('react-datepicker', () => {
  return {
    default: ({ onChange, selected, customInput, inline }: any) => {
      if (inline) return <div data-testid="inline-monthpicker" />;
      if (customInput) {
        return React.cloneElement(customInput, {
          value: selected ? '01/2023' : '',
          onClick: () => onChange(new Date(2023, 0, 1)),
        });
      }
      return <input data-testid="default-input" />;
    },
  };
});

describe('MonthPicker Component', () => {
  it('renders correctly with default placeholder', () => {
    render(<MonthPicker />);
    expect(screen.getByText('Pick a month')).toBeInTheDocument();
  });

  it('renders selected month (mocked)', () => {
    const date = new Date(2023, 0, 1);
    render(<MonthPicker selected={date} />);
    expect(screen.getByText('01/2023')).toBeInTheDocument();
  });

  it('calls onChange when clicked (mocked interaction)', () => {
    const onChange = vi.fn();
    render(<MonthPicker onChange={onChange} />);
    fireEvent.click(screen.getByText('Pick a month'));
    expect(onChange).toHaveBeenCalled();
  });

  it('renders inline version', () => {
    render(<MonthPicker inline />);
    expect(screen.getByTestId('inline-monthpicker')).toBeInTheDocument();
  });

  it('respects disabled prop', () => {
    render(<MonthPicker disabled />);
    const trigger = screen.getByText('Pick a month').closest('div');
    expect(trigger).toHaveClass('opacity-50');
  });

  it('handles custom className', () => {
    const { container } = render(
      <MonthPicker className="custom-month-picker" />,
    );
    expect(container.querySelector('.custom-month-picker')).toBeInTheDocument();
  });
});
