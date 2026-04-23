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

interface DialogTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTrigger({
  children,
  className = '',
}: DialogTriggerProps) {
  const { setOpen } = useDialog();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className={`cursor-pointer border-none bg-transparent p-0 ${className}`.trim()}
    >
      {children}
    </button>
  );
}

// ─── DialogContent ───────────────────────────────────────────────────────────

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({
  children,
  className = '',
}: DialogContentProps) {
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
    }, 20);

    return () => clearTimeout(timer);
  }, [open]);

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
        className="fixed inset-0 bg-black/40 transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        className={`relative z-50 w-full max-w-lg bg-white p-0 shadow-lg ${className}`.trim()}
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
          className="absolute top-4 right-4 z-20 cursor-pointer border-none bg-transparent p-1 text-[#666666] transition-colors duration-200 hover:text-[#333333]"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ─── DialogHeader ────────────────────────────────────────────────────────────

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className = '' }: DialogHeaderProps) {
  return (
    <div className={`flex flex-col gap-1.5 p-6 pb-0 ${className}`.trim()}>
      {children}
    </div>
  );
}

// ─── DialogTitle ─────────────────────────────────────────────────────────────

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className = '' }: DialogTitleProps) {
  return (
    <h2
      className={`font-virgil text-lg leading-none font-bold tracking-tight text-[#333333] ${className}`.trim()}
    >
      {children}
    </h2>
  );
}

// ─── DialogDescription ──────────────────────────────────────────────────────

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({
  children,
  className = '',
}: DialogDescriptionProps) {
  return (
    <p
      className={`font-virgil text-sm tracking-[0.01em] text-[#888888] ${className}`.trim()}
    >
      {children}
    </p>
  );
}

// ─── DialogFooter ────────────────────────────────────────────────────────────

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className = '' }: DialogFooterProps) {
  return (
    <div
      className={`flex items-center justify-end gap-3 p-6 pt-4 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
