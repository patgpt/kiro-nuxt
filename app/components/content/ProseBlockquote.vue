<template>
  <blockquote class="prose-blockquote border-l-4 border-primary pl-6 py-4 my-6 bg-base-200/50 rounded-r-lg">
    <div class="text-lg italic text-base-content/90 leading-relaxed">
      <slot />
    </div>
  </blockquote>
</template>

<style scoped>
.prose-blockquote {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>