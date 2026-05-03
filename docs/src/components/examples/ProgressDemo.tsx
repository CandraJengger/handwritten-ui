import React, { useState, useEffect } from 'react';
import { Progress } from '@templates/progress';

export function ProgressDemo() {
  const [progress, setProgress] = useState(13);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="handwritten-ui w-full max-w-md">
      <Progress progress={progress} label="Loading data..." />
    </div>
  );
}

export function ProgressVariants() {
  return (
    <div className="handwritten-ui flex w-full max-w-md flex-col gap-8">
      <Progress progress={25} label="Quarterly Progress" />
      <Progress progress={50} height={20} label="Custom Height" />
      <Progress progress={100} label="Completed" />
    </div>
  );
}
