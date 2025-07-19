<template>
  <div class="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300">
    <div class="card-body p-6">
      <div class="flex items-start gap-4">
        <!-- Avatar -->
        <div class="flex-shrink-0">
          <Avatar 
            :src="author.avatar" 
            :alt="author.name"
            :size="size === 'sm' ? 'md' : 'lg'"
            :fallback="getInitials(author.name)"
          />
        </div>
        
        <!-- Content -->
        <div class="flex-grow min-w-0">
          <h3 class="card-title text-lg font-semibold mb-1">{{ author.name }}</h3>
          
          <div v-if="author.role || author.company" class="text-sm text-base-content/70 mb-3">
            <span v-if="author.role">{{ author.role }}</span>
            <span v-if="author.role && author.company"> at </span>
            <span v-if="author.company">{{ author.company }}</span>
          </div>
          
          <p v-if="author.bio && !compact" class="text-base-content/80 mb-4 line-clamp-3">
            {{ author.bio }}
          </p>
          
          <!-- Social Links -->
          <div v-if="author.social && author.social.length > 0" class="flex gap-2">
            <SocialIcon 
              v-for="social in author.social" 
              :key="social.platform"
              :platform="social.platform"
              :href="social.url"
              size="sm"
              variant="ghost"
            />
          </div>
        </div>
      </div>
      
      <!-- Action Slot -->
      <div v-if="$slots.default" class="card-actions justify-end mt-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
}

interface Author {
  name: string
  role?: string
  company?: string
  bio?: string
  avatar?: string
  social?: SocialLink[]
}

interface Props {
  author: Author
  size?: 'sm' | 'md' | 'lg'
  compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  compact: false
})

// Helper function to get initials from name
function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('')
}
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>