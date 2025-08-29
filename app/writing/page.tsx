import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EssayCard } from '@/components/EssayCard';
import { essays } from '@/lib/data/content';

export const metadata = {
  title: 'تحریریں - عبدالباسط ظفر',
  description: 'مضامین اور تحریریں جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کو دریافت کرتی ہیں۔',
};

export default function WritingPage() {
  return ( // Removed lang/dir as it's now in root layout
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          <div className="text-center mb-20">
            <h1 className="text-display urdu-display mb-8">تحریریں</h1>
            <p className="large-text urdu-text text-gray-600 max-w-3xl mx-auto">
              مضامین اور تحریریں جو ٹیکنالوجی، ثقافت، اور انسانی تجربات کے درمیان تعلق کو دریافت کرتی ہیں۔
            </p>
          </div>

          <div className="work-grid"> {/* Use new grid styling */}
            {essays.map((essay, index) => (
              <div key={essay.id} className="animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
                <EssayCard essay={essay} lang="ur" />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}