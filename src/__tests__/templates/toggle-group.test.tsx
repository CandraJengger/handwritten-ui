import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ToggleGroup, ToggleGroupItem } from '../../templates/toggle-group';

describe('ToggleGroup Components', () => {
  it('handles single selection (uncontrolled)', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" onValueChange={onValueChange} defaultValue="a">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );

    const itemA = screen.getByText('A').closest('button');
    const itemB = screen.getByText('B').closest('button');

    expect(itemA).toHaveAttribute('data-state', 'on');
    expect(itemB).toHaveAttribute('data-state', 'off');

    fireEvent.click(itemB!);
    expect(onValueChange).toHaveBeenCalledWith('b');
    expect(itemA).toHaveAttribute('data-state', 'off');
    expect(itemB).toHaveAttribute('data-state', 'on');
  });

  it('handles multiple selection (uncontrolled)', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup
        type="multiple"
        onValueChange={onValueChange}
        defaultValue={['a']}
      >
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    );

    const itemA = screen.getByText('A').closest('button');
    const itemB = screen.getByText('B').closest('button');

    expect(itemA).toHaveAttribute('data-state', 'on');
    expect(itemB).toHaveAttribute('data-state', 'off');

    fireEvent.click(itemB!);
    expect(onValueChange).toHaveBeenCalledWith(['a', 'b']);
    expect(itemA).toHaveAttribute('data-state', 'on');
    expect(itemB).toHaveAttribute('data-state', 'on');

    fireEvent.click(itemA!);
    expect(onValueChange).toHaveBeenCalledWith(['b']);
  });

  it('respects group disabled state', () => {
    const onValueChange = vi.fn();
    render(
      <ToggleGroup type="single" disabled onValueChange={onValueChange}>
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    );

    // ToggleGroup disabled prevents handleItemClick from firing
    // but does NOT set disabled attribute on the button
    fireEvent.click(screen.getByText('A').closest('button')!);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('throws error when item is not in group', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(<ToggleGroupItem value="a">A</ToggleGroupItem>),
    ).toThrow('ToggleGroupItem must be used within a ToggleGroup');
    spy.mockRestore();
  });

  it('handles custom className', () => {
    render(
      <ToggleGroup
        className="custom-toggle-group"
        data-testid="group"
        type="single"
      />,
    );
    expect(screen.getByTestId('group')).toHaveClass('custom-toggle-group');
  });
});
