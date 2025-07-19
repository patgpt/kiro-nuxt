<template>
  <article class="post-body prose prose-lg max-w-none">
    <ContentRenderer :value="content" />
  </article>
</template>

<script setup lang="ts">
interface Props {
  content: any // Content from @nuxt/content
}

defineProps<Props>()
</script>

<style scoped>
.post-body {
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
  line-height: 1.75;
}

.post-body :deep(h1),
.post-body :deep(h2),
.post-body :deep(h3),
.post-body :deep(h4),
.post-body :deep(h5),
.post-body :deep(h6) {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.post-body :deep(p) {
  margin-bottom: 1.5rem;
}

.post-body :deep(img) {
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.post-body :deep(blockquote) {
  border-left: 4px solid hsl(var(--p));
  padding-left: 1.5rem;
  margin: 2rem 0;
  font-style: italic;
  background: hsl(var(--b2) / 0.5);
  padding: 1.5rem;
  border-radius: 0.5rem;
}

.post-body :deep(code) {
  background: hsl(var(--b3));
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
}

.post-body :deep(pre) {
  background: hsl(var(--b3));
  padding: 1.5rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.post-body :deep(pre code) {
  background: transparent;
  padding: 0;
}
</style>