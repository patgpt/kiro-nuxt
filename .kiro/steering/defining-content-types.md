---
inclusion: fileMatch
fileMatchPattern: ['content.config.ts', 'content/**/*.md']
---

# Content Type Definitions

Guidelines for defining and working with content types in this Nuxt Content project.

## Collection Types

### Page Collections
Use `type: 'page'` for content that maps directly to website pages:

```ts
defineCollection({
  source: 'blog/**/*.md',
  type: 'page',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    image: z.string()
  })
})
```

**Current page collections:**
- Blog posts (`content/blog/`)
- Services (`content/services/`)
- Projects (`content/projects/`)
- Landing pages (`content/landing/`)

### Data Collections
Use `type: 'data'` for structured data that doesn't correspond to pages:

```ts
defineCollection({
  source: 'data/authors.yml',
  type: 'data',
  schema: z.object({
    name: z.string(),
    bio: z.string(),
    avatar: z.string()
  })
})
```

## Schema Requirements

### Required Fields
All page collections must include:
- `title`: String (for SEO and navigation)
- `description`: String (for meta descriptions)
- `date`: Date (for sorting and display)

### Blog-Specific Fields
Blog posts require additional fields:
- `tags`: Array of strings for categorization
- `image`: String path to featured image

### Dynamic Route Collections
For collections with `[...slug].md` pattern:
- Use descriptive slugs in frontmatter
- Ensure unique paths within collection
- Include navigation metadata

## File Organization

### Naming Conventions
- Use kebab-case for file names
- Prefix with numbers for ordering (01-, 02-, etc.)
- Use `index.md` for collection landing pages

### Directory Structure
```
content/
├── index.md              # Homepage content
├── blog/
│   ├── index.md          # Blog listing page
│   └── post-name.md      # Individual posts
├── services/
│   ├── index.md          # Services overview
│   └── [...slug].md      # Dynamic service pages
└── projects/
    ├── index.md          # Projects overview
    └── [...slug].md      # Dynamic project pages
```

## Content Validation

### Zod Schema Patterns
```ts
// Standard page schema
const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  draft: z.boolean().default(false)
})

// Blog post schema
const blogSchema = pageSchema.extend({
  tags: z.array(z.string()),
  image: z.string(),
  author: z.string().optional()
})
```

### Frontmatter Format
```yaml
---
title: "Page Title"
description: "Page description for SEO"
date: 2024-01-15
tags: ["web", "development"]
image: "/images/featured.jpg"
draft: false
---
```

## Best Practices

- Define schemas in `content.config.ts` for type safety
- Use consistent field names across collections
- Include required SEO fields (title, description)
- Validate image paths exist in `public/` directory
- Use ISO date format (YYYY-MM-DD) in frontmatter
- Keep collection schemas focused and minimal