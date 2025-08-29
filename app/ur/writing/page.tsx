import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EssayCard } from '@/components/EssayCard';
import { essays } from '@/lib/data/content';

export const metadata = {
  title: 'تحریریں - عبدالباسط ظفر',
  description: 'مضامین اور تحریریں جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کو دریافت کرتی ہیں۔',
  openGraph: {
    title: 'تحریریں - عبدالباسط ظفر',
    description: 'مضامین اور تحریریں جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کو دریافت کرتی ہیں۔',
    locale: 'ur_PK'
  }
};

export default function UrduWritingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="ur" />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-urdu-heading">تحریریں</h1>
            <p className="text-xl text-muted-foreground max-w-3xl ml-auto font-urdu-body leading-relaxed">
              مضامین اور تحریریں جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتی ہیں۔ ہر تحریر ایک نیا نقطہ نظر پیش کرتی ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {essays.map((essay) => (
              <EssayCard key={essay.id} essay={essay} lang="ur" />
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 font-urdu-heading">خیالات کا تبادلہ</h2>
              <p className="text-muted-foreground font-urdu-body mb-6">
                کیا آپ کے پاس کوئی سوال یا تبصرہ ہے؟ میں آپ سے سننا چاہوں گا۔
              </p>
              <Link 
                href="/ur/contact"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium focus-ring flex-row-reverse font-urdu-body"
              >
                رابطہ کریں
                <Mail className="w-4 h-4 mr-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}