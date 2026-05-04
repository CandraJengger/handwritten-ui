import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Dropdown } from '../../templates/dropdown';

describe('Dropdown Component', () => {
  const items = [
    { label: 'Option 1', onClick: vi.fn() },
    { label: 'Option 2', onClick: vi.fn() },
  ];

  it('renders correctly with label', () => {
    render(<Dropdown label="Select Option" items={items} />);
    expect(screen.getByText('Select Option')).toBeInTheDocument();
  });

  it('opens menu when clicked', () => {
    render(<Dropdown label="Select" items={items} />);
    fireEvent.click(screen.getByText('Select'));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('calls item onClick and closes menu on selection', () => {
    render(<Dropdown label="Select" items={items} />);
    fireEvent.click(screen.getByText('Select'));

    fireEvent.click(screen.getByText('Option 1'));
    expect(items[0].onClick).toHaveBeenCalled();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('closes on click outside', () => {
    render(<Dropdown label="Select" items={items} />);
    fireEvent.click(screen.getByText('Select'));
    expect(screen.getByText('Option 1')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('applies size classes', () => {
    render(<Dropdown label="Select" items={items} size="lg" />);
    const trigger = screen.getByRole('button');
    expect(trigger).toHaveClass('px-6', 'py-3', 'text-lg');
  });

  it('handles custom className', () => {
    const { container } = render(
      <Dropdown label="Select" items={items} className="custom-dropdown" />,
    );
    expect(container.firstChild).toHaveClass('custom-dropdown');
  });
});
