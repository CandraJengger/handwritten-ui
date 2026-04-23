import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

type BadgeVariant = 'default' | 'outline' | 'hachure' | 'solid';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: string;
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  color = '#333333',
  className = '',
}: BadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

    const isSolid = variant === 'solid';
    const isHachure = variant === 'hachure' || variant === 'default';

    rc.rectangle(2, 2, w - 4, h - 4, {
      stroke: color,
      strokeWidth: 1.5,
      roughness: 1.2,
      bowing: 0.5,
      fill: isSolid || isHachure ? color : 'transparent',
      fillStyle: isSolid ? 'solid' : 'hachure',
      hachureAngle: -41,
      hachureGap: 3,
      fillWeight: isSolid ? 3 : 1,
    });
  }, [variant, color]);

  const textColor = variant === 'solid' ? 'text-white' : '';

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center px-2.5 py-0.5 ${className}`.trim()}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
      <span
        className={`font-virgil relative z-10 text-xs font-bold tracking-wider ${textColor}`}
        style={{ color: variant === 'solid' ? undefined : color }}
      >
        {children}
      </span>
    </div>
  );
}
