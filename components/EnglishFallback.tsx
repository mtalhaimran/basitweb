import Link from 'next/link';
import { Globe, ArrowLeft } from 'lucide-react';

interface EnglishFallbackProps {
  urduPath: string;
  sectionName: string;
}

export function EnglishFallback({ urduPath, sectionName }: EnglishFallbackProps) {
  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8 flex justify-center">
          <div className="p-6 bg-brand-light rounded-full">
            <Globe className="w-16 h-16 text-brand" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold text-ink mb-4">
          Content Only Available in Urdu
        </h1>
        
        <p className="text-xl text-ink-muted mb-8">
          The {sectionName} section is currently only available in Urdu. 
          English translations are coming soon.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={urduPath}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-white bg-brand hover:bg-brand-hover transition-colors rounded-lg shadow-md hover:shadow-lg"
          >
            <span>View in Urdu (اردو میں دیکھیں)</span>
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <Link
            href="/en"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-lg font-medium text-brand border-2 border-brand hover:bg-brand hover:text-white transition-colors rounded-lg"
          >
            <span>Back to English Home</span>
          </Link>
        </div>
        
        <div className="mt-12 p-6 bg-surface-elevated rounded-lg border border-line">
          <h2 className="text-lg font-semibold text-ink mb-3">
            Why is this content in Urdu only?
          </h2>
          <p className="text-ink-muted leading-relaxed">
            Most of Abdul Basit Zafar&apos;s writings are in Urdu, reflecting the rich literary 
            tradition and nuanced expression that the language offers. We&apos;re working on 
            making selected works available in English, but we encourage you to experience 
            the original Urdu versions for the full depth of meaning.
          </p>
        </div>
      </div>
    </div>
  );
}
