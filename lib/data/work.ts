export interface WorkItem {
  slug: string;
  title: string;
  role: string;
  year: number;
  image: string;
  problem?: string;
  approach?: string;
  result?: string;
}

export const work: WorkItem[] = [
  {
    slug: 'sample-project',
    title: 'نمونہ پروجیکٹ',
    role: 'ڈویلپر',
    year: 2024,
    image: '/images/hero.jpg',
    problem: 'مسئلے کی تفصیل یہاں۔',
    approach: 'حل کا طریقہ۔',
    result: 'حاصل ہونے والے نتائج۔'
  }
];
