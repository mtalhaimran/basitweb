export const dynamic = 'force-static';

export default async function ContactPage() {
  return (
    <div className="min-h-screen bg-surface pt-20">
      <div className="container mx-auto px-4 py-12" dir="rtl">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-ink font-urdu-heading text-right">
            رابطہ
          </h1>
          <div className="space-y-4 text-right">
            <p className="text-lg text-ink-muted font-urdu-body">
              ای میل:
            </p>
            <a 
              href="mailto:hello@abdulbasitzafar.com" 
              className="text-xl text-brand hover:text-brand-hover transition-colors font-urdu-body"
            >
              hello@abdulbasitzafar.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
