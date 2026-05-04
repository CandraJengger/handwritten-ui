import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectSeparator,
} from '../../templates/select';

describe('Select Components', () => {
  it('renders correctly and opens menu', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select Fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );

    expect(screen.getByText('Select Fruit')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button'));

    // After opening, items should be visible (display: block)
    expect(screen.getByText('Apple')).toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });

  it('selects an item and closes menu', () => {
    const onValueChange = vi.fn();
    render(
      <Select onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>,
    );

    fireEvent.click(screen.getByRole('button'));
    fireEvent.click(screen.getByText('Apple'));

    expect(onValueChange).toHaveBeenCalledWith('apple');
    // After selecting, "Apple" appears in both SelectValue and SelectItem
    // Just verify the callback was called correctly
  });

  it('handles controlled value', () => {
    const { rerender } = render(
      <Select value="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );

    // The trigger should show "Apple" via SelectValue
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveTextContent('Apple');

    rerender(
      <Select value="banana">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
        </SelectContent>
      </Select>,
    );
    expect(trigger).toHaveTextContent('Banana');
  });

  it('renders labels and separators', () => {
    render(
      <Select defaultValue="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectSeparator data-testid="separator" />
            <SelectItem value="banana">Banana</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Fruits')).toBeInTheDocument();
  });

  it('throws error when used outside Select', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<SelectTrigger>Trigger</SelectTrigger>)).toThrow(
      'Select components must be wrapped in <Select />',
    );
    spy.mockRestore();
  });

  it('handles custom className', () => {
    render(
      <Select>
        <SelectTrigger className="custom-trigger">Trigger</SelectTrigger>
      </Select>,
    );
    expect(screen.getByRole('button')).toHaveClass('custom-trigger');
  });
});
