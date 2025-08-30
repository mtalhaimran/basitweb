import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function RootEn({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}