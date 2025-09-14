import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCurrentLocale } from '../locales/server';
import ClientProvider from '../context/ClientProvider';

// Make the RootLayout an async function
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Await the result of the function to get the actual string value
  const locale = await getCurrentLocale();

  return (
    <html lang={locale}>
      <body className="font-urdu-body bg-surface text-ink antialiased">
        {/* Now, the 'locale' variable is a string, not a Promise */}
        <ClientProvider locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}