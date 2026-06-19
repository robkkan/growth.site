export interface Project {
  num: string;
  title: string;
  date: string;
  href: string;
  cardImage: string;
}

export const allProjects: Project[] = [
  { num: '006', title: 'Fetchr App', date: '2024', href: '/projects/fetchr', cardImage: '/images/projectCard/fetchr.svg' },
  { num: '005', title: 'Linkedin Brand Kit', date: '2024', href: '/projects/linkedin', cardImage: '/images/projectCard/linkedin.svg' },
  { num: '004', title: 'SearchNEU Alerts', date: '2024', href: '/projects/searchneu', cardImage: '/images/projectCard/searchneu.svg' },
  { num: '003', title: 'ClubsNEU Database', date: '2023', href: '/projects/clubsneu', cardImage: '/images/projectCard/clubsneu.webp' },
  { num: '002', title: 'Udemy Personal Plan', date: '2023', href: '/projects/udemy', cardImage: '/images/projectCard/udemy.svg' },
  { num: '001', title: 'ReMo Mobile', date: '2023', href: '/projects/remo', cardImage: '/images/projectCard/remo.webp' },
];

export const getFeaturedProjects = (): Record<string, Project[]> => {
  // Filter out ReMo by excluding projects with href '/projects/remo'
  const featuredProjects = allProjects.filter(project => project.href !== '/projects/remo');
  
  return featuredProjects.reduce((acc, project) => {
    if (!acc[project.date]) {
      acc[project.date] = [];
    }
    acc[project.date].push(project);
    return acc;
  }, {} as Record<string, Project[]>);
};
