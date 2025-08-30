export interface Post {
  slug: string;
  title: string;
  date: string;
  body: string;
}

export const posts: Post[] = [
  {
    slug: 'pehla-post',
    title: 'پہلا پوسٹ',
    date: '2024-02-01',
    body: 'یہ ایک چھوٹا پوسٹ ہے۔'
  }
];
