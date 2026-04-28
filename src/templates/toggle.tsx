import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

export interface ToggleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
  size?: 'default' | 'sm' | 'lg';
  border?: 'rough' | 'normal';
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
}

const sizeClasses: Record<string, string> = {
  default: 'h-9 px-3 min-w-[36px]',
  sm: 'h-8 px-2 min-w-[32px]',
  lg: 'h-10 px-3 min-w-[40px]',
};

export const Toggle = React.forwardRef<HTMLButtonElement, ToggleProps>(
  (
    {
      className = '',
      variant = 'default',
      size = 'default',
      border = 'rough',
      pressed,
      defaultPressed = false,
      onPressedChange,
      onClick,
      children,
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLButtonElement>(null);

    // Internal state for uncontrolled mode
    const [internalPressed, setInternalPressed] = useState(defaultPressed);

    // Determine active state based on controlled vs uncontrolled
    const isControlled = pressed !== undefined;
    const active = isControlled ? pressed : internalPressed;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (props.disabled) return;

      const nextPressed = !active;
      if (!isControlled) {
        setInternalPressed(nextPressed);
      }
      onPressedChange?.(nextPressed);
      onClick?.(e);
    };

    useEffect(() => {
      if (border === 'normal') return;

      const btn = containerRef.current;
      const canvas = canvasRef.current;
      if (!btn || !canvas) return;

      const draw = () => {
        const w = btn.offsetWidth;
        const h = btn.offsetHeight;
        canvas.width = w;
        canvas.height = h;

        const rc = rough.canvas(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);

        const roughness = 1.2;
        const bowing = 0.5;

        const baseOptions = {
          roughness,
          bowing,
          stroke: props.disabled ? '#cccccc' : '#333333',
          strokeWidth: 1.5,
        };

        if (active) {
          rc.rectangle(2, 2, w - 4, h - 4, {
            ...baseOptions,
            fill: '#333333',
            fillStyle: 'solid',
          });
        } else if (variant === 'outline') {
          rc.rectangle(2, 2, w - 4, h - 4, baseOptions);
        }
      };

      draw();
      window.addEventListener('resize', draw);
      return () => window.removeEventListener('resize', draw);
    }, [active, variant, border, props.disabled]);

    return (
      <button
        type="button"
        ref={(node) => {
          (
            containerRef as React.MutableRefObject<HTMLButtonElement | null>
          ).current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref)
            (ref as React.MutableRefObject<HTMLButtonElement | null>).current =
              node;
        }}
        onClick={handleClick}
        data-state={active ? 'on' : 'off'}
        className={`hover:bg-muted focus-visible:ring-ring relative inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
          sizeClasses[size]
        } ${
          border === 'normal'
            ? variant === 'outline'
              ? 'border border-[#333333]'
              : ''
            : ''
        } ${className}`.trim()}
        {...props}
      >
        {border === 'rough' && (
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          />
        )}
        <span
          className={`font-virgil relative z-10 text-sm ${active ? 'text-white' : 'text-[#333333]'}`}
        >
          {children}
        </span>
      </button>
    );
  },
);

Toggle.displayName = 'Toggle';
