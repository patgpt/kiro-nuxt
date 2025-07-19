<template>
  <div class="form-control w-full">
    <label v-if="label" class="label">
      <span class="label-text">{{ label }}</span>
      <span v-if="required" class="label-text-alt text-error">*</span>
    </label>
    
    <div class="relative">
      <input
        v-if="type !== 'textarea'"
        :id="inputId"
        :type="type"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <textarea
        v-else
        :id="inputId"
        :placeholder="placeholder"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :rows="rows"
        :class="textareaClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
      />
      
      <div v-if="loading" class="absolute right-3 top-1/2 transform -translate-y-1/2">
        <span class="loading loading-spinner loading-sm"></span>
      </div>
    </div>
    
    <label v-if="error || hint" class="label">
      <span v-if="error" class="label-text-alt text-error">{{ error }}</span>
      <span v-else-if="hint" class="label-text-alt">{{ hint }}</span>
    </label>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'textarea'
  required?: boolean
  disabled?: boolean
  loading?: boolean
  error?: string
  hint?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'bordered'
  rows?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  variant: 'default',
  rows: 4
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  'blur': [event: FocusEvent]
  'focus': [event: FocusEvent]
}>()

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`)

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement
  emit('update:modelValue', target.value)
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
}

const baseClasses = computed(() => [
  'w-full',
  {
    'input-xs': props.size === 'xs',
    'input-sm': props.size === 'sm', 
    'input-md': props.size === 'md',
    'input-lg': props.size === 'lg',
    'input-ghost': props.variant === 'ghost',
    'input-bordered': props.variant === 'bordered',
    'input-error': props.error,
    'input-disabled': props.disabled
  }
])

const inputClasses = computed(() => [
  'input',
  ...baseClasses.value
])

const textareaClasses = computed(() => [
  'textarea',
  ...baseClasses.value
])
</script>