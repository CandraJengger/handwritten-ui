import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';

// ─── Context ─────────────────────────────────────────────────────────────────

interface RadioGroupContextType {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(
  undefined,
);

function useRadioGroup() {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error('RadioGroupItem must be wrapped in <RadioGroup />');
  return ctx;
}

// ─── RadioGroup ──────────────────────────────────────────────────────────────

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export function RadioGroup({
  children,
  value: controlledValue,
  defaultValue = '',
  onValueChange,
  disabled = false,
  orientation = 'vertical',
  className = '',
}: RadioGroupProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const value = controlledValue ?? internalValue;

  const onChange = (next: string) => {
    if (controlledValue === undefined) setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <RadioGroupContext.Provider value={{ value, onChange, disabled }}>
      <div
        role="radiogroup"
        className={`flex ${orientation === 'horizontal' ? 'flex-row gap-6' : 'flex-col gap-3'} ${className}`.trim()}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}

// ─── RadioGroupItem ──────────────────────────────────────────────────────────

const RADIO_SIZE = 20;
const CANVAS_SIZE = RADIO_SIZE + 4;

interface RadioGroupItemProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export function RadioGroupItem({
  value,
  label,
  description,
  disabled: itemDisabled = false,
  id,
  className = '',
}: RadioGroupItemProps) {
  const {
    value: selectedValue,
    onChange,
    disabled: groupDisabled,
  } = useRadioGroup();
  const disabled = groupDisabled || itemDisabled;
  const isChecked = selectedValue === value;
  const [hovered, setHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const radioId = id || `radio-${value}`;

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
    const strokeColor = disabled ? '#cccccc' : '#333333';

    // Outer circle
    rc.circle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, RADIO_SIZE, {
      roughness,
      bowing: 0.5,
      stroke: strokeColor,
      strokeWidth: isChecked ? 2 : 1.5,
    });

    // Inner dot when checked
    if (isChecked) {
      rc.circle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, RADIO_SIZE / 2.5, {
        roughness: roughness * 1.2,
        stroke: strokeColor,
        strokeWidth: 1,
        fill: strokeColor,
        fillStyle: 'solid',
      });
    }
  }, [isChecked, hovered, disabled]);

  return (
    <div
      className={`inline-flex items-start gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} select-none ${className}`.trim()}
      onClick={() => !disabled && onChange(value)}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
    >
      <div
        className="relative shrink-0"
        style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
      >
        <canvas
          ref={canvasRef}
          className="block"
          style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
        />
        <input
          type="radio"
          className="sr-only"
          id={radioId}
          value={value}
          checked={isChecked}
          disabled={disabled}
          onChange={() => !disabled && onChange(value)}
        />
      </div>

      {(label || description) && (
        <div className="flex flex-col gap-0.5 pt-0.5">
          {label && (
            <label
              htmlFor={radioId}
              className={`font-virgil text-sm leading-tight font-bold tracking-[0.02em] ${disabled ? 'text-[#999999]' : 'text-[#333333]'}`}
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
