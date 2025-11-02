import React from 'react';

type Node = any;

function renderNode(node: Node, key?: number): React.ReactNode {
  if (!node) return null;

  // Text leaf
  if (typeof node.text === 'string') {
    let el: React.ReactNode = node.text;
    if (node.code) el = <code key={key}>{el}</code>;
    if (node.bold) el = <strong key={key}>{el}</strong>;
    if (node.italic) el = <em key={key}>{el}</em>;
    if (node.underline) el = <u key={key}>{el}</u>;
    return el;
  }

  const children = Array.isArray(node.children) ? node.children.map((c: Node, i: number) => renderNode(c, i)) : null;

  switch (node.type) {
    case 'p':
    case 'paragraph':
      return <p key={key} className="leading-8">{children}</p>;
    case 'h1': return <h1 key={key} className="text-4xl font-bold">{children}</h1>;
    case 'h2': return <h2 key={key} className="text-3xl font-semibold">{children}</h2>;
    case 'h3': return <h3 key={key} className="text-2xl font-semibold">{children}</h3>;
    case 'h4': return <h4 key={key} className="text-xl font-semibold">{children}</h4>;
    case 'ul':
    case 'bulleted-list':
      return <ul key={key} className="list-disc ps-6 space-y-2">{children}</ul>;
    case 'ol':
    case 'numbered-list':
      return <ol key={key} className="list-decimal ps-6 space-y-2">{children}</ol>;
    case 'li':
    case 'list-item':
      return <li key={key}>{children}</li>;
    case 'blockquote':
      return <blockquote key={key} className="border-s-4 ps-4 italic opacity-80">{children}</blockquote>;
    case 'code':
    case 'code_block':
      return <pre key={key} className="rounded-lg p-4 overflow-x-auto"><code>{children}</code></pre>;
    case 'a':
    case 'link':
      return <a key={key} href={node.url} className="underline">{children}</a>;
    case 'img':
    case 'image':
      return <img key={key} src={node.url} alt={node.caption || ''} />;
    case 'hr':
      return <hr key={key} />;
    default:
      return <div key={key}>{children}</div>;
  }
}

// Component for TinaCMS rich text format
export default function RichText({ body }: { body: any }) {
  if (!body) return null;
  const nodes: Node[] = Array.isArray(body?.children) ? body.children : Array.isArray(body) ? body : [body];
  return (
    <div className="prose prose-rtl max-w-none">
      {nodes.map((n, i) => renderNode(n, i))}
    </div>
  );
}

// Simple component for rendering plain markdown/text content
export function SimpleMarkdown({ content }: { content: string }) {
  if (!content) return null;
  
  // Simple markdown-like rendering for text content
  const lines = content.split('\n');
  
  return (
    <div className="space-y-4">
      {lines.map((line, idx) => {
        // Empty line
        if (!line.trim()) {
          return <br key={idx} />;
        }
        
        // Headings
        if (line.startsWith('# ')) {
          return <h1 key={idx} className="text-4xl font-bold mb-4">{line.substring(2)}</h1>;
        }
        if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-3xl font-semibold mb-3">{line.substring(3)}</h2>;
        }
        if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-2xl font-semibold mb-2">{line.substring(4)}</h3>;
        }
        
        // Blockquote
        if (line.startsWith('> ')) {
          return (
            <blockquote key={idx} className="border-r-4 border-brand pr-4 italic text-ink-muted my-4">
              {line.substring(2)}
            </blockquote>
          );
        }
        
        // Regular paragraph
        return <p key={idx} className="leading-8 text-lg">{line}</p>;
      })}
    </div>
  );
}
