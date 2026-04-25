import React, { useCallback, useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface SliderProps extends Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'value' | 'defaultValue' | 'onChange'
> {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
}

const TRACK_HEIGHT = 8;
const THUMB_SIZE = 20;

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      value: controlledValue,
      defaultValue = [0],
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const values = controlledValue ?? internalValue;

    const trackCanvasRef = useRef<HTMLCanvasElement>(null);
    const thumbCanvasRef = useRef<HTMLCanvasElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    const [hovered, setHovered] = useState(false);
    const nMin = Number(min);
    const nMax = Number(max);
    const nStep = Number(step);

    const percent = Math.min(
      1,
      Math.max(0, (values[0] - nMin) / (nMax - nMin)),
    );

    // Draw track
    useEffect(() => {
      const canvas = trackCanvasRef.current;
      const container = trackRef.current;
      if (!canvas || !container) return;

      const w = container.offsetWidth;
      const h = TRACK_HEIGHT + 6;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const strokeColor = disabled ? '#cccccc' : '#999999';

      // Background track
      rc.line(THUMB_SIZE / 2, h / 2, w - THUMB_SIZE / 2, h / 2, {
        roughness: 1.2,
        bowing: 0.8,
        stroke: strokeColor,
        strokeWidth: TRACK_HEIGHT,
      });

      // Filled portion
      const fillEnd = THUMB_SIZE / 2 + percent * (w - THUMB_SIZE);
      if (fillEnd > THUMB_SIZE / 2) {
        rc.line(THUMB_SIZE / 2, h / 2, fillEnd, h / 2, {
          roughness: 1.0,
          bowing: 0.5,
          stroke: disabled ? '#aaaaaa' : '#333333',
          strokeWidth: TRACK_HEIGHT,
        });
      }
    }, [percent, disabled]);

    // Draw thumb
    useEffect(() => {
      const canvas = thumbCanvasRef.current;
      if (!canvas) return;

      const size = THUMB_SIZE + 6;
      canvas.width = size;
      canvas.height = size;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      const roughness = dragging ? 2.0 : hovered ? 1.8 : 1.2;
      const strokeColor = disabled ? '#cccccc' : '#333333';

      rc.circle(size / 2, size / 2, THUMB_SIZE, {
        roughness,
        bowing: 0.8,
        stroke: strokeColor,
        strokeWidth: 2,
        fill: 'white',
        fillStyle: 'solid',
      });
    }, [dragging, hovered, disabled]);

    const getPercent = useCallback(
      (clientX: number) => {
        const track = trackRef.current;
        if (!track) return percent;
        const rect = track.getBoundingClientRect();
        const raw =
          (clientX - rect.left - THUMB_SIZE / 2) / (rect.width - THUMB_SIZE);
        const clamped = Math.min(1, Math.max(0, raw));
        const rawValue = nMin + clamped * (nMax - nMin);
        const stepped = Math.round(rawValue / nStep) * nStep;
        return Math.min(nMax, Math.max(nMin, stepped));
      },
      [nMin, nMax, nStep, percent],
    );

    const handlePointerDown = (e: React.PointerEvent) => {
      if (disabled) return;
      setDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      const newVal = getPercent(e.clientX);
      const next = [newVal];
      if (controlledValue === undefined) setInternalValue(next);
      onValueChange?.(next);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
      if (!dragging || disabled) return;
      const newVal = getPercent(e.clientX);
      const next = [newVal];
      if (controlledValue === undefined) setInternalValue(next);
      onValueChange?.(next);
    };

    const handlePointerUp = () => setDragging(false);

    const thumbLeft = `calc(${percent * 100}% - ${THUMB_SIZE / 2}px)`;

    return (
      <div
        className={`relative flex w-full items-center ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} ${className}`.trim()}
        style={{
          height: THUMB_SIZE + 6,
          paddingLeft: THUMB_SIZE / 2,
          paddingRight: THUMB_SIZE / 2,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onMouseEnter={() => !disabled && setHovered(true)}
        onMouseLeave={() => !disabled && setHovered(false)}
        {...props}
      >
        {/* Track */}
        <div
          ref={trackRef}
          className="relative w-full"
          style={{ height: TRACK_HEIGHT + 6 }}
        >
          <canvas
            ref={trackCanvasRef}
            className="absolute top-0 left-0 h-full w-full"
          />
        </div>

        {/* Thumb */}
        <div
          className="pointer-events-none absolute"
          style={{
            left: thumbLeft,
            top: '50%',
            transform: 'translateY(-50%)',
            width: THUMB_SIZE + 6,
            height: THUMB_SIZE + 6,
          }}
        >
          <canvas
            ref={thumbCanvasRef}
            className="block"
            style={{ width: THUMB_SIZE + 6, height: THUMB_SIZE + 6 }}
          />
        </div>

        {/* Native input for accessibility */}
        <input
          ref={ref}
          type="range"
          className="sr-only"
          min={min}
          max={max}
          step={step}
          value={values[0]}
          disabled={disabled}
          onChange={(e) => {
            const next = [Number(e.target.value)];
            if (controlledValue === undefined) setInternalValue(next);
            onValueChange?.(next);
          }}
        />
      </div>
    );
  },
);

Slider.displayName = 'Slider';
