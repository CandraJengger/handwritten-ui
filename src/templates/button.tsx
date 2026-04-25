import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  href?: string;
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  border?: 'normal' | 'rough' | 'hachure';
  fullWidth?: boolean;
}

const sizeClasses: Record<string, string> = {
  sm: 'px-4 py-2 min-w-[80px]',
  md: 'px-6 py-[10px] min-w-[120px]',
  lg: 'px-8 py-[14px] min-w-[120px]',
};

const fontSizeClasses: Record<string, string> = {
  sm: 'text-[0.8rem]',
  md: 'text-[0.95rem]',
  lg: 'text-[1.1rem]',
};

const roundedClasses: Record<string, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
};

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

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      label,
      href,
      onClick,
      variant = 'filled',
      size = 'md',
      fullWidth = false,
      className = '',
      rounded = 'none',
      border = 'rough',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const btnRef = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      if (border === 'normal') return;

      const canvas = canvasRef.current;
      const btn = btnRef.current;
      if (!canvas || !btn) return;

      const w = btn.offsetWidth;
      const h = btn.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const roughness = hovered ? 2.5 : 1.2;
      const bowing = hovered ? 2 : 0.5;
      const radius = roundedValues[rounded] || 0;

      const baseOptions = {
        roughness,
        bowing,
        stroke: '#333333',
        strokeWidth: 2,
        fillStyle: border === 'hachure' ? 'hachure' : 'solid',
        hachureAngle: -41,
        hachureGap: 4,
      };

      if (variant === 'filled') {
        const options = {
          ...baseOptions,
          fill: '#333333',
        };
        if (radius > 0) {
          rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, radius), options);
        } else {
          rc.rectangle(2, 2, w - 4, h - 4, options);
        }
      } else {
        const options = {
          ...baseOptions,
          fill: hovered ? 'rgba(51,51,51,0.06)' : 'transparent',
        };
        if (radius > 0) {
          rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, radius), options);
        } else {
          rc.rectangle(2, 2, w - 4, h - 4, options);
        }
      }
    }, [hovered, variant, size, rounded, border]);

    const textColorClass = variant === 'filled' ? 'text-white' : 'text-ink';

    const getNormalStyles = () => {
      if (border !== 'normal') return '';
      if (variant === 'filled') {
        return 'bg-[#333333] border-2 border-[#333333] transition-colors duration-200';
      }
      return 'bg-transparent border-2 border-[#333333] hover:bg-black/5 transition-colors duration-200';
    };

    const content = (
      <div
        ref={btnRef}
        className={`rough-btn ${className} relative cursor-pointer items-center justify-center select-none ${sizeClasses[size]} ${roundedClasses[rounded]} ${getNormalStyles()} ${fullWidth ? 'flex' : 'inline-flex'}`.trim()}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {border !== 'normal' && (
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          />
        )}
        <span
          className={`font-virgil relative z-[1] ${fontSizeClasses[size]} ${textColorClass} tracking-[0.02em] whitespace-nowrap transition-colors duration-200`}
        >
          {label}
        </span>
      </div>
    );

    if (href) {
      return (
        <a
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={`no-underline ${fullWidth ? 'block' : 'inline-block'}`}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        onClick={onClick}
        ref={ref as React.Ref<HTMLButtonElement>}
        className={`cursor-pointer border-none bg-transparent p-0 ${fullWidth ? 'block w-full' : 'inline-block w-auto'}`}
        type={type}
        {...props}
      >
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';
