import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCurrentLocale } from '../locales/server';
import ClientProvider from '../context/ClientProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getCurrentLocale();

  return (
    // The 'dir' attribute is removed here to prevent layout flipping
    <html lang={locale}>
      <body className="font-urdu-body bg-surface text-ink antialiased">
        <ClientProvider locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}