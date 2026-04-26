import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

export interface EmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}

const EmptyIllustration = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, 120, 120);

    const stroke = '#333333';
    const highlight = '#999999';

    // Draw a sketchy folder/envelope
    rc.rectangle(25, 40, 70, 50, {
      stroke,
      strokeWidth: 1.5,
      roughness: 1.5,
      bowing: 1,
    });

    // Folder tab
    rc.path('M 25 40 L 25 32 L 45 32 L 50 40', {
      stroke,
      strokeWidth: 1.5,
      roughness: 1.2,
    });

    // Draw a sketchy magnifying glass "searching"
    rc.circle(75, 65, 25, {
      stroke,
      strokeWidth: 2,
      roughness: 1.8,
      fill: 'white',
      fillStyle: 'solid',
    });

    // Magnifying glass handle
    rc.line(90, 80, 105, 95, {
      stroke,
      strokeWidth: 3,
      roughness: 1.5,
    });

    // Subtle "sparkles" or "stars" around
    rc.line(15, 25, 20, 20, { stroke: highlight, strokeWidth: 1 });
    rc.line(20, 25, 15, 20, { stroke: highlight, strokeWidth: 1 });

    rc.line(100, 30, 105, 25, { stroke: highlight, strokeWidth: 1 });
    rc.line(105, 30, 100, 25, { stroke: highlight, strokeWidth: 1 });
  }, []);

  return (
    <canvas ref={canvasRef} width="120" height="120" className="mx-auto" />
  );
};

export const Empty = React.forwardRef<HTMLDivElement, EmptyProps>(
  (
    {
      title = 'No Data Found',
      description = 'There is nothing to show here at the moment.',
      icon,
      action,
      className = '',
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col items-center justify-center p-8 text-center ${className}`.trim()}
        {...props}
      >
        <div className="mb-4 flex items-center justify-center">
          {icon || <EmptyIllustration />}
        </div>
        <div className="flex flex-col gap-1">
          <h3 className="font-virgil text-lg font-bold tracking-tight text-[#333333]">
            {title}
          </h3>
          <p className="font-virgil max-w-[280px] text-sm tracking-[0.01em] text-[#888888]">
            {description}
          </p>
        </div>
        {action && <div className="mt-6">{action}</div>}
      </div>
    );
  },
);

Empty.displayName = 'Empty';
