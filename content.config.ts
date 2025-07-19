import { defineCollection, defineContentConfig, z } from "@nuxt/content";

// Shared schemas for reusability
const SocialLinkSchema = z.object({
  platform: z.string(),
  href: z.string().url(),
  icon: z.string(),
});

const FeatureCardSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string().optional(),
});

const TestimonialSchema = z.object({
  quote: z.string(),
  name: z.string(),
  role: z.string().optional(),
  company: z.string().optional(),
  avatar: z.string().optional(),
});

const PriceCardSchema = z.object({
  title: z.string(),
  features: z.array(z.string()),
  price: z.string(),
  badge: z.string().optional(),
  ctaText: z.string(),
  ctaUrl: z.string().optional(),
});

const AuthorSchema = z.object({
  name: z.string(),
  position: z.string(),
  avatar: z.string(),
  bio: z.string(),
  website: z.string().url().optional(),
  social: z.array(SocialLinkSchema).optional(),
});

const CategorySchema = z.object({
  title: z.string(),
  icon: z.string(),
  slug: z.string(),
});

export default defineContentConfig({
  collections: {
    // Blog posts collection
    blog: defineCollection({
      source: "blog/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
        intro: z.string().optional(),
        image: z.string(),
        publishedAt: z.date(),
        author: z.string(), // Reference to author by name
        tags: z.array(z.string()),
        category: z.string().optional(), // Reference to category by slug
        draft: z.boolean().default(false),
      }),
    }),

    // Services collection
    services: defineCollection({
      source: "services/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
        intro: z.string(),
        image: z.string(),
        features: z.array(FeatureCardSchema).optional(),
        category: z.string(), // Reference to category by slug
        testimonials: z.array(TestimonialSchema).optional(),
        priceCard: PriceCardSchema.optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    }),

    // Projects collection
    projects: defineCollection({
      source: "projects/**/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        slug: z.string(),
        intro: z.string(),
        image: z.string(),
        features: z.array(FeatureCardSchema).optional(),
        category: z.string(), // Reference to category by slug
        testimonials: z.array(TestimonialSchema).optional(),
        featured: z.boolean().default(false),
        draft: z.boolean().default(false),
      }),
    }),

    // Landing pages collection
    landing: defineCollection({
      source: "landing/*.md",
      type: "page",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        intro: z.string(),
        image: z.string(),
        features: z.array(FeatureCardSchema).optional(),
        testimonials: z.array(TestimonialSchema).optional(),
        date: z.date(),
      }),
    }),

    // Authors data collection
    authors: defineCollection({
      source: "data/authors.yml",
      type: "data",
      schema: AuthorSchema,
    }),

    // Categories data collection
    categories: defineCollection({
      source: "data/categories.yml",
      type: "data",
      schema: CategorySchema,
    }),

    // Testimonials data collection
    testimonials: defineCollection({
      source: "data/testimonials.yml",
      type: "data",
      schema: TestimonialSchema,
    }),

    // Contact submissions (for form handling)
    contacts: defineCollection({
      source: "data/contacts.yml",
      type: "data",
      schema: z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
        subject: z.string().optional(),
        timestamp: z.date(),
      }),
    }),
  },
});
