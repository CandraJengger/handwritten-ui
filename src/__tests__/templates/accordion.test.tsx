import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '../../templates/accordion';

describe('Accordion Components', () => {
  it('renders correctly and toggles item (single mode)', () => {
    render(
      <Accordion type="single">
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">Trigger 1</AccordionTrigger>
          <AccordionContent value="item-1">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(screen.getByText('Content 1')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Trigger 1'));
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument();
  });

  it('handles multiple mode correctly', () => {
    render(
      <Accordion type="multiple">
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">Trigger 1</AccordionTrigger>
          <AccordionContent value="item-1">Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger value="item-2">Trigger 2</AccordionTrigger>
          <AccordionContent value="item-2">Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );

    fireEvent.click(screen.getByText('Trigger 1'));
    fireEvent.click(screen.getByText('Trigger 2'));

    expect(screen.getByText('Content 1')).toBeInTheDocument();
    expect(screen.getByText('Content 2')).toBeInTheDocument();
  });

  it('respects defaultValue prop', () => {
    render(
      <Accordion type="single" defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger value="item-1">Trigger 1</AccordionTrigger>
          <AccordionContent value="item-1">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    );
    expect(screen.getByText('Content 1')).toBeInTheDocument();
  });

  it('throws error when used outside Accordion', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() =>
      render(<AccordionItem value="1">Content</AccordionItem>),
    ).toThrow('Accordion components must be wrapped in <Accordion />');
    spy.mockRestore();
  });

  it('handles custom className', () => {
    const { container } = render(<Accordion className="custom-accordion" />);
    expect(container.firstChild).toHaveClass('custom-accordion');
  });
});
