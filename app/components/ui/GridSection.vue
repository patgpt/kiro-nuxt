<template>
  <section class="py-16" :class="sectionClasses">
    <div class="container mx-auto px-4">
      <div v-if="title || subtitle" class="text-center mb-12">
        <h2 v-if="title" class="text-3xl md:text-4xl font-bold mb-4">{{ title }}</h2>
        <p v-if="subtitle" class="text-lg text-base-content/70 max-w-2xl mx-auto">{{ subtitle }}</p>
      </div>
      
      <div :class="gridClasses">
        <slot />
      </div>
      
      <div v-if="$slots.footer" class="text-center mt-12">
        <slot name="footer" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  columns?: 1 | 2 | 3 | 4 | 6
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  background?: 'default' | 'base-100' | 'base-200' | 'base-300'
  responsive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  gap: 'lg',
  background: 'default',
  responsive: true
})

const sectionClasses = computed(() => [
  {
    'bg-base-100': props.background === 'base-100',
    'bg-base-200': props.background === 'base-200', 
    'bg-base-300': props.background === 'base-300'
  }
])

const gapClasses = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
  xl: 'gap-12'
}

const columnClasses = {
  1: 'grid-cols-1',
  2: props.responsive ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-2',
  3: props.responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-3',
  4: props.responsive ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' : 'grid-cols-4',
  6: props.responsive ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6' : 'grid-cols-6'
}

const gridClasses = computed(() => [
  'grid',
  columnClasses[props.columns],
  gapClasses[props.gap]
])
</script>