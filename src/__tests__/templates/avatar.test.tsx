import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Avatar } from '../../templates/avatar';

describe('Avatar Component', () => {
  it('renders correctly with an image src', () => {
    render(<Avatar src="https://example.com/avatar.png" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/avatar.png');
  });

  it('renders fallback when src is missing', () => {
    render(<Avatar fallback="JD" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('renders default fallback when both src and fallback are missing', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('applies custom size styles', () => {
    const { container } = render(<Avatar size="lg" />);
    // lg dimension is 64, container width is dimension + 4 = 68
    expect(container.firstChild).toHaveStyle({ width: '68px', height: '68px' });
  });

  it('renders as circle by default', () => {
    const { container } = render(<Avatar />);
    const innerDiv = container.querySelector('.overflow-hidden');
    expect(innerDiv).toHaveClass('rounded-full');
  });

  it('renders as square when shape is square', () => {
    const { container } = render(<Avatar shape="square" />);
    const innerDiv = container.querySelector('.overflow-hidden');
    expect(innerDiv).toHaveClass('rounded-none');
  });

  it('renders canvas for sketchy border', () => {
    const { container } = render(<Avatar />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(<Avatar className="custom-avatar" />);
    expect(container.firstChild).toHaveClass('custom-avatar');
  });
});
