<template>
  <div class="relative">
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <Icon name="mdi:magnify" size="20" class="text-base-content/50" />
    </div>
    
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      class="input input-bordered w-full pl-10 pr-10"
      @input="handleInput"
      @keydown.enter="handleEnter"
    />
    
    <div v-if="searchQuery" class="absolute inset-y-0 right-0 pr-3 flex items-center">
      <button
        @click="clearSearch"
        class="text-base-content/50 hover:text-base-content transition-colors"
        aria-label="Clear search"
      >
        <Icon name="mdi:close" size="20" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue?: string
  placeholder?: string
  debounceMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Search posts...',
  debounceMs: 300
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'search': [query: string]
  'clear': []
}>()

const searchQuery = ref(props.modelValue || '')
let debounceTimer: NodeJS.Timeout | null = null

watch(() => props.modelValue, (newValue) => {
  searchQuery.value = newValue || ''
})

const handleInput = () => {
  emit('update:modelValue', searchQuery.value)
  
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  
  debounceTimer = setTimeout(() => {
    emit('search', searchQuery.value)
  }, props.debounceMs)
}

const handleEnter = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  emit('search', searchQuery.value)
}

const clearSearch = () => {
  searchQuery.value = ''
  emit('update:modelValue', '')
  emit('clear')
  emit('search', '')
}

onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>