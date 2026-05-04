import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Empty } from '../../templates/empty';

describe('Empty Component', () => {
  it('renders correctly with default title and description', () => {
    render(<Empty />);
    expect(screen.getByText('No Data Found')).toBeInTheDocument();
    expect(
      screen.getByText('There is nothing to show here at the moment.'),
    ).toBeInTheDocument();
  });

  it('renders custom title and description', () => {
    render(<Empty title="Empty List" description="Please add some items." />);
    expect(screen.getByText('Empty List')).toBeInTheDocument();
    expect(screen.getByText('Please add some items.')).toBeInTheDocument();
  });

  it('renders custom icon', () => {
    render(<Empty icon={<span data-testid="custom-icon" />} />);
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('renders action element', () => {
    render(<Empty action={<button>Add New</button>} />);
    expect(
      screen.getByRole('button', { name: /add new/i }),
    ).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(<Empty className="custom-empty" />);
    expect(container.firstChild).toHaveClass('custom-empty');
  });
});
