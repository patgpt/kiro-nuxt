# Design Document

## Overview

The Yellowdog Website is a sophisticated, minimalist digital agency website built with Nuxt.js 4.0, featuring a content-driven architecture that emphasizes performance, accessibility, and visual elegance. The design leverages modern web technologies to create an immersive experience that reflects Yellowdog's expertise in AI, game, mobile, and web development while maintaining a tortured, dreamy, eloquent aesthetic with dry humor.

## Architecture

### Frontend Architecture
- **Framework**: Nuxt.js 4.0 with Vue 4 and TypeScript 5.6
- **Rendering**: Universal rendering (SSR/SSG) for optimal SEO and performance
- **Styling**: Tailwind CSS with DaisyUI component library for consistent design system
- **State Management**: Pinia for global state management
- **Content Management**: @nuxt/content 3.6 with file-based CMS approach
- **Image Optimization**: @nuxt/image for responsive, optimized images
- **Package Manager**: Bun for fast dependency management and script execution

### Content Architecture
- **Schema Validation**: Zod schemas for type-safe content models
- **Database**: Better SQLite3 for content indexing and fast queries
- **Content Types**: Landing pages, blog posts, services, testimonials, authors, categories
- **Markdown Processing**: MDC (Markdown Components) with custom Prose components
- **Content Editing**: Nuxt Studio integration for non-technical content management

### Performance Architecture
- **Code Splitting**: Automatic route-based code splitting via Nuxt
- **Asset Optimization**: Lazy loading, image optimization, and font optimization
- **Caching Strategy**: Static generation where possible, intelligent caching for dynamic content
- **Bundle Analysis**: Tree-shaking and minimal bundle sizes
- **Core Web Vitals**: Target Lighthouse scores > 90 across all metrics

## Components and Interfaces

### Global UI Components

#### Core Components
- **Avatar**: User profile images with fallback states and sizing variants
- **FormInputGroup**: Reusable form field with label, input, validation, and error display
- **ErrorMessage**: Consistent error state presentation across forms
- **GridSection**: Flexible grid layout component for content organization
- **SubmitButton**: Form submission button with loading states and accessibility
- **SocialIcon**: Social media icons with consistent styling and hover states
- **FAQAccordion**: Collapsible content sections for frequently asked questions

#### Navigation Components
- **Header**: Global navigation with responsive menu and brand identity
- **Footer**: Site-wide footer with links, social media, and contact information
- **Breadcrumbs**: Hierarchical navigation for deep page structures

### Content Components

#### Feature and Display Components
- **AuthorCard**: Author profile display with avatar, bio, and social links
- **FeatureCard**: Service or feature highlight with icon, title, and description
- **CategoryTag**: Visual category labels with consistent styling
- **TagPill**: Compact tag display for content categorization
- **Testimonial**: Client testimonial with quote, attribution, and optional avatar
- **PriceCard/MiniPriceCard**: Pricing display with features, CTA, and badge options

#### Blog Components
- **PostCard**: Blog post preview with image, title, excerpt, and metadata
- **PostMeta**: Post metadata display (author, date, category, reading time)
- **PostGrid**: Responsive grid layout for blog post listings
- **PostLayout**: Full article page wrapper with proper typography
- **PostHeader**: Article header with title, cover image, and metadata
- **PostBody**: Markdown-rendered content with custom Prose components
- **PostTOC**: Auto-generated table of contents with scroll-linked navigation
- **PostSearchInput**: Debounced search functionality for blog content
- **PaginationControls**: Navigation between pages with accessibility support
- **RelatedPostGrid**: Contextual post suggestions based on tags/categories
- **PostCTA**: Call-to-action blocks within or after blog content

#### Service Components
- **ServiceCard**: Service preview with image, title, excerpt, and category
- **ServiceGrid**: Responsive layout for service listings
- **ServiceHero**: Bold service introduction with value proposition
- **ServiceFeatureList**: Grid of service features with icons and descriptions
- **ServiceCTA**: Service-specific call-to-action with contact integration

#### Contact Components
- **ContactForm**: Main contact form with validation and submission handling
- **ContactDetailsBlock**: Contact information display with social links
- **ContactCTA**: Emotional engagement block with call-to-action

### Custom Prose Components

Following the Nuxt Content MDC pattern, custom Prose components will be created to maintain consistent styling:

- **ProseH1-H6**: Custom heading components with Yellowdog typography
- **ProseP**: Paragraph styling with proper spacing and typography
- **ProseA**: Link styling with hover states and accessibility
- **ProseImg**: Optimized image rendering with lazy loading
- **ProseBlockquote**: Styled quote blocks with visual emphasis
- **ProsePre/ProseCode**: Code block styling with syntax highlighting
- **ProseTable**: Responsive table styling with proper typography
- **ProseUl/ProseOl/ProseLi**: List styling with consistent spacing

## Data Models

### Content Schema Definitions (Zod)

#### Landing Schema
```typescript
Landing: {
  title: string
  intro: string
  image: string
  features: FeatureCard[]
}
```

#### Author Schema
```typescript
Author: {
  name: string
  position: string
  avatar: string
  bio: string
  website?: string
  social: SocialLink[]
}
```

#### Post Schema
```typescript
Post: {
  title: string
  slug: string
  intro: string
  image: string
  body: markdown content
  publishedAt: datetime
  author: Author reference
  tags: string[]
  category: Category reference
}
```

#### Service Schema
```typescript
Service: {
  title: string
  slug: string
  intro: string
  image: string
  features: FeatureCard[]
  category: Category reference
  testimonials?: Testimonial[]
  priceCard?: PriceCard
}
```

#### Category Schema
```typescript
Category: {
  title: string
  icon: string
  slug: string
}
```

#### Testimonial Schema
```typescript
Testimonial: {
  quote: string
  name: string
  role?: string
  company?: string
  avatar?: string
}
```

#### PriceCard Schema
```typescript
PriceCard: {
  title: string
  features: string[]
  price: string
  badge?: string
  ctaText: string
  ctaUrl?: string
}
```

#### ContactSubmission Schema
```typescript
ContactSubmission: {
  name: string
  email: string (validated)
  message: string
  subject?: string
  timestamp: auto-generated datetime
}
```

#### SocialLink Schema
```typescript
SocialLink: {
  platform: string
  href: string
  icon: string
}
```

## Error Handling

### Client-Side Error Handling
- **Form Validation**: Real-time validation with user-friendly error messages
- **Network Errors**: Graceful handling of API failures with retry mechanisms
- **404 Handling**: Custom 404 pages with navigation back to main content
- **Loading States**: Skeleton screens and loading indicators for better UX
- **Error Boundaries**: Vue error boundaries to prevent complete app crashes

### Server-Side Error Handling
- **API Error Responses**: Consistent error response format across all endpoints
- **Content Loading**: Fallback content when CMS content fails to load
- **Image Loading**: Fallback images and lazy loading error handling
- **Contact Form**: Email delivery error handling with user notification

### Content Error Handling
- **Missing Content**: Graceful degradation when content is unavailable
- **Schema Validation**: Zod validation errors with helpful developer messages
- **Markdown Parsing**: Error handling for malformed markdown content
- **Image Optimization**: Fallback for failed image processing

## Testing Strategy

### Unit Testing
- **Component Testing**: Vue Test Utils for component behavior and props
- **Utility Functions**: Jest testing for helper functions and composables
- **Schema Validation**: Zod schema testing with valid and invalid data
- **Form Validation**: Input validation logic testing

### Integration Testing
- **API Integration**: Testing contact form submission and email delivery
- **Content Loading**: Testing content fetching and rendering
- **Navigation**: Testing route transitions and page loading
- **Search Functionality**: Testing blog search and filtering

### End-to-End Testing
- **User Journeys**: Critical path testing (homepage → services → contact)
- **Form Submission**: Complete contact form workflow testing
- **Content Management**: Nuxt Studio integration testing
- **Performance Testing**: Lighthouse CI integration for performance monitoring

### Accessibility Testing
- **Screen Reader**: Testing with screen reader software
- **Keyboard Navigation**: Full keyboard accessibility testing
- **Color Contrast**: WCAG compliance testing for color combinations
- **Focus Management**: Proper focus handling throughout the application

### Performance Testing
- **Core Web Vitals**: LCP, FID, CLS monitoring and optimization
- **Bundle Size**: Bundle analysis and optimization
- **Image Loading**: Image optimization and lazy loading effectiveness
- **Caching**: Cache effectiveness and invalidation testing

## Visual Design System

### Color Palette
- **Primary**: Soft yellow (#F7DC6F) for brand accent and CTAs
- **Secondary**: Lavender (#E8DAEF) for subtle highlights and backgrounds
- **Neutral**: Muted monochrome scale for text and backgrounds
- **Semantic**: Success, warning, and error colors following accessibility guidelines

### Typography
- **Headlines**: Serif font family for elegant, sophisticated headings
- **Body Text**: Sans-serif font family for optimal readability
- **Code**: Monospace font for technical content and code blocks
- **Hierarchy**: Clear typographic scale with consistent spacing

### Imagery Style
- **Illustrations**: Vector-style illustrations with consistent color palette
- **Photography**: Cinematic photos with moody, atmospheric qualities
- **Icons**: Minimalist icon set with consistent stroke width and style
- **Graphics**: Abstract geometric elements for visual interest

### Layout Principles
- **Grid System**: 12-column responsive grid with consistent gutters
- **Spacing**: Systematic spacing scale using Tailwind's spacing utilities
- **Whitespace**: Generous whitespace for breathing room and focus
- **Alignment**: Consistent alignment patterns throughout the design

### Interactive Elements
- **Hover States**: Subtle animations and color transitions
- **Focus States**: Clear focus indicators for accessibility
- **Loading States**: Skeleton screens and progress indicators
- **Micro-interactions**: Delightful details that enhance user experience

## Integration Points

### Nuxt Studio Integration
- **Content Editing**: Visual content editor for non-technical users
- **Preview Mode**: Live preview of content changes before publishing
- **Asset Management**: Image and media file management through Studio
- **Workflow**: Content approval and publishing workflow

### Email Integration (Resend API)
- **Contact Form**: Form submission to email delivery pipeline
- **Template System**: HTML email templates for different message types
- **Error Handling**: Delivery failure handling and user notification
- **Analytics**: Email delivery tracking and success metrics

### Analytics Integration
- **Google Analytics**: User behavior tracking and conversion metrics
- **Performance Monitoring**: Core Web Vitals and performance metrics
- **Content Analytics**: Blog post engagement and popular content tracking
- **Conversion Tracking**: Contact form submissions and goal completions

### SEO Integration
- **Meta Tags**: Dynamic meta tag generation for all pages
- **OpenGraph**: Social media sharing optimization
- **Structured Data**: JSON-LD structured data for rich snippets
- **Sitemap**: Automatic sitemap generation and submission

This design provides a comprehensive foundation for building the Yellowdog website with modern web technologies, focusing on performance, accessibility, and maintainability while delivering an exceptional user experience that reflects the brand's creative and technical expertise.