<template>
  <section class="py-16 bg-gradient-to-r from-primary to-secondary text-primary-content">
    <div class="container mx-auto px-4 text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h2>
      
      <p v-if="description" class="text-xl mb-8 max-w-2xl mx-auto opacity-90">
        {{ description }}
      </p>
      
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <SubmitButton
          :text="primaryCta.text"
          variant="neutral"
          size="lg"
          @click="handlePrimaryCTA"
        />
        
        <SubmitButton
          v-if="secondaryCta"
          :text="secondaryCta.text"
          variant="ghost"
          size="lg"
          @click="handleSecondaryCTA"
        />
      </div>
      
      <div v-if="features && features.length > 0" class="mt-12">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div 
            v-for="feature in features" 
            :key="feature.title"
            class="text-center"
          >
            <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon v-if="feature.icon" :name="feature.icon" size="32" class="text-white" />
            </div>
            <h3 class="font-semibold mb-2">{{ feature.title }}</h3>
            <p class="text-sm opacity-90">{{ feature.description }}</p>
          </div>
        </div>
      </div>
      
      <div v-if="testimonial" class="mt-12 max-w-2xl mx-auto">
        <blockquote class="text-lg italic mb-4 opacity-90">
          "{{ testimonial.quote }}"
        </blockquote>
        <cite class="text-sm opacity-75">
          — {{ testimonial.name }}
          <span v-if="testimonial.company">, {{ testimonial.company }}</span>
        </cite>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Feature {
  title: string
  description: string
  icon?: string
}

interface Testimonial {
  quote: string
  name: string
  company?: string
}

interface CTA {
  text: string
  url?: string
}

interface Props {
  title: string
  description?: string
  primaryCta: CTA
  secondaryCta?: CTA
  features?: Feature[]
  testimonial?: Testimonial
}

defineProps<Props>()

const emit = defineEmits<{
  'primary-cta': []
  'secondary-cta': []
}>()

const handlePrimaryCTA = () => {
  emit('primary-cta')
}

const handleSecondaryCTA = () => {
  emit('secondary-cta')
}
</script>

<style scoped>
h2 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>