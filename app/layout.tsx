import './global.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ClientProvider from '../context/ClientProvider';

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Default to Urdu locale
  const locale = 'ur';
  const dir = 'rtl';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-urdu-body bg-surface text-ink antialiased flex flex-col min-h-screen">
        <ClientProvider locale={locale}>
          <Header />
          <main id="main-content" className="flex-1 pb-16">{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}