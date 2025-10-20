"use client";

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Bold,
  Italic,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Code,
  Quote,
  Link,
  Image,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ToolbarProps {
  onFormat: (format: string) => void;
}

export function Toolbar({ onFormat }: ToolbarProps) {
  const tools = [
    { icon: Bold, label: 'Bold', format: 'bold', shortcut: 'Ctrl+B' },
    { icon: Italic, label: 'Italic', format: 'italic', shortcut: 'Ctrl+I' },
    { separator: true },
    { icon: Heading1, label: 'Heading 1', format: 'heading1', shortcut: 'Ctrl+1' },
    { icon: Heading2, label: 'Heading 2', format: 'heading2', shortcut: 'Ctrl+2' },
    { icon: Heading3, label: 'Heading 3', format: 'heading3', shortcut: 'Ctrl+3' },
    { separator: true },
    { icon: List, label: 'Bullet List', format: 'bulletList', shortcut: 'Ctrl+8' },
    { icon: ListOrdered, label: 'Numbered List', format: 'numberedList', shortcut: 'Ctrl+9' },
    { separator: true },
    { icon: Code, label: 'Inline Code', format: 'code', shortcut: 'Ctrl+`' },
    { icon: Quote, label: 'Quote', format: 'quote', shortcut: 'Ctrl+Shift+.' },
    { separator: true },
    { icon: Link, label: 'Link', format: 'link', shortcut: 'Ctrl+K' },
    { icon: Image, label: 'Image', format: 'image', shortcut: 'Ctrl+Shift+I' },
  ];

  return (
    <div className="flex items-center gap-1 p-2 border-b border-border bg-card flex-wrap">
      <TooltipProvider delayDuration={300}>
        {tools.map((tool, index) => {
          if ('separator' in tool) {
            return <Separator key={index} orientation="vertical" className="h-6 mx-1" />;
          }

          const Icon = tool.icon;
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => onFormat(tool.format)}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">
                  {tool.label}
                  <span className="ml-2 text-muted-foreground">{tool.shortcut}</span>
                </p>
              </TooltipContent>
            </Tooltip>
          );
        })}
      </TooltipProvider>
    </div>
  );
}