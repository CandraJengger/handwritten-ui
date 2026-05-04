import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Textarea } from '../../templates/textarea';

describe('Textarea Component', () => {
  it('renders correctly with label', () => {
    render(<Textarea label="Bio" placeholder="Tell us about yourself" />);
    expect(screen.getByText('Bio')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Tell us about yourself'),
    ).toBeInTheDocument();
  });

  it('handles user input', async () => {
    const user = userEvent.setup();
    render(<Textarea placeholder="Type here" />);
    const textarea = screen.getByPlaceholderText('Type here');

    await user.type(textarea, 'This is a test');
    expect(textarea).toHaveValue('This is a test');
  });

  it('displays error message', () => {
    render(<Textarea error="Must be 50 characters" />);
    expect(screen.getByText('Must be 50 characters')).toBeInTheDocument();
    expect(screen.getByText('Must be 50 characters')).toHaveClass(
      'text-red-500',
    );
  });

  it('handles focus and blur events', () => {
    const onFocus = vi.fn();
    const onBlur = vi.fn();
    render(<Textarea onFocus={onFocus} onBlur={onBlur} />);
    const textarea = screen.getByRole('textbox');

    fireEvent.focus(textarea);
    expect(onFocus).toHaveBeenCalled();

    fireEvent.blur(textarea);
    expect(onBlur).toHaveBeenCalled();
  });

  it('applies disabled prop', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('handles custom className', () => {
    render(<Textarea className="custom-textarea" />);
    expect(screen.getByRole('textbox')).toHaveClass('custom-textarea');
  });
});
