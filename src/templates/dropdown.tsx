import React, { useEffect, useRef, useState } from 'react';
import rough from 'roughjs';

interface DropdownProps {
  label: string;
  items: { label: string; onClick?: () => void }[];
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'none' | 'sm' | 'md' | 'lg';
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-6 py-3',
};

const fontSizeClasses: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

const roundedValues: Record<string, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
};

export function Dropdown({
  label,
  items,
  size = 'md',
  rounded = 'none',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // We want the canvas to cover the menu area
    // The menu is positioned relative to the container
    const menuElement = container.querySelector(
      '.dropdown-menu',
    ) as HTMLElement;
    if (!menuElement) return;

    const w = menuElement.offsetWidth;
    const h = menuElement.offsetHeight;
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
      fill: 'rgba(255, 255, 255, 0.95)',
      fillStyle: 'solid',
    };

    if (radius > 0) {
      // Approximate rounded rect with path
      const r = radius;
      const path = `M ${r} 2 h ${w - 2 * r} a ${r} ${r} 0 0 1 ${r} ${r} v ${h - 2 * r} a ${r} ${r} 0 0 1 -${r} ${r} h -${w - 2 * r} a ${r} ${r} 0 0 1 -${r} -${r} v -${h - 2 * r} a ${r} ${r} 0 0 1 ${r} -${r} z`;
      rc.path(path, options);
    } else {
      rc.rectangle(2, 2, w - 4, h - 4, options);
    }
  }, [isOpen, rounded]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block text-left">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`font-virgil flex cursor-pointer items-center gap-2 border-2 border-[#333333] bg-white transition-all duration-200 hover:bg-black/5 ${sizeClasses[size]} ${fontSizeClasses[size]} ${
          rounded === 'none' ? 'rounded-none' : `rounded-${rounded}`
        }`}
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown-menu absolute right-0 z-10 mt-2 w-48 origin-top-right">
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          />
          <div className="relative z-10 py-1">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  item.onClick?.();
                  setIsOpen(false);
                }}
                className="font-virgil block w-full px-4 py-2 text-left text-sm text-[#333333] transition-colors duration-200 hover:bg-black/5"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
