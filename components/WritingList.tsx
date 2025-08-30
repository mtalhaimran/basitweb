import EssayCard from './EssayCard';
import { writing } from '@/lib/data/writing';

export default function WritingList() {
  return (
    <div className="space-y-8">
      {writing.map((essay) => (
        <EssayCard key={essay.slug} essay={essay} />
      ))}
    </div>
  );
}
