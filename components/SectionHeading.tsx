import { ReactNode } from 'react';

interface SectionHeadingProps {
  children: ReactNode;
  className?: string;
}

export default function SectionHeading({ children, className }: SectionHeadingProps) {
  return (
    <h2 className={`text-center mb-8 md:mb-10 text-2xl sm:text-3xl md:text-4xl font-urdu-heading ${className ?? ''}`}>
      {children}
    </h2>
  );
}
