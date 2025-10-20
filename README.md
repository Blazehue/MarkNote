# ✍️ MarkNote

<div align="center">
  
  **A Modern, Feature-Rich Markdown Notes Editor**
  
  Built with Next.js 15, TypeScript, and Tailwind CSS
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black?style=flat-square&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

</div>

---

## 📖 Overview

**MarkNote** is a powerful, intuitive markdown notes editor designed for developers, writers, and content creators. With real-time preview, syntax highlighting, and seamless export capabilities, MarkNote streamlines your writing workflow.

### ✨ Key Features

- **📝 Live Markdown Editor** - Write with instant preview
- **🎨 Syntax Highlighting** - Beautiful code blocks with syntax support
- **📱 Responsive Design** - Works seamlessly on all devices
- **💾 Local Storage** - Auto-save your notes locally
- **📂 Note Management** - Organize with sidebar navigation
- **📤 Multiple Export Formats** - Export as Markdown, HTML, or PDF
- **🎯 Formatting Toolbar** - Quick access to common markdown syntax
- **📚 Markdown Cheat Sheet** - Built-in reference guide
- **🌙 Clean UI** - Modern, distraction-free interface
- **⚡ Fast Performance** - Powered by Next.js 15 with Turbopack

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18.x or higher
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Blazehue/MarkNote.git
   cd MarkNote
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see MarkNote in action!

---

## 🛠️ Tech Stack

### Core Technologies
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful UI components

### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Headless UI](https://headlessui.com/)** - Unstyled, accessible components
- **[@tabler/icons-react](https://tabler-icons.io/)** - Icon library
- **[@heroicons/react](https://heroicons.com/)** - Heroicons for UI

### Markdown & Utilities
- **[@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin)** - Beautiful typography
- **[clsx](https://github.com/lukeed/clsx)** - Conditional classNames
- **Custom markdown utilities** - Parsing and rendering

---

## 📁 Project Structure

```
MarkNote/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── globals.css          # Global styles
│   │   └── global-error.tsx     # Error boundary
│   ├── components/              # React components
│   │   ├── Editor.tsx           # Main editor component
│   │   ├── MarkdownEditor.tsx   # Enhanced markdown editor
│   │   ├── Preview.tsx          # Live preview component
│   │   ├── Toolbar.tsx          # Formatting toolbar
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── ExportMenu.tsx       # Export functionality
│   │   ├── MarkdownCheatSheet.tsx # Syntax reference
│   │   ├── ErrorReporter.tsx    # Error handling
│   │   └── ui/                  # shadcn/ui components
│   ├── lib/                     # Utility functions
│   │   ├── utils.ts             # Helper functions
│   │   └── markdown-utils.ts    # Markdown utilities
│   ├── hooks/                   # Custom React hooks
│   │   ├── useDebounce.ts       # Debounce hook
│   │   └── use-mobile.ts        # Mobile detection
│   └── types/                   # TypeScript types
│       └── note.ts              # Note type definitions
├── public/                      # Static assets
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
├── tailwind.config.js          # Tailwind config
├── next.config.ts              # Next.js config
└── vercel.json                 # Vercel deployment config
```

---

## 🎯 Usage

### Creating Notes
1. Start typing in the editor pane
2. See live preview on the right
3. Use the toolbar for quick formatting
4. Notes auto-save to local storage

### Formatting
- Use the **formatting toolbar** for common markdown elements
- Access the **cheat sheet** for markdown syntax reference
- Support for headings, lists, links, images, code blocks, and more

### Exporting
1. Click the **Export** button
2. Choose your format: Markdown, HTML, or PDF
3. Download your note

### Managing Notes
- Browse notes in the **sidebar**
- Create, edit, and delete notes
- Organize with categories (coming soon)

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Blazehue/MarkNote)

1. Click the "Deploy" button above
2. Connect your GitHub account
3. Configure project settings
4. Deploy!

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

### Environment Variables

Create a `.env.local` file for any environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_APP_URL=https://your-domain.com
```

---

## 🧪 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'feat: add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test updates
- `chore:` - Build process or auxiliary tool changes

---

## 🐛 Known Issues

- Dependency conflict with `better-auth` version (use `--legacy-peer-deps`)
- Some linting warnings in UI components
- Vercel deployment requires `--legacy-peer-deps` install command

---

## 📝 Roadmap

- [ ] Dark/Light theme toggle
- [ ] Cloud sync integration
- [ ] Collaborative editing
- [ ] Advanced search and filtering
- [ ] Tags and categories
- [ ] Keyboard shortcuts customization
- [ ] Mobile app (React Native)
- [ ] Plugin system
- [ ] Custom themes
- [ ] Version history

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Blazehue**

- GitHub: [@Blazehue](https://github.com/Blazehue)
- Repository: [MarkNote](https://github.com/Blazehue/MarkNote)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Vercel](https://vercel.com/) - Deployment platform

---

<div align="center">
  
  **Made with ❤️ by Blazehue**
  
  ⭐ Star this repo if you find it helpful!
  
</div>
