<template>
  <div class="service-grid">
    <GridSection 
      :columns="columns"
      :gap="gap"
      :responsive="responsive"
    >
      <ServiceCard 
        v-for="service in services" 
        :key="service.slug"
        :service="service"
      />
    </GridSection>
    
    <div v-if="showLoadMore && hasMore" class="text-center mt-12">
      <SubmitButton
        text="Load More Services"
        :loading="loading"
        variant="outline"
        size="lg"
        @click="$emit('load-more')"
      />
    </div>
    
    <div v-else-if="services.length === 0" class="text-center py-16">
      <Icon name="mdi:cog-outline" size="64" class="text-base-content/30 mb-4" />
      <h3 class="text-xl font-semibold mb-2">No services found</h3>
      <p class="text-base-content/70">{{ emptyMessage }}</p>
    </div>
  </div>
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
  services: Service[]
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
  showLoadMore?: boolean
  hasMore?: boolean
  loading?: boolean
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  columns: 3,
  gap: 'lg',
  responsive: true,
  emptyMessage: 'Try adjusting your search or filter criteria.'
})

defineEmits<{
  'load-more': []
}>()
</script>