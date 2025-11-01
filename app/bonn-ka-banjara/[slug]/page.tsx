export const dynamic = 'force-static';

export default async function BonnKaBanjaraDetailPage({ params }: { params: { slug: string } }) {
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-ink font-urdu-heading text-right">
            {params.slug}
          </h1>
          <p className="text-lg text-ink-muted font-urdu-body text-right">
            تفصیلات جلد دستیاب ہوں گی۔
          </p>
        </div>
      </div>
    </div>
  );
}
