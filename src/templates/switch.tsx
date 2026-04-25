import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface SwitchProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
}

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

export const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ checked = false, onChange, label, disabled = false, ...props }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const w = 50;
      const h = 28;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const roughness = hovered ? 1.5 : 1.0;
      const trackColor = checked ? '#333333' : 'transparent';
      const thumbColor = '#333333'; // Always black
      const thumbStrokeColor = checked ? '#ffffff' : '#333333';

      // Draw Track (Rounded)
      rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, 14), {
        roughness,
        bowing: 0.5,
        stroke: '#333333',
        strokeWidth: 2,
        fill: trackColor,
        fillStyle: checked ? 'hachure' : 'solid',
        hachureAngle: -41,
        hachureGap: 3,
      });

      // Draw Thumb
      const thumbRadius = 8;
      const thumbX = checked ? w - 14 : 14;
      const thumbY = h / 2;

      rc.circle(thumbX, thumbY, thumbRadius * 2, {
        roughness: roughness * 1.2,
        stroke: thumbStrokeColor,
        strokeWidth: 2,
        fill: thumbColor,
        fillStyle: 'solid',
      });
    }, [checked, hovered]);

    return (
      <label
        className={`inline-flex items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} select-none`}
      >
        <div
          className="relative"
          onMouseEnter={() => !disabled && setHovered(true)}
          onMouseLeave={() => !disabled && setHovered(false)}
        >
          <canvas
            ref={canvasRef}
            className="block transition-all duration-300"
            style={{ width: 50, height: 28 }}
          />
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            checked={checked}
            onChange={(e) => !disabled && onChange?.(e.target.checked)}
            disabled={disabled}
            {...props}
          />
        </div>
        {label && (
          <span className="font-virgil text-sm tracking-[0.02em] text-[#333333]">
            {label}
          </span>
        )}
      </label>
    );
  },
);

Switch.displayName = 'Switch';
