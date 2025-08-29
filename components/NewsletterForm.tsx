'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowUpRight } from 'lucide-react';

interface NewsletterFormProps {
  compact?: boolean;
  lang?: 'en' | 'ur';
}

export function NewsletterForm({ compact = false, lang = 'en' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  
  const isUrdu = lang === 'ur';

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
            required
            disabled={status === 'loading'}
            className={`input flex-1 text-sm ${isUrdu ? 'text-right urdu-text' : ''}`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className={`btn btn-primary text-sm px-6 ${isUrdu ? 'urdu-text' : ''}`}
          >
            {status === 'loading' ? '...' : (isUrdu ? 'سبسکرائب' : 'Subscribe')}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 text-xs ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
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
            className={`input ${isUrdu ? 'text-right urdu-text pr-12' : 'pl-12'} ${
              status === 'success' ? 'border-green-500' : status === 'error' ? 'border-red-500' : ''
            }`}
            dir={isUrdu ? 'rtl' : 'ltr'}
          />
          <Mail className={`w-5 h-5 text-gray-400 absolute top-4 ${isUrdu ? 'right-4' : 'left-4'}`} />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className={`btn btn-primary w-full group ${isUrdu ? 'urdu-text flex-row-reverse' : ''}`}
        >
          <span>{status === 'loading' ? (isUrdu ? 'سبسکرائب ہو رہا ہے...' : 'Subscribing...') : (isUrdu ? 'نیوز لیٹر سبسکرائب کریں' : 'Subscribe to Newsletter')}</span>
          <ArrowUpRight className={`w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isUrdu ? 'mr-2' : 'ml-2'}`} />
        </button>
      </form>

      {message && (
        <div className={`mt-6 p-4 rounded-xl flex items-center gap-3 ${
          status === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        } ${isUrdu ? 'flex-row-reverse text-right' : ''}`}>
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
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