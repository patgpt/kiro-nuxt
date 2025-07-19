<template>
  <div 
    class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 h-full"
    :class="{ 'border-l-4 border-primary': featured }"
  >
    <div class="card-body p-6 flex flex-col h-full">
      <!-- Quote Icon -->
      <div class="flex-shrink-0 mb-4">
        <Icon name="mdi:format-quote-open" size="32" class="text-primary/30" />
      </div>
      
      <!-- Quote Text -->
      <div class="flex-grow mb-6">
        <blockquote class="text-lg leading-relaxed text-base-content/90">
          "{{ testimonial.quote }}"
        </blockquote>
      </div>
      
      <!-- Attribution -->
      <div class="flex items-center gap-4 mt-auto">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <Avatar 
            :src="testimonial.avatar" 
            :alt="testimonial.name"
            size="md"
            :fallback="getInitials(testimonial.name)"
          />
        </div>
        
        <!-- Details -->
        <div class="flex-grow min-w-0">
          <div class="font-semibold text-base-content">{{ testimonial.name }}</div>
          <div class="text-sm text-base-content/70">
            <span v-if="testimonial.role">{{ testimonial.role }}</span>
            <span v-if="testimonial.role && testimonial.company"> at </span>
            <span v-if="testimonial.company">{{ testimonial.company }}</span>
          </div>
          <div v-if="testimonial.location" class="text-xs text-base-content/50 mt-1">
            {{ testimonial.location }}
          </div>
        </div>
        
        <!-- Rating -->
        <div v-if="testimonial.rating" class="flex-shrink-0">
          <div class="rating rating-sm">
            <Icon 
              v-for="star in 5" 
              :key="star"
              name="mdi:star"
              size="16"
              :class="star <= testimonial.rating ? 'text-warning' : 'text-base-300'"
            />
          </div>
        </div>
      </div>
      
      <!-- Project/Service Reference -->
      <div v-if="testimonial.project || testimonial.service" class="mt-4 pt-4 border-t border-base-200">
        <div class="text-sm text-base-content/70">
          <span v-if="testimonial.project">Project: {{ testimonial.project }}</span>
          <span v-if="testimonial.service">Service: {{ testimonial.service }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Testimonial {
  quote: string
  name: string
  role?: string
  company?: string
  location?: string
  avatar?: string
  rating?: number
  project?: string
  service?: string
}

interface Props {
  testimonial: Testimonial
  featured?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  featured: false
})

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>