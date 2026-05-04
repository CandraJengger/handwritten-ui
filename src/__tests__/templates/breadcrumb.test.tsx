import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from '../../templates/breadcrumb';

describe('Breadcrumb Components', () => {
  it('renders a full breadcrumb correctly', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );

    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'breadcrumb',
    );
    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Components')).toHaveAttribute(
      'href',
      '/components',
    );
    expect(screen.getByText('Breadcrumb')).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders separator canvas by default', () => {
    const { container } = render(<BreadcrumbSeparator />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('renders custom separator children', () => {
    render(
      <BreadcrumbSeparator>
        <span>&gt;</span>
      </BreadcrumbSeparator>,
    );
    expect(screen.getByText('>')).toBeInTheDocument();
  });

  it('renders ellipsis with screen reader text', () => {
    render(<BreadcrumbEllipsis />);
    expect(screen.getByText('More')).toHaveClass('sr-only');
  });

  it('renders BreadcrumbItem asChild', () => {
    render(
      <BreadcrumbItem asChild>
        <div data-testid="custom-item">Custom</div>
      </BreadcrumbItem>,
    );
    expect(screen.getByTestId('custom-item')).toBeInTheDocument();
  });

  it('handles custom className', () => {
    const { container } = render(<Breadcrumb className="custom-breadcrumb" />);
    expect(container.firstChild).toHaveClass('custom-breadcrumb');
  });
});
