import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="font-sans bg-surface text-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
