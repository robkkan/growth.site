import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllPosts, getPostBySlug } from '@/lib/mdx'
import { BlogLayout } from '@/components/blogLayout'
import { buildPageMetadata } from '@/lib/metadata'
import { SITE_DESCRIPTION, SITE_NAME } from '@/lib/siteConfig'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post ? `${post.title} — ${SITE_NAME}` : SITE_NAME;
  const description = post?.description || SITE_DESCRIPTION;

  return buildPageMetadata({
    title,
    description,
    path: `/writing/${slug}`,
    openGraphType: 'article',
  });
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  return (
    <BlogLayout date={post.date}>
      <article className="w-full flex flex-col gap-4">
        <section className="flex flex-col gap-[1em]">
          <h1 className="text-title">{post.title}</h1>
          <div className="max-w-none flex flex-col mdx-content">
            {post.content}
          </div>
        </section>
      </article>
    </BlogLayout>
  )
}