"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface MarkdownCheatSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MarkdownCheatSheet({ open, onOpenChange }: MarkdownCheatSheetProps) {
  const cheatSheet = [
    {
      category: 'Headers',
      items: [
        { syntax: '# H1', description: 'Heading 1' },
        { syntax: '## H2', description: 'Heading 2' },
        { syntax: '### H3', description: 'Heading 3' },
      ],
    },
    {
      category: 'Emphasis',
      items: [
        { syntax: '**bold**', description: 'Bold text' },
        { syntax: '*italic*', description: 'Italic text' },
        { syntax: '~~strikethrough~~', description: 'Strikethrough' },
      ],
    },
    {
      category: 'Lists',
      items: [
        { syntax: '- Item', description: 'Unordered list' },
        { syntax: '1. Item', description: 'Ordered list' },
        { syntax: '- [ ] Task', description: 'Task list' },
      ],
    },
    {
      category: 'Links & Images',
      items: [
        { syntax: '[text](url)', description: 'Link' },
        { syntax: '![alt](url)', description: 'Image' },
      ],
    },
    {
      category: 'Code',
      items: [
        { syntax: '`code`', description: 'Inline code' },
        { syntax: '```language\ncode\n```', description: 'Code block' },
      ],
    },
    {
      category: 'Other',
      items: [
        { syntax: '> quote', description: 'Blockquote' },
        { syntax: '---', description: 'Horizontal rule' },
        { syntax: '| col | col |', description: 'Table' },
      ],
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Markdown Cheat Sheet</DialogTitle>
          <DialogDescription>
            Quick reference for markdown syntax
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {cheatSheet.map((section) => (
              <div key={section.category}>
                <h3 className="text-sm font-semibold mb-3 text-foreground">
                  {section.category}
                </h3>
                <div className="space-y-2">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-2 rounded-lg hover:bg-muted/50"
                    >
                      <code className="flex-1 text-xs bg-muted px-2 py-1 rounded font-mono text-primary">
                        {item.syntax}
                      </code>
                      <span className="flex-1 text-sm text-muted-foreground">
                        {item.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}