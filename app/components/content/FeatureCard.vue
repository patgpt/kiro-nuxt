<template>
  <div 
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    :class="{ 'hover:-translate-y-1': !noHover }"
  >
    <div class="card-body p-6 flex flex-col h-full">
      <!-- Icon -->
      <div v-if="feature.icon" class="flex-shrink-0 mb-4">
        <div 
          class="w-12 h-12 rounded-lg flex items-center justify-center"
          :class="iconBgClass"
        >
          <Icon :name="feature.icon" size="24" :class="iconClass" />
        </div>
      </div>
      
      <!-- Image -->
      <figure v-else-if="feature.image" class="flex-shrink-0 mb-4">
        <NuxtImg 
          :src="feature.image" 
          :alt="feature.title"
          class="w-full h-48 object-cover rounded-lg"
          width="300"
          height="200"
        />
      </figure>
      
      <!-- Content -->
      <div class="flex-grow">
        <h3 class="card-title text-xl font-semibold mb-3">{{ feature.title }}</h3>
        <p class="text-base-content/80 mb-4">{{ feature.description }}</p>
        
        <!-- Features List -->
        <ul v-if="feature.features && feature.features.length > 0" class="space-y-2 mb-4">
          <li 
            v-for="item in feature.features" 
            :key="item"
            class="flex items-start gap-2 text-sm"
          >
            <Icon name="mdi:check" size="16" class="text-success mt-0.5 flex-shrink-0" />
            <span>{{ item }}</span>
          </li>
        </ul>
        
        <!-- Badge -->
        <div v-if="feature.badge" class="mb-4">
          <span class="badge badge-primary">{{ feature.badge }}</span>
        </div>
        
        <!-- Price -->
        <div v-if="feature.price" class="mb-4">
          <div class="text-2xl font-bold text-primary">
            {{ feature.price }}
            <span v-if="feature.period" class="text-sm font-normal text-base-content/70">
              {{ feature.period }}
            </span>
          </div>
        </div>
      </div>
      
      <!-- Actions -->
      <div v-if="$slots.default" class="card-actions justify-end mt-auto pt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon?: string
  image?: string
  features?: string[]
  badge?: string
  price?: string
  period?: string
}

interface Props {
  feature: Feature
  variant?: 'default' | 'primary' | 'secondary' | 'accent'
  noHover?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  noHover: false
})

// Computed classes for icon styling
const iconBgClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary/10'
    case 'secondary':
      return 'bg-secondary/10'
    case 'accent':
      return 'bg-accent/10'
    default:
      return 'bg-base-200'
  }
})

const iconClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'text-primary'
    case 'secondary':
      return 'text-secondary'
    case 'accent':
      return 'text-accent'
    default:
      return 'text-base-content'
  }
})
</script>