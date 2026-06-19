import React, { useEffect, useReducer, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

interface GridProps {
  rows: number;
  cols: number;
  noBorder?: boolean;
}

interface FallingCell {
  id: number;
  col: number;
  startTime: number;
  startRow: number;
}

const FALL_SPEED = 0.005;
const BASE_CELL_SIZE = 4; // rem

const Grid: React.FC<GridProps> = ({ rows, cols, noBorder = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const fallingCellsRef = useRef<FallingCell[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const runningRef = useRef(false);
  const nextIdRef = useRef(0);
  const [, forceTick] = useReducer((x: number) => x + 1, 0);

  // The loop only runs while cells are falling; it self-terminates when the
  // last cell drops off the bottom, so an idle grid does zero work per frame.
  const ensureLoop = () => {
    if (runningRef.current) return;
    runningRef.current = true;

    const animate = () => {
      const now = performance.now();
      fallingCellsRef.current = fallingCellsRef.current.filter((cell) => {
        const currentRow = cell.startRow + (now - cell.startTime) * FALL_SPEED;
        return currentRow <= rows;
      });
      forceTick(); // re-render to advance the highlight as cells fall

      if (fallingCellsRef.current.length > 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        runningRef.current = false;
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleHoverStart = (row: number, col: number) => {
    if (prefersReducedMotion) return;
    fallingCellsRef.current = [
      ...fallingCellsRef.current,
      { id: nextIdRef.current++, col, startRow: row, startTime: performance.now() },
    ];
    ensureLoop();
  };

  const isHighlighted = (row: number, col: number) => {
    const now = performance.now();
    return fallingCellsRef.current.some((cell) => {
      const currentRow = Math.floor(cell.startRow + (now - cell.startTime) * FALL_SPEED);
      return cell.col === col && currentRow === row;
    });
  };

  const idealWidth = BASE_CELL_SIZE * cols;
  const idealHeight = BASE_CELL_SIZE * rows;

  return (
    <div
      aria-hidden="true"
      style={{
        backgroundColor: '#E6E6E6',
        padding: noBorder ? '0' : '1px',
        width: '100%',
        maxWidth: `${idealWidth}rem`,
        height: 'auto',
        outline: 'none',
        border: 'none',
        aspectRatio: `${idealWidth} / ${idealHeight}`,
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
          gap: 0,
          backgroundColor: '#E6E6E6',
          height: '100%',
          outline: 'none',
          border: 'none',
        }}
      >
        {Array.from({ length: rows * cols }).map((_, index) => {
          const row = Math.floor(index / cols);
          const col = index % cols;

          return (
            <div
              key={`cell-${row}-${col}`}
              className={`cursor-pointer transition-colors duration-100 ease-out ${
                isHighlighted(row, col) ? 'bg-white' : 'bg-background'
              }`}
              onMouseEnter={() => handleHoverStart(row, col)}
              style={{
                aspectRatio: '1/1',
                width: '100%',
                outline: 'none',
                borderRight: col < cols - 1 ? '1px solid var(--grid-color)' : 'none',
                borderBottom: row < rows - 1 ? '1px solid var(--grid-color)' : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
