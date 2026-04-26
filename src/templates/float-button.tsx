import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface FloatButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  border?: 'normal' | 'rough' | 'hachure';
}

const sizeClasses: Record<string, string> = {
  sm: 'h-10 min-w-[40px] px-2.5',
  md: 'h-14 min-w-[56px] px-4',
  lg: 'h-16 min-w-[64px] px-6',
};

const iconSizeClasses: Record<string, string> = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
};

const fontSizeClasses: Record<string, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

const roundedValues: Record<string, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  full: 9999,
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

export const FloatButton = React.forwardRef<
  HTMLButtonElement,
  FloatButtonProps
>(
  (
    {
      icon,
      label,
      variant = 'filled',
      size = 'md',
      rounded = 'full',
      border = 'rough',
      className = '',
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

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

      const roughness = hovered ? 2.5 : 1.2;
      const bowing = hovered ? 2 : 0.5;
      const radiusValue = roundedValues[rounded] || 0;

      const baseOptions = {
        roughness,
        bowing,
        stroke: '#333333',
        strokeWidth: 2,
        fillStyle: border === 'hachure' ? 'hachure' : 'solid',
        hachureAngle: -41,
        hachureGap: 4,
      };

      const fill =
        variant === 'filled'
          ? '#333333'
          : hovered
            ? 'rgba(51,51,51,0.06)'
            : 'transparent';
      const options = { ...baseOptions, fill };

      if (rounded === 'full' && !label) {
        // Perfect circle for standard FAB
        // const center = Math.min(w, h) / 2;
        rc.circle(w / 2, h / 2, Math.min(w, h) - 4, options);
      } else {
        // Rounded rectangle for extended FAB or other shapes
        const r = Math.min(radiusValue, w / 2, h / 2);
        rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, r), options);
      }
    }, [hovered, variant, size, rounded, border, label]);

    const textColorClass =
      variant === 'filled' ? 'text-white' : 'text-[#333333]';

    const getNormalStyles = () => {
      if (border !== 'normal') return '';
      const base = 'border-2 border-[#333333] transition-colors duration-200';
      if (variant === 'filled') {
        return `${base} bg-[#333333]`;
      }
      return `${base} bg-white hover:bg-black/5`;
    };

    const roundedClass =
      rounded === 'full'
        ? 'rounded-full'
        : rounded === 'lg'
          ? 'rounded-lg'
          : rounded === 'md'
            ? 'rounded-md'
            : rounded === 'sm'
              ? 'rounded-sm'
              : 'rounded-none';

    return (
      <button
        ref={ref}
        className={`group relative flex cursor-pointer items-center justify-center border-none bg-transparent p-0 transition-all duration-200 outline-none ${className}`.trim()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      >
        <div
          ref={containerRef}
          className={`relative flex items-center justify-center gap-2 ${sizeClasses[size]} ${roundedClass} ${getNormalStyles()} overflow-visible`.trim()}
        >
          {border !== 'normal' && (
            <canvas
              ref={canvasRef}
              className="pointer-events-none absolute top-0 left-0 h-full w-full"
            />
          )}
          <span
            className={`relative z-10 flex items-center justify-center ${iconSizeClasses[size]} ${textColorClass}`}
          >
            {icon}
          </span>
          {label && (
            <span
              className={`font-virgil relative z-10 font-bold tracking-wide ${fontSizeClasses[size]} ${textColorClass}`}
            >
              {label}
            </span>
          )}
        </div>
      </button>
    );
  },
);

FloatButton.displayName = 'FloatButton';
