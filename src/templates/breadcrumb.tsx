import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

// ─── Breadcrumb (root nav) ───────────────────────────────────────────────────

interface BreadcrumbProps {
  children: React.ReactNode;
  className?: string;
}

export function Breadcrumb({ children, className = '' }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb" className={`font-virgil ${className}`.trim()}>
      {children}
    </nav>
  );
}

// ─── BreadcrumbList ──────────────────────────────────────────────────────────

interface BreadcrumbListProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbList({
  children,
  className = '',
}: BreadcrumbListProps) {
  return (
    <ol
      className={`flex flex-wrap items-center gap-1.5 text-sm text-[#333333] ${className}`.trim()}
    >
      {children}
    </ol>
  );
}

// ─── BreadcrumbItem ──────────────────────────────────────────────────────────

interface BreadcrumbItemProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbItem({
  children,
  className = '',
}: BreadcrumbItemProps) {
  return (
    <li className={`inline-flex items-center gap-1.5 ${className}`.trim()}>
      {children}
    </li>
  );
}

// ─── BreadcrumbLink ──────────────────────────────────────────────────────────

interface BreadcrumbLinkProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}

export function BreadcrumbLink({
  children,
  href,
  className = '',
  onClick,
}: BreadcrumbLinkProps) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`font-virgil cursor-pointer tracking-[0.02em] text-[#666666] underline decoration-[#999999] decoration-wavy underline-offset-4 transition-colors duration-200 hover:text-[#333333] hover:decoration-[#333333] ${className}`.trim()}
    >
      {children}
    </a>
  );
}

// ─── BreadcrumbPage (current / non-clickable) ────────────────────────────────

interface BreadcrumbPageProps {
  children: React.ReactNode;
  className?: string;
}

export function BreadcrumbPage({
  children,
  className = '',
}: BreadcrumbPageProps) {
  return (
    <span
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={`font-virgil font-bold tracking-[0.02em] text-[#333333] ${className}`.trim()}
    >
      {children}
    </span>
  );
}

// ─── BreadcrumbSeparator (rough line drawn on canvas) ────────────────────────

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode;
  className?: string;
}

export function BreadcrumbSeparator({
  children,
  className = '',
}: BreadcrumbSeparatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (children) return; // skip canvas if custom children provided

    const canvas = canvasRef.current;
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
  }, [children]);

  if (children) {
    return (
      <li
        role="presentation"
        aria-hidden="true"
        className={`inline-flex items-center text-[#999999] ${className}`.trim()}
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
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: 12, height: 16 }}
      />
    </li>
  );
}

// ─── BreadcrumbEllipsis ──────────────────────────────────────────────────────

interface BreadcrumbEllipsisProps {
  className?: string;
}

export function BreadcrumbEllipsis({
  className = '',
}: BreadcrumbEllipsisProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
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
  }, []);

  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={`inline-flex items-center ${className}`.trim()}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: 24, height: 16 }}
      />
      <span className="sr-only">More</span>
    </li>
  );
}
