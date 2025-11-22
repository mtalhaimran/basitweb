import React from 'react';

export function LeftAlign({ children }: { children: React.ReactNode }) {
  return <div className="!text-left" dir="ltr">{children}</div>;
}
