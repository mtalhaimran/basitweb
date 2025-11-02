'use client';

import { useEffect } from 'react';

/**
 * TinaCMS Admin Interface Component
 * 
 * This component provides the TinaCMS editing interface in the App Router.
 * TinaCMS will handle the routing and rendering of the admin UI based on
 * the configuration in tina/config.ts
 */
export default function TinaCMS() {
  useEffect(() => {
    // Redirect to the public admin folder built by TinaCMS
    // TinaCMS builds the admin UI to /public/admin/index.html
    if (typeof window !== 'undefined') {
      window.location.href = '/admin/index.html';
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-brand border-t-transparent mb-4"></div>
        <p className="text-ink font-urdu-body text-lg">لوڈ ہو رہا ہے...</p>
        <p className="text-ink-muted font-urdu-body text-sm mt-2">
          TinaCMS انتظامیہ کی طرف منتقل ہو رہے ہیں
        </p>
      </div>
    </div>
  );
}
