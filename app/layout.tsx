import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Nastaliq_Urdu, Noto_Naskh_Arabic } from 'next/font/google';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-urdu-heading'
});

const notoNaskh = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  variable: '--font-urdu-body'
});

export const metadata: Metadata = {
  title: 'عبدالباسط ظفر - لکھاری اور کہانی گو',
  description: 'عبدالباسط ظفر کا پورٹ فولیو - کتابیں، مضامین، اور کہانیاں',
  metadataBase: new URL('https://abdulbasitzafar.com'),
  openGraph: {
    type: 'website',
    locale: 'ur_PK',
    url: 'https://abdulbasitzafar.com',
    siteName: 'عبدالباسط ظفر',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'عبدالباسط ظفر - لکھاری اور کہانی گو'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@abdulbasitzafar'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <script defer src="/pagefind/pagefind-ui.js"></script>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${notoNastaliq.variable} ${notoNaskh.variable} font-urdu-body antialiased`}>
        {children}
      </body>
    </html>
  );
}