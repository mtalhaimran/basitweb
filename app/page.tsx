export const dynamic = 'force-static';

export default async function HomePage() {
  const isUrdu = true;

  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4 text-ink font-urdu-heading text-right">
            عبدالباسط ظفر
          </h1>
          <p className="text-2xl text-ink-muted mb-8 font-urdu-body text-right">
            لکھاری اور کہانی گو
          </p>
          <p className="text-lg leading-relaxed text-ink mb-12 font-urdu-body text-right">
            جرمنی کے شہر بون میں مقیم، میں ٹیکنالوجی، ثقافت، اور انسانی تجربے کے درمیان تعلق کو دریافت کرتا ہوں۔ میری تحریریں ڈیجیٹل اور ادبی دنیاؤں کے درمیان پل کا کام کرتی ہیں۔
          </p>

          {/* Milestones */}
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4 flex-row-reverse">
              <span className="text-brand font-bold">۲۰۱۸</span>
              <span className="text-ink font-urdu-body">جرمنی کا سفر شروع ہوا۔</span>
            </div>
            <div className="flex items-center gap-4 flex-row-reverse">
              <span className="text-brand font-bold">۲۰۲۱</span>
              <span className="text-ink font-urdu-body">پہلی کتاب شائع ہوئی۔</span>
            </div>
            <div className="flex items-center gap-4 flex-row-reverse">
              <span className="text-brand font-bold">۲۰۲۴</span>
              <span className="text-ink font-urdu-body">بون کا بنجارہ سیریز کا آغاز۔</span>
            </div>
          </div>

          {/* Quote */}
          <blockquote className="border-r-4 pr-6 border-brand py-2 mb-12">
            <p className="text-xl italic text-ink-muted font-urdu-body text-right">
              "ہر کہانی ایک سفر ہے، اور ہر لفظ ایک قدم۔"
            </p>
          </blockquote>

          {/* CTA */}
          <div className="text-right">
            <a 
              href="/work" 
              className="inline-block rounded-xl border-2 border-brand px-6 py-3 text-brand hover:bg-brand hover:text-white transition-colors font-medium font-urdu-body"
            >
              میرا کام دیکھیں
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}