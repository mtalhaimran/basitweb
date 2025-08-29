import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { EssayCard } from '@/components/EssayCard';
import { essays } from '@/lib/data/content';

export const metadata = {
  title: 'Writing - Abdul Basit Zafar',
  description: 'Essays and articles exploring technology, culture, and human experience.',
};

export default function WritingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Writing</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Essays and articles exploring the intersection of technology, culture, and human experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {essays.map((essay) => (
              <EssayCard key={essay.id} essay={essay} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}