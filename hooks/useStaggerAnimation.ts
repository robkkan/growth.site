interface StaggerConfig {
  baseDelay?: number;
  staggerDelay?: number;
  duration?: number;
  y?: number;
}

export const useStaggerAnimation = ({ baseDelay = 0.1 }) => {
  const getTransition = (index: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.6,
      delay: index * baseDelay,
      ease: [0.21, 0.47, 0.32, 0.98]
    }
  });

  return { getTransition };
};