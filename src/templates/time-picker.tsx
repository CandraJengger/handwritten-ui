import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
// @ts-expect-error - react-datepicker is a peer dependency and might not be installed in the template source
import ReactDatePicker from 'react-datepicker';
// @ts-expect-error - CSS from peer dependency react-datepicker
import 'react-datepicker/dist/react-datepicker.css';

export interface TimePickerProps {
  selected?: Date | null;
  onChange?: (date: Date | null) => void;
  minTime?: Date;
  maxTime?: Date;
  disabled?: boolean;
  placeholderText?: string;
  border?: 'rough' | 'normal';
  inline?: boolean;
  className?: string;
  timeIntervals?: number;
}

const timePickerStyles = `
  .handwritten-datepicker .react-datepicker {
    border: none !important;
    background: transparent !important;
    font-family: 'Virgil', 'Caveat', cursive !important;
  }
  .handwritten-datepicker .react-datepicker__header {
    background: transparent !important;
    border-bottom: 2px solid #333 !important;
    padding-top: 12px !important;
  }
  .handwritten-datepicker .react-datepicker__month-container {
    background: white !important;
    border: 2px solid #333333 !important;
  }
  /* Specific styles for Time Picker List */
  .handwritten-datepicker .react-datepicker__time-container {
    border: 2px solid #333333 !important;
    width: 150px !important;
  }
  .handwritten-datepicker .react-datepicker-time__header {
    font-family: 'Virgil', 'Caveat', cursive !important;
    color: #333333 !important;
    font-weight: 700 !important;
    font-size: 0.95rem !important;
  }
  .handwritten-datepicker .react-datepicker__time-list-item {
    font-family: 'Virgil', 'Caveat', cursive !important;
    color: #333333 !important;
    font-size: 0.9rem !important;
    border-radius: 0 !important;
    transition: background 0.15s ease !important;
    height: auto !important;
    padding: 8px 0 !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }
  .handwritten-datepicker .react-datepicker__time-list-item:hover {
    background: rgba(51,51,51,0.07) !important;
    text-decoration: underline wavy !important;
  }
  .handwritten-datepicker .react-datepicker__time-list-item--selected {
    background: #333333 !important;
    color: white !important;
    font-weight: 700 !important;
  }
  .handwritten-datepicker .react-datepicker__time-list-item--disabled {
    color: #cccccc !important;
    cursor: not-allowed !important;
  }
  .handwritten-datepicker .react-datepicker__navigation {
    top: 10px !important;
  }
  .handwritten-datepicker .react-datepicker__navigation-icon::before {
    border-color: #333333 !important;
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

// ─── TimePickerInput (trigger button) ─────────────────────────────────────────

interface TimePickerInputProps extends React.HTMLAttributes<HTMLDivElement> {
  border?: 'rough' | 'normal';
  disabled?: boolean;
  value?: string;
}

const TimePickerInput = React.forwardRef<HTMLDivElement, TimePickerInputProps>(
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
        className={`relative flex min-w-[160px] cursor-pointer items-center gap-2 px-4 py-2 ${
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
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <span
          className={`font-virgil relative z-10 text-sm tracking-wide ${
            value ? 'text-[#333333]' : 'text-[#aaaaaa]'
          }`}
        >
          {value || 'Pick a time'}
        </span>
      </div>
    );
  },
);
TimePickerInput.displayName = 'TimePickerInput';

// ─── TimePicker (root) ────────────────────────────────────────────────────────

export const TimePicker = React.forwardRef<HTMLDivElement, TimePickerProps>(
  (
    {
      selected,
      onChange,
      minTime,
      maxTime,
      disabled = false,
      placeholderText = 'Pick a time',
      border = 'rough',
      inline = false,
      className = '',
      timeIntervals = 15,
    },
    ref,
  ) => {
    const handleChange = (date: Date | null) => {
      onChange?.(date);
    };

    const datepickerProps = {
      selected,
      onChange: handleChange,
      minTime,
      maxTime,
      disabled,
      showTimeSelect: true,
      showTimeSelectOnly: true,
      timeIntervals,
      timeCaption: 'Time',
      dateFormat: 'h:mm aa',
    };

    return (
      <>
        <style>{timePickerStyles}</style>
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
                <TimePickerInput border={border} disabled={disabled} />
              }
            />
          )}
        </div>
      </>
    );
  },
);
TimePicker.displayName = 'TimePicker';
