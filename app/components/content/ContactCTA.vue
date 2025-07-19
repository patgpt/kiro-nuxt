<template>
  <section 
    class="py-16 relative overflow-hidden"
    :class="backgroundClass"
  >
    <!-- Background Image Overlay -->
    <div v-if="backgroundImage" class="absolute inset-0 z-0">
      <NuxtImg 
        :src="backgroundImage" 
        alt="Contact us background"
        class="w-full h-full object-cover opacity-20"
        loading="lazy"
      />
    </div>
    
    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center max-w-4xl mx-auto">
        <!-- Headline -->
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
          {{ headline }}
        </h2>
        
        <!-- Subheadline -->
        <p class="text-xl md:text-2xl mb-8 opacity-90">
          {{ subheadline }}
        </p>
        
        <!-- Emotional Hook -->
        <div v-if="emotionalHook" class="mb-8">
          <p class="text-lg italic opacity-80 max-w-2xl mx-auto">
            {{ emotionalHook }}
          </p>
        </div>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <!-- Primary CTA -->
          <NuxtLink 
            :to="primaryCTA.href" 
            class="btn btn-lg"
            :class="primaryButtonClass"
          >
            <Icon v-if="primaryCTA.icon" :name="primaryCTA.icon" size="20" class="mr-2" />
            {{ primaryCTA.text }}
          </NuxtLink>
          
          <!-- Secondary CTA -->
          <component
            v-if="secondaryCTA"
            :is="secondaryCTA.href.startsWith('tel:') || secondaryCTA.href.startsWith('mailto:') ? 'a' : 'NuxtLink'"
            :to="secondaryCTA.href.startsWith('tel:') || secondaryCTA.href.startsWith('mailto:') ? undefined : secondaryCTA.href"
            :href="secondaryCTA.href.startsWith('tel:') || secondaryCTA.href.startsWith('mailto:') ? secondaryCTA.href : undefined"
            class="btn btn-lg"
            :class="secondaryButtonClass"
          >
            <Icon v-if="secondaryCTA.icon" :name="secondaryCTA.icon" size="20" class="mr-2" />
            {{ secondaryCTA.text }}
          </component>
        </div>
        
        <!-- Contact Methods -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <!-- Phone -->
          <div class="text-center">
            <div class="mb-3">
              <Icon name="mdi:phone" size="32" class="mx-auto opacity-80" />
            </div>
            <h3 class="font-semibold mb-1">Call Us</h3>
            <a 
              :href="`tel:${phone}`" 
              class="hover:underline opacity-90"
            >
              {{ formatPhone(phone) }}
            </a>
          </div>
          
          <!-- Email -->
          <div class="text-center">
            <div class="mb-3">
              <Icon name="mdi:email" size="32" class="mx-auto opacity-80" />
            </div>
            <h3 class="font-semibold mb-1">Email Us</h3>
            <a 
              :href="`mailto:${email}`" 
              class="hover:underline opacity-90 break-all"
            >
              {{ email }}
            </a>
          </div>
          
          <!-- Location -->
          <div v-if="location" class="text-center">
            <div class="mb-3">
              <Icon name="mdi:map-marker" size="32" class="mx-auto opacity-80" />
            </div>
            <h3 class="font-semibold mb-1">Visit Us</h3>
            <p class="opacity-90">{{ location }}</p>
          </div>
        </div>
        
        <!-- Trust Indicators -->
        <div v-if="trustIndicators && trustIndicators.length > 0" class="mt-12">
          <div class="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div 
              v-for="indicator in trustIndicators" 
              :key="indicator"
              class="flex items-center gap-2 text-sm"
            >
              <Icon name="mdi:check-circle" size="16" />
              <span>{{ indicator }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface CTA {
  text: string
  href: string
  icon?: string
}

interface Props {
  headline?: string
  subheadline?: string
  emotionalHook?: string
  primaryCTA: CTA
  secondaryCTA?: CTA
  phone: string
  email: string
  location?: string
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral'
  backgroundImage?: string
  trustIndicators?: string[]
}

const props = withDefaults(defineProps<Props>(), {
  headline: 'Ready to Start Your Project?',
  subheadline: 'Contact us today and let\'s bring your vision to life.',
  variant: 'primary'
})

// Background and button classes based on variant
const backgroundClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-primary text-primary-content'
    case 'secondary':
      return 'bg-secondary text-secondary-content'
    case 'accent':
      return 'bg-accent text-accent-content'
    case 'neutral':
      return 'bg-neutral text-neutral-content'
    default:
      return 'bg-primary text-primary-content'
  }
})

const primaryButtonClass = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-white text-primary hover:bg-gray-100'
    case 'secondary':
      return 'bg-white text-secondary hover:bg-gray-100'
    case 'accent':
      return 'bg-white text-accent hover:bg-gray-100'
    case 'neutral':
      return 'bg-white text-neutral hover:bg-gray-100'
    default:
      return 'bg-white text-primary hover:bg-gray-100'
  }
})

const secondaryButtonClass = computed(() => {
  return 'btn-outline border-white text-white hover:bg-white hover:text-current'
})

// Format phone number for display
function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  return phone
}
</script>