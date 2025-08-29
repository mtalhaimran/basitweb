'use client';

'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

interface NewsletterFormProps {
  compact?: boolean;
  lang?: 'en' | 'ur';
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) { // Removed lang prop as site is now primarily Urdu
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const isUrdu = true; // Always Urdu

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(isUrdu ? 'براہ کرم ایک درست ای میل ایڈریس درج کریں۔' : 'Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      // Simulate Mailchimp API call with double opt-in
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage(isUrdu 
        ? 'شکریہ! براہ کرم اپنی سبسکرپشن کی تصدیق کے لیے اپنا ای میل چیک کریں۔'
        : 'Thank you! Please check your email to confirm your subscription.'
      );
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(isUrdu 
        ? 'معذرت، کچھ غلط ہو گیا۔ براہ کرم دوبارہ کوشش کریں۔'
        : 'Sorry, something went wrong. Please try again.'
      );
    }
  };

  if (compact) {
    return (
      <div>
        <form onSubmit={handleSubmit} className={`flex gap-3 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isUrdu ? 'آپ کا ای میل' : 'Your email'}
            required // Keep required
            disabled={status === 'loading'}
            className={`input flex-1 text-sm ${isUrdu ? 'text-right urdu-text' : ''}`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={`btn btn-primary text-sm px-6 urdu-text`} // Always Urdu
          >
            {status === 'loading' ? '...' : (isUrdu ? 'سبسکرائب' : 'Subscribe')}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 text-xs ${
            status === 'success' ? 'text-success' : 'text-error' // Use semantic colors
          } ${isUrdu ? 'urdu-text text-right' : ''}`}>
            {message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isUrdu ? 'آپ کا ای میل ایڈریس' : 'Your email address'}
            required
            disabled={status === 'loading'}
            className={`input ${isUrdu ? 'text-right urdu-text pr-12' : 'pl-12'} ${ // Always Urdu
              status === 'success' ? 'border-success' : status === 'error' ? 'border-error' : '' // Use semantic colors
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <Mail className={`w-5 h-5 text-ink-light absolute top-4 right-4`} /> {/* Use new ink-light, always RTL */}
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`btn btn-primary w-full group urdu-text flex-row-reverse`} // Always Urdu
        >
          <span>{status === 'loading' ? (isUrdu ? 'سبسکرائب ہو رہا ہے...' : 'Subscribing...') : (isUrdu ? 'نیوز لیٹر سبسکرائب کریں' : 'Subscribe to Newsletter')}</span>
          <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isUrdu ? 'mr-2' : 'ml-2'}`} />
        </button>
      </form>

      {message && (
        <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
          status === 'success' 
            ? 'bg-success/10 text-success border border-success/30' // Use semantic colors
            : 'bg-error/10 text-error border border-error/30' // Use semantic colors
        } flex-row-reverse text-right`}> {/* Always RTL */}
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0 text-success" /> {/* Use semantic color */}
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className={`text-sm ${isUrdu ? 'urdu-text' : ''}`}>{message}</p>
        </div>
      )}

      <p className={`mt-6 text-caption text-gray-500 ${isUrdu ? 'urdu-text text-right' : ''}`}>
        {isUrdu 
          ? 'ہم آپ کا ای میل کبھی شیئر نہیں کریں گے۔ کسی بھی وقت ان سبسکرائب کریں۔'
          : 'We\'ll never share your email. Unsubscribe at any time.'
        }
      </p>
    </div>
  );
}