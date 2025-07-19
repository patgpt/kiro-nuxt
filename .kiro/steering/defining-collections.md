---
inclusion: fileMatch
fileMatchPattern: ["content.config.ts", "content/**/*.md"]
---

# Content Collections Configuration

Guidelines for defining and managing content collections in this Nuxt Content project.

## Collection Structure

This project uses the following content collections defined in `content.config.ts`:

- **Blog**: Articles and posts (`content/blog/`)
- **Services**: Service pages with dynamic routing (`content/services/`)
- **Projects**: Project showcase with dynamic routing (`content/projects/`)
- **Landing**: Homepage and landing page content (`content/landing/`)

## Schema Requirements

### Standard Page Schema

All page collections must include these required fields:

```ts
schema: z.object({
  title: z.string(), // Required for SEO and navigation
  description: z.string(), // Required for meta descriptions
  date: z.date(), // Required for sorting and display
  draft: z.boolean().default(false),
});
```

### Collection-Specific Schemas

**Blog Posts** require additional fields:

```ts
schema: z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  tags: z.array(z.string()), // For categorization
  image: z.string(), // Featured image path
  author: z.string().optional(),
});
```

**Services/Projects** with dynamic routing:

```ts
schema: z.object({
  title: z.string(),
  description: z.string(),
  date: z.date(),
  slug: z.string(), // For URL generation
  featured: z.boolean().default(false),
});
```

## File Organization Rules

### Naming Conventions

- Use kebab-case for all file names
- Use `index.md` for collection overview pages
- For dynamic routes, use `[...slug].md` pattern
- Prefix with numbers for ordering when needed (01-, 02-)

### Directory Structure

```
content/
├── index.md              # Homepage content
├── blog/
│   ├── index.md          # Blog listing page
│   └── *.md              # Individual blog posts
├── services/
│   ├── index.md          # Services overview
│   └── [...slug].md      # Dynamic service pages
├── projects/
│   ├── index.md          # Projects overview
│   └── [...slug].md      # Dynamic project pages
└── landing/
    └── index.md          # Landing page content
```

## Content Validation

### Frontmatter Format

Use consistent YAML frontmatter:

```yaml
---
title: "Page Title"
description: "SEO-friendly description"
date: 2024-01-15
tags: ["web", "development"]
image: "/images/featured.jpg"
draft: false
---
```

### Image Path Validation

- All image paths must exist in `public/` directory
- Use absolute paths starting with `/`
- Optimize images for web before adding

## Querying Collections

### Standard Query Pattern

```vue
<script setup lang="ts">
const { data: posts } = await useAsyncData("blog", () =>
  queryCollection("blog")
    .where({ draft: { $ne: true } })
    .sort({ date: -1 })
    .all()
);
</script>
```

### Dynamic Route Queries

```vue
<script setup lang="ts">
const route = useRoute();
const { data: page } = await useAsyncData(`service-${route.params.slug}`, () =>
  queryCollection("services").where({ slug: route.params.slug }).first()
);
</script>
```

## Best Practices

- Always define Zod schemas for type safety
- Include required SEO fields in all page collections
- Use consistent field names across collections
- Validate content before deployment
- Keep schemas minimal and focused
- Use draft field to hide incomplete content
- Ensure unique slugs within each collection
