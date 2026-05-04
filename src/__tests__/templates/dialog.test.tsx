import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../../templates/dialog';

describe('Dialog Components', () => {
  it('opens dialog when trigger is clicked', () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
          <p>Content</p>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.queryByText('Title')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Open Dialog'));
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('closes dialog when close button is clicked', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText('Title')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('Close'));
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('closes dialog when overlay is clicked', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    // Overlay is the element with bg-black/40
    // Using querySelector with escaped slash
    const overlay = document.querySelector('.bg-black\\/40');
    if (overlay) fireEvent.click(overlay);
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('closes dialog on Escape key', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogTitle>Title</DialogTitle>
        </DialogContent>
      </Dialog>,
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByText('Title')).not.toBeInTheDocument();
  });

  it('locks body scroll when open', () => {
    const { unmount } = render(
      <Dialog defaultOpen>
        <DialogContent>Title</DialogContent>
      </Dialog>,
    );
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('renders correctly with header, description and footer', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm</DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button>Cancel</button>
            <button>Delete</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('throws error when used outside Dialog', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<DialogTrigger>Trigger</DialogTrigger>)).toThrow(
      'Dialog components must be wrapped in <Dialog />',
    );
    spy.mockRestore();
  });

  it('handles custom className', () => {
    render(
      <Dialog defaultOpen>
        <DialogContent className="custom-dialog">Content</DialogContent>
      </Dialog>,
    );
    expect(screen.getByRole('dialog')).toHaveClass('custom-dialog');
  });
});
