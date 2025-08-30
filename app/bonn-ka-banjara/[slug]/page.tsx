import SectionHeading from '@/components/SectionHeading';

export function generateStaticParams() {
  return [{ slug: 'placeholder' }];
}

export default function BonnEntry({ params }: { params: { slug: string } }) {
  return (
    <main className="container py-24 text-right">
      <SectionHeading>{params.slug}</SectionHeading>
      <p className="urdu-text">جلد آئے گا۔</p>
    </main>
  );
}
