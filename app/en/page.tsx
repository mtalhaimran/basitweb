import Image from 'next/image';
import NameRevealUrdu from '@/components/NameRevealUrdu';

export default function EnglishHome() {
  return (
    <main className="relative h-screen">
      <Image src="/images/hero.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-6">
        <NameRevealUrdu className="text-white" />
        <p className="text-xl">I’m Abdul Basit, a writer and storyteller.</p>
      </div>
    </main>
  );
}
