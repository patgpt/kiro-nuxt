<template>
  <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200">
    <div class="card-body p-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3">
        <h4 class="font-semibold text-lg">{{ priceCard.title }}</h4>
        <div class="text-right">
          <div class="text-xl font-bold text-primary">{{ priceCard.price }}</div>
          <div v-if="period" class="text-xs text-base-content/70">{{ period }}</div>
        </div>
      </div>
      
      <!-- Description -->
      <p v-if="priceCard.description" class="text-sm text-base-content/80 mb-3">
        {{ priceCard.description }}
      </p>
      
      <!-- Key Features (limited) -->
      <div v-if="priceCard.features && priceCard.features.length > 0" class="mb-4">
        <ul class="space-y-1">
          <li 
            v-for="feature in priceCard.features.slice(0, 3)" 
            :key="feature"
            class="flex items-start gap-2 text-sm"
          >
            <Icon name="mdi:check" size="14" class="text-success mt-0.5 flex-shrink-0" />
            <span>{{ feature }}</span>
          </li>
          <li v-if="priceCard.features.length > 3" class="text-xs text-base-content/60 ml-5">
            +{{ priceCard.features.length - 3 }} more features
          </li>
        </ul>
      </div>
      
      <!-- CTA Button -->
      <div class="card-actions">
        <slot name="cta">
          <button 
            class="btn btn-primary btn-sm btn-block"
            @click="handleCTA"
          >
            {{ priceCard.ctaText || 'Learn More' }}
          </button>
        </slot>
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
}

interface Props {
  priceCard: PriceCard
  period?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  cta: [priceCard: PriceCard]
}>()

function handleCTA() {
  emit('cta', props.priceCard)
}
</script>