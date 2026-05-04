import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Toggle } from '../../templates/toggle';

describe('Toggle Component', () => {
  it('renders correctly', () => {
    render(<Toggle>Toggle Me</Toggle>);
    expect(screen.getByText('Toggle Me')).toBeInTheDocument();
  });

  it('handles toggle interaction (uncontrolled)', () => {
    const onPressedChange = vi.fn();
    render(<Toggle onPressedChange={onPressedChange}>Toggle</Toggle>);
    const button = screen.getByRole('button');

    expect(button).toHaveAttribute('data-state', 'off');

    fireEvent.click(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    expect(button).toHaveAttribute('data-state', 'on');
    // Active state sets text to white
    expect(screen.getByText('Toggle')).toHaveClass('text-white');
  });

  it('handles toggle interaction (controlled)', () => {
    const onPressedChange = vi.fn();
    const { rerender } = render(
      <Toggle pressed={false} onPressedChange={onPressedChange}>
        Toggle
      </Toggle>,
    );
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(onPressedChange).toHaveBeenCalledWith(true);
    // Should still be off because it's controlled and we haven't updated the prop
    expect(button).toHaveAttribute('data-state', 'off');

    rerender(
      <Toggle pressed={true} onPressedChange={onPressedChange}>
        Toggle
      </Toggle>,
    );
    expect(button).toHaveAttribute('data-state', 'on');
  });

  it('respects defaultPressed prop', () => {
    render(<Toggle defaultPressed={true}>Active</Toggle>);
    expect(screen.getByRole('button')).toHaveAttribute('data-state', 'on');
  });

  it('does not toggle when disabled', () => {
    const onPressedChange = vi.fn();
    render(
      <Toggle disabled onPressedChange={onPressedChange}>
        Disabled
      </Toggle>,
    );
    const button = screen.getByRole('button');

    fireEvent.click(button);
    expect(onPressedChange).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('handles custom className', () => {
    const { container } = render(
      <Toggle className="custom-toggle">Toggle</Toggle>,
    );
    expect(container.firstChild).toHaveClass('custom-toggle');
  });
});
