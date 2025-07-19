<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
    :aria-label="ariaLabel"
  >
    <span v-if="loading" class="loading loading-spinner loading-sm mr-2"></span>
    <span v-if="icon && !loading" class="mr-2">
      <slot name="icon">{{ icon }}</slot>
    </span>
    <span>{{ loading ? loadingText : text }}</span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  text: string
  loadingText?: string
  type?: 'button' | 'submit' | 'reset'
  loading?: boolean
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'accent' | 'neutral' | 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  wide?: boolean
  block?: boolean
  icon?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  loadingText: 'Loading...',
  type: 'button',
  variant: 'primary',
  size: 'md'
})

const emit = defineEmits<{
  'click': [event: MouseEvent]
}>()

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}

const variantClasses = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  neutral: 'btn-neutral',
  ghost: 'btn-ghost',
  outline: 'btn-outline'
}

const sizeClasses = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg',
  xl: 'btn-xl'
}

const buttonClasses = computed(() => [
  'btn',
  variantClasses[props.variant],
  sizeClasses[props.size],
  {
    'btn-wide': props.wide,
    'btn-block': props.block,
    'btn-disabled': props.disabled,
    'loading': props.loading
  }
])
</script>