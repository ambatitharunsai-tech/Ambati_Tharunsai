import React, { useEffect, useState } from 'react';

export interface InteractiveGridPatternProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  squares?: [number, number]; // [horizontal, vertical]
  className?: string;
  squaresClassName?: string;
}

/**
 * InteractiveGridPattern (shadcn/ui & Magic UI pattern)
 * Renders an interactive SVG grid of squares that illuminate with a smooth blue-violet
 * trail on pointer hover, paired with subtle autonomous ambient pulses.
 */
export const InteractiveGridPattern: React.FC<InteractiveGridPatternProps> = ({
  width = 44,
  height = 44,
  squares = [36, 22],
  className = '',
  squaresClassName = '',
  ...props
}) => {
  const [horizontal, vertical] = squares;
  const totalSquares = horizontal * vertical;
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [ambientSquares, setAmbientSquares] = useState<number[]>([42, 89, 154, 210, 312, 418]);

  // Subtle autonomous pulse for ambient cells so the grid feels alive even before cursor movement
  useEffect(() => {
    const interval = window.setInterval(() => {
      const next: number[] = [];
      for (let i = 0; i < 7; i++) {
        next.push(Math.floor(Math.random() * totalSquares));
      }
      setAmbientSquares(next);
    }, 2600);
    return () => clearInterval(interval);
  }, [totalSquares]);

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      viewBox={`0 0 ${width * horizontal} ${height * vertical}`}
      className={`absolute inset-0 h-full w-full border border-slate-300/30 dark:border-indigo-500/15 ${className}`}
      {...props}
    >
      {Array.from({ length: totalSquares }).map((_, index) => {
        const x = (index % horizontal) * width;
        const y = Math.floor(index / horizontal) * height;
        const isHovered = hoveredSquare === index;
        const isAmbient = ambientSquares.includes(index);

        return (
          <rect
            key={index}
            x={x}
            y={y}
            width={width}
            height={height}
            onMouseEnter={() => setHoveredSquare(index)}
            onMouseLeave={() => setHoveredSquare(null)}
            className={`stroke-slate-300/35 dark:stroke-indigo-400/15 transition-all duration-1000 ease-out hover:duration-75 ${
              isHovered
                ? 'fill-blue-500/30 dark:fill-indigo-500/40'
                : isAmbient
                  ? 'fill-violet-500/10 dark:fill-blue-500/15'
                  : 'fill-transparent'
            } ${squaresClassName}`}
          />
        );
      })}
    </svg>
  );
};
