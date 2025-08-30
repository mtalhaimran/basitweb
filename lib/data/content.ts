export interface Book {
  id: string;
  title: string;
  titleUrdu?: string;
  slug: string;
  description: string;
  descriptionUrdu?: string;
  publishedYear: number;
  publisher?: string;
  isbn?: string;
  coverImage: string;
  buyLinks?: {
    amazon?: string;
    bookshop?: string;
    local?: string;
  };
  excerpt?: string;
}

export interface Essay {
  id: string;
  title: string;
  titleUrdu?: string;
  slug: string;
  description: string;
  descriptionUrdu?: string;
  publishedDate: string;
  publication?: string;
  readTime: number;
  tags: string[];
  content: string;
}

export interface SeriesEntry {
  id: string;
  title: string;
  titleUrdu: string;
  slug: string;
  description: string;
  descriptionUrdu: string;
  publishedDate: string;
  seriesSlug: string;
  order: number;
  content: string;
}

export interface Series {
  id: string;
  title: string;
  titleUrdu: string;
  slug: string;
  description: string;
  descriptionUrdu: string;
  totalEntries: number;
  entries: SeriesEntry[];
}

export const books: Book[] = [
  {
    id: 'shadows-of-memory',
    title: 'Shadows of Memory',
    titleUrdu: 'یادوں کے سائے',
    slug: 'shadows-of-memory',
    description: 'A haunting exploration of identity and belonging in modern Pakistan.',
    descriptionUrdu: 'جدید پاکستان میں شناخت اور تعلق کی ایک دلخراش کھوج۔',
    publishedYear: 2023,
    publisher: 'Alhamra Publishing',
    isbn: '978-0-123456-78-9',
    coverImage: 'https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=400',
    buyLinks: {
      amazon: 'https://amazon.com/shadows-memory',
      bookshop: 'https://bookshop.org/shadows-memory'
    },
    excerpt: 'The streets of Lahore whispered stories that only the old walls could remember...'
  },
  {
    id: 'digital-nomad-tales',
    title: 'Digital Nomad Tales',
    titleUrdu: 'ڈیجیٹل خانہ بدوش کی کہانیاں',
    slug: 'digital-nomad-tales',
    description: 'Stories from the road: technology, culture, and human connection.',
    descriptionUrdu: 'سفر کی کہانیاں: ٹیکنالوجی، ثقافت، اور انسانی رشتے۔',
    publishedYear: 2022,
    publisher: 'Tech Stories Press',
    isbn: '978-0-123456-79-6',
    coverImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=400',
    buyLinks: {
      amazon: 'https://amazon.com/digital-nomad-tales'
    },
    excerpt: 'The laptop screen glowed in the dim Bali café, while the call to prayer echoed across the rice fields...'
  },
  {
    id: 'voices-of-home',
    title: 'Voices of Home',
    titleUrdu: 'گھر کی آوازیں',
    slug: 'voices-of-home',
    description: 'A collection of immigrant stories and the meaning of belonging.',
    descriptionUrdu: 'مہاجر کہانیوں کا مجموعہ اور تعلق کا مطلب۔',
    publishedYear: 2021,
    publisher: 'Diaspora Publications',
    isbn: '978-0-123456-80-2',
    coverImage: 'https://images.pexels.com/photos/256559/pexels-photo-256559.jpeg?auto=compress&cs=tinysrgb&w=400',
    buyLinks: {
      amazon: 'https://amazon.com/voices-of-home',
      bookshop: 'https://bookshop.org/voices-of-home'
    },
    excerpt: 'Home is not a place on the map, but a feeling that travels with you across oceans...'
  }
];

export const essays: Essay[] = [
  {
    id: 'language-of-code',
    title: 'The Language of Code',
    slug: 'language-of-code',
    description: 'How programming languages shape the way we think about problems.',
    publishedDate: '2023-11-15',
    publication: 'Tech Review Quarterly',
    readTime: 8,
    tags: ['technology', 'philosophy', 'programming'],
    content: 'Programming languages are more than just tools for building software...'
  },
  {
    id: 'stories-in-translation',
    title: 'Stories in Translation',
    titleUrdu: 'ترجمے میں کہانیاں',
    slug: 'stories-in-translation',
    description: 'The art and challenge of translating narrative across cultures.',
    descriptionUrdu: 'ثقافتوں کے پار کہانی کے ترجمے کا فن اور چیلنج۔',
    publishedDate: '2023-10-22',
    publication: 'Literary Review',
    readTime: 12,
    tags: ['translation', 'literature', 'culture'],
    content: 'Every translation is an act of interpretation, a bridge between worlds...'
  },
  {
    id: 'digital-diaspora',
    title: 'Digital Diaspora',
    slug: 'digital-diaspora',
    description: 'How technology connects and disconnects immigrant communities.',
    publishedDate: '2023-09-08',
    publication: 'Migration Studies',
    readTime: 15,
    tags: ['technology', 'migration', 'community'],
    content: 'The smartphone in every immigrant pocket carries more than apps...'
  },
  {
    id: 'writing-between-worlds',
    title: 'Writing Between Worlds',
    titleUrdu: 'دو دنیاوں کے بیچ لکھنا',
    slug: 'writing-between-worlds',
    description: 'The challenge of bilingual storytelling and cultural translation.',
    descriptionUrdu: 'دو زبانی کہانی گوئی اور ثقافتی ترجمے کا چیلنج۔',
    publishedDate: '2023-08-14',
    publication: 'Writers Quarterly',
    readTime: 10,
    tags: ['writing', 'bilingual', 'identity'],
    content: 'To write in two languages is to live in multiple worlds simultaneously...'
  },
  {
    id: 'future-of-storytelling',
    title: 'The Future of Storytelling',
    slug: 'future-of-storytelling',
    description: 'How digital media is transforming narrative and audience engagement.',
    publishedDate: '2023-07-03',
    publication: 'Media Innovation Lab',
    readTime: 7,
    tags: ['storytelling', 'digital media', 'future'],
    content: 'Stories have always adapted to their medium, from oral tradition to print...'
  },
  {
    id: 'code-as-poetry',
    title: 'Code as Poetry',
    slug: 'code-as-poetry',
    description: 'Finding artistic expression in the structure and rhythm of programming.',
    publishedDate: '2023-06-18',
    publication: 'Creative Code Review',
    readTime: 6,
    tags: ['programming', 'poetry', 'creativity'],
    content: 'There is poetry in the elegant solution, beauty in the well-crafted algorithm...'
  }
];

export const series: Series = {
  id: 'bonn-ka-banjara',
  title: 'Bonn Ka Banjara',
  titleUrdu: 'بن کا بنجارہ',
  slug: 'bonn-ka-banjara',
  description: 'A series exploring life as a wanderer in Germany',
  descriptionUrdu: 'جرمنی میں ایک آوارہ کی زندگی کی تلاش کا سلسلہ',
  totalEntries: 5,
  entries: [
    {
      id: 'arrival',
      title: 'Arrival',
      titleUrdu: 'آمد',
      slug: 'arrival',
      description: 'First steps in a new land',
      descriptionUrdu: 'نئی سرزمین میں پہلے قدم',
      publishedDate: '2023-01-15',
      seriesSlug: 'bonn-ka-banjara',
      order: 1,
      content: 'فرینکفرٹ ہوائی اڈے پر قدم رکھتے ہی احساس ہوا کہ یہ سفر محض جغرافیائی نہیں...'
    },
    {
      id: 'language-barriers',
      title: 'Language Barriers',
      titleUrdu: 'زبان کی دیواریں',
      slug: 'language-barriers',
      description: 'Learning to communicate in a foreign tongue',
      descriptionUrdu: 'اجنبی زبان میں بات چیت سیکھنا',
      publishedDate: '2023-02-01',
      seriesSlug: 'bonn-ka-banjara',
      order: 2,
      content: 'جرمن زبان کے الفاظ زبان پر اجنبی لگتے تھے، جیسے کوئی نئے کپڑے...'
    },
    {
      id: 'winter-solitude',
      title: 'Winter Solitude',
      titleUrdu: 'سردیوں کی تنہائی',
      slug: 'winter-solitude',
      description: 'Finding peace in the German winter',
      descriptionUrdu: 'جرمن سردیوں میں سکون تلاش کرنا',
      publishedDate: '2023-02-15',
      seriesSlug: 'bonn-ka-banjara',
      order: 3,
      content: 'بن کی سردی میں برف کے نیچے دبے پارک کی خاموشی کچھ اور کہتی تھی...'
    },
    {
      id: 'rhine-reflections',
      title: 'Rhine Reflections',
      titleUrdu: 'دریائے رائن کی عکاسی',
      slug: 'rhine-reflections',
      description: 'Thoughts by the flowing river',
      descriptionUrdu: 'بہتے دریا کے کنارے خیالات',
      publishedDate: '2023-03-01',
      seriesSlug: 'bonn-ka-banjara',
      order: 4,
      content: 'دریائے رائن کے کنارے کھڑے ہو کر لگتا تھا جیسے وقت رک گیا ہو...'
    },
    {
      id: 'finding-home',
      title: 'Finding Home',
      titleUrdu: 'گھر کی تلاش',
      slug: 'finding-home',
      description: 'What it means to belong somewhere new',
      descriptionUrdu: 'کسی نئی جگہ سے تعلق کا مطلب کیا ہے',
      publishedDate: '2023-03-15',
      seriesSlug: 'bonn-ka-banjara',
      order: 5,
      content: 'گھر وہ جگہ نہیں جہاں آپ پیدا ہوتے ہیں، بلکہ وہ جگہ ہے جہاں آپ خود کو تلاش کرتے ہیں...'
    }
  ]
};

export const talks = [
  {
    id: 'storytelling-in-tech',
    title: 'Storytelling in Tech',
    description: 'How narrative techniques can improve software documentation.',
    event: 'TechWrite Conference 2023',
    date: '2023-09-12',
    location: 'Berlin, Germany',
    slides: '/slides/storytelling-tech.pdf',
    video: 'https://youtube.com/watch?v=example'
  }
];

export const pressItems = [
  {
    id: 'writers-spotlight',
    title: 'Writers Spotlight: Abdul Basit Zafar',
    publication: 'Literary Quarterly',
    date: '2023-08-15',
    url: 'https://literaryquarterly.com/spotlight-abdul-basit-zafar',
    excerpt: 'Exploring the intersection of technology and traditional storytelling...'
  }
];