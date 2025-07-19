<template>
  <section class="hero min-h-[60vh] bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="hero-content text-center max-w-4xl">
      <div>
        <div v-if="category" class="mb-4">
          <CategoryTag :category="category" />
        </div>
        
        <h1 class="text-5xl md:text-6xl font-bold mb-6">{{ title }}</h1>
        
        <p v-if="intro" class="text-xl md:text-2xl text-base-content/80 leading-relaxed mb-8 max-w-3xl mx-auto">
          {{ intro }}
        </p>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <SubmitButton
            text="Get Started"
            variant="primary"
            size="lg"
            @click="$emit('get-started')"
          />
          
          <SubmitButton
            text="View Portfolio"
            variant="outline"
            size="lg"
            @click="$emit('view-portfolio')"
          />
        </div>
        
        <div v-if="features && features.length > 0" class="mt-12">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div 
              v-for="feature in features.slice(0, 3)" 
              :key="feature.title"
              class="flex flex-col items-center text-center"
            >
              <div class="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-3">
                <Icon v-if="feature.icon" :name="feature.icon" size="24" class="text-primary" />
              </div>
              <h3 class="font-semibold mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-base-content/70">{{ feature.description }}</p>
            </div>
          </div>
        </div>
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

interface Category {
  title: string
  icon: string
  slug: string
}

interface Props {
  title: string
  intro?: string
  category?: Category
  features?: Feature[]
}

defineProps<Props>()

defineEmits<{
  'get-started': []
  'view-portfolio': []
}>()
</script>

<style scoped>
h1 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>