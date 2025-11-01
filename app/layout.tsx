import './global.css';
import { Inter } from 'next/font/google';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ClientProvider from '../context/ClientProvider';
import { getCurrentLocale } from '../locales/server';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const locale = (await getCurrentLocale()) || 'ur';
  const dir = locale === 'ur' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className={locale === 'ur' ? 'font-urdu-body bg-surface text-ink antialiased' : 'font-inter bg-surface text-ink antialiased'}>
        <ClientProvider locale={locale}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}