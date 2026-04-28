import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

export interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'dots' | 'pulse' | 'ping';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showLabel?: boolean;
}

const sizeMap: Record<string, number> = {
  sm: 24,
  md: 40,
  lg: 64,
};

export const Loader = React.forwardRef<HTMLDivElement, LoaderProps>(
  (
    {
      variant = 'dots',
      size = 'md',
      label = 'Loading...',
      showLabel = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const canvasRef1 = useRef<HTMLCanvasElement>(null);
    const canvasRef2 = useRef<HTMLCanvasElement>(null);
    const canvasRef3 = useRef<HTMLCanvasElement>(null);

    const dimension = sizeMap[size];
    const canvasSize = dimension + 8;

    useEffect(() => {
      const draw = (canvas: HTMLCanvasElement | null, v: string) => {
        if (!canvas) return;
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const rc = rough.canvas(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        const cx = canvasSize / 2;
        const cy = canvasSize / 2;

        if (v === 'dots') {
          const r = dimension / 6;
          rc.circle(cx, cy, r * 2, {
            stroke: '#333333',
            fill: '#333333',
            fillStyle: 'solid',
            roughness: 1,
          });
        } else if (v === 'pulse') {
          rc.circle(cx, cy, dimension, {
            stroke: '#333333',
            fill: '#333333',
            fillStyle: 'hachure',
            hachureGap: 4,
            roughness: 1.5,
          });
        } else if (v === 'ping') {
          rc.circle(cx, cy, dimension, {
            stroke: '#333333',
            strokeWidth: 2,
            roughness: 1.5,
          });
        }
      };

      if (variant === 'dots') {
        draw(canvasRef1.current, 'dots');
        draw(canvasRef2.current, 'dots');
        draw(canvasRef3.current, 'dots');
      } else {
        draw(canvasRef1.current, variant);
      }
    }, [variant, dimension, canvasSize]);

    const renderContent = () => {
      switch (variant) {
        case 'dots':
          return (
            <div className="flex gap-2">
              {[canvasRef1, canvasRef2, canvasRef3].map((cref, i) => (
                <div
                  key={i}
                  className="animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <canvas
                    ref={cref}
                    style={{ width: canvasSize, height: canvasSize }}
                  />
                </div>
              ))}
            </div>
          );
        case 'pulse':
          return (
            <div className="animate-pulse">
              <canvas
                ref={canvasRef1}
                style={{ width: canvasSize, height: canvasSize }}
              />
            </div>
          );
        case 'ping':
          return (
            <div className="animate-ping opacity-75">
              <canvas
                ref={canvasRef1}
                style={{ width: canvasSize, height: canvasSize }}
              />
            </div>
          );
        default:
          return null;
      }
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={`inline-flex flex-col items-center justify-center gap-3 ${className}`.trim()}
        {...props}
      >
        {renderContent()}
        {showLabel ? (
          <span className="font-virgil text-sm tracking-wide text-[#333333]">
            {label}
          </span>
        ) : (
          <span className="sr-only">{label}</span>
        )}
      </div>
    );
  },
);

Loader.displayName = 'Loader';
