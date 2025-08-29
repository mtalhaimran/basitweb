'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface NewsletterFormProps {
  lang?: 'en' | 'ur';
  compact?: boolean;
}

export function NewsletterForm({ lang = 'en', compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const isUrdu = lang === 'ur';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage(isUrdu 
        ? 'براہ کرم صحیح ای میل ایڈریس داخل کریں۔'
        : 'Please enter a valid email address.'
      );
      return;
    }

    setStatus('loading');

    try {
      // Simulate Mailchimp API call with double opt-in
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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

  if (compact) {
    return (
      <div className={isUrdu ? 'text-right' : ''}>
        <form onSubmit={handleSubmit} className={`flex gap-2 ${isUrdu ? 'flex-row-reverse' : ''}`}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isUrdu ? 'ای میل' : 'Email'}
            required
            disabled={status === 'loading'}
            className={`input flex-1 text-xs ${isUrdu ? 'text-right urdu-body-sm' : ''}`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={`btn btn-primary text-xs px-3 ${isUrdu ? 'urdu-body-sm' : ''}`}
          >
            {status === 'loading' ? '...' : (isUrdu ? 'سائن اپ' : 'Sign up')}
          </button>
        </form>
        
        {message && (
          <div className={`mt-2 text-xs ${
            status === 'success' ? 'text-success' : 'text-error'
          } ${isUrdu ? 'urdu-body-sm' : ''}`}>
            {message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={isUrdu ? 'text-right' : ''}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={isUrdu ? 'آپ کا ای میل ایڈریس' : 'Your email address'}
            required
            disabled={status === 'loading'}
            className={`input ${isUrdu ? 'text-right urdu-body pr-12' : 'pl-12'} ${
              status === 'success' ? 'border-success' : status === 'error' ? 'border-error' : ''
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <Mail className={`w-4 h-4 text-ink-muted absolute top-3 ${isUrdu ? 'right-4' : 'left-4'}`} />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`btn btn-primary w-full ${isUrdu ? 'urdu-body-sm' : ''}`}
        >
          {status === 'loading' 
            ? (isUrdu ? 'سائن اپ ہو رہا ہے...' : 'Signing up...') 
            : (isUrdu ? 'سائن اپ کریں' : 'Subscribe')
          }
          <ArrowRight className={`w-4 h-4 ${isUrdu ? 'mr-2 rotate-180' : 'ml-2'}`} />
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
          status === 'success' ? 'success-state' : 'error-state'
        } ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {status === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <p className={`text-xs ${isUrdu ? 'urdu-body-sm' : ''}`}>
            {message}
          </p>
        </div>
      )}

      <p className={`mt-4 text-caption ${isUrdu ? 'urdu-body-sm' : ''}`}>
        {isUrdu 
          ? 'ہم آپ کی ای میل کبھی شیئر نہیں کریں گے۔ آپ کسی بھی وقت ان سبسکرائب کر سکتے ہیں۔'
          : 'We\'ll never share your email. Unsubscribe at any time.'
        }
      </p>
    </div>
  );
}