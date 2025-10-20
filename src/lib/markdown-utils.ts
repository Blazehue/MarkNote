export const markdownFormats = {
  bold: (text: string) => `**${text}**`,
  italic: (text: string) => `*${text}*`,
  heading1: (text: string) => `# ${text}`,
  heading2: (text: string) => `## ${text}`,
  heading3: (text: string) => `### ${text}`,
  bulletList: (text: string) => `- ${text}`,
  numberedList: (text: string) => `1. ${text}`,
  code: (text: string) => `\`${text}\``,
  codeBlock: (text: string) => `\`\`\`\n${text}\n\`\`\``,
  link: (text: string) => `[${text}](url)`,
  image: (text: string) => `![${text}](url)`,
  quote: (text: string) => `> ${text}`,
};

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
}

export function countCharacters(text: string): number {
  return text.length;
}

export function generateUniqueId(): string {
  return `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function exportAsMarkdown(title: string, content: string): void {
  const blob = new Blob([content], { type: 'text/markdown' });
  downloadFile(blob, `${title}.md`);
}

export function exportAsHTML(title: string, content: string): void {
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    code { background: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background: #f4f4f4; padding: 1rem; border-radius: 5px; overflow-x: auto; }
    blockquote { border-left: 4px solid #ddd; padding-left: 1rem; color: #666; }
  </style>
</head>
<body>
${content}
</body>
</html>`;
  const blob = new Blob([html], { type: 'text/html' });
  downloadFile(blob, `${title}.html`);
}

export function exportAsText(title: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  downloadFile(blob, `${title}.txt`);
}

function downloadFile(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy to clipboard:', err);
    return false;
  }
}