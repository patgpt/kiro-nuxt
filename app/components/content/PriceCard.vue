<template>
  <div 
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 relative"
    :class="{ 
      'border-2 border-primary': featured,
      'scale-105': featured && !compact
    }"
  >
    <!-- Featured Badge -->
    <div v-if="featured && priceCard.badge" class="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
      <span class="badge badge-primary badge-lg font-semibold px-4 py-2">
        {{ priceCard.badge }}
      </span>
    </div>
    
    <div class="card-body p-6">
      <!-- Header -->
      <div class="text-center mb-6">
        <h3 class="card-title text-2xl font-bold justify-center mb-2">
          {{ priceCard.title }}
        </h3>
        
        <!-- Price -->
        <div class="mb-4">
          <div class="text-4xl font-bold text-primary">
            {{ priceCard.price }}
          </div>
          <div v-if="period" class="text-sm text-base-content/70">
            {{ period }}
          </div>
        </div>
        
        <!-- Description -->
        <p v-if="priceCard.description" class="text-base-content/80">
          {{ priceCard.description }}
        </p>
      </div>
      
      <!-- Features -->
      <div v-if="priceCard.features && priceCard.features.length > 0" class="mb-6">
        <ul class="space-y-3">
          <li 
            v-for="feature in priceCard.features" 
            :key="feature"
            class="flex items-start gap-3"
          >
            <Icon name="mdi:check-circle" size="20" class="text-success mt-0.5 flex-shrink-0" />
            <span class="text-sm">{{ feature }}</span>
          </li>
        </ul>
      </div>
      
      <!-- CTA Button -->
      <div class="card-actions justify-center mt-auto">
        <slot name="cta">
          <button 
            class="btn btn-primary btn-wide"
            :class="{ 'btn-lg': featured }"
            @click="handleCTA"
          >
            {{ priceCard.ctaText || 'Get Started' }}
          </button>
        </slot>
      </div>
      
      <!-- Additional Info -->
      <div v-if="priceCard.note" class="text-center mt-4">
        <p class="text-xs text-base-content/60">{{ priceCard.note }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PriceCard {
  title: string
  price: string
  description?: string
  features?: string[]
  ctaText?: string
  badge?: string
  note?: string
}

interface Props {
  priceCard: PriceCard
  period?: string
  featured?: boolean
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false,
  compact: false
})

const emit = defineEmits<{
  cta: [priceCard: PriceCard]
}>()

function handleCTA() {
  emit('cta', props.priceCard)
}
</script>