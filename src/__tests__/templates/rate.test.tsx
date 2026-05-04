import { render, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Rate } from '../../templates/rate';

describe('Rate Component', () => {
  it('renders correctly with default star count (5)', () => {
    const { container } = render(<Rate />);
    const stars = container.querySelectorAll('canvas');
    expect(stars).toHaveLength(5);
  });

  it('renders custom count of stars', () => {
    const { container } = render(<Rate count={10} />);
    const stars = container.querySelectorAll('canvas');
    expect(stars).toHaveLength(10);
  });

  it('handles click to set rating', () => {
    const onChange = vi.fn();
    const { container } = render(<Rate onChange={onChange} />);
    const stars = container.querySelectorAll('canvas');

    // Click the 3rd star (index 2)
    fireEvent.click(stars[2]);
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('does not change rating when disabled', () => {
    const onChange = vi.fn();
    const { container } = render(<Rate disabled onChange={onChange} />);
    const stars = container.querySelectorAll('canvas');

    fireEvent.click(stars[2]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('does not change rating when readonly', () => {
    const onChange = vi.fn();
    const { container } = render(<Rate readonly onChange={onChange} />);
    const stars = container.querySelectorAll('canvas');

    fireEvent.click(stars[2]);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('applies custom size', () => {
    const { container } = render(<Rate size="lg" />);
    const stars = container.querySelectorAll('canvas');
    // lg size is 44
    expect(stars[0]).toHaveAttribute('width', '44');
    expect(stars[0]).toHaveAttribute('height', '44');
  });

  it('handles custom className', () => {
    const { container } = render(<Rate className="custom-rate" />);
    expect(container.firstChild).toHaveClass('custom-rate');
  });
});
