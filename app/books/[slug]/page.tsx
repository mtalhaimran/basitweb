import SectionHeading from '@/components/SectionHeading';

export function generateStaticParams() {
  return [{ slug: 'placeholder' }];
}

export default function BookDetail({ params }: { params: { slug: string } }) {
  return (
    <main className="container py-24">
      <SectionHeading>{params.slug}</SectionHeading>
      <p className="text-center urdu-text">کتاب کی تفصیل دستیاب نہیں۔</p>
    </main>
  );
}
