import React, { useEffect, useRef } from 'react';

interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeValues: Record<string, number> = {
  sm: 20,
  md: 32,
  lg: 48,
};

export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', label = 'Loading...', className = '', ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const dimension = sizeValues[size];
    const canvasSize = dimension + 4;

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = canvasSize;
      canvas.height = canvasSize;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, canvasSize, canvasSize);

      const cx = canvasSize / 2;
      const cy = canvasSize / 2;
      const r = dimension / 2 - 2;
      const segments = 6;
      const totalAngle = Math.PI * 1.7;
      const startAngle = -Math.PI / 2;

      ctx.lineWidth = 2;
      ctx.lineCap = 'round';

      for (let i = 0; i < segments; i++) {
        const segStart = startAngle + (totalAngle / segments) * i;
        const segEnd = startAngle + (totalAngle / segments) * (i + 1);
        const jitter = () => (Math.random() - 0.5) * 1.5;

        ctx.strokeStyle = '#333333';
        ctx.globalAlpha = 0.4 + 0.6 * (i / (segments - 1));
        ctx.beginPath();
        ctx.arc(
          cx + jitter(),
          cy + jitter(),
          r + jitter() * 0.4,
          segStart,
          segEnd,
        );
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }, [dimension, canvasSize]);

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={`inline-flex flex-col items-center gap-2 ${className}`.trim()}
        {...props}
      >
        <div
          className="animate-spin"
          style={{ width: canvasSize, height: canvasSize }}
        >
          <canvas
            ref={canvasRef}
            className="block"
            style={{ width: canvasSize, height: canvasSize }}
          />
        </div>
        <span className="font-virgil sr-only">{label}</span>
      </div>
    );
  },
);
Spinner.displayName = 'Spinner';
