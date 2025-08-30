import Image from 'next/image';
import Link from 'next/link';
import { WorkItem } from '@/lib/data/work';

interface WorkCardProps {
  item: WorkItem;
}

export default function WorkCard({ item }: WorkCardProps) {
  return (
    <Link href={`/work/${item.slug}`} className="block group text-right">
      <div className="relative w-full h-56 rounded-xl overflow-hidden">
        <Image src={item.image} alt="" fill className="object-cover" />
      </div>
      <div className="mt-3 flex items-center justify-between flex-row-reverse">
        <div>
          <h3 className="font-urdu-heading text-xl group-hover:text-brand transition-colors">{item.title}</h3>
          <p className="text-sm text-ink-muted urdu-text">{item.role} • {item.year}</p>
        </div>
        <span className="text-brand urdu-text">دیکھیں →</span>
      </div>
    </Link>
  );
}
