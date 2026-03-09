import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

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
const BASE_CELL_SIZE = 4;

const Grid: React.FC<GridProps> = ({ rows, cols, noBorder = false }) => {
  const [fallingCells, setFallingCells] = useState<FallingCell[]>([]);
  const [highlightedCells, setHighlightedCells] = useState<Set<string>>(new Set());
  const nextIdRef = useRef(0);
  const animationFrameRef = useRef<number>();
  const hasActiveCells = fallingCells.length > 0;

  // Only run the rAF loop when there are active falling cells
  useEffect(() => {
    if (!hasActiveCells) {
      setHighlightedCells(new Set());
      return;
    }

    const animate = () => {
      const now = performance.now();

      // Compute highlighted set and prune dead cells in one pass
      const nextCells: FallingCell[] = [];
      const nextHighlighted = new Set<string>();

      for (const cell of fallingCells) {
        const currentRow = Math.floor(cell.startRow + (now - cell.startTime) * FALL_SPEED);
        if (currentRow <= rows) {
          nextCells.push(cell);
          if (currentRow >= 0 && currentRow < rows) {
            nextHighlighted.add(`${currentRow}-${cell.col}`);
          }
        }
      }

      setHighlightedCells(nextHighlighted);
      if (nextCells.length !== fallingCells.length) {
        setFallingCells(nextCells);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [hasActiveCells, rows, fallingCells]);

  const handleHoverStart = useCallback((row: number, col: number) => {
    const id = nextIdRef.current++;
    setFallingCells(prev => [...prev, {
      id,
      col,
      startRow: row,
      startTime: performance.now()
    }]);
  }, []);

  const idealWidth = BASE_CELL_SIZE * cols;
  const idealHeight = BASE_CELL_SIZE * rows;

  const cells = useMemo(() =>
    Array.from({ length: rows * cols }).map((_, index) => {
      const row = Math.floor(index / cols);
      const col = index % cols;
      return { row, col, key: `cell-${row}-${col}` };
    }),
    [rows, cols]
  );

  return (
    <div
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
        {cells.map(({ row, col, key }) => (
          <GridCell
            key={key}
            row={row}
            col={col}
            rows={rows}
            cols={cols}
            highlighted={highlightedCells.has(`${row}-${col}`)}
            onHoverStart={handleHoverStart}
          />
        ))}
      </div>
    </div>
  );
};

interface GridCellProps {
  row: number;
  col: number;
  rows: number;
  cols: number;
  highlighted: boolean;
  onHoverStart: (row: number, col: number) => void;
}

const GridCell: React.FC<GridCellProps> = React.memo(function GridCell({
  row,
  col,
  cols,
  rows,
  highlighted,
  onHoverStart,
}) {
  const handleMouseEnter = useCallback(() => {
    onHoverStart(row, col);
  }, [row, col, onHoverStart]);

  return (
    <div
      className="cursor-pointer"
      onMouseEnter={handleMouseEnter}
      style={{
        aspectRatio: '1/1',
        width: '100%',
        outline: 'none',
        borderRight: col < cols - 1 ? '1px solid var(--grid-color)' : 'none',
        borderBottom: row < rows - 1 ? '1px solid var(--grid-color)' : 'none',
        backgroundColor: highlighted ? '#FFFFFF' : 'var(--color-background)',
        transition: 'background-color 0.1s ease-out',
      }}
    />
  );
});

export default Grid;
