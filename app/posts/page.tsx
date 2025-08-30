import SectionHeading from '@/components/SectionHeading';
import PostList from '@/components/PostList';

export default function PostsPage() {
  return (
    <main className="container py-24">
      <SectionHeading>مراسلے</SectionHeading>
      <PostList />
    </main>
  );
}
