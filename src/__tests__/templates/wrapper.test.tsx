import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Wrapper } from '../../templates/wrapper';

describe('Wrapper Component', () => {
  it('renders correctly with children', () => {
    render(<Wrapper>Content</Wrapper>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('handles mouse enter and leave events', () => {
    const { container } = render(<Wrapper interactive>Content</Wrapper>);
    // containerRef div is the first child of the testing-library wrapper
    const wrapperDiv = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(wrapperDiv);
    expect(wrapperDiv.className).toContain('-translate-x-[2px]');

    fireEvent.mouseLeave(wrapperDiv);
    expect(wrapperDiv.className).toContain('translate-x-0');
  });

  it('renders canvas element', () => {
    const { container } = render(<Wrapper>Content</Wrapper>);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });

  it('respects padding prop', () => {
    const { container } = render(<Wrapper padding={40}>Content</Wrapper>);
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv).toHaveStyle({ padding: '40px' });
  });

  it('applies custom className', () => {
    const { container } = render(
      <Wrapper className="custom-wrapper">Content</Wrapper>,
    );
    const wrapperDiv = container.firstChild as HTMLElement;
    expect(wrapperDiv).toHaveClass('custom-wrapper');
  });
});
