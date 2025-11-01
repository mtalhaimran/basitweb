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

export default function RichText({ body }: { body: any }) {
  if (!body) return null;
  const nodes: Node[] = Array.isArray(body?.children) ? body.children : Array.isArray(body) ? body : [body];
  return (
    <div className="prose prose-rtl max-w-none">
      {nodes.map((n, i) => renderNode(n, i))}
    </div>
  );
}
