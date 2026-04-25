import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';
import { X } from 'lucide-react';

// ─── Context ─────────────────────────────────────────────────────────────────

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType | undefined>(undefined);

function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error('Dialog components must be wrapped in <Dialog />');
  return ctx;
}

// ─── Dialog (root) ───────────────────────────────────────────────────────────

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Dialog({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = controlledOpen ?? internalOpen;

  const setOpen = useCallback(
    (next: boolean) => {
      if (controlledOpen === undefined) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [controlledOpen, onOpenChange],
  );

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

// ─── DialogTrigger ───────────────────────────────────────────────────────────

interface DialogTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const DialogTrigger = React.forwardRef<
  HTMLButtonElement,
  DialogTriggerProps
>(({ children, className = '', ...props }, ref) => {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      ref={ref}
      className={`cursor-pointer border-none bg-transparent p-0 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
});
DialogTrigger.displayName = 'DialogTrigger';

// ─── DialogContent ───────────────────────────────────────────────────────────

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  DialogContentProps
>(({ children, className = '', ...props }, forwardedRef) => {
  const { open, setOpen } = useDialog();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Draw rough border on the dialog panel
  useEffect(() => {
    if (!open) return;

    // Small delay to allow the panel to render and measure
    const timer = setTimeout(() => {
      const canvas = canvasRef.current;
      const panel = panelRef.current;

      if (typeof forwardedRef === 'function') {
        forwardedRef(panel);
      } else if (forwardedRef) {
        forwardedRef.current = panel;
      }

      if (!canvas || !panel) return;

      const w = panel.offsetWidth;
      const h = panel.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.5,
        bowing: 1.0,
        stroke: '#333333',
        strokeWidth: 2,
      });
    }, 50);

    return () => clearTimeout(timer);
  }, [open, forwardedRef]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  // Lock body scroll
  useEffect(() => {
    if (!open) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="animate-fade-in fixed inset-0 bg-black/40"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`animate-dialog-in relative z-50 w-full max-w-lg bg-white p-0 shadow-lg ${className}`.trim()}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />

        <div className="relative z-10">{children}</div>

        {/* Close button */}
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 z-20 cursor-pointer border-none bg-transparent p-1 text-[#666666] transition-all duration-200 hover:scale-110 hover:text-[#333333] active:scale-95"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
});
DialogContent.displayName = 'DialogContent';

// ─── DialogHeader ────────────────────────────────────────────────────────────

interface DialogHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogHeader = React.forwardRef<HTMLDivElement, DialogHeaderProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-1.5 p-6 pb-0 ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DialogHeader.displayName = 'DialogHeader';

// ─── DialogTitle ─────────────────────────────────────────────────────────────

interface DialogTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  DialogTitleProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={`font-virgil text-lg leading-none font-bold tracking-tight text-[#333333] ${className}`.trim()}
      {...props}
    >
      {children}
    </h2>
  );
});
DialogTitle.displayName = 'DialogTitle';

// ─── DialogDescription ──────────────────────────────────────────────────────

interface DialogDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ children, className = '', ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={`font-virgil text-sm tracking-[0.01em] text-[#888888] ${className}`.trim()}
      {...props}
    >
      {children}
    </p>
  );
});
DialogDescription.displayName = 'DialogDescription';

// ─── DialogFooter ────────────────────────────────────────────────────────────

interface DialogFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DialogFooter = React.forwardRef<HTMLDivElement, DialogFooterProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex items-center justify-end gap-3 p-6 pt-4 ${className}`.trim()}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DialogFooter.displayName = 'DialogFooter';
