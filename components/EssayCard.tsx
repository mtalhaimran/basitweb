import Link from 'next/link';
import { Essay } from '@/lib/data/writing';

interface EssayCardProps {
  essay: Essay;
}

export default function EssayCard({ essay }: EssayCardProps) {
  return (
    <article className="border rounded-xl p-6 text-right">
      <h3 className="font-urdu-heading text-xl mb-2">
        <Link href={`/writing/${essay.slug}`} className="hover:text-brand">
          {essay.title}
        </Link>
      </h3>
      <p className="text-sm text-ink-muted mb-2">
        {essay.date} • {essay.readingTime}
      </p>
      <p className="urdu-text mb-4">{essay.excerpt}</p>
      <Link href={`/writing/${essay.slug}`} className="text-brand urdu-text">
        پڑھیں
      </Link>
    </article>
  );
}
