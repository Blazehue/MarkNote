export interface Note {
  id: string;
  title: string;
  content: string;
  lastEdited: number;
}

export type ViewMode = 'split' | 'editor' | 'preview';