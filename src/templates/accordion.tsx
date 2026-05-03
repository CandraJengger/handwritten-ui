import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';
import { ChevronDown } from 'lucide-react';

interface AccordionContextType {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);

function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error('Accordion components must be wrapped in <Accordion />');
  return context;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, type = 'single', defaultValue, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>(
      Array.isArray(defaultValue)
        ? defaultValue
        : defaultValue
          ? [defaultValue]
          : [],
    );

    const toggleItem = (value: string) => {
      setOpenItems((prev) => {
        if (type === 'single') {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value)
          ? prev.filter((i) => i !== value)
          : [...prev, value];
      });
    };

    return (
      <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
        <div ref={ref} className="flex flex-col gap-2" {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = 'Accordion';

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ value, children, className, ...props }, forwardedRef) => {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);
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

    rc.rectangle(2, 2, w - 4, h - 4, {
      roughness: isOpen ? 1.5 : 1.0,
      bowing: 0.5,
      stroke: '#333333',
      strokeWidth: 1.5,
    });
  }, [isOpen, forwardedRef]);

  return (
    <div
      ref={containerRef}
      className={`relative p-1 transition-all duration-300 ${className || ''}`.trim()}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
});
AccordionItem.displayName = 'AccordionItem';

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }
>(({ value, children, ...props }, ref) => {
  const { openItems, toggleItem } = useAccordion();
  const isOpen = openItems.includes(value);

  return (
    <button
      type="button"
      onClick={() => toggleItem(value)}
      ref={ref}
      className="font-virgil! flex w-full items-center justify-between px-4 py-3 text-left font-bold transition-all"
      {...props}
    >
      {children}
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ value, children, ...props }, ref) => {
  const { openItems } = useAccordion();
  const isOpen = openItems.includes(value);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="font-virgil overflow-hidden px-4 pt-0 pb-4 text-sm transition-all duration-300"
      {...props}
    >
      {children}
    </div>
  );
});
AccordionContent.displayName = 'AccordionContent';
