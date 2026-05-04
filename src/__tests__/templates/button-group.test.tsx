import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ButtonGroup, ButtonGroupItem } from '../../templates/button-group';

describe('ButtonGroup Components', () => {
  it('handles single selection (default)', () => {
    const onValueChange = vi.fn();
    render(
      <ButtonGroup defaultValue={['apple']} onValueChange={onValueChange}>
        <ButtonGroupItem value="apple">Apple</ButtonGroupItem>
        <ButtonGroupItem value="orange">Orange</ButtonGroupItem>
      </ButtonGroup>,
    );

    const appleBtn = screen.getByText('Apple').closest('button');
    const orangeBtn = screen.getByText('Orange').closest('button');

    expect(appleBtn).toBeInTheDocument();

    fireEvent.click(orangeBtn!);
    expect(onValueChange).toHaveBeenCalledWith(['orange']);
  });

  it('handles multiple selection', () => {
    const onValueChange = vi.fn();
    render(
      <ButtonGroup
        type="multiple"
        defaultValue={['apple']}
        onValueChange={onValueChange}
      >
        <ButtonGroupItem value="apple">Apple</ButtonGroupItem>
        <ButtonGroupItem value="orange">Orange</ButtonGroupItem>
      </ButtonGroup>,
    );

    fireEvent.click(screen.getByText('Orange'));
    expect(onValueChange).toHaveBeenCalledWith(['apple', 'orange']);

    fireEvent.click(screen.getByText('Apple'));
    expect(onValueChange).toHaveBeenLastCalledWith(['orange']);
  });

  it('respects disabled state on items', () => {
    const onValueChange = vi.fn();
    render(
      <ButtonGroup onValueChange={onValueChange}>
        <ButtonGroupItem value="apple" disabled>
          Apple
        </ButtonGroupItem>
      </ButtonGroup>,
    );

    const appleBtn = screen.getByText('Apple').closest('button');
    expect(appleBtn).toBeDisabled();

    fireEvent.click(appleBtn!);
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it('renders correctly with vertical orientation', () => {
    render(
      <ButtonGroup orientation="vertical" data-testid="group">
        <ButtonGroupItem value="1">1</ButtonGroupItem>
      </ButtonGroup>,
    );
    expect(screen.getByTestId('group')).toHaveClass('flex-col');
  });

  it('throws error when item is not in group', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(<ButtonGroupItem value="a">A</ButtonGroupItem>),
    ).toThrow('ButtonGroupItem must be used inside <ButtonGroup />');
    spy.mockRestore();
  });

  it('handles custom className', () => {
    render(<ButtonGroup className="custom-button-group" data-testid="group" />);
    expect(screen.getByTestId('group')).toHaveClass('custom-button-group');
  });
});
