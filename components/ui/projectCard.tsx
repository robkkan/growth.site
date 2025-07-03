import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ProjectCardProps {
  title: string;
  svgSrc: string;
  link: string;
  isSmaller?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, svgSrc, link, isSmaller = false }) => (
  <Link href={link} className="block w-full mx-auto">
    <div className="w-full h-full relative">
      <Image
        src={svgSrc}
        alt={`Mockup of the project titled "${title}"`}
        width={isSmaller ? 400 : 525}
        height={isSmaller ? 300 : 390}
        className="w-full h-full object-contain"
        priority
        loading="eager"
        sizes={isSmaller ? "400px" : "525px"}
      />
    </div>
  </Link>
);

export default ProjectCard;
