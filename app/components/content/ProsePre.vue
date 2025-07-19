<template>
  <div class="prose-pre my-6">
    <pre class="bg-base-300 text-base-content rounded-lg p-4 overflow-x-auto text-sm leading-relaxed"><slot /></pre>
  </div>
</template>

<style scoped>
.prose-pre pre {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Inconsolata, "Roboto Mono", "Noto Sans Mono", "Droid Sans Mono", "Liberation Mono", Consolas, "Courier New", monospace;
}

.prose-pre pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}
</style>