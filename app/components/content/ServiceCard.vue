<template>
  <article class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <figure v-if="service.image" class="aspect-video overflow-hidden">
      <NuxtImg
        :src="service.image"
        :alt="service.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </figure>
    
    <div class="card-body p-6">
      <div class="flex items-center justify-between mb-3">
        <CategoryTag v-if="service.category" :category="getCategoryData(service.category)" />
        <div v-if="service.featured" class="badge badge-primary">Featured</div>
      </div>
      
      <h2 class="card-title text-xl font-bold mb-3">
        <NuxtLink :to="`/services/${service.slug}`" class="hover:text-primary transition-colors">
          {{ service.title }}
        </NuxtLink>
      </h2>
      
      <p v-if="service.intro" class="text-base-content/80 mb-4 line-clamp-3">
        {{ service.intro }}
      </p>
      
      <div v-if="service.features && service.features.length > 0" class="mb-4">
        <div class="flex flex-wrap gap-2">
          <div 
            v-for="feature in service.features.slice(0, 3)" 
            :key="feature.title"
            class="flex items-center gap-1 text-sm text-base-content/70"
          >
            <Icon v-if="feature.icon" :name="feature.icon" size="16" class="text-primary" />
            <span>{{ feature.title }}</span>
          </div>
          <span v-if="service.features.length > 3" class="text-xs text-base-content/60">
            +{{ service.features.length - 3 }} more
          </span>
        </div>
      </div>
      
      <div v-if="service.priceCard" class="mb-4">
        <div class="text-2xl font-bold text-primary">
          {{ service.priceCard.price }}
        </div>
      </div>
      
      <div class="card-actions justify-between items-center">
        <NuxtLink :to="`/services/${service.slug}`" class="btn btn-primary">
          Learn More
        </NuxtLink>
        
        <NuxtLink to="/contact" class="btn btn-outline btn-sm">
          Get Quote
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon?: string
}

interface PriceCard {
  title: string
  features: string[]
  price: string
  badge?: string
  ctaText: string
  ctaUrl?: string
}

interface Service {
  title: string
  slug: string
  intro: string
  image: string
  features?: Feature[]
  category: string
  priceCard?: PriceCard
  featured?: boolean
}

interface Props {
  service: Service
}

defineProps<Props>()

// Mock data - in real implementation, this would come from content queries
const getCategoryData = (slug: string) => ({
  title: slug.charAt(0).toUpperCase() + slug.slice(1),
  icon: 'mdi:cog',
  slug
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>