import React from 'react';
import { Slot } from '@radix-ui/react-slot';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
  font?: 'virgil' | 'normal';
  children: React.ReactNode;
}

const getFontClass = (font: 'virgil' | 'normal' = 'virgil') =>
  font === 'virgil' ? "font-['Virgil','Caveat',cursive]" : 'font-sans';

export const Title = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'h1';
    return (
      <Comp
        ref={ref}
        className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Title.displayName = 'Title';

export const Subtitle = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'h2';
    return (
      <Comp
        ref={ref}
        className={`scroll-m-20 border-b-2 border-[#333333] pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Subtitle.displayName = 'Subtitle';

export const Heading3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'h3';
    return (
      <Comp
        ref={ref}
        className={`scroll-m-20 text-2xl font-semibold tracking-tight ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Heading3.displayName = 'Heading3';

export const Heading4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'h4';
    return (
      <Comp
        ref={ref}
        className={`scroll-m-20 text-xl font-semibold tracking-tight ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Heading4.displayName = 'Heading4';

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  TypographyProps
>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        className={`leading-7 [&:not(:first-child)]:mt-6 ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Paragraph.displayName = 'Paragraph';

export const Blockquote = React.forwardRef<HTMLQuoteElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'blockquote';
    return (
      <Comp
        ref={ref}
        className={`mt-6 border-l-2 border-[#333333] pl-6 italic ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Blockquote.displayName = 'Blockquote';

export const Caption = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'p';
    return (
      <Comp
        ref={ref}
        className={`text-sm text-gray-500 ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Caption.displayName = 'Caption';

export const Small = React.forwardRef<HTMLElement, TypographyProps>(
  (
    { asChild = false, font = 'virgil', className = '', children, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'small';
    return (
      <Comp
        ref={ref}
        className={`text-sm leading-none font-medium ${getFontClass(font)} ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
Small.displayName = 'Small';

export const InlineCode = React.forwardRef<HTMLElement, TypographyProps>(
  ({ asChild = false, className = '', children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'code';
    return (
      <Comp
        ref={ref}
        className={`relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
InlineCode.displayName = 'InlineCode';
