import { posts } from '@/lib/data/posts';
import PostCard from './PostCard';

export default function PostList() {
  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
