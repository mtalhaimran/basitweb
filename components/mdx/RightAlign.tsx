import React from 'react';

export function RightAlign({ children }: { children: React.ReactNode }) {
  return <div className="text-right" dir="rtl">{children}</div>;
}
