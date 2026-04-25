import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
  thickness?: number;
  color?: string;
}

export const Separator = React.forwardRef<HTMLDivElement, SeparatorProps>(
  (
    {
      orientation = 'horizontal',
      decorative = true,
      thickness = 1.5,
      color = '#cccccc',
      className = '',
      ...props
    },
    forwardedRef,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (typeof forwardedRef === 'function') {
        forwardedRef(container);
      } else if (forwardedRef) {
        forwardedRef.current = container;
      }

      if (!canvas || !container) return;

      const w = container.offsetWidth || 2;
      const h = container.offsetHeight || 2;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      if (orientation === 'horizontal') {
        rc.line(2, h / 2, w - 2, h / 2, {
          roughness: 1.5,
          bowing: 1.0,
          stroke: color,
          strokeWidth: thickness,
        });
      } else {
        rc.line(w / 2, 2, w / 2, h - 2, {
          roughness: 1.5,
          bowing: 1.0,
          stroke: color,
          strokeWidth: thickness,
        });
      }
    }, [orientation, color, thickness, forwardedRef]);

    if (orientation === 'horizontal') {
      return (
        <div
          ref={containerRef}
          role={decorative ? 'none' : 'separator'}
          aria-orientation={decorative ? undefined : 'horizontal'}
          className={`relative w-full ${className}`.trim()}
          style={{ height: 12 }}
          {...props}
        >
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 h-full w-full"
          />
        </div>
      );
    }

    return (
      <div
        ref={containerRef}
        role={decorative ? 'none' : 'separator'}
        aria-orientation={decorative ? undefined : 'vertical'}
        className={`relative h-full ${className}`.trim()}
        style={{ width: 12 }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 h-full w-full"
        />
      </div>
    );
  },
);
Separator.displayName = 'Separator';
