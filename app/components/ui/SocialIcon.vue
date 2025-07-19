<template>
  <a
    :href="href"
    :target="external ? '_blank' : '_self'"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="linkClasses"
    :aria-label="ariaLabel || `Visit ${platform}`"
  >
    <Icon 
      :name="iconName" 
      :size="iconSize"
      :class="iconClasses"
    />
    <span v-if="showLabel" class="ml-2">{{ platform }}</span>
  </a>
</template>

<script setup lang="ts">
interface Props {
  platform: string
  href: string
  icon?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'ghost' | 'outline' | 'solid'
  color?: 'default' | 'primary' | 'secondary' | 'accent'
  external?: boolean
  showLabel?: boolean
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  variant: 'default',
  color: 'default',
  external: true
})

// Map common platforms to their icons
const platformIcons: Record<string, string> = {
  twitter: 'mdi:twitter',
  facebook: 'mdi:facebook',
  instagram: 'mdi:instagram',
  linkedin: 'mdi:linkedin',
  github: 'mdi:github',
  youtube: 'mdi:youtube',
  tiktok: 'mdi:tiktok',
  discord: 'mdi:discord',
  email: 'mdi:email',
  website: 'mdi:web',
  phone: 'mdi:phone'
}

const iconName = computed(() => {
  if (props.icon) return props.icon
  const platformKey = props.platform.toLowerCase()
  return platformIcons[platformKey] || 'mdi:link'
})

const sizeMap = {
  xs: '16',
  sm: '20',
  md: '24',
  lg: '32',
  xl: '40'
}

const iconSize = computed(() => sizeMap[props.size])

const linkClasses = computed(() => [
  'inline-flex items-center justify-center transition-all duration-200',
  'hover:scale-110 focus:scale-110',
  'focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    // Size classes
    'p-1': props.size === 'xs',
    'p-1.5': props.size === 'sm',
    'p-2': props.size === 'md',
    'p-3': props.size === 'lg',
    'p-4': props.size === 'xl',
    
    // Variant classes
    'hover:bg-base-200 rounded-full': props.variant === 'ghost',
    'border border-current hover:bg-current hover:text-base-100 rounded-full': props.variant === 'outline',
    'bg-current text-base-100 rounded-full': props.variant === 'solid',
    
    // Color classes
    'text-primary hover:text-primary focus:ring-primary': props.color === 'primary',
    'text-secondary hover:text-secondary focus:ring-secondary': props.color === 'secondary',
    'text-accent hover:text-accent focus:ring-accent': props.color === 'accent',
    'text-base-content hover:text-base-content focus:ring-base-content': props.color === 'default'
  }
])

const iconClasses = computed(() => [
  'transition-transform duration-200',
  {
    'group-hover:scale-110': true
  }
])
</script>