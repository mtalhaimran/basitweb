'use client';

import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <html>
        <body className="bg-surface text-ink antialiased">
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </body>
      </html>
    </LanguageProvider>
  );
}