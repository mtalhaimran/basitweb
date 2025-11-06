'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line" data-pagefind-ignore>
      <div className="container py-12">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Email */}
          <Link
            href="mailto:hello@abdulbasitzafar.com"
            className="text-ink hover:text-brand transition-colors font-urdu-body"
          >
            hello@abdulbasitzafar.com
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6 font-urdu-body text-sm">
            <Link
              href="/work"
              className="text-ink hover:text-brand transition-colors"
            >
              کام
            </Link>
            <Link
              href="/books"
              className="text-ink hover:text-brand transition-colors"
            >
              کتابیں
            </Link>
            <Link
              href="/writing"
              className="text-ink hover:text-brand transition-colors"
            >
              تحریریں
            </Link>
          </nav>

          {/* Copyright */}
          <p className="text-ink-muted font-urdu-body text-sm">
            © {new Date().getFullYear()} عبدالباسط ظفر
          </p>
        </div>
      </div>
    </footer>
  );
}