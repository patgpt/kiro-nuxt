<template>
  <div class="avatar" :class="avatarClasses">
    <div class="w-full h-full">
      <img 
        v-if="src && !imageError" 
        :src="src" 
        :alt="alt"
        @error="handleImageError"
        class="rounded-full object-cover w-full h-full"
      />
      <div 
        v-else 
        class="avatar-placeholder bg-neutral text-neutral-content rounded-full flex items-center justify-center w-full h-full"
      >
        <span class="text-xl font-semibold">{{ initials }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src?: string
  alt?: string
  name?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  online?: boolean
  offline?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  alt: 'Avatar',
  size: 'md'
})

const imageError = ref(false)

const handleImageError = () => {
  imageError.value = true
}

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const sizeClasses = {
  xs: 'w-6 h-6',
  sm: 'w-8 h-8', 
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
  xl: 'w-24 h-24'
}

const avatarClasses = computed(() => [
  sizeClasses[props.size],
  {
    'avatar-online': props.online,
    'avatar-offline': props.offline
  }
])
</script>