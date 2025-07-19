<template>
  <h1 :id="id" class="prose-h1 text-4xl md:text-5xl font-bold mb-6 text-base-content leading-tight">
    <slot />
  </h1>
</template>

<script setup lang="ts">
interface Props {
  id?: string
}

defineProps<Props>()
</script>

<style scoped>
.prose-h1 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  scroll-margin-top: 2rem;
}
</style>