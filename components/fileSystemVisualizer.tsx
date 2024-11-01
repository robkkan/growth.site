import React, { useEffect } from 'react';
import Image from 'next/image';
import { Project } from '@/lib/data/projectData';
import ProjectCard from '@/components/ui/projectCard';

interface FileSystemVisualizerProps {
  selectedYear: string;
  projects: Project[];
  selectedProject: Project | null;
}

const FileSystemVisualizer: React.FC<FileSystemVisualizerProps> = ({ 
  selectedYear, 
  projects,
  selectedProject 
}) => {
  useEffect(() => {
    console.log('FileSystemVisualizer State:', {
      selectedYear,
      selectedProject,
      projectYear: selectedProject?.num.split('-')[0],
      shouldShowFolder: selectedYear && (!selectedProject || selectedProject.num.split('-')[0] !== selectedYear)
    });
  }, [selectedYear, selectedProject]);

  const cardHeight = 24.375333;  // Height of a single card in rem
  const offsetPerCard = 0.75;    // Offset between cards in rem
  const folderPadding = 1.6875;  // Top padding of the folder
  
  // Remove folderPadding from this calculation since it's handled by the div
  const totalHeight = cardHeight + (projects.length - 1) * offsetPerCard;

  // Updated sorting logic to handle both selected project and year
  const sortedProjects = [...projects].sort((a, b) => {
    if (selectedProject) {
      if (a.num === selectedProject.num) return 1;
      if (b.num === selectedProject.num) return -1;
    }
    // If no project is selected, sort by most recent number
    return b.num.localeCompare(a.num);
  });

  return (
    <div className="relative w-[36.5rem] mx-auto clip-content" style={{ height: `${totalHeight + folderPadding}rem` }}>
      <div className="absolute w-full">
        <Image
          src="/images/folder.svg"
          alt="Folder background"
          width={584}
          height={423}
          className="object-contain bg-transparent"
          priority
        />
      </div>
      <div className="absolute w-full h-full">
        <div className="w-full h-[1.6875rem]" /> {/* Folder padding */}
        <div 
          className="relative" 
          style={{ height: `${totalHeight}rem` }} 
        >
          {sortedProjects.map((project, index) => (
            <div
              key={project.num}
              className={`absolute w-full transition-all duration-300 subtle-shadow`}
              style={{
                top: `${index * offsetPerCard}rem`,
                zIndex: index + 1,
              }}
            >
              <ProjectCard
                title={project.title}
                svgSrc={project.svgSrc}
                link={project.href}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* Show folderFront when year is selected AND either no project is selected OR project is from a different year */}
      {selectedYear && (!selectedProject || selectedProject.date !== selectedYear) && (
        <div className="absolute bottom-[0rem] left-[0rem] w-full z-10 subtle-shadow"> 
          <Image
            src="/images/folderFrontTall.svg"
            alt="Folder front"
            width={584}
            height={300}
            className="w-full object-contain bg-transparent"
            priority
          />
        </div>
      )}
    </div>
  );
};

export default FileSystemVisualizer;
