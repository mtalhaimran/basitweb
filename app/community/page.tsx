import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Users, MessageCircle, Calendar, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'Community - Abdul Basit Zafar',
  description: 'Join the community of readers and writers exploring stories across cultures.',
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Community</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A space for readers, writers, and storytellers who believe in the power of narrative to bridge cultures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="p-6 border rounded-lg">
              <MessageCircle className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Discussion Forums</h2>
              <p className="text-muted-foreground mb-4">
                Join conversations about literature, technology, and cross-cultural storytelling.
              </p>
              <button className="text-primary hover:underline font-medium">
                Join Discussions →
              </button>
            </div>

            <div className="p-6 border rounded-lg">
              <BookOpen className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Reading Group</h2>
              <p className="text-muted-foreground mb-4">
                Monthly book discussions exploring literature from diverse perspectives.
              </p>
              <button className="text-primary hover:underline font-medium">
                View Schedule →
              </button>
            </div>

            <div className="p-6 border rounded-lg">
              <Calendar className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Events</h2>
              <p className="text-muted-foreground mb-4">
                Virtual readings, workshops, and conversations with guest authors.
              </p>
              <button className="text-primary hover:underline font-medium">
                Upcoming Events →
              </button>
            </div>

            <div className="p-6 border rounded-lg">
              <Users className="w-8 h-8 text-primary mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Writing Circle</h2>
              <p className="text-muted-foreground mb-4">
                A supportive space for emerging writers to share work and receive feedback.
              </p>
              <button className="text-primary hover:underline font-medium">
                Learn More →
              </button>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="bg-muted/50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Community Guidelines</h2>
            <div className="prose">
              <ul>
                <li>Engage with respect and curiosity</li>
                <li>Celebrate diverse perspectives and experiences</li>
                <li>Support fellow writers and readers</li>
                <li>Keep discussions constructive and thoughtful</li>
                <li>Share resources and opportunities</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}