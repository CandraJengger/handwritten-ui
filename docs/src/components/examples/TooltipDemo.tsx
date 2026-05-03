import React from 'react';
import { Tooltip } from '@templates/tooltip';
import { Button } from '@templates/button';
import { Plus } from 'lucide-react';

export function TooltipDemo() {
  return (
    <div className="handwritten-ui flex items-center justify-center p-12">
      <Tooltip content="Add new item to your collection">
        <Button variant="outline" className="h-10 w-10 min-w-0 p-2">
          <Plus className="h-5 w-5" />
        </Button>
      </Tooltip>
    </div>
  );
}

export function TooltipVariants() {
  return (
    <div className="handwritten-ui flex flex-col items-center gap-12">
      <div className="flex flex-wrap items-center justify-center gap-8">
        <Tooltip side="top" content="Tooltip on top">
          <Button variant="outline" size="sm">
            Top
          </Button>
        </Tooltip>
        <Tooltip side="bottom" content="Tooltip on bottom">
          <Button variant="outline" size="sm">
            Bottom
          </Button>
        </Tooltip>
        <Tooltip side="left" content="Tooltip on left">
          <Button variant="outline" size="sm">
            Left
          </Button>
        </Tooltip>
        <Tooltip side="right" content="Tooltip on right">
          <Button variant="outline" size="sm">
            Right
          </Button>
        </Tooltip>
      </div>
      <div className="flex gap-8">
        <Tooltip delay={0} content="Instant tooltip">
          <div className="cursor-help rounded-md border-2 border-dashed p-2">
            No Delay
          </div>
        </Tooltip>
        <Tooltip delay={1000} content="Appears after 1s">
          <div className="cursor-help rounded-md border-2 border-dashed p-2">
            Long Delay
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
