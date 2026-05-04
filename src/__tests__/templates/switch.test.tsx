import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Switch } from '../../templates/switch';

describe('Switch Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders correctly with label', () => {
    render(<Switch label="Notifications" />);
    expect(screen.getByText('Notifications')).toBeInTheDocument();
  });

  it('handles toggle interaction', () => {
    const onChange = vi.fn();
    render(<Switch label="Toggle" onChange={onChange} />);
    // In Switch, the input is wrapped in a label, so getByLabelText works.
    const input = screen.getByLabelText('Toggle') as HTMLInputElement;

    fireEvent.click(input);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('renders as checked when checked prop is true', () => {
    render(<Switch checked label="Active" onChange={() => {}} />);
    const input = screen.getByLabelText('Active') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('does not toggle when disabled', () => {
    const onChange = vi.fn();
    render(<Switch disabled label="Disabled" onChange={onChange} />);
    const input = screen.getByLabelText('Disabled') as HTMLInputElement;

    fireEvent.click(input);
    expect(onChange).not.toHaveBeenCalled();
    expect(input).toBeDisabled();
  });

  it('handles custom className', () => {
    const { container } = render(<Switch className="custom-switch" />);
    expect(container.getElementsByTagName('input')[0]).toHaveClass(
      'custom-switch',
    );
  });
});
