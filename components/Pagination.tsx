'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export function Pagination({ currentPage, totalPages, basePath = '' }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  if (totalPages <= 1) return null;

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page === 1) {
      params.delete('page');
    } else {
      params.set('page', String(page));
    }
    const queryString = params.toString();
    const basePath_ = basePath || pathname;
    return queryString ? `${basePath_}?${queryString}` : basePath_;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near start
        pages.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pages.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle
        pages.push('...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  return (
    <nav className="flex justify-center items-center gap-2 mt-12" aria-label="صفحات کی تبدیلی">
      {/* Previous button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="px-4 py-2 rounded-lg bg-surface-white text-ink hover:bg-brand hover:text-white transition-colors font-urdu-body"
          aria-label="پچھلا صفحہ"
        >
          پچھلا ←
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-surface-elevated text-ink-muted cursor-not-allowed font-urdu-body">
          پچھلا ←
        </span>
      )}

      {/* Page numbers */}
      <div className="flex gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-ink-muted">
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <Link
              key={pageNum}
              href={createPageUrl(pageNum)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-brand text-white font-bold'
                  : 'bg-surface-white text-ink hover:bg-surface-elevated'
              }`}
              aria-label={`صفحہ ${pageNum}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {pageNum}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="px-4 py-2 rounded-lg bg-surface-white text-ink hover:bg-brand hover:text-white transition-colors font-urdu-body"
          aria-label="اگلا صفحہ"
        >
          → اگلا
        </Link>
      ) : (
        <span className="px-4 py-2 rounded-lg bg-surface-elevated text-ink-muted cursor-not-allowed font-urdu-body">
          → اگلا
        </span>
      )}
    </nav>
  );
}
