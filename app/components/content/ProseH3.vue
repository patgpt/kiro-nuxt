<template>
  <h3 :id="id" class="prose-h3 text-2xl md:text-3xl font-semibold mb-4 mt-6 text-base-content leading-tight">
    <slot />
  </h3>
</template>

<script setup lang="ts">
interface Props {
  id?: string
}

defineProps<Props>()
</script>

<style scoped>
.prose-h3 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  scroll-margin-top: 2rem;
}
</style>