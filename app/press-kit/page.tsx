import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Download, FileText, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

export const metadata = {
  title: 'Press Kit - Abdul Basit Zafar',
  description: 'Press materials, photos, and biographical information for media use.',
};

export default function PressKitPage() {
  const downloads = [
    {
      name: 'High-res Author Photo',
      description: 'Professional headshot (300 DPI)',
      type: 'JPG',
      size: '2.1 MB',
      icon: ImageIcon,
      href: '#'
    },
    {
      name: 'Short Bio',
      description: '50-word biographical summary',
      type: 'PDF',
      size: '120 KB',
      icon: FileText,
      href: '#'
    },
    {
      name: 'Extended Bio',
      description: 'Comprehensive 200-word biography',
      type: 'PDF',
      size: '150 KB',
      icon: FileText,
      href: '#'
    },
    {
      name: 'Book Covers',
      description: 'High-resolution book covers',
      type: 'ZIP',
      size: '5.2 MB',
      icon: ImageIcon,
      href: '#'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-12">
            <h1 className="text-4xl font-bold mb-6">Press Kit</h1>
            <p className="text-xl text-muted-foreground">
              Download photos, biographical information, and other materials for media use.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Author Photo */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Author Photo</h2>
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Abdul Basit Zafar - Author Photo"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Photo credit: Professional Photography Studio
                </p>
              </div>
            </div>

            {/* Bio and Downloads */}
            <div className="lg:col-span-2">
              {/* Quick Bio */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Biographical Summary</h2>
                <div className="prose prose-lg">
                  <p>
                    Abdul Basit Zafar is a bilingual writer and storyteller whose work explores 
                    the intersection of technology, culture, and human experience. Born in Pakistan 
                    and now based in Germany, his writing bridges digital and literary worlds 
                    through books, essays, and multimedia storytelling.
                  </p>
                  <p>
                    His debut novel "Shadows of Memory" received critical acclaim, and his essays 
                    have appeared in leading publications. Writing in both English and Urdu, 
                    he celebrates multilingual narrative and the immigrant experience in our connected age.
                  </p>
                </div>
              </div>

              {/* Downloads */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Downloads</h2>
                <div className="grid gap-4">
                  {downloads.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                      <div className="flex items-center space-x-4">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-xs text-muted-foreground">
                          <p>{item.type}</p>
                          <p>{item.size}</p>
                        </div>
                        <button className="p-2 hover:bg-background rounded-md transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media Mentions */}
              <div className="mt-12">
                <h2 className="text-2xl font-semibold mb-6">Recent Media Mentions</h2>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Writers Spotlight Feature</h3>
                    <p className="text-sm text-muted-foreground mb-2">Literary Quarterly, August 2023</p>
                    <p className="text-sm">"A fresh voice in contemporary literature, bridging cultures with remarkable sensitivity."</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Tech & Narrative Podcast</h3>
                    <p className="text-sm text-muted-foreground mb-2">Digital Stories Podcast, July 2023</p>
                    <p className="text-sm">"Fascinating discussion about how code and language intersect in storytelling."</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}