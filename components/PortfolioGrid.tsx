import WorkCard from './WorkCard';
import { work } from '@/lib/data/work';

export default function PortfolioGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {work.map((item) => (
        <WorkCard key={item.slug} item={item} />
      ))}
    </div>
  );
}
