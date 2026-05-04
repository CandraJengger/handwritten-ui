import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Separator } from '../../templates/separator';

describe('Separator Component', () => {
  it('renders correctly with default orientation (horizontal)', () => {
    render(<Separator data-testid="sep" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveClass('w-full');
    expect(sep).toHaveStyle({ height: '12px' });
  });

  it('renders correctly with vertical orientation', () => {
    render(<Separator orientation="vertical" data-testid="sep" />);
    const sep = screen.getByTestId('sep');
    expect(sep).toHaveClass('h-full');
    expect(sep).toHaveStyle({ width: '12px' });
  });

  it('applies accessibility roles correctly', () => {
    const { rerender } = render(
      <Separator decorative={false} data-testid="sep" />,
    );
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'separator');
    expect(screen.getByTestId('sep')).toHaveAttribute(
      'aria-orientation',
      'horizontal',
    );

    rerender(<Separator decorative={true} data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveAttribute('role', 'none');
    expect(screen.getByTestId('sep')).not.toHaveAttribute('aria-orientation');
  });

  it('renders canvas element', () => {
    const { container } = render(<Separator />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    render(<Separator className="custom-sep" data-testid="sep" />);
    expect(screen.getByTestId('sep')).toHaveClass('custom-sep');
  });
});
