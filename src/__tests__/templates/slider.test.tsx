import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Slider } from '../../templates/slider';

describe('Slider Component', () => {
  it('renders correctly with default value', () => {
    render(<Slider defaultValue={[50]} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input.value).toBe('50');
  });

  it('handles value change via input', () => {
    const onValueChange = vi.fn();
    render(<Slider onValueChange={onValueChange} />);
    const input = screen.getByRole('slider') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '75' } });
    expect(onValueChange).toHaveBeenCalledWith([75]);
  });

  it('respects min and max props', () => {
    render(<Slider min={10} max={200} defaultValue={[50]} />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toHaveAttribute('min', '10');
    expect(input).toHaveAttribute('max', '200');
  });

  it('does not change value when disabled', () => {
    render(<Slider disabled />);
    const input = screen.getByRole('slider') as HTMLInputElement;
    expect(input).toBeDisabled();
    // The container should have opacity-50 and cursor-not-allowed
    const container = input.closest('div');
    expect(container).toHaveClass('opacity-50');
  });

  it('renders track and thumb canvases', () => {
    const { container } = render(<Slider />);
    const canvases = container.querySelectorAll('canvas');
    expect(canvases).toHaveLength(2); // One for track, one for thumb
  });

  it('handles custom className', () => {
    const { container } = render(<Slider className="custom-slider" />);
    expect(container.firstChild).toHaveClass('custom-slider');
  });
});
