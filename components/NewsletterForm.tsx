'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

interface NewsletterFormProps {
  lang?: 'en' | 'ur';
}

export function NewsletterForm({ lang = 'en' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isUrdu = lang === 'ur';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      // Simulate Mailchimp API call
      // In production, this would call your Mailchimp API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setMessage(isUrdu 
        ? 'شکریہ! براہ کرم اپنی ای میل چیک کریں اور سبسکرپشن کی تصدیق کریں۔'
        : 'Thank you! Please check your email to confirm your subscription.'
      );
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(isUrdu 
        ? 'معذرت، کچھ غلط ہوا۔ براہ کرم دوبارہ کوشش کریں۔'
        : 'Sorry, something went wrong. Please try again.'
      );
    }
  };

  return (
    <div className={isUrdu ? 'text-right' : ''}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isUrdu ? 'آپ کا ای میل ایڈریس' : 'Your email address'}
            required
            disabled={status === 'loading'}
            className={`w-full px-4 py-2 text-sm border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 ${
              isUrdu ? 'text-right urdu-text pr-10' : 'pl-10'
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <Mail className={`w-4 h-4 text-muted-foreground absolute top-2.5 ${isUrdu ? 'right-3' : 'left-3'}`} />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`w-full px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors ${
            isUrdu ? 'urdu-text' : ''
          }`}
        >
          {status === 'loading' 
            ? (isUrdu ? 'سائن اپ ہو رہا ہے...' : 'Signing up...') 
            : (isUrdu ? 'سائن اپ کریں' : 'Sign Up')
          }
        </button>
      </form>

      {message && (
        <p className={`mt-3 text-xs ${
          status === 'success' ? 'text-green-600' : 'text-red-600'
        } ${isUrdu ? 'urdu-text' : ''}`}>
          {message}
        </p>
      )}
    </div>
  );
}