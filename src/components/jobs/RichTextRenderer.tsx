'use client';

import { type JobPost } from '@/lib/jobs-api';
import { cn } from '@/lib/utils';

interface RichTextRendererProps {
  content: JobPost['jobDescription'];
  className?: string;
}

interface RichTextNode {
  type: string;
  children?: RichTextNode[];
  text?: string;
  [key: string]: any;
}

export default function RichTextRenderer({ content, className }: RichTextRendererProps) {
  if (!content?.root?.children) {
    return (
      <div className={cn("text-muted-foreground", className)}>
        <p>No job description available.</p>
      </div>
    );
  }

  const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
    // Handle text nodes
    if (typeof node === 'string') {
      return node;
    }

    if (node.text !== undefined) {
      let text: React.ReactNode = node.text;
      
      // Apply text formatting
      if (node.bold) {
        text = <strong key={index}>{text}</strong>;
      }
      if (node.italic) {
        text = <em key={index}>{text}</em>;
      }
      if (node.underline) {
        text = <u key={index}>{text}</u>;
      }
      if (node.strikethrough) {
        text = <del key={index}>{text}</del>;
      }
      if (node.code) {
        text = (
          <code 
            key={index}
            className="bg-muted px-1.5 py-0.5 rounded  "
          >
            {text}
          </code>
        );
      }
      
      return text;
    }

    // Handle block elements
    const children = node.children?.map((child, childIndex) => 
      renderNode(child, childIndex)
    ) || [];

    switch (node.type) {
      case 'paragraph':
        return (
          <p key={index} className="mb-4 leading-7 last:mb-0">
            {children}
          </p>
        );

      case 'heading':
        const level = node.level || 1;
        const HeadingTag = `h${Math.min(level + 1, 6)}` as keyof JSX.IntrinsicElements;
        const headingClasses = {
          1: 'text-2xl font-bold mb-4 mt-8 first:mt-0',
          2: 'text-xl font-semibold mb-3 mt-6 first:mt-0',
          3: 'text-lg font-semibold mb-3 mt-4 first:mt-0',
          4: 'text-base font-semibold mb-2 mt-4 first:mt-0',
          5: ' font-semibold mb-2 mt-3 first:mt-0',
          6: ' font-medium mb-2 mt-3 first:mt-0',
        };
        
        return (
          <HeadingTag 
            key={index} 
            className={headingClasses[Math.min(level, 6) as keyof typeof headingClasses]}
          >
            {children}
          </HeadingTag>
        );

      case 'list':
        const ListTag = node.listType === 'number' ? 'ol' : 'ul';
        return (
          <ListTag 
            key={index} 
            className={cn(
              "mb-4 space-y-2",
              node.listType === 'number' ? "list-decimal" : "list-disc",
              "ml-6"
            )}
          >
            {children}
          </ListTag>
        );

      case 'listItem':
        return (
          <li key={index} className="leading-7">
            {children}
          </li>
        );

      case 'quote':
        return (
          <blockquote key={index} className="border-l-4 border-muted-foreground/20 pl-4 my-6 italic text-muted-foreground">
            {children}
          </blockquote>
        );

      case 'code':
        return (
          <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
            <code className="">
              {children}
            </code>
          </pre>
        );

      case 'link':
        return (
          <a
            key={index}
            href={node.url}
            target={node.newTab ? '_blank' : undefined}
            rel={node.newTab ? 'noopener noreferrer' : undefined}
            className="text-primary underline hover:no-underline"
          >
            {children}
          </a>
        );

      case 'linebreak':
        return <br key={index} />;

      case 'horizontalRule':
        return <hr key={index} className="my-8 border-muted-foreground/20" />;

      // Handle any other block types as divs
      default:
        if (node.children) {
          return (
            <div key={index} className="mb-4">
              {children}
            </div>
          );
        }
        return null;
    }
  };

  try {
    const renderedContent = content.root.children.map((node, index) => 
      renderNode(node as RichTextNode, index)
    );

    return (
      <div className={cn("rich-text-content", className)}>
        {renderedContent}
      </div>
    );
  } catch (error) {
    console.error('Error rendering rich text:', error);
    
    // Fallback: try to extract plain text
    const extractText = (children: any[]): string => {
      return children
        .map((child) => {
          if (typeof child === 'string') return child;
          if (child.text) return child.text;
          if (child.children) return extractText(child.children);
          return '';
        })
        .join(' ');
    };

    const plainText = extractText(content.root.children);
    
    return (
      <div className={cn("text-foreground leading-7", className)}>
        {plainText.split('\n').map((paragraph, index) => (
          <p key={index} className="mb-4 last:mb-0">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    );
  }
}
