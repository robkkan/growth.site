import React from 'react';
import { cn } from "@/lib/utils";

interface HoverEffectWrapperProps {
  id: string;
  hoveredItem: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
  className?: string;
  children: React.ReactNode;
}

const HoverEffectWrapper: React.FC<HoverEffectWrapperProps> = React.memo(function HoverEffectWrapper({
  id,
  hoveredItem,
  onMouseEnter,
  onMouseLeave,
  className,
  children
}) {
  // Memoize the event handlers to prevent recreating on every render
  const handleMouseEnter = React.useCallback(() => {
    onMouseEnter(id);
  }, [id, onMouseEnter]);

  // Optimize class computation
  const combinedClassName = React.useMemo(() => 
    cn(
      "transition-opacity duration-500 ease-in-out transform-gpu",
      hoveredItem && hoveredItem !== id ? "opacity-40" : "opacity-100",
      className
    ),
    [hoveredItem, id, className]
  );

  return (
    <div
      className={combinedClassName}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        willChange: hoveredItem ? 'opacity' : 'auto',
      }}
    >
      {children}
    </div>
  );
});

HoverEffectWrapper.displayName = 'HoverEffectWrapper';

export { HoverEffectWrapper };