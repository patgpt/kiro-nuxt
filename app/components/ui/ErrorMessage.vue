<template>
  <div v-if="show" class="alert alert-error" :class="alertClasses">
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      class="stroke-current shrink-0 h-6 w-6" 
      fill="none" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" 
      />
    </svg>
    <div>
      <h3 v-if="title" class="font-bold">{{ title }}</h3>
      <div class="text-sm">{{ message }}</div>
    </div>
    <button 
      v-if="dismissible" 
      @click="handleDismiss"
      class="btn btn-sm btn-ghost"
      aria-label="Dismiss error"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        class="h-4 w-4" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M6 18L18 6M6 6l12 12" 
        />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string
  title?: string
  show?: boolean
  dismissible?: boolean
  variant?: 'error' | 'warning' | 'info'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  show: true,
  variant: 'error',
  size: 'md'
})

const emit = defineEmits<{
  'dismiss': []
}>()

const handleDismiss = () => {
  emit('dismiss')
}

const alertClasses = computed(() => [
  {
    'alert-warning': props.variant === 'warning',
    'alert-info': props.variant === 'info',
    'alert-sm': props.size === 'sm',
    'alert-lg': props.size === 'lg'
  }
])
</script>