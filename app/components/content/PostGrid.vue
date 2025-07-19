<template>
  <div class="post-grid">
    <GridSection 
      :columns="columns"
      :gap="gap"
      :responsive="responsive"
    >
      <PostCard 
        v-for="post in posts" 
        :key="post.slug"
        :post="post"
      />
    </GridSection>
    
    <div v-if="showLoadMore && hasMore" class="text-center mt-12">
      <SubmitButton
        text="Load More Posts"
        :loading="loading"
        variant="outline"
        size="lg"
        @click="$emit('load-more')"
      />
    </div>
    
    <div v-else-if="posts.length === 0" class="text-center py-16">
      <Icon name="mdi:post-outline" size="64" class="text-base-content/30 mb-4" />
      <h3 class="text-xl font-semibold mb-2">No posts found</h3>
      <p class="text-base-content/70">{{ emptyMessage }}</p>
    </div>
  </div>
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
  posts: Post[]
  columns?: 1 | 2 | 3 | 4
  gap?: 'sm' | 'md' | 'lg' | 'xl'
  responsive?: boolean
  showLoadMore?: boolean
  hasMore?: boolean
  loading?: boolean
  emptyMessage?: string
}

withDefaults(defineProps<Props>(), {
  columns: 3,
  gap: 'lg',
  responsive: true,
  emptyMessage: 'Try adjusting your search or filter criteria.'
})

defineEmits<{
  'load-more': []
}>()
</script>