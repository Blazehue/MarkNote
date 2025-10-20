"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Download, Copy, FileText, FileCode, FileType, Check } from 'lucide-react';
import {
  exportAsMarkdown,
  exportAsHTML,
  exportAsText,
  copyToClipboard,
} from '@/lib/markdown-utils';

interface ExportMenuProps {
  title: string;
  content: string;
  htmlContent: string;
}

export function ExportMenu({ title, content, htmlContent }: ExportMenuProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => exportAsMarkdown(title, content)}>
          <FileText className="h-4 w-4 mr-2" />
          Export as Markdown (.md)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAsHTML(title, htmlContent)}>
          <FileCode className="h-4 w-4 mr-2" />
          Export as HTML (.html)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => exportAsText(title, content)}>
          <FileType className="h-4 w-4 mr-2" />
          Export as Text (.txt)
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-2 text-primary" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-2" />
              Copy to Clipboard
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}