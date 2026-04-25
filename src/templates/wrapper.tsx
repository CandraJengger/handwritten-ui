import React, { useEffect, useRef, useState, type ReactNode } from 'react';
import rough from 'roughjs';

interface WrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  padding?: number | string;
  roughness?: number;
  bowing?: number;
  stroke?: string;
  strokeWidth?: number;
  fill?: string;
  fillStyle?:
    | 'solid'
    | 'hachure'
    | 'zigzag'
    | 'cross-hatch'
    | 'dots'
    | 'sunburst'
    | 'dashed';
  animated?: boolean;
  interactive?: boolean;
}

/**
 * A Card component with hand-drawn borders using RoughJS.
 */
export const Wrapper = React.forwardRef<HTMLDivElement, WrapperProps>(
  (
    {
      children,
      className = '',
      padding = 24,
      roughness = 1.5,
      bowing = 1,
      stroke = '#333333',
      strokeWidth = 1.5,
      fill = 'transparent',
      fillStyle = 'solid',
      animated = false,
      interactive = true,
      ...props
    },
    forwardedRef,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (typeof forwardedRef === 'function') {
        forwardedRef(container);
      } else if (forwardedRef) {
        forwardedRef.current = container;
      }

      if (!canvas || !container) return;

      const draw = () => {
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        if (w === 0 || h === 0) return;

        canvas.width = w;
        canvas.height = h;

        const rc = rough.canvas(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);

        const offset = 6;
        const hoverOffset = isHovered && interactive ? 4 : 0;

        // Draw shadow if hovered
        if (isHovered && interactive) {
          rc.rectangle(offset + 4, offset + 4, w - offset * 2, h - offset * 2, {
            stroke: 'rgba(0,0,0,0.15)',
            strokeWidth: 1,
            roughness: roughness + 0.8,
            bowing: bowing + 0.5,
          });
        }

        // Draw main rectangle
        rc.rectangle(
          offset - hoverOffset / 2,
          offset - hoverOffset / 2,
          w - offset * 2,
          h - offset * 2,
          {
            stroke,
            strokeWidth,
            fill,
            fillStyle: fill === 'transparent' ? 'hachure' : fillStyle,
            roughness: isHovered && interactive ? roughness + 0.3 : roughness,
            bowing,
          },
        );
      };

      const resizeObserver = new ResizeObserver(() => {
        draw();
      });

      resizeObserver.observe(container);
      draw(); // Initial draw

      return () => resizeObserver.disconnect();
    }, [
      fill,
      roughness,
      bowing,
      stroke,
      strokeWidth,
      fillStyle,
      isHovered,
      interactive,
      forwardedRef,
    ]);

    return (
      <div
        ref={containerRef}
        className={`rough-card ${animated ? 'rough-card--animated' : ''} ${className} relative transition-transform duration-200 ease-out ${interactive ? 'cursor-pointer' : 'cursor-default'} ${isHovered && interactive ? '-translate-x-[2px] -translate-y-[2px]' : 'translate-x-0 translate-y-0'}`}
        style={{ padding }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
        <div className="relative z-[1]">{children}</div>
      </div>
    );
  },
);
Wrapper.displayName = 'Wrapper';
export default Wrapper;
