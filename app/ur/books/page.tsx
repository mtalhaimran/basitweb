import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BookCard } from '@/components/BookCard';
import { books } from '@/lib/data/content';

export const metadata = {
  title: 'کتابیں - عبدالباسط ظفر',
  description: 'عبدالباسط ظفر کی کتابوں کا مکمل مجموعہ - ناولز اور کہانیاں جو شناخت، ٹیکنالوجی، اور مختلف ثقافتوں میں انسانی تجربات کو دریافت کرتی ہیں۔',
  openGraph: {
    title: 'کتابیں - عبدالباسط ظفر',
    description: 'عبدالباسط ظفر کی کتابوں کا مکمل مجموعہ',
    locale: 'ur_PK'
  }
};

export default function UrduBooksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header lang="ur" />
      <main id="main-content" className="flex-1 py-16" data-pagefind-body>
        <div className="container mx-auto px-4">
          <div className="mb-12 text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-urdu-heading">کتابیں</h1>
            <p className="text-xl text-muted-foreground max-w-3xl ml-auto font-urdu-body leading-relaxed">
              ناولز اور کہانیوں کا مجموعہ جو شناخت، ٹیکنالوجی، اور مختلف ثقافتوں میں انسانی تجربات کو دریافت کرتا ہے۔ ہر کتاب ایک نیا سفر ہے جو دلوں اور دماغوں کو جوڑتا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {books.map((book) => (
              <BookCard key={book.id} book={book} lang="ur" />
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-4 font-urdu-heading">مزید کتابیں جلد آ رہی ہیں</h2>
              <p className="text-muted-foreground font-urdu-body mb-6">
                نئی کہانیوں اور کتابوں کی اطلاع کے لیے ہمارے نیوز لیٹر کو سبسکرائب کریں۔
              </p>
              <Link 
                href="/ur/newsletter"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium focus-ring flex-row-reverse font-urdu-body"
              >
                نیوز لیٹر سبسکرائب کریں
                <Mail className="w-4 h-4 mr-2" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer lang="ur" />
    </div>
  );
}