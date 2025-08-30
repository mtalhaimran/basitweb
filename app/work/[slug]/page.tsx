import SectionHeading from '@/components/SectionHeading';
import { work } from '@/lib/data/work';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default function WorkDetail({ params }: { params: { slug: string } }) {
  const item = work.find((w) => w.slug === params.slug);
  if (!item) return notFound();

  return (
    <main className="container py-24 space-y-8">
      <SectionHeading>{item.title}</SectionHeading>
      <p className="text-center urdu-text">{item.role} • {item.year}</p>
      <div className="space-y-6 urdu-text text-right">
        <section>
          <h3 className="font-urdu-heading text-xl mb-2">مسئلہ</h3>
          <p>{item.problem}</p>
        </section>
        <section>
          <h3 className="font-urdu-heading text-xl mb-2">طریقہ</h3>
          <p>{item.approach}</p>
        </section>
        <section>
          <h3 className="font-urdu-heading text-xl mb-2">نتیجہ</h3>
          <p>{item.result}</p>
        </section>
      </div>
    </main>
  );
}
