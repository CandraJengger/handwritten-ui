import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Loader } from '../../templates/loader';

describe('Loader Component', () => {
  it('renders correctly with default props', () => {
    render(<Loader />);
    const loader = screen.getByRole('status');
    expect(loader).toBeInTheDocument();
    expect(loader).toHaveAttribute('aria-label', 'Loading...');
  });

  it('renders with dots variant', () => {
    const { container } = render(<Loader variant="dots" />);
    const canvases = container.querySelectorAll('canvas');
    expect(canvases).toHaveLength(3);
  });

  it('renders with pulse variant', () => {
    const { container } = render(<Loader variant="pulse" />);
    const canvases = container.querySelectorAll('canvas');
    expect(canvases).toHaveLength(1);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders with ping variant', () => {
    const { container } = render(<Loader variant="ping" />);
    expect(container.querySelector('.animate-ping')).toBeInTheDocument();
  });

  it('shows label when showLabel is true', () => {
    render(<Loader showLabel label="Syncing..." />);
    expect(screen.getByText('Syncing...')).toBeInTheDocument();
  });

  it('uses sr-only label when showLabel is false', () => {
    render(<Loader showLabel={false} label="Syncing..." />);
    const label = screen.getByText('Syncing...');
    expect(label).toHaveClass('sr-only');
  });

  it('applies custom size', () => {
    const { container } = render(<Loader size="lg" variant="pulse" />);
    const canvas = container.querySelector('canvas');
    // lg size is 64, canvasSize is dimension + 8 = 72
    expect(canvas).toHaveStyle({ width: '72px', height: '72px' });
  });

  it('handles custom className', () => {
    const { container } = render(<Loader className="custom-loader" />);
    expect(container.firstChild).toHaveClass('custom-loader');
  });
});
