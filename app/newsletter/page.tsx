import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { NewsletterForm } from '@/components/NewsletterForm';
import { Mail, Users, Calendar } from 'lucide-react';

export const metadata = {
  title: 'Newsletter - Abdul Basit Zafar',
  description: 'Stay updated with new stories, thoughts, and behind-the-scenes glimpses into the writing process.',
};

export default function NewsletterPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-6">Newsletter</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join a community of readers who appreciate stories that bridge cultures and explore our shared humanity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center p-6">
              <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Stories First</h3>
              <p className="text-sm text-muted-foreground">
                New essays, book excerpts, and reflections delivered to your inbox.
              </p>
            </div>
            
            <div className="text-center p-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground">
                Join discussions with fellow readers and writers from around the world.
              </p>
            </div>
            
            <div className="text-center p-6">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Behind the Scenes</h3>
              <p className="text-sm text-muted-foreground">
                Writing process insights, inspiration sources, and upcoming projects.
              </p>
            </div>
          </div>

          <div className="max-w-md mx-auto bg-muted/50 p-8 rounded-lg">
            <h2 className="text-2xl font-semibold text-center mb-6">Subscribe</h2>
            <NewsletterForm />
            
            <div className="mt-6 p-4 bg-background rounded border">
              <p className="text-xs text-muted-foreground text-center">
                By subscribing, you'll receive a confirmation email. Your email will never be shared, 
                and you can unsubscribe at any time. Monthly newsletter, no spam.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}