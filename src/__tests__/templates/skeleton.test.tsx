import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Skeleton } from '../../templates/skeleton';

describe('Skeleton Component', () => {
  it('renders correctly with default props', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('animate-pulse');
    expect(skeleton).toHaveStyle({ width: '100%', height: '20px' });
  });

  it('applies circle shape', () => {
    render(<Skeleton shape="circle" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('rounded-full');
  });

  it('sets custom dimensions', () => {
    render(<Skeleton width={100} height={50} data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveStyle({
      width: '100px',
      height: '50px',
    });
  });

  it('has correct accessibility attributes', () => {
    render(<Skeleton data-testid="skeleton" />);
    const skeleton = screen.getByTestId('skeleton');
    expect(skeleton).toHaveAttribute('aria-busy', 'true');
    expect(skeleton).toHaveAttribute('aria-live', 'polite');
  });

  it('handles custom className', () => {
    render(<Skeleton className="custom-skeleton" data-testid="skeleton" />);
    expect(screen.getByTestId('skeleton')).toHaveClass('custom-skeleton');
  });
});
