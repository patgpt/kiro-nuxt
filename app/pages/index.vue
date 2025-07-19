<template>
  <div>
    <!-- Hero Section -->
    <section class="hero min-h-[80vh] bg-base-200 relative">
      <div class="hero-content text-center py-16">
        <div class="max-w-3xl">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">Development Unleashed</h1>
          <p class="text-xl md:text-2xl mb-8">Interactive agency specializing in AI, game, mobile, and web development. We transform ideas into powerful digital experiences.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink to="/services" class="btn btn-primary btn-lg">Our Services</NuxtLink>
            <NuxtLink to="/contact" class="btn btn-outline btn-lg">Start Your Project</NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Services Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
            We offer a comprehensive range of development services to transform your digital ideas into reality.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.title" class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
            <div class="card-body p-6">
              <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="service.iconPath"/>
                </svg>
              </div>
              <h3 class="card-title text-xl font-semibold mb-2">{{ service.title }}</h3>
              <p class="text-base-content/80 mb-4">{{ service.description }}</p>
              <div class="card-actions justify-end">
                <NuxtLink :to="`/services/${service.slug}`" class="btn btn-primary btn-sm">
                  Learn More
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <NuxtLink to="/services" class="btn btn-outline btn-wide">
            View All Services
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <!-- About Section -->
    <section class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div class="w-full h-96 bg-base-300 rounded-lg flex items-center justify-center">
              <span class="text-base-content/50">Team Photo Placeholder</span>
            </div>
          </div>
          <div>
            <h2 class="text-3xl md:text-4xl font-bold mb-6">About Yellowdog</h2>
            <p class="text-lg mb-6">Where creativity meets code, and dreams become digital reality. Yellowdog is an interactive agency that specializes in transforming innovative ideas into powerful digital experiences.</p>
            <p class="text-lg mb-8">Our multidisciplinary team combines technical expertise with creative vision to deliver AI-powered solutions, cutting-edge web applications, engaging mobile experiences, and immersive games that captivate users and drive business growth.</p>
            <NuxtLink to="/about" class="btn btn-primary">
              Learn More About Us
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Testimonials Section -->
    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">Don't just take our word for it. Here's what our satisfied clients have to say about working with Yellowdog.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="card bg-base-100 shadow-lg">
            <div class="card-body p-6">
              <div class="mb-4">
                <svg class="w-8 h-8 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
              </div>
              <blockquote class="text-lg mb-4">"{{ testimonial.quote }}"</blockquote>
              <div class="flex items-center gap-3">
                <div class="avatar placeholder">
                  <div class="bg-neutral text-neutral-content rounded-full w-10">
                    <span class="text-sm">{{ getInitials(testimonial.name) }}</span>
                  </div>
                </div>
                <div>
                  <div class="font-semibold">{{ testimonial.name }}</div>
                  <div class="text-sm text-base-content/70">{{ testimonial.role }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-primary text-primary-content">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Unleash Your Project?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Let's discuss your vision and create something extraordinary together. From concept to launch, we're here to transform your ideas into digital reality.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/contact" class="btn btn-lg bg-white text-primary hover:bg-gray-100">
            Start Your Project
          </NuxtLink>
          <NuxtLink to="/services" class="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
            Explore Our Services
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO metadata
useHead({
  title: 'Yellowdog - Interactive Agency | AI, Web, Mobile & Game Development',
  meta: [
    { name: 'description', content: 'Yellowdog is an interactive agency specializing in AI, web, mobile, and game development. We transform innovative ideas into powerful digital experiences that drive business growth.' }
  ]
})

// Sample data for services
const services = [
  {
    title: 'AI Development',
    description: 'Machine learning models, NLP, and computer vision solutions that transform your business.',
    iconPath: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    slug: 'ai-development'
  },
  {
    title: 'Web Development',
    description: 'Modern web applications with cutting-edge technologies and responsive design.',
    iconPath: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9',
    slug: 'web-development'
  },
  {
    title: 'Mobile Development',
    description: 'Native and cross-platform mobile applications that users love.',
    iconPath: 'M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z',
    slug: 'mobile-development'
  },
  {
    title: 'Game Development',
    description: 'Immersive gaming experiences that captivate and engage across all platforms.',
    iconPath: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a1 1 0 01-1-1V9a1 1 0 011-1h1a2 2 0 100-4H4a1 1 0 01-1-1V5a1 1 0 011-1h3a1 1 0 001-1V4z',
    slug: 'game-development'
  }
]

// Sample data for testimonials
const testimonials = [
  {
    quote: 'Yellowdog doesn\'t just build software – they craft digital experiences that transform businesses.',
    name: 'Emily Rodriguez',
    role: 'Founder'
  },
  {
    quote: 'The perfect blend of technical expertise and creative vision. Yellowdog delivers beyond expectations.',
    name: 'James Wilson',
    role: 'CTO'
  },
  {
    quote: 'Working with Yellowdog was seamless from concept to launch. Their AI solutions revolutionized our workflow.',
    name: 'Sarah Johnson',
    role: 'Product Manager'
  }
]

// Helper function to get initials
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>