import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { Slot } from '@radix-ui/react-slot';

// ─── Card (root) ─────────────────────────────────────────────────────────────

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  border?: 'rough' | 'normal';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { children, asChild = false, border = 'rough', className = '', ...props },
    forwardedRef,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (border === 'normal') return;

      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (typeof forwardedRef === 'function') {
        forwardedRef(container);
      } else if (forwardedRef) {
        forwardedRef.current = container;
      }

      if (!canvas || !container) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.2,
        bowing: 0.8,
        stroke: '#333333',
        strokeWidth: 2,
      });
    }, [border, forwardedRef]);

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={containerRef}
        className={`relative flex flex-col ${
          border === 'normal' ? 'rounded-md border-2 border-[#333333]' : ''
        } ${className}`.trim()}
        {...props}
      >
        {border !== 'normal' && (
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          />
        )}
        <div className="relative z-10 flex flex-col">{children}</div>
      </Comp>
    );
  },
);
Card.displayName = 'Card';

// ─── CardHeader ──────────────────────────────────────────────────────────────

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, asChild = false, className = '', ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={`flex flex-col gap-1.5 p-6 ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
CardHeader.displayName = 'CardHeader';

// ─── CardTitle ───────────────────────────────────────────────────────────────

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  asChild?: boolean;
}

export const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, asChild = false, className = '', ...props }, ref) => {
    const Comp = asChild ? Slot : 'h3';
    return (
      <Comp
        ref={ref}
        className={`font-virgil text-2xl leading-none font-bold tracking-tight text-[#333333] ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
CardTitle.displayName = 'CardTitle';

// ─── CardDescription ────────────────────────────────────────────────────────

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  asChild?: boolean;
}

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  CardDescriptionProps
>(({ children, asChild = false, className = '', ...props }, ref) => {
  const Comp = asChild ? Slot : 'p';
  return (
    <Comp
      ref={ref}
      className={`font-virgil text-sm tracking-[0.01em] text-[#888888] ${className}`.trim()}
      {...props}
    >
      {children}
    </Comp>
  );
});
CardDescription.displayName = 'CardDescription';

// ─── CardContent ─────────────────────────────────────────────────────────────

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, asChild = false, className = '', ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp ref={ref} className={`p-6 pt-0 ${className}`.trim()} {...props}>
        {children}
      </Comp>
    );
  },
);
CardContent.displayName = 'CardContent';

// ─── CardFooter ──────────────────────────────────────────────────────────────

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

export const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, asChild = false, className = '', ...props }, ref) => {
    const Comp = asChild ? Slot : 'div';
    return (
      <Comp
        ref={ref}
        className={`flex items-center p-6 pt-0 ${className}`.trim()}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);
CardFooter.displayName = 'CardFooter';
