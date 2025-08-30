export interface Essay {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
  tags: string[];
  excerpt: string;
  content?: string;
}

export const writing: Essay[] = [
  {
    slug: 'pehla-essay',
    title: 'پہلا مضمون',
    date: '2024-01-01',
    readingTime: '5 min',
    tags: ['tech'],
    excerpt: 'مختصر خلاصہ',
    content: 'یہ پہلا مضمون ہے۔'
  }
];
