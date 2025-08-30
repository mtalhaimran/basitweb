import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function EnglishLayout({ children }: { children: React.Node }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}