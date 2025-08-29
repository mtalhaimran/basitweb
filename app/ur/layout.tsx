import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'عبدالباسط ظفر - لکھاری اور کہانی گو',
  description: 'عبدالباسط ظفر کا پورٹ فولیو - کتابیں، مضامین، اور کہانیاں',
  alternates: {
    languages: {
      'en': '/'
    }
  }
};

export default function UrduLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ur" dir="rtl">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Nastaliq+Urdu:wght@400;500;600;700&family=Noto+Naskh+Arabic:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script defer src="/pagefind/pagefind-ui.js"></script>
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      </head>
      <body className="urdu-text">
        {children}
      </body>
    </html>
  );
}