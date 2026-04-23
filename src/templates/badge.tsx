import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

type BadgeVariant = 'default' | 'outline' | 'hachure' | 'solid';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: string;
  border?: 'none' | 'rough';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  color = '#333333',
  border = 'rough',
  className = '',
}: BadgeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (border === 'none') return;
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
  }, [variant, color, border]);

  const textColor = variant === 'solid' ? 'text-white' : '';

  const getNormalStyles = () => {
    if (border !== 'none') return '';

    const base =
      'rounded-md px-2.5 py-0.5 border-2 transition-colors duration-200';
    if (variant === 'solid') {
      return `${base} bg-[${color}] border-[${color}] text-white`;
    }
    if (variant === 'outline') {
      return `${base} bg-transparent border-[${color}]`;
    }
    // Default or hachure fallback to a light background or just transparent if no roughjs
    return `${base} bg-[${color}]15 border-[${color}]`;
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center px-2.5 py-0.5 ${getNormalStyles()} ${className}`.trim()}
      style={{
        borderColor: border === 'none' ? color : undefined,
        backgroundColor:
          border === 'none' && variant === 'solid'
            ? color
            : border === 'none' &&
                (variant === 'default' || variant === 'hachure')
              ? `${color}15`
              : undefined,
      }}
    >
      {border !== 'none' && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
      )}
      <span
        className={`font-virgil relative z-10 text-xs font-bold tracking-wider ${textColor}`}
        style={{ color: variant === 'solid' ? undefined : color }}
      >
        {children}
      </span>
    </div>
  );
}
