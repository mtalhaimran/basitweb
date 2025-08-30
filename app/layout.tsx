// app/layout.tsx (Urdu)
export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ur" dir="rtl">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
