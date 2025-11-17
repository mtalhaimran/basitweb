import React from 'react';
import { CenterText } from './mdx/CenterText';
import { RightAlign } from './mdx/RightAlign';
import { LeftAlign } from './mdx/LeftAlign';

// MDX components mapping for custom text alignment
const mdxComponents = {
  CenterText,
  RightAlign,
  LeftAlign,
};

interface MDXProviderProps {
  children: React.ReactNode;
  components?: Record<string, React.ComponentType<any>>;
}

export function MDXProvider({ children, components = {} }: MDXProviderProps) {
  // Merge custom components with default MDX components
  const allComponents = { ...mdxComponents, ...components };
  
  // Pass components through React context or props
  // For now, we'll just render children as-is since we'll handle
  // component resolution in the RichText renderer
  return <>{children}</>;
}

// Export the components map for use in RichText renderer
export { mdxComponents };
