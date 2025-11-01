export const dynamic = 'force-static';

export default async function EnPostDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="ltr">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-ink">{params.slug}</h1>
          <p className="text-lg text-ink-muted">English post content coming soon.</p>
        </div>
      </div>
    </div>
  );
}
