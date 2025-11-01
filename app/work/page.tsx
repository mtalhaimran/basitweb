export const dynamic = 'force-static';

export default async function WorkPage() {
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-ink font-urdu-heading text-right">
            کام
          </h1>
          <p className="text-lg text-ink-muted font-urdu-body text-right">
            میرے کام کا مجموعہ جلد دستیاب ہوگا۔
          </p>
        </div>
      </div>
    </div>
  );
}
