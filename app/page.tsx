import Image from 'next/image';
import NameRevealUrdu from '@/components/NameRevealUrdu';

export default function Home() {
  return (
    <main className="relative h-screen">
      <Image src="/images/hero.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white space-y-6" dir="rtl">
        <NameRevealUrdu className="text-white" />
        <p className="text-xl font-urdu-body">میں عبدالباسط ظفر ہوں، لکھاری اور کہانی گو۔</p>
        <p className="text-sm">I'm Abdul Basit, a writer and storyteller.</p>
      </div>
    </main>
  );
}
