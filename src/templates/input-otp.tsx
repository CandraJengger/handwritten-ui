import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';

// ─── Helpers ─────────────────────────────────────────────────────────────────

const slotSizeValues: Record<string, number> = {
  sm: 36,
  md: 44,
  lg: 52,
};

const fontSizeClasses: Record<string, string> = {
  sm: 'text-base',
  md: 'text-xl',
  lg: 'text-2xl',
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

// ─── Context ─────────────────────────────────────────────────────────────────

interface InputOTPContextType {
  value: string;
  maxLength: number;
  activeIndex: number;
  setActiveIndex: (i: number) => void;
  handleChange: (char: string, index: number) => void;
  handleBackspace: (index: number) => void;
  disabled: boolean;
  pattern?: RegExp;
  size: 'sm' | 'md' | 'lg';
  rounded: 'none' | 'sm' | 'md' | 'lg';
  registerRef: (index: number, el: HTMLInputElement | null) => void;
  focusSlot: (index: number) => void;
}

const InputOTPContext = createContext<InputOTPContextType | undefined>(
  undefined,
);

function useInputOTP() {
  const ctx = useContext(InputOTPContext);
  if (!ctx)
    throw new Error('InputOTP components must be wrapped in <InputOTP />');
  return ctx;
}

// ─── InputOTP (root) ─────────────────────────────────────────────────────────

interface InputOTPProps {
  children: React.ReactNode;
  maxLength: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  disabled?: boolean;
  pattern?: RegExp;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function InputOTP({
  children,
  maxLength,
  value: controlledValue,
  defaultValue = '',
  onChange,
  onComplete,
  disabled = false,
  pattern,
  size = 'md',
  rounded = 'none',
  className = '',
}: InputOTPProps) {
  const [internalValue, setInternalValue] = useState(
    defaultValue.padEnd(maxLength, '').slice(0, maxLength),
  );
  const value = controlledValue ?? internalValue;
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputEls = useRef<(HTMLInputElement | null)[]>([]);

  const registerRef = useCallback(
    (index: number, el: HTMLInputElement | null) => {
      inputEls.current[index] = el;
    },
    [],
  );

  const focusSlot = useCallback((index: number) => {
    inputEls.current[index]?.focus();
  }, []);

  const handleChange = useCallback(
    (char: string, index: number) => {
      if (disabled) return;
      if (pattern && !pattern.test(char)) return;

      const arr = value.split('');
      // Pad to maxLength if needed
      while (arr.length < maxLength) arr.push('');
      arr[index] = char;
      const next = arr.join('').slice(0, maxLength);

      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);

      // Move focus to next slot
      if (index < maxLength - 1) {
        setActiveIndex(index + 1);
        focusSlot(index + 1);
      }

      // Check completion
      const trimmed = next.replace(/ /g, '');
      if (trimmed.length === maxLength) {
        onComplete?.(trimmed);
      }
    },
    [
      value,
      maxLength,
      controlledValue,
      onChange,
      onComplete,
      disabled,
      pattern,
      focusSlot,
    ],
  );

  const handleBackspace = useCallback(
    (index: number) => {
      if (disabled) return;

      const arr = value.split('');
      while (arr.length < maxLength) arr.push('');

      if (arr[index] && arr[index] !== ' ') {
        arr[index] = ' ';
      } else if (index > 0) {
        arr[index - 1] = ' ';
        setActiveIndex(index - 1);
        focusSlot(index - 1);
      }

      const next = arr.join('').slice(0, maxLength);
      if (controlledValue === undefined) setInternalValue(next);
      onChange?.(next);
    },
    [value, maxLength, controlledValue, onChange, disabled, focusSlot],
  );

  return (
    <InputOTPContext.Provider
      value={{
        value,
        maxLength,
        activeIndex,
        setActiveIndex,
        handleChange,
        handleBackspace,
        disabled,
        pattern,
        size,
        rounded,
        registerRef,
        focusSlot,
      }}
    >
      <div
        className={`inline-flex items-center gap-2 ${className}`.trim()}
        role="group"
        aria-label="One-time password input"
      >
        {children}
      </div>
    </InputOTPContext.Provider>
  );
}

// ─── InputOTPGroup ───────────────────────────────────────────────────────────

interface InputOTPGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function InputOTPGroup({
  children,
  className = '',
}: InputOTPGroupProps) {
  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`.trim()}>
      {children}
    </div>
  );
}

// ─── InputOTPSlot ────────────────────────────────────────────────────────────

interface InputOTPSlotProps {
  index: number;
  className?: string;
}

const CANVAS_PADDING = 4;

export function InputOTPSlot({ index, className = '' }: InputOTPSlotProps) {
  const {
    value,
    activeIndex,
    setActiveIndex,
    handleChange,
    handleBackspace,
    disabled,
    size,
    rounded,
    registerRef,
    focusSlot,
  } = useInputOTP();

  const slotSize = slotSizeValues[size];
  const radius = roundedValues[rounded] || 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const char = value[index] || '';
  const isActive = activeIndex === index;
  const hasValue = char.trim().length > 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const canvasSize = slotSize + CANVAS_PADDING;
    canvas.width = canvasSize;
    canvas.height = canvasSize;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    const roughness = isActive ? 1.8 : hovered ? 1.4 : 1.0;
    const strokeColor = disabled ? '#cccccc' : isActive ? '#333333' : '#999999';
    const strokeWidth = isActive ? 2 : 1.5;

    const drawOptions = {
      roughness,
      bowing: 0.5,
      stroke: strokeColor,
      strokeWidth,
    };

    if (radius > 0) {
      rc.path(
        getRoundedRectPath(2, 2, slotSize, slotSize, radius),
        drawOptions,
      );
    } else {
      rc.rectangle(2, 2, slotSize, slotSize, drawOptions);
    }

    // Draw caret when active and no value
    if (isActive && !hasValue) {
      const caretX = canvasSize / 2;
      rc.line(caretX, 10, caretX, canvasSize - 10, {
        roughness: 0.5,
        stroke: '#333333',
        strokeWidth: 1.5,
      });
    }
  }, [isActive, hovered, hasValue, disabled, slotSize, radius]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      handleBackspace(index);
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      setActiveIndex(index - 1);
      focusSlot(index - 1);
    } else if (e.key === 'ArrowRight' && index < value.length - 1) {
      e.preventDefault();
      setActiveIndex(index + 1);
      focusSlot(index + 1);
    }
  };

  const totalSize = slotSize + CANVAS_PADDING;

  return (
    <div
      className={`relative ${
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text'
      } ${className}`.trim()}
      style={{
        width: totalSize,
        height: totalSize,
      }}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => !disabled && setHovered(false)}
      onClick={() => {
        if (!disabled) {
          setActiveIndex(index);
          focusSlot(index);
        }
      }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />

      {/* Visible character */}
      <div
        className={`font-virgil absolute inset-0 z-10 flex items-center justify-center ${fontSizeClasses[size]} font-bold text-[#333333]`}
      >
        {hasValue ? char : ''}
      </div>

      {/* Hidden input for each slot */}
      <input
        ref={(el) => {
          registerRef(index, el as HTMLInputElement);
        }}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={1}
        value=""
        disabled={disabled}
        className="absolute inset-0 z-20 h-full w-full cursor-text border-none bg-transparent text-center text-transparent caret-transparent outline-none"
        onFocus={() => setActiveIndex(index)}
        onBlur={() => setActiveIndex(-1)}
        onKeyDown={handleKeyDown}
        onChange={(e) => {
          const val = e.target.value;
          if (val.length > 0) {
            handleChange(val[val.length - 1], index);
          }
        }}
      />
    </div>
  );
}

// ─── InputOTPSeparator ───────────────────────────────────────────────────────

interface InputOTPSeparatorProps {
  className?: string;
}

export function InputOTPSeparator({ className = '' }: InputOTPSeparatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const w = 16;
    const h = 8;
    canvas.width = w;
    canvas.height = h;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    rc.line(2, h / 2, w - 2, h / 2, {
      roughness: 1.5,
      bowing: 1.0,
      stroke: '#999999',
      strokeWidth: 2,
    });
  }, []);

  return (
    <div
      role="separator"
      className={`inline-flex items-center justify-center ${className}`.trim()}
    >
      <canvas
        ref={canvasRef}
        className="block"
        style={{ width: 16, height: 8 }}
      />
    </div>
  );
}
