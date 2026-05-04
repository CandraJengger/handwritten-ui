import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { FloatButton } from '../../templates/float-button';

describe('FloatButton Component', () => {
  it('renders correctly with icon', () => {
    render(<FloatButton icon={<span data-testid="icon">+</span>} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders with label (extended FAB)', () => {
    render(
      <FloatButton icon={<span data-testid="icon">+</span>} label="Add Item" />,
    );
    expect(screen.getByText('Add Item')).toBeInTheDocument();
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const onClick = vi.fn();
    render(<FloatButton icon={<span>+</span>} onClick={onClick} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(
      <FloatButton icon={<span data-testid="icon">+</span>} variant="filled" />,
    );
    // filled variant: textColorClass = 'text-white'
    const iconWrapper = screen.getByTestId('icon').parentElement;
    expect(iconWrapper).toHaveClass('text-white');

    rerender(
      <FloatButton
        icon={<span data-testid="icon">+</span>}
        variant="outline"
      />,
    );
    const iconWrapperOutline = screen.getByTestId('icon').parentElement;
    expect(iconWrapperOutline).toHaveClass('text-[#333333]');
  });

  it('applies size classes', () => {
    const { container } = render(
      <FloatButton icon={<span>+</span>} size="lg" />,
    );
    const innerDiv = container.querySelector('button > div');
    expect(innerDiv).toHaveClass('h-16', 'min-w-[64px]');
  });

  it('handles custom className', () => {
    render(<FloatButton icon={<span>+</span>} className="custom-fab" />);
    expect(screen.getByRole('button')).toHaveClass('custom-fab');
  });
});
