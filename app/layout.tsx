'use client'; // This is necessary to use Context

import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext'; // Import the provider

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // The html and body tags are now controlled by the LanguageProvider
    // We can remove them from here to avoid duplication.
    <LanguageProvider>
      <body className="font-urdu-body bg-surface text-ink antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </LanguageProvider>
  );
}