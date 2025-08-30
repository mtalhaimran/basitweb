import './globals.css';
import type { Metadata } from 'next';
import { AccessibilityProvider } from '@/components/AccessibilityProvider';
import { AccessibilityPanel } from '@/components/AccessibilityPanel';
import { PagefindScript } from '@/components/PagefindScript';

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
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <PagefindScript />
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      </head>
      <body className="font-urdu-body antialiased">
        <AccessibilityProvider>
          {children}
          <AccessibilityPanel />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
