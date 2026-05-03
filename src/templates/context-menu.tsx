import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';
import { Check, ChevronRight, Circle } from 'lucide-react';

// --- Context ---

interface ContextMenuContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  position: { x: number; y: number };
  setPosition: (pos: { x: number; y: number }) => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | null>(null);

// --- Components ---

export const ContextMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <ContextMenuContext.Provider
      value={{ open, setOpen, position, setPosition }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
};

export const ContextMenuTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
  // eslint-disable-next-line react/prop-types -- TypeScript handles prop validation
>(({ children, onContextMenu, ...props }, ref) => {
  const context = useContext(ContextMenuContext);
  if (!context)
    throw new Error('ContextMenuTrigger must be used within ContextMenu');

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    context.setPosition({ x: e.clientX, y: e.clientY });
    context.setOpen(true);
    onContextMenu?.(e);
  };

  return (
    <div ref={ref} onContextMenu={handleContextMenu} {...props}>
      {children}
    </div>
  );
});
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

export const ContextMenuContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ children, className = '', ...props }, ref) => {
  const context = useContext(ContextMenuContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (!context)
    throw new Error('ContextMenuContent must be used within ContextMenu');

  useEffect(() => {
    if (!context.open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        context.setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- context is stable
  }, [context.open]);

  useEffect(() => {
    if (!context.open) return;

    const frame = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const menu = menuRef.current;
      if (!canvas || !menu) return;

      const w = menu.offsetWidth;
      const h = menu.offsetHeight;
      if (w === 0 || h === 0) return;

      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.2,
        bowing: 0.5,
        stroke: '#333333',
        strokeWidth: 1.5,
        fill: 'white',
        fillStyle: 'solid',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [context.open]);

  if (!context.open) return null;

  return (
    <div
      ref={(node) => {
        menuRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref)
          (ref as React.RefObject<HTMLDivElement | null>).current = node;
      }}
      style={{
        position: 'fixed',
        left: context.position.x,
        top: context.position.y,
        zIndex: 50,
      }}
      className={`min-w-[8rem] p-1 shadow-md ${className}`.trim()}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex flex-col">{children}</div>
    </div>
  );
});
ContextMenuContent.displayName = 'ContextMenuContent';

export const ContextMenuItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }
  // eslint-disable-next-line react/prop-types -- TypeScript handles prop validation
>(({ className = '', inset, children, onClick, ...props }, ref) => {
  const context = useContext(ContextMenuContext);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    context?.setOpen(false);
  };

  return (
    <button
      ref={ref}
      type="button"
      className={`font-virgil! relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50 ${
        inset ? 'pl-8' : ''
      } ${className}`.trim()}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
});
ContextMenuItem.displayName = 'ContextMenuItem';

export const ContextMenuCheckboxItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean }
>(
  // eslint-disable-next-line react/prop-types -- TypeScript handles prop validation
  ({ className = '', children, checked, onClick, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={`font-virgil! relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50 ${className}`.trim()}
      onClick={(e) => {
        onClick?.(e);
      }}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </button>
  ),
);
ContextMenuCheckboxItem.displayName = 'ContextMenuCheckboxItem';

interface RadioItemProps {
  value?: string;
  checked?: boolean;
  onClick?: () => void;
}

export const ContextMenuRadioGroup: React.FC<{
  children: React.ReactNode;
  value?: string;
  onValueChange?: (val: string) => void;
}> = ({ children, value, onValueChange }) => {
  return (
    <div className="flex flex-col">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<RadioItemProps>(child)) {
          return React.cloneElement(child, {
            checked: child.props.value === value,
            onClick: () => onValueChange?.(child.props.value ?? ''),
          });
        }
        return child;
      })}
    </div>
  );
};

export const ContextMenuRadioItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { checked?: boolean }
  // eslint-disable-next-line react/prop-types -- TypeScript handles prop validation
>(({ className = '', children, checked, ...props }, ref) => {
  return (
    <button
      ref={ref}
      type="button"
      className={`font-virgil! relative flex cursor-default items-center rounded-sm py-1.5 pr-2 pl-8 text-sm transition-colors outline-none select-none hover:bg-black/5 disabled:pointer-events-none disabled:opacity-50 ${className}`.trim()}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Circle className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </button>
  );
});
ContextMenuRadioItem.displayName = 'ContextMenuRadioItem';

export const ContextMenuLabel: React.FC<
  React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }
> = ({ className = '', inset, ...props }) => (
  <div
    className={`font-virgil! px-2 py-1.5 text-sm font-semibold text-[#333333] ${
      inset ? 'pl-8' : ''
    } ${className}`.trim()}
    {...props}
  />
);

export const ContextMenuSeparator: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ className = '', ...props }) => (
  <div className={`my-1 h-px bg-[#333333]/10 ${className}`.trim()} {...props} />
);

export const ContextMenuShortcut: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = ({ className = '', ...props }) => (
  <span
    className={`ml-auto text-xs tracking-widest text-gray-500 ${className}`.trim()}
    {...props}
  />
);

export const ContextMenuGroup: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-col">{children}</div>;

// --- Submenu ---

interface ContextMenuSubContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerEl: HTMLButtonElement | null;
  setTriggerEl: (el: HTMLButtonElement | null) => void;
}

const ContextMenuSubContext = createContext<ContextMenuSubContextType | null>(
  null,
);

export const ContextMenuSub: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLButtonElement | null>(null);

  return (
    <ContextMenuSubContext.Provider
      value={{ open, setOpen, triggerEl, setTriggerEl }}
    >
      <div className="relative" onMouseLeave={() => setOpen(false)}>
        {children}
      </div>
    </ContextMenuSubContext.Provider>
  );
};

export const ContextMenuSubTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { inset?: boolean }
  // eslint-disable-next-line react/prop-types -- TypeScript handles prop validation
>(({ className = '', inset, children, ...props }, ref) => {
  const context = useContext(ContextMenuSubContext);
  return (
    <button
      ref={(node) => {
        context?.setTriggerEl(node);
        if (typeof ref === 'function') ref(node);
        else if (ref) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ref as any).current = node;
        }
      }}
      type="button"
      className={`font-virgil! relative flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm transition-colors outline-none select-none hover:bg-black/5 data-[state=open]:bg-black/5 ${
        inset ? 'pl-8' : ''
      } ${className}`.trim()}
      onMouseEnter={() => context?.setOpen(true)}
      data-state={context?.open ? 'open' : 'closed'}
      {...props}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </button>
  );
});
ContextMenuSubTrigger.displayName = 'ContextMenuSubTrigger';

export const ContextMenuSubContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className = '', children, ...props }, ref) => {
  const context = useContext(ContextMenuSubContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [fixedPos, setFixedPos] = useState({ top: 0, left: 0 });

  const triggerEl = context?.triggerEl;

  useEffect(() => {
    if (!context?.open) return;

    const frame = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      const menu = menuRef.current;
      if (!triggerEl || !canvas || !menu) return;

      const rect = triggerEl.getBoundingClientRect();
      setFixedPos({ top: rect.top, left: rect.right + 4 });

      const w = menu.offsetWidth;
      const h = menu.offsetHeight;
      if (w === 0 || h === 0) return;

      canvas.width = w;
      canvas.height = h;
      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.2,
        bowing: 0.5,
        stroke: '#333333',
        strokeWidth: 1.5,
        fill: 'white',
        fillStyle: 'solid',
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [context?.open, triggerEl]);

  if (!context?.open) return null;

  return (
    <div
      ref={(node) => {
        menuRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (ref as any).current = node;
        }
      }}
      style={{
        position: 'fixed',
        left: fixedPos.left,
        top: fixedPos.top,
        zIndex: 60,
      }}
      className={`min-w-[8rem] p-1 shadow-md ${className}`.trim()}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      <div className="relative z-10 flex flex-col">{children}</div>
    </div>
  );
});
ContextMenuSubContent.displayName = 'ContextMenuSubContent';
