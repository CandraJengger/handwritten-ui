import React, { useEffect, useRef } from 'react';
import rough from 'roughjs';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg';
  shape?: 'circle' | 'square';
  className?: string;
}

const sizeValues: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 64,
};

export function Avatar({
  src,
  alt,
  fallback,
  size = 'md',
  shape = 'circle',
  className = '',
}: AvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dimension = sizeValues[size];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = dimension + 4;
    canvas.height = dimension + 4;

    const rc = rough.canvas(canvas);
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const options = {
      stroke: '#333333',
      strokeWidth: 2,
      roughness: 1.5,
      bowing: 1,
    };

    if (shape === 'circle') {
      rc.circle(canvas.width / 2, canvas.height / 2, dimension, options);
    } else {
      rc.rectangle(2, 2, dimension, dimension, options);
    }
  }, [dimension, shape]);

  return (
    <div
      className={`relative inline-flex shrink-0 items-center justify-center ${className}`.trim()}
      style={{ width: dimension + 4, height: dimension + 4 }}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute top-0 left-0 h-full w-full"
      />

      <div
        className={`relative z-10 overflow-hidden ${
          shape === 'circle' ? 'rounded-full' : 'rounded-none'
        }`}
        style={{ width: dimension - 4, height: dimension - 4 }}
      >
        {src ? (
          <img
            src={src}
            alt={alt || 'Avatar'}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="font-virgil flex h-full w-full items-center justify-center bg-gray-100 font-bold text-[#333333]">
            {fallback || '?'}
          </div>
        )}
      </div>
    </div>
  );
}
