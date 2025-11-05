import Link from 'next/link';
import { Search } from 'lucide-react';

interface SearchButtonProps {
  locale?: 'ur' | 'en';
  className?: string;
}

export function SearchButton({ locale = 'ur', className = '' }: SearchButtonProps) {
  const isUrdu = locale === 'ur';
  
  return (
    <Link
      href="/search"
      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand hover:text-white border-2 border-brand hover:bg-brand transition-colors rounded-lg ${className}`}
      title={isUrdu ? 'تلاش (Ctrl+K)' : 'Search (Ctrl+K)'}
    >
      <Search className="w-4 h-4" />
      <span className={isUrdu ? 'font-urdu-body' : ''}>
        {isUrdu ? 'تلاش کریں' : 'Search'}
      </span>
    </Link>
  );
}
