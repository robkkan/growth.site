import * as fs from 'fs/promises'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import React from 'react'
import SerifChar from '@/components/serifChar'

export const mdxComponents = {
  p: (props: React.HTMLProps<HTMLParagraphElement>) => (
    <p className="b_serif" {...props} />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3 {...props} />
  ),
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="mdx-blockquote" {...props} />
  ),
  span: (props: React.HTMLProps<HTMLSpanElement>) => (
    <span {...props} />
  ),
  SerifChar: ({ children }: { children: React.ReactNode }) => (
    <SerifChar>{children}</SerifChar>
  ),
  ol: (props: React.DetailedHTMLProps<React.OlHTMLAttributes<HTMLOListElement>, HTMLOListElement>) => (
    <ol className="b_serif mdx-ol" {...props} />
  ),
  li: (props: React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
    <li className="b_serif" {...props} />
  ),
}

export interface PostFrontMatter {
  title: string;
  date: string;
  description: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: React.ReactElement;
  description: string;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const filePath = path.join(process.cwd(), 'app/writing/content', `${slug}.mdx`)
    const source = await fs.readFile(filePath, 'utf8')
    
    const { frontmatter, content } = await compileMDX<PostFrontMatter>({
      source,
      options: { 
        parseFrontmatter: true,
        mdxOptions: {
          remarkPlugins: [],
          rehypePlugins: [],
          format: 'mdx'
        }
      },
      components: mdxComponents,
    });
    
    return {
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      description: frontmatter.description,
      content
    }
  } catch (error) {
    console.error(`Error reading post with slug "${slug}":`, error)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const contentDir = path.join(process.cwd(), 'app/writing/content')
  const files = await fs.readdir(contentDir)
  
  const posts = await Promise.all(
    files
      .filter(file => file.endsWith('.mdx'))
      .map(async (file) => {
        const slug = file.replace('.mdx', '')
        return await getPostBySlug(slug)
      })
  )

  return posts.filter((post): post is Post => post !== null)
}