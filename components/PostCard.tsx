import Link from 'next/link';
import { Post } from '@/lib/data/posts';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="border-b pb-4 mb-4 text-right">
      <h3 className="font-urdu-heading text-lg">
        <Link href={`/posts/${post.slug}`} className="hover:text-brand">
          {post.title}
        </Link>
      </h3>
      <p className="text-sm text-ink-muted mb-2">{post.date}</p>
      <p className="urdu-text mb-2">{post.body.slice(0, 60)}...</p>
      <Link href={`/posts/${post.slug}`} className="text-brand urdu-text">
        مزید پڑھیں
      </Link>
    </article>
  );
}
