import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface StaggerWrapperProps {
  children: ReactNode;
  skipAnimation?: boolean;
  initial: { opacity: number; y: number };
  animate: { opacity: number; y: number };
  transition: {
    duration: number;
    delay: number;
    ease: number[];
  };
  className?: string;
}

export const StaggerWrapper = ({
  children,
  skipAnimation = false,
  initial,
  animate,
  transition,
  className = ''
}: StaggerWrapperProps) => {
  const prefersReducedMotion = useReducedMotion();

  if (skipAnimation || prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`${className} transform-gpu`}
      initial={initial}
      animate={animate}
      transition={transition}
      style={{ backfaceVisibility: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};