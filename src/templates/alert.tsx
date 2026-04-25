import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';
import { Info, AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

type AlertVariant = 'default' | 'info' | 'warning' | 'error' | 'success';

interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
}

const variantColors: Record<AlertVariant, string> = {
  default: '#333333',
  info: '#3b82f6',
  warning: '#f59e0b',
  error: '#ef4444',
  success: '#10b981',
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  default: <Info className="h-5 w-5" />,
  info: <Info className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  success: <CheckCircle2 className="h-5 w-5" />,
};

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  (
    { children, variant = 'default', title, className, ...props },
    forwardedRef,
  ) => {
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

      const color = variantColors[variant];

      rc.rectangle(2, 2, w - 4, h - 4, {
        stroke: color,
        strokeWidth: 2,
        roughness: 1.2,
        bowing: 0.8,
        fill: variant === 'default' ? 'transparent' : `${color}15`,
        fillStyle: 'hachure',
        hachureAngle: -41,
        hachureGap: 4,
      });
    }, [variant, forwardedRef]);

    return (
      <div
        ref={containerRef}
        className={`relative flex w-full gap-4 p-4 ${className || ''}`.trim()}
        {...props}
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute top-0 left-0 h-full w-full"
        />
        <div
          className="relative z-10 flex h-5 w-5 shrink-0 items-start pt-0.5"
          style={{ color: variantColors[variant] }}
        >
          {variantIcons[variant]}
        </div>
        <div className="relative z-10 flex flex-col gap-1">
          {title && (
            <h5
              className="font-virgil text-base leading-none font-bold tracking-tight"
              style={{ color: variantColors[variant] }}
            >
              {title}
            </h5>
          )}
          <div className="font-virgil text-sm opacity-90">{children}</div>
        </div>
      </div>
    );
  },
);
Alert.displayName = 'Alert';
