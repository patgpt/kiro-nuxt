<template>
  <figure class="prose-img my-8">
    <NuxtImg
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      class="rounded-lg shadow-lg w-full h-auto"
      loading="lazy"
      :placeholder="[16, 16, 75, 5]"
    />
    <figcaption v-if="alt" class="text-sm text-base-content/70 text-center mt-2 italic">
      {{ alt }}
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt?: string
  width?: number
  height?: number
}

defineProps<Props>()
</script>