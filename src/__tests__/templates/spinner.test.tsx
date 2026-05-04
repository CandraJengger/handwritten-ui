import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Spinner } from '../../templates/spinner';

describe('Spinner Component', () => {
  it('renders correctly with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading...');
  });

  it('renders with custom label', () => {
    render(<Spinner label="Processing..." />);
    expect(screen.getByText('Processing...')).toHaveClass('sr-only');
  });

  it('applies custom size', () => {
    const { container } = render(<Spinner size="lg" />);
    const canvas = container.querySelector('canvas');
    // lg dimension is 48, canvasSize is 48 + 4 = 52
    expect(canvas).toHaveStyle({ width: '52px', height: '52px' });
  });

  it('has animate-spin class', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />);
    expect(container.firstChild).toHaveClass('custom-spinner');
  });
});
