import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { AudioBlock } from '@/components/AudioBlock';
import Image from 'next/image';
import { MapPin, Award, BookOpen, Users } from 'lucide-react';

export const metadata = {
  title: 'About - Abdul Basit Zafar',
  description: 'Learn more about Abdul Basit Zafar - writer, storyteller, and bridge between cultures.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main id="main-content" className="pt-32 pb-20" data-pagefind-body>
        <div className="container">
          {/* Hero Section */}
          <div className="text-center mb-20">
            <h1 className="text-display mb-8">About</h1>
            <p className="text-body-lg text-gray-600 max-w-3xl mx-auto">
              Writer and storyteller exploring the intersection of technology, culture, and human experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <div className="aspect-square relative rounded-3xl overflow-hidden shadow-2xl mb-8">
                  <Image
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&fit=crop"
                    alt="Abdul Basit Zafar"
                    fill
                    className="object-cover"
                    priority
                    unoptimized
                  />
                </div>
                
                {/* Quick Stats */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-600">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <span>Bonn, Germany</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <BookOpen className="w-5 h-5 text-red-600" />
                    <span>3 Published Books</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-600">
                    <Users className="w-5 h-5 text-red-600" />
                    <span>Bilingual Writer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="lg:col-span-2">
              <div className="prose max-w-none">
                <p className="text-body-lg text-gray-700 mb-8">
                  Abdul Basit Zafar is a bilingual writer whose work bridges the digital and literary worlds. 
                  Born in Pakistan and now based in Germany, his writing explores themes of migration, 
                  technology, and cultural identity.
                </p>

                <p className="text-body text-gray-700 mb-8">
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

                <p className="text-body text-gray-700 mb-8">
                  Writing in both English and Urdu, Abdul Basit seeks to preserve and celebrate the 
                  richness of multilingual storytelling. His Urdu series "بن کا بنجارہ" (Bonn Ka Banjara) 
                  chronicles his experiences as a wanderer in Germany, capturing the poetry of displacement 
                  and discovery.
                </p>

                <div className="bg-gray-50 rounded-2xl p-8 mb-8">
                  <h2 className="text-heading-3 mb-6 flex items-center">
                    <Award className="w-6 h-6 text-red-600 mr-3" />
                    Recognition
                  </h2>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Shortlisted for the International Literature Prize (2023)
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Featured in "30 Under 30" Writers to Watch
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Recipient of the Digital Storytelling Innovation Grant
                    </li>
                  </ul>
                </div>

                <h2 className="text-heading-3 mb-6">Speaking & Community</h2>
                <p className="text-body text-gray-700">
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