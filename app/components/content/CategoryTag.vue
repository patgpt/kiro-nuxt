<template>
  <component 
    :is="href ? 'NuxtLink' : 'span'"
    :to="href"
    class="category-tag"
    :class="[sizeClass, variantClass, { 'cursor-pointer hover:scale-105': href }]"
  >
    <Icon v-if="category.icon" :name="category.icon" :size="iconSize" class="mr-1" />
    {{ category.title }}
  </component>
</template>

<script setup lang="ts">
interface Category {
  title: string
  slug?: string
  icon?: string
  color?: string
}

interface Props {
  category: Category
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost' | 'soft'
  href?: string
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  variant: 'default',
  clickable: false
})

// Generate href if clickable and category has slug
const href = computed(() => {
  if (props.href) return props.href
  if (props.clickable && props.category.slug) {
    return `/services?category=${props.category.slug}`
  }
  return undefined
})

// Size classes
const sizeClass = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'badge-xs text-xs px-2 py-1'
    case 'sm':
      return 'badge-sm text-sm px-3 py-1'
    case 'md':
      return 'badge-md text-base px-4 py-2'
    case 'lg':
      return 'badge-lg text-lg px-5 py-2'
    default:
      return 'badge-sm text-sm px-3 py-1'
  }
})

// Variant classes
const variantClass = computed(() => {
  switch (props.variant) {
    case 'outline':
      return 'badge badge-outline'
    case 'ghost':
      return 'badge badge-ghost'
    case 'soft':
      return 'badge badge-soft'
    default:
      return 'badge badge-primary'
  }
})

// Icon size based on tag size
const iconSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return '12'
    case 'sm':
      return '14'
    case 'md':
      return '16'
    case 'lg':
      return '18'
    default:
      return '14'
  }
})
</script>

<style scoped>
.category-tag {
  @apply inline-flex items-center font-semibold rounded-full transition-all duration-200;
}
</style>