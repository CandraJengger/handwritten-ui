import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';

// ─── Context ─────────────────────────────────────────────────────────────────

interface TabsContextType {
  value: string;
  onValueChange: (value: string) => void;
  variant: 'default' | 'outline' | 'filled';
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be wrapped in <Tabs />');
  }
  return context;
}

// ─── Tabs ────────────────────────────────────────────────────────────────────

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: 'default' | 'outline' | 'filled';
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      defaultValue = '',
      value: controlledValue,
      onValueChange,
      variant = 'default',
      children,
      className = '',
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      if (onValueChange) {
        onValueChange(newValue);
      }
    };

    return (
      <TabsContext.Provider
        value={{ value, onValueChange: handleValueChange, variant }}
      >
        <div ref={ref} className={`w-full ${className}`.trim()} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = 'Tabs';

// ─── TabsList ────────────────────────────────────────────────────────────────

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className = '', ...props }, forwardedRef) => {
    const { variant } = useTabs();
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

      // Small delay to ensure styles are applied and element has dimensions
      const timer = setTimeout(() => {
        const w = container.offsetWidth;
        const h = container.offsetHeight;
        canvas.width = w;
        canvas.height = h;

        const rc = rough.canvas(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);

        // Draw a subtle rough border/background for the tabs list
        const isOutline = variant === 'outline';
        rc.rectangle(2, 2, w - 4, h - 4, {
          roughness: 1.5,
          bowing: 1,
          stroke: isOutline ? '#333333' : '#cccccc',
          strokeWidth: isOutline ? 1.5 : 1,
          fill: isOutline ? 'white' : '#f4f4f5',
          fillStyle: 'solid',
        });
      }, 50);

      return () => clearTimeout(timer);
    }, [children, variant, forwardedRef]);

    return (
      <div
        ref={containerRef}
        className={`relative inline-flex items-center justify-center p-1 text-[#888888] ${className}`.trim()}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
        <div className="relative z-10 flex items-center gap-1">{children}</div>
      </div>
    );
  },
);
TabsList.displayName = 'TabsList';

// ─── TabsTrigger ─────────────────────────────────────────────────────────────

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: React.ReactNode;
}

export const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  TabsTriggerProps
>(({ value, children, className = '', disabled, ...props }, forwardedRef) => {
  const { value: selectedValue, onValueChange, variant } = useTabs();
  const isActive = selectedValue === value;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;

    if (typeof forwardedRef === 'function') {
      forwardedRef(button);
    } else if (forwardedRef) {
      forwardedRef.current = button;
    }

    if (!canvas || !button) return;

    const timer = setTimeout(() => {
      const w = button.offsetWidth;
      const h = button.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      const isOutline = variant === 'outline';
      const isFilled = variant === 'filled';

      if (isActive) {
        // Active tab styling
        rc.rectangle(2, 2, w - 4, h - 4, {
          roughness: 1.2,
          bowing: 0.5,
          stroke: '#333333',
          strokeWidth: 1.5,
          fill: isFilled ? '#333333' : isOutline ? '#f4f4f5' : 'white',
          fillStyle: 'solid',
        });
      } else if (hovered && !disabled) {
        // Hover tab styling
        rc.rectangle(2, 2, w - 4, h - 4, {
          roughness: 1.5,
          bowing: 0.8,
          stroke: isOutline ? '#666666' : '#aaaaaa',
          strokeWidth: 1,
        });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isActive, hovered, disabled, children, variant, forwardedRef]);

  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      onClick={() => onValueChange(value)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`font-virgil! relative inline-flex items-center justify-center px-3 py-1.5 text-sm font-bold tracking-[0.02em] whitespace-nowrap transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
        isActive
          ? variant === 'filled'
            ? 'text-white'
            : 'text-[#333333]'
          : 'text-[#888888] hover:text-[#333333]'
      } ${className}`.trim()}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

// ─── TabsContent ─────────────────────────────────────────────────────────────

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className = '', ...props }, ref) => {
    const { value: selectedValue } = useTabs();

    if (selectedValue !== value) {
      return null;
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={`font-virgil mt-2 text-[#333333] focus-visible:outline-none ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsContent.displayName = 'TabsContent';
