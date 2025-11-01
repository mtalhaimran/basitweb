export const dynamic = 'force-static';

export default async function EnPostsPage() {
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="ltr">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-ink">Posts</h1>
          <p className="text-lg text-ink-muted mb-4">
            Selected posts are available in English.
          </p>
          <p className="text-lg text-ink-muted">
            English posts coming soon.
          </p>
        </div>
      </div>
    </div>
  );
}
