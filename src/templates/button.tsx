import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface ButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: 'filled' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
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

export function Button({
  label,
  href,
  onClick,
  variant = 'filled',
  size = 'md',
  fullWidth = false,
  className = '',
}: ButtonProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
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

    if (variant === 'filled') {
      rc.rectangle(2, 2, w - 4, h - 4, {
        fill: '#333333',
        fillStyle: 'solid',
        stroke: '#333333',
        strokeWidth: 2,
        roughness,
        bowing,
      });
    } else {
      rc.rectangle(2, 2, w - 4, h - 4, {
        stroke: '#333333',
        strokeWidth: 2,
        fill: hovered ? 'rgba(51,51,51,0.06)' : 'transparent',
        fillStyle: 'solid',
        roughness,
        bowing,
      });
    }
  }, [hovered, variant, size]);

  const textColorClass = variant === 'filled' ? 'text-white' : 'text-ink';

  const content = (
    <div
      ref={btnRef}
      className={`rough-btn ${className} relative cursor-pointer items-center justify-center select-none ${sizeClasses[size]} ${fullWidth ? 'flex' : 'inline-flex'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
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
        className={`no-underline ${fullWidth ? 'block' : 'inline-block'}`}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`cursor-pointer border-none bg-transparent p-0 ${fullWidth ? 'block w-full' : 'inline-block w-auto'}`}
    >
      {content}
    </button>
  );
}
