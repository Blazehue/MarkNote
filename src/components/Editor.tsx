"use client";

import { useRef, KeyboardEvent } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { countWords, countCharacters } from '@/lib/markdown-utils';

interface EditorProps {
  content: string;
  onChange: (content: string) => void;
  onScroll?: (scrollPercentage: number) => void;
}

export function Editor({ content, onChange, onScroll }: EditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle Tab key for indentation
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newContent = content.substring(0, start) + '  ' + content.substring(end);
      
      onChange(newContent);
      
      // Set cursor position after the inserted spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleScroll = () => {
    const textarea = textareaRef.current;
    if (!textarea || !onScroll) return;

    const scrollPercentage =
      textarea.scrollTop / (textarea.scrollHeight - textarea.clientHeight);
    onScroll(scrollPercentage);
  };

  const wordCount = countWords(content);
  const charCount = countCharacters(content);

  return (
    <div className="flex flex-col h-full">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        placeholder="Start typing your markdown here..."
        className="flex-1 resize-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 font-mono text-sm p-6 leading-relaxed"
      />
      
      {/* Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-t border-border bg-muted/30 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>{wordCount} {wordCount === 1 ? 'word' : 'words'}</span>
          <span>{charCount} {charCount === 1 ? 'character' : 'characters'}</span>
        </div>
        <div>Markdown</div>
      </div>
    </div>
  );
}