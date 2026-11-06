import React, { useEffect, useRef } from 'react';

export interface InteractiveGridPatternProps {
  /** Size of each square cell in pixels (default: 40) */
  cellSize?: number;
  /** Primary glow color for active & trail cells (default: rgba(6, 182, 212, 0.28)) */
  glowColor?: string;
  /** Secondary electric-blue accent glow color (default: rgba(59, 130, 246, 0.22)) */
  secondaryGlowColor?: string;
  /** 1px grid line color (default adapts or uses rgba(56, 189, 248, 0.11)) */
  lineColor?: string;
  /** Radius in pixels around pointer that illuminates nearby cells (default: 130) */
  proximity?: number;
  /** Fade out duration in ms for the 24 reusable trail cells (default: 850) */
  fadeDuration?: number;
  /** Number of reusable trail cells (default: 24, matching shadcn.io reference) */
  trailCount?: number;
  /** Additional className for outer container */
  className?: string;
}

const NEIGHBOR_OFFSETS: ReadonlyArray<readonly [number, number]> = [
  [0, 0],
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
  [-1, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
];

/**
 * InteractiveGridPattern
 * Faithful recreation of https://www.shadcn.io/view/ui/interactive-grid-pattern/default
 *
 * Features:
 * - Fine, evenly spaced CSS-based 1px grid lines.
 * - Pointer-proximity cell illumination around the cursor (3x3 neighborhood weighted by distance).
 * - 24 reusable DOM trail cells that light up as the cursor moves across cells and gradually fade out.
 * - Subtle pointer-following radial spotlight.
 * - Zero continuous animation loops when the pointer is stationary.
 * - Never blocks buttons, links, text, or navigation (`pointer-events-none`).
 * - Supports touch devices and respects `prefers-reduced-motion`.
 */
export const InteractiveGridPattern: React.FC<InteractiveGridPatternProps> = ({
  cellSize = 40,
  glowColor = 'rgba(6, 182, 212, 0.30)',
  secondaryGlowColor = 'rgba(59, 130, 246, 0.22)',
  lineColor = 'rgba(56, 189, 248, 0.10)',
  proximity = 135,
  fadeDuration = 850,
  trailCount = 24,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const proximityCellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailCellsRef = useRef<(HTMLDivElement | null)[]>([]);
  const trailCursorRef = useRef<number>(0);
  const lastCellKeyRef = useRef<string>('');
  const fadeTimeoutsRef = useRef<number[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = reducedMotionQuery.matches;

    const handleMotionPreferenceChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion = e.matches;
    };
    reducedMotionQuery.addEventListener('change', handleMotionPreferenceChange);

    const hideProximityCells = () => {
      for (let i = 0; i < proximityCellsRef.current.length; i++) {
        const el = proximityCellsRef.current[i];
        if (el) {
          el.style.opacity = '0';
        }
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '0';
      }
      lastCellKeyRef.current = '';
    };

    const spawnTrailCell = (col: number, row: number) => {
      if (prefersReducedMotion || trailCount <= 0) return;

      const idx = trailCursorRef.current % trailCount;
      trailCursorRef.current = (trailCursorRef.current + 1) % trailCount;

      const trailEl = trailCellsRef.current[idx];
      if (!trailEl) return;

      if (fadeTimeoutsRef.current[idx]) {
        window.clearTimeout(fadeTimeoutsRef.current[idx]);
      }

      const x = col * cellSize;
      const y = row * cellSize;

      // Snap immediately to new cell with full glow, then smoothly decay
      trailEl.style.transition = 'none';
      trailEl.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      trailEl.style.backgroundColor = idx % 2 === 0 ? glowColor : secondaryGlowColor;
      trailEl.style.borderColor = 'rgba(6, 182, 212, 0.45)';
      trailEl.style.opacity = '0.9';

      // Force style flush so the subsequent fade transition interpolates smoothly
      void trailEl.offsetWidth;

      trailEl.style.transition = `opacity ${fadeDuration}ms cubic-bezier(0.22, 1, 0.36, 1), background-color ${fadeDuration}ms ease-out, border-color ${fadeDuration}ms ease-out`;
      trailEl.style.opacity = '0';
      trailEl.style.borderColor = 'transparent';
    };

    const updateFromClientPoint = (clientX: number, clientY: number) => {
      const rect = container.getBoundingClientRect();
      const relX = clientX - rect.left;
      const relY = clientY - rect.top;

      // Check if pointer is inside or near the hero container bounds
      if (
        relX < -proximity ||
        relY < -proximity ||
        relX > rect.width + proximity ||
        relY > rect.height + proximity
      ) {
        hideProximityCells();
        return;
      }

      // 1. Update subtle pointer-following radial spotlight
      if (spotlightRef.current) {
        spotlightRef.current.style.opacity = '1';
        spotlightRef.current.style.background = `radial-gradient(${
          proximity * 2.4
        }px circle at ${relX}px ${relY}px, rgba(6, 182, 212, 0.14), rgba(59, 130, 246, 0.07) 45%, transparent 78%)`;
      }

      const baseCol = Math.floor(relX / cellSize);
      const baseRow = Math.floor(relY / cellSize);

      // 2. Update proximity-based 3x3 cells around the cursor
      for (let i = 0; i < NEIGHBOR_OFFSETS.length; i++) {
        const el = proximityCellsRef.current[i];
        if (!el) continue;

        const [dx, dy] = NEIGHBOR_OFFSETS[i];
        const col = baseCol + dx;
        const row = baseRow + dy;
        const cellX = col * cellSize;
        const cellY = row * cellSize;

        if (
          cellX + cellSize < 0 ||
          cellY + cellSize < 0 ||
          cellX > rect.width ||
          cellY > rect.height
        ) {
          el.style.opacity = '0';
          continue;
        }

        const centerX = cellX + cellSize * 0.5;
        const centerY = cellY + cellSize * 0.5;
        const dist = Math.hypot(relX - centerX, relY - centerY);

        if (dist <= proximity) {
          const factor = Math.pow(1 - dist / proximity, 1.35);
          el.style.transform = `translate3d(${cellX}px, ${cellY}px, 0)`;
          el.style.opacity = factor.toFixed(3);
        } else {
          el.style.opacity = '0';
        }
      }

      // 3. Trigger reusable trail cell when cursor crosses into a new grid cell
      const cellKey = `${baseCol}:${baseRow}`;
      if (cellKey !== lastCellKeyRef.current) {
        lastCellKeyRef.current = cellKey;
        if (
          baseCol >= 0 &&
          baseRow >= 0 &&
          baseCol * cellSize < rect.width &&
          baseRow * cellSize < rect.height
        ) {
          spawnTrailCell(baseCol, baseRow);
        }
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateFromClientPoint(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        updateFromClientPoint(touch.clientX, touch.clientY);
      }
    };

    const handlePointerLeaveWindow = () => {
      hideProximityCells();
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('blur', handlePointerLeaveWindow);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('blur', handlePointerLeaveWindow);
      reducedMotionQuery.removeEventListener('change', handleMotionPreferenceChange);
      fadeTimeoutsRef.current.forEach((t) => window.clearTimeout(t));
    };
  }, [cellSize, glowColor, secondaryGlowColor, proximity, fadeDuration, trailCount]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
    >
      {/* 1. Base Crisp Evenly-Spaced CSS Grid Lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />

      {/* 2. Subtle Pointer-Following Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 opacity-0 transition-opacity duration-300"
      />

      {/* 3. 24 Reusable Trail Cells Pool */}
      {Array.from({ length: trailCount }).map((_, idx) => (
        <div
          key={`trail-${idx}`}
          ref={(el) => {
            trailCellsRef.current[idx] = el;
          }}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            opacity: 0,
          }}
          className="absolute top-0 left-0 border border-transparent will-change-[transform,opacity]"
        />
      ))}

      {/* 4. Proximity-Highlighted Cursor Neighborhood Cells */}
      {NEIGHBOR_OFFSETS.map((_, idx) => (
        <div
          key={`prox-${idx}`}
          ref={(el) => {
            proximityCellsRef.current[idx] = el;
          }}
          style={{
            width: `${cellSize}px`,
            height: `${cellSize}px`,
            opacity: 0,
            backgroundColor: idx === 0 ? glowColor : secondaryGlowColor,
            borderColor:
              idx === 0 ? 'rgba(6, 182, 212, 0.55)' : 'rgba(59, 130, 246, 0.30)',
          }}
          className="absolute top-0 left-0 border transition-opacity duration-150 ease-out will-change-[transform,opacity]"
        />
      ))}

      {/* 5. Edge Vignette Mask so grid blends seamlessly into #050814 / #F8FAFC */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#F8FAFC_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_45%,#050814_100%)] opacity-80" />
    </div>
  );
};

/**
 * SubtleSectionGrid
 * Lightweight, non-noisy static grid backdrop to keep non-Hero sections visually cohesive.
 */
export const SubtleSectionGrid: React.FC<{ cellSize?: number; className?: string }> = ({
  cellSize = 40,
  className = '',
}) => {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden opacity-45 dark:opacity-35 ${className}`}
      style={{
        backgroundImage:
          'linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
        backgroundSize: `${cellSize}px ${cellSize}px`,
      }}
    />
  );
};
