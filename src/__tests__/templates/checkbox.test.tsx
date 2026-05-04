import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Checkbox } from '../../templates/checkbox';

describe('Checkbox Component', () => {
  it('renders correctly with label', () => {
    render(<Checkbox label="Accept Terms" />);
    expect(screen.getByText('Accept Terms')).toBeInTheDocument();
  });

  it('handles toggle interaction via container click', () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Toggle Me" onCheckedChange={onCheckedChange} />);
    const container = screen.getByText('Toggle Me').closest('.inline-flex');

    if (container) fireEvent.click(container);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('renders as checked when checked prop is true', () => {
    render(<Checkbox checked label="Checked" onChange={() => {}} />);
    const input = screen.getByLabelText('Checked') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox defaultChecked label="Default Checked" />);
    const input = screen.getByLabelText('Default Checked') as HTMLInputElement;
    expect(input.checked).toBe(true);
  });

  it('does not toggle when disabled', () => {
    const onCheckedChange = vi.fn();
    render(
      <Checkbox disabled label="Disabled" onCheckedChange={onCheckedChange} />,
    );
    const container = screen.getByText('Disabled').closest('.inline-flex');

    if (container) fireEvent.click(container);
    expect(onCheckedChange).not.toHaveBeenCalled();

    const input = screen.getByLabelText('Disabled') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('renders description', () => {
    render(<Checkbox label="Label" description="Subtext here" />);
    expect(screen.getByText('Subtext here')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(<Checkbox className="custom-checkbox" />);
    expect(container.firstChild).toHaveClass('custom-checkbox');
  });
});
