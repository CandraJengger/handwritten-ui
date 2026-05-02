import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';
import { Slot } from '@radix-ui/react-slot';

// ─── Context ─────────────────────────────────────────────────────────────────

interface PopoverContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export function usePopover() {
  const ctx = useContext(PopoverContext);
  if (!ctx)
    throw new Error('Popover components must be wrapped in <Popover />');
  return ctx;
}

// ─── Popover (root) ──────────────────────────────────────────────────────────

interface PopoverProps {
  children: React.ReactNode;
  asChild?: boolean;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  children,
  asChild = false,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: PopoverProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  const Comp = asChild ? Slot : 'div';

  return (
    <PopoverContext.Provider value={{ open, setOpen }}>
      <Comp className="relative inline-block text-left">{children}</Comp>
    </PopoverContext.Provider>
  );
}

// ─── PopoverTrigger ──────────────────────────────────────────────────────────

interface PopoverTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  children: React.ReactNode;
}

export const PopoverTrigger = React.forwardRef<
  HTMLButtonElement,
  PopoverTriggerProps
>(({ children, className = '', asChild = false, ...props }, ref) => {
  const { open, setOpen } = usePopover();
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      type={asChild ? undefined : 'button'}
      onClick={() => setOpen(!open)}
      ref={ref}
      className={
        asChild
          ? className
          : `cursor-pointer border-none bg-transparent p-0 ${className}`.trim()
      }
      {...props}
    >
      {children}
    </Comp>
  );
});
PopoverTrigger.displayName = 'PopoverTrigger';

// ─── PopoverContent ──────────────────────────────────────────────────────────

interface PopoverContentProps extends React.HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
  align?: 'start' | 'center' | 'end';
  sideOffset?: number;
}

export const PopoverContent = React.forwardRef<
  HTMLDivElement,
  PopoverContentProps
>(
  (
    { children, className = '', align = 'center', sideOffset = 4, ...props },
    forwardedRef,
  ) => {
    const { open, setOpen } = usePopover();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;

      const timer = setTimeout(() => {
        const canvas = canvasRef.current;
        const content = contentRef.current;

        if (typeof forwardedRef === 'function') {
          forwardedRef(content);
        } else if (forwardedRef) {
          forwardedRef.current = content;
        }

        if (!canvas || !content) return;

        const w = content.offsetWidth;
        const h = content.offsetHeight;
        canvas.width = w;
        canvas.height = h;

        const rc = rough.canvas(canvas);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, w, h);

        rc.rectangle(2, 2, w - 4, h - 4, {
          roughness: 1.2,
          bowing: 0.8,
          stroke: '#333333',
          strokeWidth: 1.5,
          fill: 'white',
          fillStyle: 'solid',
        });
      }, 10);

      return () => clearTimeout(timer);
    }, [open, forwardedRef]);

    // Close on click outside
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const container = contentRef.current?.closest('.relative.inline-block');
        if (container && !container.contains(e.target as Node)) {
          setOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [open, setOpen]);

    // Close on Escape
    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false);
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [open, setOpen]);

    if (!open) return null;

    const alignClasses = {
      start: 'left-0',
      center: 'left-1/2 -translate-x-1/2',
      end: 'right-0',
    };

    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={contentRef}
        className={`animate-in fade-in-0 zoom-in-95 absolute top-full z-50 w-72 p-4 ${alignClasses[align]} ${className}`.trim()}
        style={{ marginTop: sideOffset }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
        <div className="font-virgil relative z-10 text-sm tracking-[0.01em] text-[#333333]">
          {children}
        </div>
      </Comp>
    );
  },
);
PopoverContent.displayName = 'PopoverContent';
