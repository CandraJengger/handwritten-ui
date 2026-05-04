import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../../templates/card';

describe('Card Components', () => {
  it('renders a full card correctly', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>,
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('renders rough border by default (canvas)', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('renders normal border when border="normal"', () => {
    const { container } = render(<Card border="normal">Content</Card>);
    expect(container.querySelector('canvas')).not.toBeInTheDocument();
    expect(container.firstChild).toHaveClass('border-2');
  });

  it('renders header, content and footer with correct classes', () => {
    const { getByText } = render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(getByText('Header').closest('div')).toHaveClass('p-6');
    expect(getByText('Content').closest('div')).toHaveClass('p-6', 'pt-0');
    expect(getByText('Footer').closest('div')).toHaveClass('p-6', 'pt-0');
  });

  it('handles custom className', () => {
    const { container } = render(<Card className="custom-card" />);
    expect(container.firstChild).toHaveClass('custom-card');
  });
});
