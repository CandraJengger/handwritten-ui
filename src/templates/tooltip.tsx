import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';
import { Slot } from '@radix-ui/react-slot';

interface TooltipProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  'content'
> {
  asChild?: boolean;
  content: React.ReactNode;
  side?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    { children, content, side = 'top', delay = 300, className = '', ...props },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [mounted, setMounted] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const show = () => {
      timerRef.current = setTimeout(() => {
        setVisible(true);
        setMounted(true);
      }, delay);
    };

    const hide = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(false);
      setTimeout(() => setMounted(false), 150);
    };

    useEffect(() => {
      if (!mounted) return;

      const canvas = canvasRef.current;
      const tooltip = tooltipRef.current;
      if (!canvas || !tooltip) return;

      const timer = setTimeout(() => {
        const w = tooltip.offsetWidth;
        const h = tooltip.offsetHeight;
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
          strokeWidth: 1.5,
          fill: 'white',
          fillStyle: 'solid',
        });
      }, 10);

      return () => clearTimeout(timer);
    }, [mounted]);

    const positionClasses: Record<string, string> = {
      top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
      bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
      left: 'right-full top-1/2 -translate-y-1/2 mr-2',
      right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    };

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={ref}
        className="relative inline-flex"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        {...props}
      >
        {children}

        {mounted && (
          <div
            ref={tooltipRef}
            role="tooltip"
            className={`pointer-events-none absolute z-50 min-w-max ${positionClasses[side]} ${
              visible ? 'opacity-100' : 'opacity-0'
            } transition-opacity duration-150 ${className}`.trim()}
          >
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute top-0 left-0 h-full w-full"
            />
            <div className="font-virgil relative z-10 px-3 py-1.5 text-xs font-bold tracking-[0.02em] text-[#333333]">
              {content}
            </div>
          </div>
        )}
      </Comp>
    );
  },
);
Tooltip.displayName = 'Tooltip';
