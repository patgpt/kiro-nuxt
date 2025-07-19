<template>
  <header class="post-header mb-12">
    <div v-if="coverImage" class="aspect-video mb-8 overflow-hidden rounded-lg">
      <NuxtImg
        :src="coverImage"
        :alt="title"
        class="w-full h-full object-cover"
        loading="eager"
      />
    </div>
    
    <div class="max-w-4xl mx-auto">
      <div class="flex items-center gap-2 mb-4">
        <CategoryTag v-if="category" :category="category" />
        <time class="text-sm text-base-content/60" :datetime="formatDate(publishedAt)">
          {{ formatDateHuman(publishedAt) }}
        </time>
      </div>
      
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
        {{ title }}
      </h1>
      
      <p v-if="intro" class="text-xl text-base-content/80 leading-relaxed mb-8">
        {{ intro }}
      </p>
      
      <PostMeta
        :author="author"
        :published-at="publishedAt"
        :category="category"
        :tags="tags"
        :reading-time="readingTime"
      />
    </div>
  </header>
</template>

<script setup lang="ts">
interface Author {
  name: string
  avatar: string
  position?: string
}

interface Category {
  title: string
  icon: string
  slug: string
}

interface Props {
  title: string
  intro?: string
  coverImage?: string
  publishedAt: string
  author?: Author
  category?: Category
  tags?: string[]
  readingTime?: number
}

defineProps<Props>()

const formatDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0]
}

const formatDateHuman = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.post-header h1 {
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
}
</style>