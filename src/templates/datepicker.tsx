import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
// @ts-expect-error - react-datepicker is a peer dependency and might not be installed in the template source
import ReactDatePicker from 'react-datepicker';
// @ts-expect-error - CSS from peer dependency react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

export interface DatePickerProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  placeholderText?: string;
  border?: 'rough' | 'normal';
  inline?: boolean;
  className?: string;
}

const datePickerStyles = `
  .handwritten-datepicker .react-datepicker {
    border: none !important;
    background: transparent !important;
    font-family: 'Virgil', 'Caveat', cursive !important;
  }
  .handwritten-datepicker .react-datepicker__header {
    background: transparent !important;
    border-bottom: none !important;
    padding-top: 12px !important;
  }
  .handwritten-datepicker .react-datepicker__month-container {
    background: white !important;
    border: 2px solid #333333 !important;
  }
  .handwritten-datepicker .react-datepicker__current-month {
    font-family: 'Virgil', 'Caveat', cursive !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
    color: #333333 !important;
    letter-spacing: 0.02em !important;
  }
  .handwritten-datepicker .react-datepicker__day-name {
    font-family: 'Virgil', 'Caveat', cursive !important;
    color: #888888 !important;
    font-size: 0.75rem !important;
  }
  .handwritten-datepicker .react-datepicker__day {
    font-family: 'Virgil', 'Caveat', cursive !important;
    color: #333333 !important;
    font-size: 0.82rem !important;
    border-radius: 0 !important;
    transition: background 0.15s ease !important;
  }
  .handwritten-datepicker .react-datepicker__day:hover {
    background: rgba(51,51,51,0.07) !important;
    border-radius: 0 !important;
    text-decoration: underline wavy !important;
  }
  .handwritten-datepicker .react-datepicker__day--selected {
    background: #333333 !important;
    color: white !important;
    border-radius: 0 !important;
    font-weight: 700 !important;
  }
  .handwritten-datepicker .react-datepicker__day--keyboard-selected {
    background: rgba(51,51,51,0.15) !important;
    border-radius: 0 !important;
  }
  .handwritten-datepicker .react-datepicker__day--outside-month {
    color: #cccccc !important;
  }
  .handwritten-datepicker .react-datepicker__day--disabled {
    color: #cccccc !important;
    cursor: not-allowed !important;
  }
  .handwritten-datepicker .react-datepicker__navigation {
    top: 10px !important;
  }
  .handwritten-datepicker .react-datepicker__navigation-icon::before {
    border-color: #333333 !important;
  }
  .handwritten-datepicker .react-datepicker__month {
    margin: 4px 8px 8px !important;
  }
  .handwritten-datepicker .react-datepicker__triangle {
    display: none !important;
  }
  .handwritten-datepicker .react-datepicker-popper {
    z-index: 50 !important;
  }
`;

// ─── RoughBorder wrapper ──────────────────────────────────────────────────────

interface RoughBorderProps {
  children: React.ReactNode;
  className?: string;
}

const RoughBorder = ({ children, className = '' }: RoughBorderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const timer = setTimeout(() => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      canvas.width = w;
      canvas.height = h;

      const rc = rough.canvas(canvas);
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);

      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.4,
        bowing: 0.8,
        stroke: '#333333',
        strokeWidth: 1.8,
        fill: 'white',
        fillStyle: 'solid',
      });
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// ─── DatePickerInput (trigger button) ─────────────────────────────────────────

interface DatePickerInputProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: 'rough' | 'normal';
  disabled?: boolean;
  value?: string;
}

const DatePickerInput = React.forwardRef<HTMLDivElement, DatePickerInputProps>(
  ({ value, onClick, border = 'rough', disabled = false }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (border === 'normal') return;

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

      rc.rectangle(2, 2, w - 4, h - 4, {
        roughness: 1.2,
        bowing: 0.5,
        stroke: disabled ? '#cccccc' : '#333333',
        strokeWidth: 1.5,
      });
    }, [border, disabled]);

    return (
      <div
        ref={(el) => {
          (
            containerRef as React.MutableRefObject<HTMLDivElement | null>
          ).current = el;
          if (typeof ref === 'function') ref(el);
          else if (ref) ref.current = el;
        }}
        onClick={!disabled ? onClick : undefined}
        className={`relative flex min-w-[200px] cursor-pointer items-center gap-2 px-4 py-2 ${
          border === 'normal'
            ? `rounded border-2 ${disabled ? 'border-[#cccccc]' : 'border-[#333333]'}`
            : ''
        } ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {border === 'rough' && (
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute top-0 left-0 h-full w-full"
          />
        )}
        <svg
          className="relative z-10 h-4 w-4 shrink-0"
          style={{ color: disabled ? '#cccccc' : '#333333' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span
          className={`font-virgil relative z-10 text-sm tracking-wide ${
            value ? 'text-[#333333]' : 'text-[#aaaaaa]'
          }`}
        >
          {value || 'Pick a date'}
        </span>
      </div>
    );
  },
);
DatePickerInput.displayName = 'DatePickerInput';

// ─── DatePicker (root) ────────────────────────────────────────────────────────

export const DatePicker = React.forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      selected,
      onChange,
      minDate,
      maxDate,
      disabled = false,
      placeholderText = 'Pick a date',
      border = 'rough',
      inline = false,
      className = '',
    },
    ref,
  ) => {
    const handleChange = (date: Date | null) => {
      onChange?.(date);
    };

    const datepickerProps = {
      selected,
      onChange: handleChange,
      minDate,
      maxDate,
      disabled,
    };

    return (
      <>
        <style>{datePickerStyles}</style>
        <div ref={ref} className={`handwritten-datepicker ${className}`.trim()}>
          {inline ? (
            border === 'rough' ? (
              <RoughBorder>
                <ReactDatePicker {...datepickerProps} inline />
              </RoughBorder>
            ) : (
              <div className="inline-block rounded border-2 border-[#333333] bg-white">
                <ReactDatePicker {...datepickerProps} inline />
              </div>
            )
          ) : (
            <ReactDatePicker
              {...datepickerProps}
              placeholderText={placeholderText}
              popperClassName="handwritten-datepicker"
              customInput={
                <DatePickerInput border={border} disabled={disabled} />
              }
            />
          )}
        </div>
      </>
    );
  },
);
DatePicker.displayName = 'DatePicker';
