<template>
  <a 
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="prose-a text-primary hover:text-primary-focus underline underline-offset-2 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-sm"
  >
    <slot />
    <Icon 
      v-if="isExternal" 
      name="mdi:open-in-new" 
      size="16" 
      class="inline ml-1 opacity-70"
    />
  </a>
</template>

<script setup lang="ts">
interface Props {
  href?: string
}

const props = defineProps<Props>()

const isExternal = computed(() => {
  if (!props.href) return false
  return props.href.startsWith('http') || props.href.startsWith('//')
})
</script>