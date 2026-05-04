import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '../../templates/button';

describe('Button Component', () => {
  it('renders the button with children text', () => {
    render(<Button>Click Me</Button>);

    // Assert the button is in the document and has correct text
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click Me</Button>);

    // Simulate user click
    await user.click(screen.getByRole('button'));

    // Assert the click handler was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Button variant="filled">Filled</Button>);
    expect(screen.getByText('Filled')).toHaveClass('text-white');

    rerender(<Button variant="outline">Outline</Button>);
    expect(screen.getByText('Outline')).toHaveClass('text-ink');
  });

  it('applies correct size classes', () => {
    const { container } = render(<Button size="sm">Small</Button>);
    const wrapper = container.querySelector('.rough-btn');
    expect(wrapper).toHaveClass('px-4', 'py-2');
  });

  it('supports fullWidth prop', () => {
    const { container } = render(<Button fullWidth>Full Width</Button>);
    const wrapper = container.querySelector('.rough-btn');
    expect(wrapper).toHaveClass('flex');

    const button = screen.getByRole('button');
    expect(button).toHaveClass('w-full');
  });
});
