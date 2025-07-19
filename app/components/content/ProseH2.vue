<template>
  <h2 :id="id" class="prose-h2 text-3xl md:text-4xl font-bold mb-5 mt-8 text-base-content leading-tight">
    <slot />
  </h2>
</template>

<script setup lang="ts">
interface Props {
  id?: string
}

defineProps<Props>()
</script>

<style scoped>
.prose-h2 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  scroll-margin-top: 2rem;
}
</style>