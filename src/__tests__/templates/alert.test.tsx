import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Alert } from '../../templates/alert';

describe('Alert Component', () => {
  it('renders correctly with title and description', () => {
    render(<Alert title="Success">Operation completed</Alert>);
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { rerender } = render(
      <Alert variant="error" title="Error">
        Message
      </Alert>,
    );
    const title = screen.getByText('Error');
    expect(title).toHaveStyle({ color: 'rgb(239, 68, 68)' });

    rerender(
      <Alert variant="success" title="Success">
        Message
      </Alert>,
    );
    expect(screen.getByText('Success')).toHaveStyle({
      color: 'rgb(16, 185, 129)',
    });
  });

  it('renders default icon', () => {
    const { container } = render(<Alert />);
    // lucide-react renders SVG elements
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders specific icon for variant', () => {
    const { container } = render(<Alert variant="warning" />);
    // Check that SVG icon is rendered (lucide-react AlertTriangle)
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders canvas element', () => {
    const { container } = render(<Alert />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(<Alert className="custom-alert" />);
    expect(container.firstChild).toHaveClass('custom-alert');
  });
});
