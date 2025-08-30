'use client';

import { TemplateHero } from './TemplateHero';
import { TemplateAbout } from './TemplateAbout';
import { TemplateTestimonial } from './TemplateTestimonial';

interface PortfolioGridProps {
  lang?: 'ur' | 'en';
}

export function PortfolioGrid({ lang = 'ur' }: PortfolioGridProps) {
  return (
    <div className="min-h-screen pt-24 md:pt-32">
      <TemplateHero lang={lang} />
      <TemplateAbout lang={lang} />
      <TemplateTestimonial lang={lang} />
    </div>
  );
}
