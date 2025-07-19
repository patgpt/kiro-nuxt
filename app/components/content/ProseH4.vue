<template>
  <h4 :id="id" class="prose-h4 text-xl md:text-2xl font-semibold mb-3 mt-5 text-base-content leading-tight">
    <slot />
  </h4>
</template>

<script setup lang="ts">
interface Props {
  id?: string
}

defineProps<Props>()
</script>

<style scoped>
.prose-h4 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  scroll-margin-top: 2rem;
}
</style>