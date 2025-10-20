"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Note, ViewMode } from '@/types/note';
import { useDebounce } from '@/hooks/useDebounce';
import { generateUniqueId, markdownFormats } from '@/lib/markdown-utils';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { Editor } from './Editor';
import { Preview } from './Preview';
import { ExportMenu } from './ExportMenu';
import { MarkdownCheatSheet } from './MarkdownCheatSheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Moon,
  Sun,
  Menu,
  X,
  BookOpen,
  PanelLeftClose,
  PanelLeft,
  Eye,
  Edit,
  Columns2,
} from 'lucide-react';
import { Input } from '@/components/ui/input';

export function MarkdownEditor() {
  // State management
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [showCheatSheet, setShowCheatSheet] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement>(null);

  // Get active note
  const activeNote = notes.find((note) => note.id === activeNoteId);

  // Debounced content for auto-save
  const debouncedContent = useDebounce(activeNote?.content || '', 500);

  // Initialize with a default note
  useEffect(() => {
    const defaultNote: Note = {
      id: generateUniqueId(),
      title: 'Welcome to Markdown Notes',
      content: `# Welcome to Markdown Notes! 📝

This is a powerful markdown editor with live preview and syntax highlighting.

## Features

- **Live Preview** - See your markdown rendered in real-time
- **Syntax Highlighting** - Beautiful code blocks with syntax highlighting
- **Auto-Save** - Your notes are automatically saved as you type
- **Export Options** - Export as .md, .html, or .txt
- **Dark Mode** - Toggle between light and dark themes
- **Keyboard Shortcuts** - Fast formatting with keyboard shortcuts

## Try it out!

Start typing in the editor to see the magic happen. You can:

1. Create new notes
2. Search through your notes
3. Format text with the toolbar
4. Export your notes

### Code Example

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
}

greet('World');
\`\`\`

### Lists

- Bullet points work
- Just like this
  - With nested items

### Blockquote

> "The best way to predict the future is to invent it." - Alan Kay

---

Happy note-taking! ✨`,
      lastEdited: Date.now(),
    };

    setNotes([defaultNote]);
    setActiveNoteId(defaultNote.id);
  }, []);

  // Dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-save effect
  useEffect(() => {
    if (activeNoteId && debouncedContent !== undefined) {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === activeNoteId
            ? { ...note, content: debouncedContent, lastEdited: Date.now() }
            : note
        )
      );
    }
  }, [debouncedContent, activeNoteId]);

  // Create new note
  const handleCreateNote = useCallback(() => {
    const newNote: Note = {
      id: generateUniqueId(),
      title: 'Untitled Note',
      content: '',
      lastEdited: Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    setActiveNoteId(newNote.id);
  }, []);

  // Delete note
  const handleDeleteNote = useCallback((noteId: string) => {
    setNotes((prev) => {
      const filtered = prev.filter((note) => note.id !== noteId);
      if (noteId === activeNoteId && filtered.length > 0) {
        setActiveNoteId(filtered[0].id);
      } else if (filtered.length === 0) {
        setActiveNoteId(null);
      }
      return filtered;
    });
  }, [activeNoteId]);

  // Update content
  const handleContentChange = useCallback((content: string) => {
    if (!activeNoteId) return;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId ? { ...note, content } : note
      )
    );
  }, [activeNoteId]);

  // Update title
  const handleTitleChange = useCallback((title: string) => {
    if (!activeNoteId) return;
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === activeNoteId
          ? { ...note, title, lastEdited: Date.now() }
          : note
      )
    );
  }, [activeNoteId]);

  // Handle formatting
  const handleFormat = useCallback((format: string) => {
    if (!activeNote) return;

    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = activeNote.content.substring(start, end) || 'text';
    
    const formatter = markdownFormats[format as keyof typeof markdownFormats];
    if (!formatter) return;

    const formattedText = formatter(selectedText);
    const newContent =
      activeNote.content.substring(0, start) +
      formattedText +
      activeNote.content.substring(end);

    handleContentChange(newContent);

    // Restore focus and selection
    setTimeout(() => {
      textarea.focus();
      const newEnd = start + formattedText.length;
      textarea.setSelectionRange(newEnd, newEnd);
    }, 0);
  }, [activeNote, handleContentChange]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeNote) return;

      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      if (modifier) {
        switch (e.key.toLowerCase()) {
          case 'b':
            e.preventDefault();
            handleFormat('bold');
            break;
          case 'i':
            e.preventDefault();
            handleFormat('italic');
            break;
          case '1':
            e.preventDefault();
            handleFormat('heading1');
            break;
          case '2':
            e.preventDefault();
            handleFormat('heading2');
            break;
          case '3':
            e.preventDefault();
            handleFormat('heading3');
            break;
          case '8':
            e.preventDefault();
            handleFormat('bulletList');
            break;
          case '9':
            e.preventDefault();
            handleFormat('numberedList');
            break;
          case '`':
            e.preventDefault();
            handleFormat('code');
            break;
          case 'k':
            e.preventDefault();
            handleFormat('link');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeNote, handleFormat]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeft className="h-4 w-4" />
            )}
          </Button>
          <h1 className="text-xl font-bold">Markdown Notes</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle (Mobile) */}
          <div className="flex lg:hidden gap-1 mr-2">
            <Button
              variant={viewMode === 'editor' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('editor')}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'preview' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('preview')}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCheatSheet(true)}
          >
            <BookOpen className="h-4 w-4" />
          </Button>

          {activeNote && (
            <ExportMenu
              title={activeNote.title}
              content={activeNote.content}
              htmlContent={activeNote.content}
            />
          )}

          <Separator orientation="vertical" className="h-6" />

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className={`${
            sidebarOpen ? 'w-64' : 'w-0'
          } transition-all duration-200 lg:relative absolute lg:relative z-10 h-full bg-card border-r border-border`}>
            <Sidebar
              notes={notes}
              activeNoteId={activeNoteId}
              onNoteSelect={setActiveNoteId}
              onNoteCreate={handleCreateNote}
              onNoteDelete={handleDeleteNote}
            />
          </aside>
        )}

        {/* Main Content */}
        {activeNote ? (
          <main className="flex-1 flex flex-col overflow-hidden">
            {/* Title Input */}
            <div className="px-6 py-4 border-b border-border">
              <Input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Note title..."
                className="text-2xl font-bold border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-0"
              />
            </div>

            {/* Toolbar */}
            <Toolbar onFormat={handleFormat} />

            {/* Editor and Preview */}
            <div className="flex-1 flex overflow-hidden">
              {/* Desktop: Split view */}
              <div className="hidden lg:flex w-full">
                <div className="w-1/2 border-r border-border">
                  <Editor
                    content={activeNote.content}
                    onChange={handleContentChange}
                    onScroll={setScrollPercentage}
                  />
                </div>
                <div className="w-1/2">
                  <Preview
                    content={activeNote.content}
                    scrollPercentage={scrollPercentage}
                  />
                </div>
              </div>

              {/* Mobile: Toggle between editor and preview */}
              <div className="flex lg:hidden w-full">
                {viewMode === 'editor' && (
                  <Editor
                    content={activeNote.content}
                    onChange={handleContentChange}
                    onScroll={setScrollPercentage}
                  />
                )}
                {viewMode === 'preview' && (
                  <Preview
                    content={activeNote.content}
                    scrollPercentage={scrollPercentage}
                  />
                )}
              </div>
            </div>
          </main>
        ) : (
          <main className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <p className="text-lg mb-4">No note selected</p>
              <Button onClick={handleCreateNote}>Create your first note</Button>
            </div>
          </main>
        )}
      </div>

      {/* Markdown Cheat Sheet Modal */}
      <MarkdownCheatSheet
        open={showCheatSheet}
        onOpenChange={setShowCheatSheet}
      />
    </div>
  );
}