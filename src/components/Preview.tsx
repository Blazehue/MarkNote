"use client";

import { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrism from 'rehype-prism-plus';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PreviewProps {
  content: string;
  scrollPercentage?: number;
}

export function Preview({ content, scrollPercentage = 0 }: PreviewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current && scrollPercentage !== undefined) {
      const scrollContainer = scrollRef.current;
      const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight;
      scrollContainer.scrollTop = maxScroll * scrollPercentage;
    }
  }, [scrollPercentage]);

  return (
    <ScrollArea className="h-full">
      <div ref={scrollRef} className="markdown-preview p-6 min-h-full">
        {content ? (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw, rehypePrism]}
            components={{
              code({ node, inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <pre className={className}>
                    <code className={className} {...props}>
                      {children}
                    </code>
                  </pre>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <p>Preview will appear here...</p>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}