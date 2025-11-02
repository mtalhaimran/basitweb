import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BooksSection } from '../BooksSection';

describe('BooksSection', () => {
  it('renders empty state when no books provided', () => {
    render(<BooksSection books={[]} locale="ur" />);
    
    expect(screen.getByText('کتابیں')).toBeInTheDocument();
    expect(screen.getByText('ابھی کوئی کتاب دستیاب نہیں ہے۔')).toBeInTheDocument();
  });

  it('renders books grid with provided books', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Test Book 1',
        coverImage: 'book1.jpg',
        buyLink: 'https://example.com/book1',
      },
      {
        slug: 'book-2',
        title: 'Test Book 2',
        coverImage: 'book2.jpg',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    expect(screen.getByText('Test Book 1')).toBeInTheDocument();
    expect(screen.getByText('Test Book 2')).toBeInTheDocument();
  });

  it('renders book with buy link as clickable', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Purchasable Book',
        buyLink: 'https://example.com/buy',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    const link = screen.getByRole('link', { name: /Purchase Purchasable Book/i });
    expect(link).toHaveAttribute('href', 'https://example.com/buy');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders book without buy link as non-clickable', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Non-Purchasable Book',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    expect(screen.getByText('Non-Purchasable Book')).toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Accessible Book',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    const article = screen.getByRole('article');
    expect(article).toHaveAttribute('aria-label', 'Book: Accessible Book');
    expect(article).toHaveAttribute('tabIndex', '0');
  });

  it('renders placeholder when no cover image', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Book Without Cover',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    expect(screen.getByText('[کتاب کی تصویر]')).toBeInTheDocument();
  });
});
