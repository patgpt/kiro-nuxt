---
inclusion: always
---

# Technology Stack

## Framework & Core
- **Nuxt.js 4.0** - Vue.js meta-framework with SSR/SSG capabilities
- **Vue 3.5** - Progressive JavaScript framework
- **TypeScript 5.6** - Type-safe JavaScript development
- **Node.js** - Runtime environment (ESM modules)

## Content Management
- **@nuxt/content 3.6** - File-based CMS with markdown support
- **Zod schemas** - Content validation and type safety
- **Better SQLite3** - Local database for content indexing

## Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI 5.0** - Tailwind CSS component library
- **@nuxt/image** - Optimized image handling

## Development Tools
- **ESLint 9.0** - Code linting with @nuxt/eslint
- **Pinia** - State management
- **@nuxt/test-utils** - Testing utilities
- **@nuxt/scripts** - Script optimization

## Common Commands

### Development
```bash
# Start development server (localhost:3000)
bun run dev

# Install dependencies
bun install
```

### Build & Deploy
```bash
# Build for production
bun run build

# Generate static site
bun run generate

# Preview production build
bun run preview
```

### Content Development
- Content files use `.md` format in `/content` directory
- Content watch server runs on port 4000
- Supports MDC (Markdown Components) syntax