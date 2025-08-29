import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioBlock } from '@/components/AudioBlock';
import Image from 'next/image';

export const metadata = {
  title: 'About - Abdul Basit Zafar',
  description: 'Learn more about Abdul Basit Zafar - writer, storyteller, and bridge between cultures.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <div className="aspect-square relative rounded-lg overflow-hidden shadow-xl mb-6">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Abdul Basit Zafar"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h1 className="text-4xl font-bold mb-6">About</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Writer and storyteller exploring the intersection of technology, culture, and human experience.
                </p>
              </div>

              <div className="prose prose-lg max-w-none">
                <p>
                  Abdul Basit Zafar is a bilingual writer whose work bridges the digital and literary worlds. 
                  Born in Pakistan and now based in Germany, his writing explores themes of migration, 
                  technology, and cultural identity.
                </p>

                <p>
                  His debut novel "Shadows of Memory" received critical acclaim for its nuanced portrayal 
                  of immigrant experience in modern Pakistan. His essays have appeared in publications 
                  ranging from tech journals to literary magazines, always seeking to find the human 
                  story within technological change.
                </p>

                <AudioBlock 
                  src="/audio/about-intro.mp3"
                  transcript="Hello, I'm Abdul Basit. I write stories that live between worlds - between languages, cultures, and the digital spaces that connect us all. My work explores how technology shapes our most human experiences."
                  title="About Me - Audio Introduction"
                />

                <p>
                  Writing in both English and Urdu, Abdul Basit seeks to preserve and celebrate the 
                  richness of multilingual storytelling. His Urdu series "بن کا بنجارہ" (Bonn Ka Banjara) 
                  chronicles his experiences as a wanderer in Germany, capturing the poetry of displacement 
                  and discovery.
                </p>

                <h2>Recognition</h2>
                <ul>
                  <li>Shortlisted for the International Literature Prize (2023)</li>
                  <li>Featured in "30 Under 30" Writers to Watch</li>
                  <li>Recipient of the Digital Storytelling Innovation Grant</li>
                </ul>

                <h2>Speaking & Community</h2>
                <p>
                  Abdul Basit regularly speaks at conferences about the intersection of technology 
                  and storytelling. He believes in the power of narrative to bridge cultural divides 
                  and create understanding in our increasingly connected world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}