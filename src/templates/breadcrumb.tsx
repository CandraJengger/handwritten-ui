import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

// ─── Breadcrumb (root nav) ───────────────────────────────────────────────────

interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {}

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <nav
        ref={ref}
        aria-label="breadcrumb"
        className={`font-virgil ${className}`.trim()}
        {...props}
      >
        {children}
      </nav>
    );
  },
);
Breadcrumb.displayName = 'Breadcrumb';

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

interface BreadcrumbListProps extends React.OlHTMLAttributes<HTMLOListElement> {}

export const BreadcrumbList = React.forwardRef<
  HTMLOListElement,
  BreadcrumbListProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <ol
      ref={ref}
      className={`flex flex-wrap items-center gap-1.5 text-sm text-[#333333] ${className}`.trim()}
      {...props}
    >
      {children}
    </ol>
  );
});
BreadcrumbList.displayName = 'BreadcrumbList';

// ─── BreadcrumbItem ──────────────────────────────────────────────────────────

interface BreadcrumbItemProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const BreadcrumbItem = React.forwardRef<
  HTMLLIElement,
  BreadcrumbItemProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <li
      ref={ref}
      className={`inline-flex items-center gap-1.5 ${className}`.trim()}
      {...props}
    >
      {children}
    </li>
  );
});
BreadcrumbItem.displayName = 'BreadcrumbItem';

// ─── BreadcrumbLink ──────────────────────────────────────────────────────────

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: () => void;
}

export const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  BreadcrumbLinkProps
>(({ children, href, className = '', onClick, ...props }, ref) => {
  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      className={`font-virgil cursor-pointer tracking-[0.02em] text-[#666666] underline decoration-[#999999] decoration-wavy underline-offset-4 transition-colors duration-200 hover:text-[#333333] hover:decoration-[#333333] ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

// ─── BreadcrumbPage (current / non-clickable) ────────────────────────────────

interface BreadcrumbPageProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const BreadcrumbPage = React.forwardRef<
  HTMLSpanElement,
  BreadcrumbPageProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`font-virgil font-bold tracking-[0.02em] text-[#333333] ${className}`.trim()}
      {...props}
    >
      {children}
    </span>
  );
});
BreadcrumbPage.displayName = 'BreadcrumbPage';

// ─── BreadcrumbSeparator (rough line drawn on canvas) ────────────────────────

interface BreadcrumbSeparatorProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const BreadcrumbSeparator = React.forwardRef<
  HTMLLIElement,
  BreadcrumbSeparatorProps
>(({ children, className = '', ...props }, forwardedRef) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (children) return; // skip canvas if custom children provided

    const canvas = canvasRef.current;

    if (typeof forwardedRef === 'function') {
      forwardedRef(canvas ? (canvas.parentElement as HTMLLIElement) : null); // Roughly forward to the li
    } else if (forwardedRef) {
      forwardedRef.current = canvas
        ? (canvas.parentElement as HTMLLIElement)
        : null;
    }

    if (!canvas) return;

    const w = 12;
    const h = 16;
    canvas.width = w;
    canvas.height = h;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    // Draw a sketchy "/" separator
    rc.line(3, h - 3, w - 3, 3, {
      roughness: 1.2,
      bowing: 0.8,
      stroke: '#999999',
      strokeWidth: 1.5,
    });
  }, [children, forwardedRef]);

  if (children) {
    return (
      <li
        role="presentation"
        aria-hidden="true"
        className={`inline-flex items-center text-[#999999] ${className}`.trim()}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </li>
    );
  }

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={`inline-flex items-center ${className}`.trim()}
      ref={forwardedRef}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: 12, height: 16 }}
      />
    </li>
  );
});
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

// ─── BreadcrumbEllipsis ──────────────────────────────────────────────────────

interface BreadcrumbEllipsisProps extends React.LiHTMLAttributes<HTMLLIElement> {}

export const BreadcrumbEllipsis = React.forwardRef<
  HTMLLIElement,
  BreadcrumbEllipsisProps
>(({ className = '', ...props }, forwardedRef) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (typeof forwardedRef === 'function') {
      forwardedRef(canvas ? (canvas.parentElement as HTMLLIElement) : null);
    } else if (forwardedRef) {
      forwardedRef.current = canvas
        ? (canvas.parentElement as HTMLLIElement)
        : null;
    }

    if (!canvas) return;

    const w = 24;
    const h = 16;
    canvas.width = w;
    canvas.height = h;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    // Draw 3 sketchy dots
    const dotRadius = 2;
    const y = h / 2;
    [6, 12, 18].forEach((x) => {
      rc.circle(x, y, dotRadius * 2, {
        roughness: 1.5,
        stroke: '#999999',
        strokeWidth: 1,
        fill: '#999999',
        fillStyle: 'solid',
      });
    });
  }, [forwardedRef]);

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={`inline-flex items-center ${className}`.trim()}
      ref={forwardedRef}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: 24, height: 16 }}
      />
      <span className="sr-only">More</span>
    </li>
  );
});
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
