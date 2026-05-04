import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '../../templates/popover';

describe('Popover Components', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('opens popover when trigger is clicked', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );

    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Open Popover'));
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('closes popover when trigger is clicked again', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Toggle'));
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('closes on click outside', () => {
    render(
      <Popover defaultOpen>
        <PopoverTrigger>Toggle</PopoverTrigger>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    expect(screen.getByText('Content')).toBeInTheDocument();

    // The click-outside listener is registered with setTimeout(..., 0)
    act(() => {
      vi.runAllTimers();
    });

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('closes on Escape key', () => {
    render(
      <Popover defaultOpen>
        <PopoverContent>Content</PopoverContent>
      </Popover>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Content')).not.toBeInTheDocument();
  });

  it('throws error when used outside Popover', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<PopoverTrigger>Trigger</PopoverTrigger>)).toThrow(
      'Popover components must be wrapped in <Popover />',
    );
    spy.mockRestore();
  });

  it('handles custom className', () => {
    render(
      <Popover defaultOpen>
        <PopoverContent className="custom-popover">Content</PopoverContent>
      </Popover>,
    );
    const contentDiv = screen.getByText('Content').closest('.custom-popover');
    expect(contentDiv).toBeInTheDocument();
  });
});
