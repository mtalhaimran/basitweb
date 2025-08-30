import SectionHeading from '@/components/SectionHeading';
import { posts } from '@/lib/data/posts';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export default function PostDetail({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return notFound();

  return (
    <main className="container py-24 space-y-6 text-right urdu-text">
      <SectionHeading>{post.title}</SectionHeading>
      <p className="text-center text-ink-muted">{post.date}</p>
      <article className="space-y-4">
        <p>{post.body}</p>
      </article>
    </main>
  );
}
