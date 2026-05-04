import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Tooltip } from '../../templates/tooltip';

describe('Tooltip Component', () => {
  it('shows tooltip content on hover after delay', async () => {
    render(
      <Tooltip content="Tooltip Content" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');

    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    fireEvent.mouseEnter(trigger);

    // Using waitFor because of internal setTimeout(..., delay)
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
      expect(screen.getByText('Tooltip Content')).toBeInTheDocument();
    });
  });

  it('hides tooltip content on mouse leave', async () => {
    render(
      <Tooltip content="Hidden" delay={0}>
        <button>Hover me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Hover me');

    fireEvent.mouseEnter(trigger);
    await waitFor(() =>
      expect(screen.getByRole('tooltip')).toBeInTheDocument(),
    );

    fireEvent.mouseLeave(trigger);
    // There is a 150ms delay in hide() before setMounted(false)
    await waitFor(
      () => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
      },
      { timeout: 1000 },
    );
  });

  it('shows tooltip on focus', async () => {
    render(
      <Tooltip content="Focus" delay={0}>
        <button>Focus me</button>
      </Tooltip>,
    );

    const trigger = screen.getByText('Focus me');
    fireEvent.focus(trigger);

    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toBeInTheDocument();
    });
  });

  it('applies position classes based on side prop', async () => {
    render(
      <Tooltip content="Bottom" side="bottom" delay={0}>
        <button>Trigger</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText('Trigger'));
    await waitFor(() => {
      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toHaveClass('top-full');
    });
  });

  it('handles custom className on tooltip', async () => {
    render(
      <Tooltip content="Custom" delay={0} className="custom-tooltip">
        <button>Trigger</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByText('Trigger'));
    await waitFor(() => {
      expect(screen.getByRole('tooltip')).toHaveClass('custom-tooltip');
    });
  });
});
