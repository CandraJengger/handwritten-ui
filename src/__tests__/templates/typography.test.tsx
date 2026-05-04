import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  Title,
  Subtitle,
  Heading3,
  Heading4,
  Paragraph,
  Blockquote,
  Caption,
  Small,
  InlineCode,
} from '../../templates/typography';

describe('Typography Components', () => {
  it('Title renders correctly', () => {
    render(<Title>Title Text</Title>);
    const el = screen.getByText('Title Text');
    expect(el.tagName).toBe('H1');
    expect(el).toHaveClass("font-['Virgil','Caveat',cursive]");
  });

  it('Subtitle renders correctly', () => {
    render(<Subtitle>Subtitle Text</Subtitle>);
    const el = screen.getByText('Subtitle Text');
    expect(el.tagName).toBe('H2');
  });

  it('Heading3 renders correctly', () => {
    render(<Heading3>Heading 3</Heading3>);
    const el = screen.getByText('Heading 3');
    expect(el.tagName).toBe('H3');
  });

  it('Heading4 renders correctly', () => {
    render(<Heading4>Heading 4</Heading4>);
    const el = screen.getByText('Heading 4');
    expect(el.tagName).toBe('H4');
  });

  it('Paragraph renders correctly', () => {
    render(<Paragraph>Paragraph Text</Paragraph>);
    const el = screen.getByText('Paragraph Text');
    expect(el.tagName).toBe('P');
  });

  it('Blockquote renders correctly', () => {
    render(<Blockquote>Quote</Blockquote>);
    const el = screen.getByText('Quote');
    expect(el.tagName).toBe('BLOCKQUOTE');
  });

  it('Caption renders correctly', () => {
    render(<Caption>Caption</Caption>);
    const el = screen.getByText('Caption');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass('text-sm');
  });

  it('Small renders correctly', () => {
    render(<Small>Small Text</Small>);
    const el = screen.getByText('Small Text');
    expect(el.tagName).toBe('SMALL');
  });

  it('InlineCode renders correctly', () => {
    render(<InlineCode>code</InlineCode>);
    const el = screen.getByText('code');
    expect(el.tagName).toBe('CODE');
    expect(el).toHaveClass('font-mono');
  });

  it('applies custom font correctly', () => {
    render(<Title font="normal">Normal Title</Title>);
    const el = screen.getByText('Normal Title');
    expect(el).toHaveClass('font-sans');
    expect(el).not.toHaveClass("font-['Virgil','Caveat',cursive]");
  });

  it('renders as child correctly', () => {
    render(
      <Title asChild>
        <span data-testid="custom">Custom Title</span>
      </Title>,
    );
    const el = screen.getByTestId('custom');
    expect(el.tagName).toBe('SPAN');
  });

  it('handles custom className', () => {
    render(<Paragraph className="custom-p">Text</Paragraph>);
    expect(screen.getByText('Text')).toHaveClass('custom-p');
  });
});
