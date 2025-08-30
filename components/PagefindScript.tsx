'use client';

import Script from 'next/script';

export function PagefindScript() {
  return (
    <Script
      src="/pagefind/pagefind-ui.js"
      strategy="lazyOnload"
      onError={(e) => console.error('Failed to load Pagefind UI', e)}
    />
  );
}
