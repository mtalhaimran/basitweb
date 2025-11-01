import './global.css';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/Footer';
import ClientProvider from '../context/ClientProvider';

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Default to Urdu locale
  const locale = 'ur';
  const dir = 'ltr';

  return (
    <html lang="en" dir={dir} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans bg-[#0a0a0a] text-white antialiased">
        <ClientProvider locale={locale}>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}