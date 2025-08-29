import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { books, essays } from '@/lib/data/content';

interface PortfolioGridProps {
  lang?: 'en' | 'ur';
}

export function PortfolioGrid({ lang = 'en' }: PortfolioGridProps) {
  const isUrdu = lang === 'ur';
  
  const portfolioItems = [
    ...books.slice(0, 3).map(book => ({
      id: book.id,
      title: isUrdu && book.titleUrdu ? book.titleUrdu : book.title,
      description: isUrdu && book.descriptionUrdu ? book.descriptionUrdu : book.description,
      type: isUrdu ? 'کتاب' : 'Book',
      href: `${isUrdu ? '/ur' : ''}/books/${book.slug}`,
      year: book.publishedYear
    })),
    ...essays.slice(0, 3).map(essay => ({
      id: essay.id,
      title: isUrdu && essay.titleUrdu ? essay.titleUrdu : essay.title,
      description: isUrdu && essay.descriptionUrdu ? essay.descriptionUrdu : essay.description,
      type: isUrdu ? 'مضمون' : 'Essay',
      href: `${isUrdu ? '/ur' : ''}/writing/${essay.slug}`,
      year: new Date(essay.publishedDate).getFullYear()
    }))
  ];

  return (
    <section 
      className="py-16" 
      data-pagefind-body
      data-pagefind-filter={`lang:${lang}`}
      data-pagefind-meta={`title:${isUrdu ? 'پورٹ فولیو' : 'Portfolio'}`}
    >
      <div className="container mx-auto px-4">
        <div className={`mb-12 ${isUrdu ? 'text-right' : ''}`}>
          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isUrdu ? 'urdu-heading' : ''}`}>
            {isUrdu ? 'عبدالباسط ظفر' : 'Abdul Basit Zafar'}
          </h1>
          <p className={`text-xl text-muted-foreground max-w-2xl ${isUrdu ? 'urdu-text ml-auto' : ''}`}>
            {isUrdu 
              ? 'ایک لکھاری اور کہانی گو جو ٹیکنالوجی اور ثقافت کے درمیان پلوں کا کام کرتا ہے۔'
              : 'Writer and storyteller exploring the intersection of technology, culture, and human experience.'
            }
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="group border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`flex justify-between items-start mb-4 ${isUrdu ? 'flex-row-reverse' : ''}`}>
                <span className={`text-xs font-medium text-muted-foreground uppercase tracking-wide ${isUrdu ? 'urdu-text' : ''}`}>
                  {item.type}
                </span>
                <span className="text-xs text-muted-foreground">
                  {item.year}
                </span>
              </div>
              
              <h3 className={`text-lg font-semibold mb-3 group-hover:text-primary transition-colors ${isUrdu ? 'urdu-heading text-right' : ''}`}>
                {item.title}
              </h3>
              
              <p className={`text-muted-foreground text-sm mb-6 leading-relaxed ${isUrdu ? 'urdu-text text-right' : ''}`}>
                {item.description}
              </p>

              <Link 
                href={item.href}
                className={`inline-flex items-center text-sm font-medium text-primary hover:underline ${
                  isUrdu ? 'flex-row-reverse urdu-text' : ''
                }`}
              >
                {isUrdu ? 'دیکھیں' : 'View'}
                <ExternalLink className={`w-3 h-3 ${isUrdu ? 'mr-1' : 'ml-1'}`} />
              </Link>
            </div>
          ))}
        </div>

        {/* View All Work Link */}
        <div className={`mt-12 text-center ${isUrdu ? 'urdu-text' : ''}`}>
          <Link 
            href={isUrdu ? '/ur/work' : '/work'}
            className="inline-flex items-center text-lg font-medium text-primary hover:underline"
          >
            {isUrdu ? 'تمام کام دیکھیں' : 'View All Work'}
            <ExternalLink className={`w-4 h-4 ${isUrdu ? 'mr-2' : 'ml-2'}`} />
          </Link>
        </div>
      </div>
    </section>
  );
}