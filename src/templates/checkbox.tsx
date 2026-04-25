import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface CheckboxProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> {
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
}

const CHECKBOX_SIZE = 20;
const CHECKBOX_CANVAS_SIZE = CHECKBOX_SIZE + 4;

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      checked: controlledChecked,
      defaultChecked = false,
      onCheckedChange,
      disabled = false,
      id,
      name,
      value,
      label,
      description,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const checked = controlledChecked ?? internalChecked;

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = CHECKBOX_CANVAS_SIZE;
      canvas.height = CHECKBOX_CANVAS_SIZE;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, CHECKBOX_CANVAS_SIZE, CHECKBOX_CANVAS_SIZE);

      const roughness = hovered ? 1.8 : 1.2;
      const bowing = hovered ? 1.0 : 0.5;
      const strokeColor = disabled ? '#bbbbbb' : '#333333';

      // Draw the box
      rc.rectangle(2, 2, CHECKBOX_SIZE, CHECKBOX_SIZE, {
        roughness,
        bowing,
        stroke: strokeColor,
        strokeWidth: 2,
      });

      // Draw checkmark when checked
      if (checked) {
        // A hand-drawn checkmark ✓
        rc.line(6, CHECKBOX_CANVAS_SIZE / 2, 10, CHECKBOX_CANVAS_SIZE - 6, {
          roughness: 1.5,
          bowing: 0.8,
          stroke: strokeColor,
          strokeWidth: 2.5,
        });
        rc.line(10, CHECKBOX_CANVAS_SIZE - 6, CHECKBOX_SIZE - 2, 6, {
          roughness: 1.5,
          bowing: 0.8,
          stroke: strokeColor,
          strokeWidth: 2.5,
        });
      }
    }, [checked, hovered, disabled]);

    const handleChange = () => {
      if (disabled) return;
      const next = !checked;
      if (controlledChecked === undefined) setInternalChecked(next);
      onCheckedChange?.(next);
    };

    const checkboxId = id || `checkbox-${name || value || ''}`;

    return (
      <div
        className={`inline-flex items-start gap-3 ${
          disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        } select-none ${className}`.trim()}
        onClick={handleChange}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => !disabled && setHovered(false)}
      >
        <div
          className="relative shrink-0"
          style={{ width: CHECKBOX_CANVAS_SIZE, height: CHECKBOX_CANVAS_SIZE }}
        >
          <canvas
            ref={canvasRef}
            className="block transition-all duration-200"
            style={{
              width: CHECKBOX_CANVAS_SIZE,
              height: CHECKBOX_CANVAS_SIZE,
            }}
          />
          <input
            ref={ref}
            type="checkbox"
            className="sr-only"
            id={checkboxId}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={handleChange}
            {...props}
          />
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5 pt-0.5">
            {label && (
              <label
                htmlFor={checkboxId}
                className={`font-virgil text-sm leading-tight font-bold tracking-[0.02em] ${
                  disabled ? 'text-[#999999]' : 'text-[#333333]'
                }`}
              >
                {label}
              </label>
            )}
            {description && (
              <span className="font-virgil text-xs leading-tight tracking-[0.01em] text-[#888888]">
                {description}
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';
