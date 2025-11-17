import React from 'react';

export function CenterText({ children }: { children: React.ReactNode }) {
  return <div className="text-center" dir="auto">{children}</div>;
}
