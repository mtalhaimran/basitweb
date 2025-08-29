'use client';

import { useState } from 'react';
import { Mail, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface NewsletterFormProps {
  compact?: boolean;
}

export function NewsletterForm({ compact = false }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');

    try {
      // Simulate Mailchimp API call with double opt-in
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('success');
      setMessage('Thank you! Please check your email to confirm your subscription.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage('Sorry, something went wrong. Please try again.');
    }
  };

  if (compact) {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            disabled={status === 'loading'}
            className="input flex-1 text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading' || !email}
            className="btn btn-primary text-sm px-4"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </form>
        
        {message && (
          <div className={`mt-3 text-xs ${
            status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            disabled={status === 'loading'}
            className={`input pl-12 ${
              status === 'success' ? 'border-green-500' : status === 'error' ? 'border-red-500' : ''
            }`}
          />
          <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5" />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading' || !email}
          className="btn btn-primary w-full group"
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </form>

      {message && (
        <div className={`mt-6 p-4 rounded-xl flex items-center space-x-3 ${
          status === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status === 'success' ? (
            <CheckCircle className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <p className="text-sm">{message}</p>
        </div>
      )}

      <p className="mt-4 text-caption text-gray-500">
        We'll never share your email. Unsubscribe at any time.
      </p>
    </div>
  );
}