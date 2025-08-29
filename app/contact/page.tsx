import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Mail, Twitter, Linkedin, MapPin } from 'lucide-react';

export const metadata = {
  title: 'Contact - Abdul Basit Zafar',
  description: 'Get in touch with Abdul Basit Zafar for collaborations, speaking engagements, or literary discussions.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Contact</h1>
            <p className="text-xl text-muted-foreground">
              Interested in collaborations, speaking engagements, or literary discussions? 
              I'd love to hear from you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-muted-foreground" />
                    <a 
                      href="mailto:hello@abdulbasitzafar.com"
                      className="text-primary hover:underline"
                    >
                      hello@abdulbasitzafar.com
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-muted-foreground" />
                    <span className="text-muted-foreground">Bonn, Germany</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Social Media</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://twitter.com/abdulbasitzafar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-md hover:bg-accent transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  
                  <a
                    href="https://linkedin.com/in/abdulbasitzafar"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border rounded-md hover:bg-accent transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* What I'm Looking For */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">What I'm Looking For</h2>
                
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Speaking Engagements</h3>
                    <p className="text-sm text-muted-foreground">
                      Conferences, workshops, and events on storytelling, technology, and cross-cultural communication.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Literary Collaborations</h3>
                    <p className="text-sm text-muted-foreground">
                      Translation projects, anthology contributions, and collaborative writing opportunities.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Media & Interviews</h3>
                    <p className="text-sm text-muted-foreground">
                      Podcast appearances, interviews, and feature discussions about writing and culture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Response Time Note */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Response Time:</strong> I aim to respond to all inquiries within 48 hours. 
              For urgent speaking requests or time-sensitive matters, please mention this in your subject line.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}