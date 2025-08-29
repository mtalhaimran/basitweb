import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

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
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script defer src="/pagefind/pagefind-ui.js"></script>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}