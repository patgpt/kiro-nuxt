<template>
  <component 
    :is="href ? 'NuxtLink' : 'span'"
    :to="href"
    class="tag-pill"
    :class="[sizeClass, variantClass, { 'cursor-pointer hover:scale-105': href }]"
  >
    {{ tag }}
  </component>
</template>

<script setup lang="ts">
interface Props {
  tag: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'outline' | 'ghost' | 'neutral'
  href?: string
  clickable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'sm',
  variant: 'default',
  clickable: false
})

// Generate href if clickable
const href = computed(() => {
  if (props.href) return props.href
  if (props.clickable) {
    return `/blog?tag=${encodeURIComponent(props.tag.toLowerCase())}`
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
    case 'neutral':
      return 'badge badge-neutral'
    default:
      return 'badge badge-secondary'
  }
})
</script>

<style scoped>
.tag-pill {
  @apply inline-flex items-center font-semibold rounded-full transition-all duration-200;
}
</style>