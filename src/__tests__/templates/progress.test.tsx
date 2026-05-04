import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Progress } from '../../templates/progress';

describe('Progress Component', () => {
  it('renders correctly with label', () => {
    render(<Progress progress={50} label="Uploading..." />);
    expect(screen.getByText('Uploading...')).toBeInTheDocument();
  });

  it('renders canvas with correct height', () => {
    const { container } = render(<Progress progress={50} height={20} />);
    const canvas = container.querySelector('canvas');
    // height + 6 = 26
    expect(canvas).toHaveStyle({ height: '26px' });
  });

  it('renders with 0 progress', () => {
    const { container } = render(<Progress progress={0} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('renders with 100 progress', () => {
    const { container } = render(<Progress progress={100} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(
      <Progress progress={50} className="custom-progress" />,
    );
    expect(container.firstChild).toHaveClass('custom-progress');
  });
});
