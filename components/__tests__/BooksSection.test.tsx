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

  it('renders "View All Books" link', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Test Book',
        buyLink: 'https://example.com/buy',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    const viewAllLink = screen.getByText('تمام کتابیں دیکھیں ←');
    expect(viewAllLink).toBeInTheDocument();
    expect(viewAllLink.closest('a')).toHaveAttribute('href', '/books');
  });

  it('renders book cards without wrapper links', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Book Title',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    const bookArticle = screen.getByRole('article', { name: 'Book: Book Title' });
    expect(bookArticle).toBeInTheDocument();
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

  it('renders buy button when buyLink is provided', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Book With Buy Link',
        buyLink: 'https://example.com/buy',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    const buyButton = screen.getByText('خریدیں');
    expect(buyButton).toBeInTheDocument();
    expect(buyButton.closest('a')).toHaveAttribute('href', 'https://example.com/buy');
    expect(buyButton.closest('a')).toHaveAttribute('target', '_blank');
    expect(buyButton.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('does not render buy button when buyLink is not provided', () => {
    const books = [
      {
        slug: 'book-1',
        title: 'Book Without Buy Link',
      },
    ];

    render(<BooksSection books={books} locale="ur" />);
    
    expect(screen.queryByText('خریدیں')).not.toBeInTheDocument();
  });
});
