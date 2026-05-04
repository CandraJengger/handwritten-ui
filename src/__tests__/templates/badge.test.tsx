import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Badge } from '../../templates/badge';

describe('Badge Component', () => {
  it('renders correctly with children', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders as a custom element when asChild is true', () => {
    render(
      <Badge asChild border="none">
        <a href="/">Link Badge</a>
      </Badge>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('applies variant styles correctly', () => {
    const { rerender } = render(<Badge variant="solid">Solid</Badge>);
    const text = screen.getByText('Solid');
    expect(text).toHaveClass('text-white');

    rerender(<Badge variant="outline">Outline</Badge>);
    const outlineText = screen.getByText('Outline');
    expect(outlineText).not.toHaveClass('text-white');
  });

  it('renders canvas when border is not none', () => {
    const { container } = render(<Badge border="rough">Rough</Badge>);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('does not render canvas when border is none', () => {
    const { container } = render(<Badge border="none">None</Badge>);
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
  });

  it('applies custom color', () => {
    render(<Badge color="rgb(255, 0, 0)">Red Badge</Badge>);
    const text = screen.getByText('Red Badge');
    // Using rgb because JSDOM/Testing Library often normalizes colors
    expect(text).toHaveStyle({ color: 'rgb(255, 0, 0)' });
  });

  it('handles custom className', () => {
    const { container } = render(<Badge className="custom-class">Badge</Badge>);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
