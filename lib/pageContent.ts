// Page content configuration for dynamic routing

export interface PageContent {
  titleUr: string;
  titleEn: string;
  contentUr: string;
  contentEn: string;
}

export const pageContent: Record<string, PageContent> = {
  'writing': {
    titleUr: 'تحریریں',
    titleEn: 'Writing',
    contentUr: 'میری تحریریں جلد دستیاب ہوں گی۔',
    contentEn: 'Writing collection coming soon.'
  },
  'posts': {
    titleUr: 'پوسٹس',
    titleEn: 'Posts',
    contentUr: 'بلاگ پوسٹس جلد دستیاب ہوں گی۔',
    contentEn: 'Blog posts coming soon.'
  },
  'books': {
    titleUr: 'کتابیں',
    titleEn: 'Books',
    contentUr: 'کتابوں کا مجموعہ جلد دستیاب ہوگا۔',
    contentEn: 'Books collection coming soon.'
  },
  'about': {
    titleUr: 'میرے بارے میں',
    titleEn: 'About Me',
    contentUr: 'میں عبدالباسط ظفر ہوں، جرمنی کے شہر بون میں مقیم ایک لکھاری اور کہانی گو۔\n\nمزید تفصیلات جلد دستیاب ہوں گی۔',
    contentEn: 'I am Abdul Basit Zafar, a writer and storyteller based in Bonn, Germany.\n\nMore details coming soon.'
  },
  'contact': {
    titleUr: 'رابطہ',
    titleEn: 'Contact',
    contentUr: 'ای میل:',
    contentEn: 'Email:'
  },
  'bonn-ka-banjara': {
    titleUr: 'بون کا بنجارہ',
    titleEn: 'Bonn ka Banjara',
    contentUr: 'بون کا بنجارہ سیریز جلد دستیاب ہوگی۔',
    contentEn: 'Bonn ka Banjara series coming soon.'
  }
};

// Check if a page exists
export function isValidPage(slug: string): boolean {
  return slug in pageContent;
}

// Get page content
export function getPageContent(slug: string, locale: 'ur' | 'en' = 'ur'): { title: string; content: string } | null {
  const page = pageContent[slug];
  if (!page) return null;
  
  return {
    title: locale === 'ur' ? page.titleUr : page.titleEn,
    content: locale === 'ur' ? page.contentUr : page.contentEn
  };
}
