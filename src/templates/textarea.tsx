import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'filled' | 'outline';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'normal' | 'rough';
  fullWidth?: boolean;
}

const roundedValues: Record<string, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
};

function getRoundedRectPath(
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  const radius = Math.min(r, w / 2, h / 2);
  return `M ${x + radius} ${y} h ${w - 2 * radius} a ${radius} ${radius} 0 0 1 ${radius} ${radius} v ${h - 2 * radius} a ${radius} ${radius} 0 0 1 -${radius} ${radius} h -${w - 2 * radius} a ${radius} ${radius} 0 0 1 -${radius} -${radius} v -${h - 2 * radius} a ${radius} ${radius} 0 0 1 ${radius} -${radius} z`;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      variant = 'outline',
      rounded = 'none',
      border = 'rough',
      fullWidth = true,
      className = '',
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [focused, setFocused] = useState(false);
    const [hovered, setHovered] = useState(false);

    // Use a ResizeObserver to redraw the rough border when textarea is resized
    useEffect(() => {
      if (border === 'normal') return;

      const container = containerRef.current;
      if (!container) return;

      const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas || !container) return;

        const w = container.offsetWidth;
        const h = container.offsetHeight;

        // Only draw if dimensions are positive
        if (w <= 0 || h <= 0) return;

        canvas.width = w;
        canvas.height = h;

        const rc = rough.canvas(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);

        const roughness = focused ? 1.8 : hovered ? 1.5 : 1.0;
        const bowing = focused ? 0.7 : 0.5;
        const radius = roundedValues[rounded] || 0;
        const strokeColor = error ? '#ef4444' : focused ? '#333333' : '#999999';
        const strokeWidth = focused ? 2 : 1.5;

        const options = {
          roughness,
          bowing,
          stroke: strokeColor,
          strokeWidth,
          fillStyle: variant === 'filled' ? 'solid' : 'transparent',
          fill: variant === 'filled' ? 'rgba(51,51,51,0.03)' : undefined,
        };

        if (radius > 0) {
          rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, radius), options);
        } else {
          rc.rectangle(2, 2, w - 4, h - 4, options);
        }
      };

      draw();

      const resizeObserver = new ResizeObserver(() => {
        draw();
      });

      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
      };
    }, [focused, hovered, variant, rounded, border, error]);

    return (
      <div
        className={`${fullWidth ? 'w-full' : 'w-auto'} flex flex-col gap-1.5`}
      >
        {label && (
          <label className="font-virgil text-sm tracking-[0.02em] text-[#333333]">
            {label}
          </label>
        )}

        <div
          ref={containerRef}
          className={`relative ${fullWidth ? 'w-full' : 'w-auto'} transition-all duration-200`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {border !== 'normal' && (
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute top-0 left-0 h-full w-full"
            />
          )}

          <textarea
            ref={ref}
            {...props}
            className={`font-virgil relative z-[1] flex min-h-[80px] w-full bg-transparent px-3 py-2 text-sm transition-colors duration-200 outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50 ${
              border === 'normal'
                ? `border-2 ${
                    error
                      ? 'border-red-500'
                      : focused
                        ? 'border-[#333333]'
                        : 'border-gray-300'
                  } rounded-${rounded === 'none' ? 'none' : rounded}`
                : 'border-none'
            } ${className}`.trim()}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
          />
        </div>

        {error && (
          <span className="font-virgil text-xs tracking-[0.01em] text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
