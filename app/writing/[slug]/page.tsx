import SectionHeading from '@/components/SectionHeading';
import { writing } from '@/lib/data/writing';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return writing.map((e) => ({ slug: e.slug }));
}

export default function EssayDetail({ params }: { params: { slug: string } }) {
  const essay = writing.find((e) => e.slug === params.slug);
  if (!essay) return notFound();

  return (
    <main className="container py-24 space-y-6 text-right urdu-text">
      <SectionHeading>{essay.title}</SectionHeading>
      <p className="text-center text-ink-muted">{essay.date} • {essay.readingTime}</p>
      <article className="space-y-4">
        <p>{essay.content}</p>
      </article>
    </main>
  );
}
