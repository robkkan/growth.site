import React, { memo, useMemo } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/data/projectData';
import ProjectCard from '@/components/ui/projectCard';
import { motion, AnimatePresence } from 'framer-motion';

interface FileSystemVisualizerProps {
  selectedYear: string;
  projects: Project[];
  selectedProject: Project | null;
}

const FileSystemVisualizer: React.FC<FileSystemVisualizerProps> = memo(({ 
  projects,
  selectedProject 
}) => {
  const folderWidth = 36.5;      // 584px
  const folderHeight = 27;       // 432px
  const topPadding = 2.8125;     // 45px
  const projectCardHeight = 21.9375;   // 351px
  
  const currentProject = useMemo(() => {
    return (
      selectedProject ||
      projects.find((p) => p.num === '005') ||
      projects[0]
    );
  }, [selectedProject, projects]);

  return (
    <motion.div 
      className="relative mx-auto"
      whileHover="hover"
      initial="initial"
      style={{ 
        width: `${folderWidth}rem`,
        height: `${folderHeight}rem`
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentProject.num}
          className="absolute w-full h-full"
          initial={{ 
            opacity: 0,
            scale: 0.99,
            y: 5
          }}
          animate={{ 
            opacity: 1,
            scale: 1,
            y: 0
          }}
          exit={{ 
            opacity: 0,
            scale: 0.99,
            y: 5
          }}
          transition={{ 
            duration: 0.34,
            ease: [0.2, 0.8, 0.32, 1]
          }}
          style={{ willChange: 'transform' }}
        >
          {/* Folder Background */}
          <div className="absolute w-full h-full">
            <Image
              src="/images/folder.svg"
              alt="Folder background"
              width={584}
              height={432}
              className="w-full h-full"
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>

          {/* Project Card */}
          <motion.div 
            className="absolute w-full px-4"
            variants={{
              initial: { y: 0 },
              hover: { y: '-6rem' }
            }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{ 
              paddingTop: `${topPadding}rem`,
              height: `${projectCardHeight + topPadding}rem`,
              willChange: 'transform'
            }}
          >
            <ProjectCard
              title={currentProject.title}
              svgSrc={currentProject.svgSrc}
              link={currentProject.href}
              isSmaller={false}
            />
          </motion.div>

          {/* Updated Folder Front */}
          <motion.div 
            className="absolute bottom-[0.25rem] w-full z-10"
            style={{
              transformOrigin: 'bottom',
              perspective: '1000px',
              transformStyle: 'preserve-3d',
              willChange: 'transform'
            }}
            variants={{
              initial: { 
                rotateX: 0,
                skewX: 0,
                translateY: 0,
                translateZ: 0
              },
              hover: { 
                rotateX: -38,
                skewX: -8,
                translateY: 0,
                translateZ: 0
              }
            }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
          > 
            <Image
              src="/images/folderFront.svg"
              alt="Folder front"
              width={584}
              height={300}
              className="w-full h-auto"
              priority
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
});

export default FileSystemVisualizer;
