import React from 'react';
import { getAllPosts } from '@/lib/mdx';
import WritingClient from './writingClient';
import { buildPageMetadata } from '@/lib/metadata';
import { SITE_NAME } from '@/lib/siteConfig';

export const metadata = buildPageMetadata({
  title: `Writing — ${SITE_NAME}`,
  description: 'Essays and notes by Robert Kan on design, growth, and building products.',
  path: '/writing',
});

// Server Component that fetches data
async function WritingPage() {
  // Fetch posts on the server
  const posts = await getAllPosts();
  
  // First sort posts by date (oldest first) for numbering purposes
  const chronologicalPosts = [...posts].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Assign numbers based on chronological order (001 for oldest)
  const numberedPosts = chronologicalPosts.map((post, index) => {
    return {
      ...post,
      displayNum: String(index + 1).padStart(3, '0')
    };
  });
  
  // Then sort by date (newest first) for display order
  const sortedForDisplay = [...numberedPosts].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Transform posts into the format expected by the UI
  const entries = sortedForDisplay.map((post) => {
    return {
      num: post.displayNum, // Use the chronologically assigned number
      title: post.title,
      date: post.date,
      href: `/writing/${post.slug}`,
      slug: post.slug
    };
  });

  return <WritingClient initialEntries={entries} />;
}

export default WritingPage;
