import React from 'react';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  font?: 'virgil' | 'normal';
  children: React.ReactNode;
}

const getFontClass = (font: 'virgil' | 'normal' = 'virgil') =>
  font === 'virgil' ? "font-['Virgil','Caveat',cursive]" : 'font-sans';

export const Title = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <h1
      ref={ref}
      className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </h1>
  ),
);
Title.displayName = 'Title';

export const Subtitle = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <h2
      ref={ref}
      className={`scroll-m-20 border-b-2 border-[#333333] pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </h2>
  ),
);
Subtitle.displayName = 'Subtitle';

export const Heading3 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <h3
      ref={ref}
      className={`scroll-m-20 text-2xl font-semibold tracking-tight ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </h3>
  ),
);
Heading3.displayName = 'Heading3';

export const Heading4 = React.forwardRef<HTMLHeadingElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <h4
      ref={ref}
      className={`scroll-m-20 text-xl font-semibold tracking-tight ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </h4>
  ),
);
Heading4.displayName = 'Heading4';

export const Paragraph = React.forwardRef<
  HTMLParagraphElement,
  TypographyProps
>(({ font = 'virgil', className = '', children, ...props }, ref) => (
  <p
    ref={ref}
    className={`leading-7 [&:not(:first-child)]:mt-6 ${getFontClass(font)} ${className}`.trim()}
    {...props}
  >
    {children}
  </p>
));
Paragraph.displayName = 'Paragraph';

export const Blockquote = React.forwardRef<HTMLQuoteElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={`mt-6 border-l-2 border-[#333333] pl-6 italic ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </blockquote>
  ),
);
Blockquote.displayName = 'Blockquote';

export const Caption = React.forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <p
      ref={ref}
      className={`text-sm text-gray-500 ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  ),
);
Caption.displayName = 'Caption';

export const Small = React.forwardRef<HTMLElement, TypographyProps>(
  ({ font = 'virgil', className = '', children, ...props }, ref) => (
    <small
      ref={ref}
      className={`text-sm leading-none font-medium ${getFontClass(font)} ${className}`.trim()}
      {...props}
    >
      {children}
    </small>
  ),
);
Small.displayName = 'Small';

export const InlineCode = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className = '', children, ...props }, ref) => (
    <code
      ref={ref}
      className={`relative rounded bg-gray-100 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold text-gray-900 ${className}`.trim()}
      {...props}
    >
      {children}
    </code>
  ),
);
InlineCode.displayName = 'InlineCode';
