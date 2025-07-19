// Content type definitions based on Zod schemas

export interface SocialLink {
  platform: string
  href: string
  icon: string
}

export interface FeatureCard {
  title: string
  description: string
  icon?: string
}

export interface Testimonial {
  quote: string
  name: string
  role?: string
  company?: string
  avatar?: string
}

export interface PriceCard {
  title: string
  features: string[]
  price: string
  badge?: string
  ctaText: string
  ctaUrl?: string
}

export interface Author {
  name: string
  position: string
  avatar: string
  bio: string
  website?: string
  social?: SocialLink[]
}

export interface Category {
  title: string
  icon: string
  slug: string
}

export interface BlogPost {
  title: string
  description: string
  slug: string
  intro?: string
  image: string
  publishedAt: Date
  author: string
  tags: string[]
  category?: string
  draft: boolean
}

export interface Service {
  title: string
  description: string
  slug: string
  intro: string
  image: string
  features?: FeatureCard[]
  category: string
  testimonials?: Testimonial[]
  priceCard?: PriceCard
  featured: boolean
  draft: boolean
}

export interface Project {
  title: string
  description: string
  slug: string
  intro: string
  image: string
  features?: FeatureCard[]
  category: string
  testimonials?: Testimonial[]
  featured: boolean
  draft: boolean
}

export interface Landing {
  title: string
  description: string
  intro: string
  image: string
  features?: FeatureCard[]
  testimonials?: Testimonial[]
  date: Date
}

export interface ContactSubmission {
  name: string
  email: string
  message: string
  subject?: string
  timestamp: Date
}