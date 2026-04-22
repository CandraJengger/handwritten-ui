import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import rough from 'roughjs';
import { ChevronDown } from 'lucide-react';

// --- Context ---
interface SelectContextType {
  value: string;
  setValue: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  placeholder?: string;
  setPlaceholder: (placeholder: string) => void;
  selectedValueLabel?: string;
  setSelectedValueLabel: (label: string) => void;
  rounded: 'none' | 'sm' | 'md' | 'lg';
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelect() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be wrapped in <Select />');
  }
  return context;
}

// --- Utils ---
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

// --- Components ---

export interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  rounded?: 'none' | 'sm' | 'md' | 'lg';
}

export function Select({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue = '',
  rounded = 'none',
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const [placeholder, setPlaceholder] = useState('');
  const [selectedValueLabel, setSelectedValueLabel] = useState('');

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const setValue = (val: string) => {
    if (controlledValue === undefined) {
      setInternalValue(val);
    }
    onValueChange?.(val);
  };

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue,
        isOpen,
        setIsOpen,
        placeholder,
        setPlaceholder,
        selectedValueLabel,
        setSelectedValueLabel,
        rounded,
      }}
    >
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export function SelectTrigger({
  className,
  children,
  ...props
}: SelectTriggerProps) {
  const { isOpen, setIsOpen, rounded } = useSelect();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const button = buttonRef.current;
    if (!canvas || !button) return;

    const w = button.offsetWidth;
    const h = button.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const roughness = isOpen || hovered ? 1.5 : 1.0;
    const bowing = isOpen ? 1.0 : 0.5;
    const radius = roundedValues[rounded] || 0;
    const strokeWidth = isOpen ? 2 : 1.5;

    const options = {
      roughness,
      bowing,
      stroke: '#333333',
      strokeWidth,
    };

    if (radius > 0) {
      rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, radius), options);
    } else {
      rc.rectangle(2, 2, w - 4, h - 4, options);
    }
  }, [isOpen, hovered, rounded]);

  return (
    <button
      {...props}
      ref={buttonRef}
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`font-virgil relative flex h-10 w-full items-center justify-between bg-transparent px-3 py-2 text-sm transition-all duration-200 outline-none ${className || ''}`.trim()}
    >
      <div className="relative z-10 flex items-center gap-2">{children}</div>
      <ChevronDown
        className={`relative z-10 h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      />
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
    </button>
  );
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const { selectedValueLabel, setPlaceholder } = useSelect();

  useEffect(() => {
    if (placeholder) setPlaceholder(placeholder);
  }, [placeholder, setPlaceholder]);

  return (
    <span className="truncate">
      {selectedValueLabel || placeholder || 'Select...'}
    </span>
  );
}

export interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className }: SelectContentProps) {
  const { isOpen, setIsOpen, rounded } = useSelect();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.offsetWidth;
    const h = container.offsetHeight;
    canvas.width = w;
    canvas.height = h;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    const radius = roundedValues[rounded] || 0;
    const options = {
      roughness: 1.2,
      bowing: 0.5,
      stroke: '#333333',
      strokeWidth: 1.5,
      fill: 'white',
      fillStyle: 'solid',
    };

    if (radius > 0) {
      rc.path(getRoundedRectPath(2, 2, w - 4, h - 4, radius), options);
    } else {
      rc.rectangle(2, 2, w - 4, h - 4, options);
    }
  }, [isOpen, rounded]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className={`absolute top-full left-0 z-50 mt-2 min-w-[8rem] overflow-hidden p-1 ${className || ''}`.trim()}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
      <div className="relative z-10 flex flex-col gap-1">{children}</div>
    </div>
  );
}

export interface SelectItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function SelectItem({ value, children, className }: SelectItemProps) {
  const {
    value: selectedValue,
    setValue,
    setIsOpen,
    setSelectedValueLabel,
  } = useSelect();
  const isSelected = selectedValue === value;

  useEffect(() => {
    if (isSelected) {
      setSelectedValueLabel(typeof children === 'string' ? children : value);
    }
  }, [isSelected, children, value, setSelectedValueLabel]);

  return (
    <button
      type="button"
      onClick={() => {
        setValue(value);
        setIsOpen(false);
      }}
      className={`font-virgil relative flex w-full cursor-pointer items-center rounded-sm px-2 py-1.5 text-sm transition-colors duration-200 outline-none select-none hover:bg-black/5 ${
        isSelected ? 'bg-black/5 font-bold' : ''
      } ${className || ''}`.trim()}
    >
      {children}
    </button>
  );
}

export function SelectGroup({ children }: { children: React.ReactNode }) {
  return <div className="p-1">{children}</div>;
}

export function SelectLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-virgil px-2 py-1.5 text-xs font-semibold tracking-wider text-gray-500 uppercase">
      {children}
    </div>
  );
}

export function SelectSeparator() {
  return <div className="my-1 h-px bg-gray-200" />;
}
