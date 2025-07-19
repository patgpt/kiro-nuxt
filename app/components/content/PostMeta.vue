<template>
  <div class="flex flex-wrap items-center gap-4 text-sm text-base-content/70 py-4 border-y border-base-300">
    <div v-if="author" class="flex items-center gap-2">
      <Avatar 
        :src="author.avatar" 
        :name="author.name"
        size="sm"
      />
      <span>{{ author.name }}</span>
    </div>
    
    <div class="flex items-center gap-1">
      <Icon name="mdi:calendar" size="16" />
      <time :datetime="formatDate(publishedAt)">
        {{ formatDateHuman(publishedAt) }}
      </time>
    </div>
    
    <div v-if="category" class="flex items-center gap-1">
      <Icon name="mdi:folder" size="16" />
      <CategoryTag :category="category" />
    </div>
    
    <div v-if="readingTime" class="flex items-center gap-1">
      <Icon name="mdi:clock-outline" size="16" />
      <span>{{ readingTime }} min read</span>
    </div>
    
    <div v-if="tags && tags.length > 0" class="flex items-center gap-2">
      <Icon name="mdi:tag-multiple" size="16" />
      <div class="flex gap-1 flex-wrap">
        <TagPill 
          v-for="tag in tags" 
          :key="tag"
          :tag="tag"
          :to="`/blog?tag=${tag}`"
          size="xs"
        />
      </div>
    </div>
  </div>
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
  author?: Author
  publishedAt: string
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