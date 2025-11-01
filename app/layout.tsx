import './global.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import ClientProvider from '../context/ClientProvider';
import { getCurrentLocale } from '../locales/server';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = (await getCurrentLocale()) || 'ur';
  const dir = locale === 'ur' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
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
