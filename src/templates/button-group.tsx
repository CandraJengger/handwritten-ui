import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';

// ─── Context ─────────────────────────────────────────────────────────────────

interface ButtonGroupContextType {
  type: 'single' | 'multiple';
  value: string[];
  onToggle: (val: string) => void;
  variant: 'outline' | 'filled';
  size: 'sm' | 'md' | 'lg';
  orientation: 'horizontal' | 'vertical';
}

const ButtonGroupContext = createContext<ButtonGroupContextType | undefined>(
  undefined,
);

function useButtonGroup() {
  const ctx = useContext(ButtonGroupContext);
  if (!ctx)
    throw new Error('ButtonGroupItem must be used inside <ButtonGroup />');
  return ctx;
}

// ─── ButtonGroup (container) ─────────────────────────────────────────────────

interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (value: string[]) => void;
  variant?: 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  orientation?: 'horizontal' | 'vertical';
}

export const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  (
    {
      children,
      type = 'single',
      value: controlledValue,
      defaultValue,
      onValueChange,
      variant = 'outline',
      size = 'md',
      orientation = 'horizontal',
      className = '',
      ...props
    },
    forwardedRef,
  ) => {
    const [internalValue, setInternalValue] = useState<string[]>(
      defaultValue || [],
    );

    const value = controlledValue ?? internalValue;

    const onToggle = (val: string) => {
      let next: string[];

      if (type === 'single') {
        next = value.includes(val) ? [] : [val];
      } else {
        next = value.includes(val)
          ? value.filter((v) => v !== val)
          : [...value, val];
      }

      if (!controlledValue) setInternalValue(next);
      onValueChange?.(next);
    };

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      const container = containerRef.current;

      if (typeof forwardedRef === 'function') {
        forwardedRef(container);
      } else if (forwardedRef) {
        forwardedRef.current = container;
      }

      if (!canvas || !container) return;

      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      // Outer border
      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.0,
        bowing: 0.5,
        stroke: '#333333',
        strokeWidth: 1.5,
      });

      // Inner dividers
      const items = container.querySelectorAll('[data-button-group-item]');
      items.forEach((item, i) => {
        if (i === 0) return;
        const el = item as HTMLElement;

        if (orientation === 'horizontal') {
          const x = el.offsetLeft;
          rc.line(x, 4, x, h - 4, {
            roughness: 1.0,
            bowing: 0.3,
            stroke: '#333333',
            strokeWidth: 1.5,
          });
        } else {
          const y = el.offsetTop;
          rc.line(4, y, w - 4, y, {
            roughness: 1.0,
            bowing: 0.3,
            stroke: '#333333',
            strokeWidth: 1.5,
          });
        }
      });
    }, [value, orientation, size, forwardedRef]);

    return (
      <ButtonGroupContext.Provider
        value={{ type, value, onToggle, variant, size, orientation }}
      >
        <div
          ref={containerRef}
          role="group"
          className={`relative inline-flex ${
            orientation === 'vertical' ? 'flex-col' : 'flex-row'
          } ${className}`.trim()}
          {...props}
        >
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          />
          {children}
        </div>
      </ButtonGroupContext.Provider>
    );
  },
);
ButtonGroup.displayName = 'ButtonGroup';

// ─── ButtonGroupItem ─────────────────────────────────────────────────────────

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

interface ButtonGroupItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

export const ButtonGroupItem = React.forwardRef<
  HTMLButtonElement,
  ButtonGroupItemProps
>(
  (
    { value, children, disabled = false, className = '', ...props },
    forwardedRef,
  ) => {
    const { value: selected, onToggle, variant, size } = useButtonGroup();
    const isActive = selected.includes(value);
    const [hovered, setHovered] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const itemRef = useRef<HTMLButtonElement>(null);

    // Draw hachure fill when active
    useEffect(() => {
      const canvas = canvasRef.current;
      const btn = itemRef.current;

      if (typeof forwardedRef === 'function') {
        forwardedRef(btn);
      } else if (forwardedRef) {
        forwardedRef.current = btn;
      }

      if (!canvas || !btn) return;

      const w = btn.offsetWidth;
      const h = btn.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      if (isActive) {
        if (variant === 'filled') {
          rc.rectangle(0, 0, w, h, {
            roughness: 0.8,
            stroke: 'transparent',
            fill: '#333333',
            fillStyle: 'solid',
          });
        } else {
          rc.rectangle(0, 0, w, h, {
            roughness: 1.2,
            stroke: 'transparent',
            fill: '#333333',
            fillStyle: 'hachure',
            hachureAngle: -41,
            hachureGap: 4,
            fillWeight: 1,
          });
        }
      } else if (hovered && !disabled) {
        rc.rectangle(0, 0, w, h, {
          roughness: 0.6,
          stroke: 'transparent',
          fill: 'rgba(51,51,51,0.06)',
          fillStyle: 'solid',
        });
      }
    }, [isActive, hovered, variant, size, disabled, forwardedRef]);

    const textColor =
      isActive && variant === 'filled' ? 'text-white' : 'text-[#333333]';

    return (
      <button
        ref={itemRef}
        data-button-group-item
        type="button"
        disabled={disabled}
        onClick={() => !disabled && onToggle(value)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={`font-virgil relative z-[1] cursor-pointer border-none bg-transparent font-bold tracking-[0.02em] transition-colors duration-200 select-none ${sizeClasses[size]} ${textColor} ${
          disabled ? 'cursor-not-allowed opacity-50' : ''
        } ${className}`.trim()}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
        <span className="relative z-[2]">{children}</span>
      </button>
    );
  },
);
ButtonGroupItem.displayName = 'ButtonGroupItem';
