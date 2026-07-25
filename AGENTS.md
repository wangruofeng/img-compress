# AGENTS.md

**For Agentic Coding Agents Working on ImgCompress**

## Project Overview

ImgCompress is a client-side image compression tool built with React 19, TypeScript 5.8, and Vite 6. All image processing happens in the browser—no server uploads. The project uses Tailwind CSS for styling and Lucide React for icons.

## Build Commands

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run start

# Build for production
npm run build

# Preview production build
npm run preview

# Preview GitHub Pages build locally
npm run preview:gh-pages
```

**No linting or testing commands exist.** Run `npm run build` to verify changes compile correctly.

## Deployment

The primary deployment target is Cloudflare Pages:

- **Cloudflare Pages**: `https://img-compress.wangruofeng007.com/`
- **Cloudflare build**: `npm run build:cloudflare` (root `/` base)
- **Direct deploy**: `npx wrangler@latest pages deploy ./dist --project-name=img-compress --branch=main`

GitHub Pages remains available as a compatibility deployment:

- **Base Path**: `/img-compress/` (configured in `vite.config.ts`)
- **Workflow**: `.github/workflows/deploy.yml`
- **Auto-deploy**: Pushes to `main` branch trigger automatic deployment
- **Online Demo**: https://wangruofeng.github.io/img-compress/

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions.

## Code Style Guidelines

### TypeScript

- **Strict typing**: Always define interfaces for data structures (see `types.ts`)
- **Avoid `any`**: Use explicit types or `unknown` with proper type narrowing
- **No type suppression**: Never use `@ts-ignore`, `@ts-expect-error`, or `as any`

### React Components

- **Functional components**: Use `React.FC<Props>` for component typing
- **Hooks patterns**: `useState`, `useEffect`, `useRef`, `useContext` are standard
- **Component structure**:
  ```typescript
  // 1. Imports (React first, then external, then internal)
  import React, { useState, useEffect } from 'react';
  import { SomeIcon } from './components/Icon';
  import { useLanguage } from './contexts/LanguageContext';

  // 2. Component definition
  const ComponentName: React.FC<Props> = ({ prop1, prop2 }) => {
    // 3. Hooks
    const [state, setState] = useState(defaultValue);

    // 4. Event handlers
    const handleClick = () => { /* ... */ };

    // 5. Render
    return (/* JSX */);
  };

  export default ComponentName;
  ```

- **Component files**: PascalCase (e.g., `ImageCard.tsx`, `PreviewModal.tsx`)
- **Props interfaces**: Inline for simple components, or in `types.ts` for shared props

### Naming Conventions

- **Components**: PascalCase (`Header`, `Dropzone`)
- **Files**: PascalCase for components, camelCase for utilities (`compressor.ts`, `helpers.ts`)
- **Variables/functions**: camelCase (`compressImage`, `formatFileSize`)
- **Constants**: camelCase or UPPER_SNAKE_CASE for config objects
- **Interfaces**: PascalCase, singular (`ProcessedImage`, `CompressionSettings`)
- **State**: Prefix with descriptive context (`isProcessingGlobal`, `previewImage`)

### Imports

```typescript
// React core first
import React, { useState, useEffect } from 'react';

// External libraries
import { SomeIcon } from 'lucide-react';

// Internal imports - use relative paths
import { ProcessedImage } from './types';
import { compressImage } from './utils/compressor';
import Header from './components/Header';
```

### Error Handling

- **Promises**: Always include `reject` handlers
- **Async/await**: Use try/catch blocks
- **Error states**: Set component status to `'error'` (see `ProcessedImage` status types)
- **Never swallow errors**: Empty catch blocks are forbidden

```typescript
// Correct pattern
try {
  const result = await compressImage(file, settings);
  return result;
} catch (error) {
  console.error('Compression failed:', error);
  return null;
}
```

### Canvas/Image Operations

- **Memory management**: Always `URL.revokeObjectURL()` when cleaning up blob URLs
- **Context checks**: Verify canvas context exists before drawing
- **Format conversion**: Fill white background when converting PNG → JPEG

### Tailwind CSS

- **Class ordering**: Group related classes logically
- **Color palette**: `primary` is **violet** (`#8b5cf6` + `primary-light`/`primary-dark`/`primary-glow`) with an amber `accent`; neutrals are **`zinc`** (not `gray`). `emerald`/`amber`/`red`/`sky` are **status-only** (saved-space, warning, error, kept-original) — never brand chrome. See `DESIGN.md` for the full system.
- **Responsive**: `sm:`, `md:`, `lg:`, `xl:` prefixes for breakpoints
- **Glassmorphism**: Containers use the `.glass` / `.glass-elevated` component classes (defined in `index.css`) over the body gradient. Always specify both `bg-… ` and `dark:bg-…` for custom surfaces.
- **Flat icon buttons**: Header (`flatButtonClass`) and Onboarding (`headerButtonClass`) controls share a borderless `w-11 h-11` token with color-only hover; the `LanguageSwitcher` trigger mirrors its height. Keep all three in sync.
- **Animation**: `animate-fade-in`, `animate-slide-up`, `animate-scale-in`, `animate-soft-float`, `animate-spin` (defined in `tailwind.config.js`). Ambient/entrance animations that may affect vestibular comfort pair with `motion-reduce:animate-none`.
- **Dark mode is the default**: toggled via `html.dark` / `html.light` (`ThemeContext`). Design dark-first.

### State Management

- **Local state**: `useState` for component-level state
- **Context**: `LanguageContext` for i18n, wrap entire app with providers
- **Derived state**: Compute from props/state, don't duplicate in state

### Project Structure

```
img-compress/
├── components/          # React components
├── contexts/           # React Context providers
│   ├── LanguageContext.tsx # i18n context
│   └── ThemeContext.tsx    # Dark/light theme context
├── locales/            # i18n translation strings (translations.ts)
├── utils/             # Pure functions (compression, helpers)
├── types.ts           # TypeScript interfaces
├── App.tsx            # Main app with state orchestration
├── index.tsx          # Entry point
└── vite.config.ts     # Vite configuration
```

### Deep-dive docs

| Topic | Where |
|---|---|
| Design system (colors, type, glass tokens, motion, components) | [DESIGN.md](DESIGN.md) |
| Deployment (Cloudflare Pages + GitHub Pages) | [DEPLOY.md](DEPLOY.md) |
| Release history | [CHANGELOG.md](CHANGELOG.md) |

### File Rules

- **Absolute imports**: `@/*` aliases to root (configured in `tsconfig.json` and `vite.config.ts`)
- **No barrel files**: Import directly from source files
- **Max file size**: Keep components focused (~100-300 lines ideal)

### Testing

**No test framework exists.** When adding tests, follow:
- Use Vitest (matches Vite ecosystem)
- Place tests alongside source files (`*.test.ts` or `*.spec.ts`)
- Aim for utility function tests first

### Common Patterns

**Debounced processing** (App.tsx):
```typescript
useEffect(() => {
  if (images.length === 0) return;
  const timer = setTimeout(() => {
    processAllImages(images, settings);
  }, 500);
  return () => clearTimeout(timer);
}, [settings]);
```

**Blob URL cleanup**:
```typescript
// On unmount or removal
if (url) URL.revokeObjectURL(url);
```

**Promise-based Canvas operations**:
```typescript
return new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = (event) => { /* ... */ };
  reader.onerror = (err) => reject(err);
});
```

## Important Notes

- **Browser-only**: No Node.js server code, all APIs are DOM/Canvas
- **i18n**: All user-facing strings go through `useLanguage().t()` hook
- **State immutability**: Always create new objects/arrays when updating state (`[...prev, newItem]`)

## Browser Support

Chrome, Firefox, Safari, Edge (latest versions). ES2022 target.
