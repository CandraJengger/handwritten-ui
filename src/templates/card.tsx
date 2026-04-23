import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

// ─── Card (root) ─────────────────────────────────────────────────────────────

interface CardProps {
  children: React.ReactNode;
  border?: 'rough' | 'normal';
  className?: string;
}

export function Card({
  children,
  border = 'rough',
  className = '',
}: CardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (border === 'normal') return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
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
  }, [border]);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${
        border === 'normal' ? 'rounded-md border-2 border-[#333333]' : ''
      } ${className}`.trim()}
    >
      {border !== 'normal' && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
      )}
      <div className="relative z-10 flex flex-col">{children}</div>
    </div>
  );
}

// ─── CardHeader ──────────────────────────────────────────────────────────────

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 ${className}`.trim()}>
      {children}
    </div>
  );
}

// ─── CardTitle ───────────────────────────────────────────────────────────────

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className = '' }: CardTitleProps) {
  return (
    <h3
      className={`font-virgil text-2xl leading-none font-bold tracking-tight text-[#333333] ${className}`.trim()}
    >
      {children}
    </h3>
  );
}

// ─── CardDescription ────────────────────────────────────────────────────────

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function CardDescription({
  children,
  className = '',
}: CardDescriptionProps) {
  return (
    <p
      className={`font-virgil text-sm tracking-[0.01em] text-[#888888] ${className}`.trim()}
    >
      {children}
    </p>
  );
}

// ─── CardContent ─────────────────────────────────────────────────────────────

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={`p-6 pt-0 ${className}`.trim()}>{children}</div>;
}

// ─── CardFooter ──────────────────────────────────────────────────────────────

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`.trim()}>
      {children}
    </div>
  );
}
