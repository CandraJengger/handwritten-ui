import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface ProgressBarProps {
  progress: number; // 0–100
  label?: string;
  height?: number;
}

export default function Progress({
  progress,
  label,
  height = 14,
}: ProgressBarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.offsetWidth;
    const h = height + 6;
    canvas.width = w;
    canvas.height = h;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);

    // Track background
    rc.rectangle(2, 2, w - 4, height - 1, {
      stroke: '#cccccc',
      strokeWidth: 1,
      fill: 'transparent',
      roughness: 1.5,
      bowing: 0.5,
    });

    // Fill bar based on progress
    const fillWidth = Math.max(0, ((w - 4) * progress) / 100);
    if (fillWidth > 0) {
      rc.rectangle(2, 2, fillWidth, height - 1, {
        fill: '#333333',
        fillStyle: 'hachure',
        hachureAngle: -41,
        hachureGap: 5,
        stroke: '#333333',
        strokeWidth: 1,
        roughness: 1.2,
        bowing: 0.3,
      });
    }
  }, [progress, height]);

  return (
    <div ref={containerRef} className="relative flex w-full flex-col gap-2">
      {label && (
        <label className="font-virgil text-sm tracking-[0.02em] text-[#333333]">
          {label}
        </label>
      )}
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ height: height + 6 }}
      />
    </div>
  );
}
