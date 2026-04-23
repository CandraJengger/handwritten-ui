import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  label?: string;
  description?: string;
  className?: string;
}

export function Checkbox({
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
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const checked = controlledChecked ?? internalChecked;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);

  const SIZE = 20;
  const CANVAS_SIZE = SIZE + 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const roughness = hovered ? 1.8 : 1.2;
    const bowing = hovered ? 1.0 : 0.5;
    const strokeColor = disabled ? '#bbbbbb' : '#333333';

    // Draw the box
    rc.rectangle(2, 2, SIZE, SIZE, {
      roughness,
      bowing,
      stroke: strokeColor,
      strokeWidth: 2,
    });

    // Draw checkmark when checked
    if (checked) {
      // A hand-drawn checkmark ✓
      rc.line(6, CANVAS_SIZE / 2, 10, CANVAS_SIZE - 6, {
        roughness: 1.5,
        bowing: 0.8,
        stroke: strokeColor,
        strokeWidth: 2.5,
      });
      rc.line(10, CANVAS_SIZE - 6, SIZE - 2, 6, {
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
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
      >
        <canvas
          ref={canvasRef}
          className="block transition-all duration-200"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        />
        <input
          type="checkbox"
          className="sr-only"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={handleChange}
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
}
