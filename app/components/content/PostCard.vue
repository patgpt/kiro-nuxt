<template>
  <article class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
    <figure v-if="post.image" class="aspect-video overflow-hidden">
      <NuxtImg
        :src="post.image"
        :alt="post.title"
        class="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        loading="lazy"
      />
    </figure>
    
    <div class="card-body p-6">
      <div class="flex items-center gap-2 mb-3">
        <CategoryTag v-if="post.category" :category="getCategoryData(post.category)" />
        <time class="text-sm text-base-content/60" :datetime="formatDate(post.publishedAt)">
          {{ formatDateHuman(post.publishedAt) }}
        </time>
      </div>
      
      <h2 class="card-title text-xl font-bold mb-3 line-clamp-2">
        <NuxtLink :to="`/blog/${post.slug}`" class="hover:text-primary transition-colors">
          {{ post.title }}
        </NuxtLink>
      </h2>
      
      <p v-if="post.intro" class="text-base-content/80 mb-4 line-clamp-3">
        {{ post.intro }}
      </p>
      
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <Avatar 
            v-if="authorData"
            :src="authorData.avatar" 
            :name="authorData.name"
            size="sm"
          />
          <span v-if="authorData" class="text-sm text-base-content/70">
            {{ authorData.name }}
          </span>
        </div>
        
        <div v-if="post.tags && post.tags.length > 0" class="flex gap-1">
          <TagPill 
            v-for="tag in post.tags.slice(0, 2)" 
            :key="tag"
            :tag="tag"
            :to="`/blog?tag=${tag}`"
            size="xs"
          />
          <span v-if="post.tags.length > 2" class="text-xs text-base-content/60">
            +{{ post.tags.length - 2 }}
          </span>
        </div>
      </div>
      
      <div class="card-actions justify-end mt-4">
        <NuxtLink :to="`/blog/${post.slug}`" class="btn btn-primary btn-sm">
          Read More
        </NuxtLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Post {
  title: string
  slug: string
  intro?: string
  image: string
  publishedAt: string
  author: string
  tags?: string[]
  category?: string
}

interface Props {
  post: Post
}

defineProps<Props>()

// Mock data - in real implementation, these would come from content queries
const getCategoryData = (slug: string) => ({
  title: slug.charAt(0).toUpperCase() + slug.slice(1),
  icon: 'mdi:folder',
  slug
})

const authorData = computed(() => ({
  name: 'Author Name',
  avatar: '/placeholder-avatar.jpg'
}))

const formatDate = (date: string) => {
  return new Date(date).toISOString().split('T')[0]
}

const formatDateHuman = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>