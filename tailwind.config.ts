import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Satoshi', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
        'urdu-heading': ['Noto Nastaliq Urdu', 'serif'],
        'urdu-body': ['Noto Naskh Arabic', 'serif'],
      },
      colors: {
        brand: colors.red[600],
        'brand-hover': colors.red[700],
        'brand-light': colors.red[50],
        surface: {
          DEFAULT: '#ECE1D5',
          elevated: '#F5F0E8',
          muted: '#E5D9CC',
          white: '#FFFFFF',
        },
        ink: {
          DEFAULT: '#1F2937',
          muted: '#6B7280',
          light: '#9CA3AF',
        },
        line: {
          DEFAULT: '#D1D5DB',
          strong: '#9CA3AF',
        },
        success: colors.green[600],
        warning: colors.amber[600],
        error: colors.red[600],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.4' }],
        '3xl': ['1.875rem', { lineHeight: '1.3' }],
        '4xl': ['2.25rem', { lineHeight: '1.2' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.1' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        sm: '0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 8px 0 rgba(0, 0, 0, 0.1)',
        lg: '0 8px 16px 0 rgba(0, 0, 0, 0.1)',
        xl: '0 12px 24px 0 rgba(0, 0, 0, 0.1)',
        '2xl': '0 20px 40px 0 rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        300: '300ms',
      },
      animation: {
        'fade-in': 'fadeIn 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 200ms cubic-bezier(0.4, 0, 0.2, 1)',
        'letter-reveal': 'letterReveal 600ms cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        letterReveal: {
          '0%': { opacity: '0.001', filter: 'blur(10px)', transform: 'translateY(10px)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0px)' },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
