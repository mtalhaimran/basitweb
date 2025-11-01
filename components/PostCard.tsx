import Link from 'next/link';
import { TinaPost } from '@/lib/tinaClient';
import { getCurrentLocale } from '@/locales/server';

interface PostCardProps {
  post: TinaPost;
}

export default async function PostCard({ post }: PostCardProps) {
  const locale = (await getCurrentLocale()) || 'ur';
  const isUrdu = locale === 'ur';
  
  const slug = post._sys.filename;
  const postUrl = `/posts/${slug}`;

  return (
    <article className={`border-b border-line pb-6 mb-6 ${isUrdu ? 'text-right' : 'text-left'}`}>
      <h3 className={`text-2xl font-semibold mb-2 ${isUrdu ? 'font-urdu-heading' : ''}`}>
        <Link href={postUrl} className="hover:text-brand transition-colors">
          {post.title || 'بے عنوان'}
        </Link>
      </h3>
      
      {post.date && (
        <p className="text-sm text-ink-muted mb-3">
          {new Date(post.date).toLocaleDateString(isUrdu ? 'ur-PK' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>
      )}
      
      {post.categories && post.categories.length > 0 && (
        <div className={`flex gap-2 mb-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          {post.categories.map((category) => (
            <span key={category} className="text-xs bg-surface-elevated px-2 py-1 rounded">
              {category}
            </span>
          ))}
        </div>
      )}
      
      <Link href={postUrl} className={`text-brand hover:text-brand-hover transition-colors ${isUrdu ? 'font-urdu-body' : ''}`}>
        {isUrdu ? 'مزید پڑھیں ←' : 'Read more →'}
      </Link>
    </article>
  );
}