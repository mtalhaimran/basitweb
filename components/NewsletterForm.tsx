'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

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
            className={`w-full px-4 py-3 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-50 transition-all ${
              isUrdu ? 'text-right font-urdu-body pr-12' : 'pl-12'
            } ${status === 'success' ? 'border-green-500' : status === 'error' ? 'border-red-500' : ''}`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <Mail className={`w-4 h-4 text-muted-foreground absolute top-3.5 ${isUrdu ? 'right-4' : 'left-4'}`} />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`w-full px-4 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 transition-all btn-primary focus-ring ${
            isUrdu ? 'font-urdu-body' : ''
          }`}
        >
          {status === 'loading' 
            ? (isUrdu ? 'سائن اپ ہو رہا ہے...' : 'Signing up...') 
            : (isUrdu ? 'سائن اپ کریں' : 'Subscribe')
          }
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg flex items-center space-x-2 ${
          status === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        } ${isUrdu ? 'flex-row-reverse space-x-reverse' : ''}`}>
          {status === 'success' ? (
            <CheckCircle className="w-4 h-4 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
          )}
          <p className={`text-xs ${isUrdu ? 'font-urdu-body' : ''}`}>
            {message}
          </p>
        </div>
      )}

      <p className={`mt-3 text-xs text-muted-foreground ${isUrdu ? 'font-urdu-body' : ''}`}>
        {isUrdu 
          ? 'ہم آپ کی ای میل کبھی شیئر نہیں کریں گے۔ آپ کسی بھی وقت ان سبسکرائب کر سکتے ہیں۔'
          : 'We\'ll never share your email. Unsubscribe at any time.'
        }
      </p>
    </div>
  );
}