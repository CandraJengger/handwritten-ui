import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

export interface RateProps {
  count?: number;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
}

const sizeValues = {
  sm: 20,
  md: 32,
  lg: 44,
};

interface StarProps {
  filled: boolean;
  hovered: boolean;
  size: number;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  disabled: boolean;
}

const Star = ({
  filled,
  hovered,
  size,
  onClick,
  onMouseEnter,
  onMouseLeave,
  disabled,
}: StarProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, size, size);

    const padding = 2;
    const s = size - padding * 2;
    const center = size / 2;

    // Star points
    const points: [number, number][] = [];
    const outerRadius = s / 2;
    const innerRadius = outerRadius * 0.4;

    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI) / 5 - Math.PI / 2;
      const r = i % 2 === 0 ? outerRadius : innerRadius;
      points.push([center + r * Math.cos(angle), center + r * Math.sin(angle)]);
    }

    const roughness = hovered ? 1.5 : 1.0;

    rc.polygon(points, {
      stroke: filled || hovered ? '#f59e0b' : '#9ca3af',
      strokeWidth: 1.5,
      roughness,
      bowing: hovered ? 1.5 : 0.5,
      fill: filled ? '#f59e0b' : hovered ? '#fef3c7' : 'transparent',
      fillStyle: filled ? 'solid' : 'hachure',
      hachureAngle: -41,
      hachureGap: 3,
    });
  }, [filled, hovered, size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} transition-transform duration-200 ${hovered && !disabled ? 'scale-110' : 'scale-100'}`}
    />
  );
};

export const Rate = React.forwardRef<HTMLDivElement, RateProps>(
  (
    {
      count = 5,
      value: controlledValue,
      defaultValue = 0,
      onChange,
      size = 'md',
      disabled = false,
      readonly = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [hoverValue, setHoverValue] = useState<number | null>(null);

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;
    const starSize = sizeValues[size];

    const handleStarClick = (index: number) => {
      if (disabled || readonly) return;
      const newValue = index + 1;
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    const handleMouseEnter = (index: number) => {
      if (disabled || readonly) return;
      setHoverValue(index + 1);
    };

    const handleMouseLeave = () => {
      if (disabled || readonly) return;
      setHoverValue(null);
    };

    const stars = Array.from({ length: count }, (_, i) => {
      const isFilled = hoverValue !== null ? i < hoverValue : i < value;
      const isHovered = hoverValue !== null && i < hoverValue;

      return (
        <Star
          key={i}
          filled={isFilled}
          hovered={isHovered}
          size={starSize}
          disabled={disabled || readonly}
          onClick={() => handleStarClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        />
      );
    });

    return (
      <div
        ref={ref}
        className={`inline-flex items-center gap-1 ${className} ${disabled ? 'opacity-50' : ''}`}
        {...props}
      >
        {stars}
      </div>
    );
  },
);

Rate.displayName = 'Rate';
