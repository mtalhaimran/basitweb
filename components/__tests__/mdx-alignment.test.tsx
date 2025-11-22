import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CenterText } from '../mdx/CenterText';
import { RightAlign } from '../mdx/RightAlign';
import { LeftAlign } from '../mdx/LeftAlign';

describe('MDX Alignment Components', () => {
  describe('CenterText', () => {
    it('renders children with center alignment', () => {
      render(<CenterText>Test centered content</CenterText>);
      
      const element = screen.getByText('Test centered content');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('!text-center');
    });

    it('has dir="auto" attribute', () => {
      render(<CenterText>Test content</CenterText>);
      
      const element = screen.getByText('Test content');
      expect(element).toHaveAttribute('dir', 'auto');
    });

    it('renders multiple children', () => {
      render(
        <CenterText>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </CenterText>
      );
      
      expect(screen.getByText('First paragraph')).toBeInTheDocument();
      expect(screen.getByText('Second paragraph')).toBeInTheDocument();
    });
  });

  describe('RightAlign', () => {
    it('renders children with right alignment', () => {
      render(<RightAlign>Test right-aligned content</RightAlign>);
      
      const element = screen.getByText('Test right-aligned content');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('text-right');
    });

    it('has dir="rtl" attribute for RTL languages', () => {
      render(<RightAlign>محتوی اردو</RightAlign>);
      
      const element = screen.getByText('محتوی اردو');
      expect(element).toHaveAttribute('dir', 'rtl');
    });
  });

  describe('LeftAlign', () => {
    it('renders children with left alignment', () => {
      render(<LeftAlign>Test left-aligned content</LeftAlign>);
      
      const element = screen.getByText('Test left-aligned content');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass('!text-left');
    });

    it('has dir="ltr" attribute for LTR languages', () => {
      render(<LeftAlign>Left-to-right text</LeftAlign>);
      
      const element = screen.getByText('Left-to-right text');
      expect(element).toHaveAttribute('dir', 'ltr');
    });
  });
});
