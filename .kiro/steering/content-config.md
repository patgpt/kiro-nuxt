---
inclusion: fileMatch
fileMatchPattern: ['content.config.ts', 'nuxt.config.ts', 'content/**/*.md']
---

# Nuxt Content Configuration Guidelines

## Content Collections & Schema

- Define content collections in `content.config.ts` using Zod schemas for type safety
- Use descriptive collection names that match your content directory structure
- Always include required fields: `title`, `description`, `date` for blog posts
- Include `image` field for SEO and social sharing
- Use `tags` array for categorization and filtering

## Content Structure

### Blog Posts (`content/blog/`)
- Require frontmatter: `title`, `description`, `date`, `image`, `tags`
- Use kebab-case for file names
- Include meta description for SEO (150-160 characters)
- Add `draft: true` for unpublished content

### Service Pages (`content/services/`)
- Support dynamic routing with `[...slug].md` pattern
- Include `title`, `description`, `image` in frontmatter
- Use structured content with clear headings (H2, H3)

### Landing Pages (`content/landing/`)
- Focus on conversion-oriented content
- Include hero sections, features, and CTAs
- Optimize for SEO with proper meta tags

## Configuration Best Practices

### Markdown Processing
- Enable syntax highlighting for code blocks with Shiki
- Configure table of contents generation (depth: 2-3)
- Use remark/rehype plugins for enhanced functionality
- Set up proper heading anchor links for H2, H3, H4

### Database & Performance
- Use SQLite for local development (default)
- Consider D1 adapter for Cloudflare Workers deployment
- Enable content caching for production
- Configure proper content watching in development (port: 4000)

### SEO & Meta Tags
- Generate automatic meta descriptions from content
- Include Open Graph and Twitter Card data
- Set up proper canonical URLs
- Configure sitemap generation

## Content Authoring Rules

- Use MDC (Markdown Components) syntax for enhanced content
- Leverage Vue components within markdown files
- Follow consistent heading hierarchy (H1 → H2 → H3)
- Include alt text for all images
- Use relative links for internal navigation

## Development Workflow

- Content changes trigger hot reload in development
- Validate content schema on build
- Use TypeScript for content queries and components
- Test content rendering across different screen sizes

## Configuration Examples

### Basic Content Config
```ts
// content.config.ts
export default defineContentConfig({
  collections: {
    blog: {
      type: 'page',
      source: 'blog/**/*.md'
    }
  }
})
```

### Nuxt Config Integration
```ts
// nuxt.config.ts
export default defineNuxtConfig({
  content: {
    build: {
      markdown: {
        toc: { depth: 3 },
        highlight: {
          theme: 'github-light'
        }
      }
    },
    renderer: {
      anchorLinks: { h2: true, h3: true, h4: true }
    }
  }
})
```
