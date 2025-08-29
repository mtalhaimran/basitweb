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
  title: 'Abdul Basit Zafar - Writer & Storyteller',
  description: 'Portfolio of Abdul Basit Zafar - books, essays, and stories in English and Urdu',
  metadataBase: new URL('https://abdulbasitzafar.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://abdulbasitzafar.com',
    siteName: 'Abdul Basit Zafar',
    images: [{
      url: '/og-image.jpg',
      width: 1200,
      height: 630,
      alt: 'Abdul Basit Zafar - Writer & Storyteller'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@abdulbasitzafar'
  },
  alternates: {
    languages: {
      'en': '/',
      'ur': '/ur'
    }
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script defer src="/pagefind/pagefind-ui.js"></script>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      </head>
      <body className={`${inter.variable} ${notoNastaliq.variable} ${notoNaskh.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}