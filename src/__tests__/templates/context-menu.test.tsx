import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from '../../templates/context-menu';

describe('ContextMenu Components', () => {
  it('opens context menu on right click', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Right Click Me</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Item 1</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    const trigger = screen.getByText('Right Click Me');
    expect(screen.queryByText('Item 1')).not.toBeInTheDocument();
    fireEvent.contextMenu(trigger, { clientX: 100, clientY: 100 });
    expect(screen.getByText('Item 1')).toBeInTheDocument();
  });

  it('closes context menu when item is clicked', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Click Me</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Trigger'));
    const item = screen.getByText('Click Me');
    fireEvent.click(item);
    expect(screen.queryByText('Click Me')).not.toBeInTheDocument();
  });

  it('handles checkbox items', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuCheckboxItem checked>
            Checked Item
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Unchecked Item</ContextMenuCheckboxItem>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Trigger'));

    // Checked item should have an SVG icon (check mark)
    const checkedItem = screen.getByText('Checked Item').closest('button');
    expect(checkedItem?.querySelector('svg')).toBeInTheDocument();

    // Unchecked item should NOT have an SVG icon
    const uncheckedItem = screen.getByText('Unchecked Item').closest('button');
    const svgs = uncheckedItem?.querySelectorAll('svg') || [];
    expect(svgs.length).toBe(0);
  });

  it('handles radio groups', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuRadioGroup value="2">
            <ContextMenuRadioItem value="1">One</ContextMenuRadioItem>
            <ContextMenuRadioItem value="2">Two</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Trigger'));

    // Selected radio item (value="2") should have an SVG icon
    const selectedItem = screen.getByText('Two').closest('button');
    expect(selectedItem?.querySelector('svg')).toBeInTheDocument();
  });

  it('renders submenus on hover', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Submenu</ContextMenuSubTrigger>
            <ContextMenuSubContent>Sub Item</ContextMenuSubContent>
          </ContextMenuSub>
        </ContextMenuContent>
      </ContextMenu>,
    );

    fireEvent.contextMenu(screen.getByText('Trigger'));
    const subTrigger = screen.getByText('Submenu');
    expect(screen.queryByText('Sub Item')).not.toBeInTheDocument();
    fireEvent.mouseEnter(subTrigger);
    expect(screen.getByText('Sub Item')).toBeInTheDocument();
  });

  it('throws error when used outside ContextMenu', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(<ContextMenuTrigger>Trigger</ContextMenuTrigger>),
    ).toThrow('ContextMenuTrigger must be used within ContextMenu');
    spy.mockRestore();
  });

  it('renders components correctly', () => {
    render(
      <ContextMenu>
        <ContextMenuTrigger>Trigger</ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuLabel>Label</ContextMenuLabel>
          <ContextMenuSeparator data-testid="separator" />
          <ContextMenuItem>
            Item <ContextMenuShortcut>CTRL+S</ContextMenuShortcut>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>,
    );
    fireEvent.contextMenu(screen.getByText('Trigger'));
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByTestId('separator')).toBeInTheDocument();
    expect(screen.getByText('CTRL+S')).toBeInTheDocument();
  });
});
