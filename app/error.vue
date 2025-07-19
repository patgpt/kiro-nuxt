<template>
  <div class="min-h-screen flex items-center justify-center bg-base-100">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-error mb-4">{{ error.statusCode }}</h1>
      <p class="text-xl text-base-content mb-8">{{ error.statusMessage }}</p>
      <button class="btn btn-primary" @click="handleError">
        Go Home
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

  defineProps({
  error: {
    type: Object as () => NuxtError,
    required: false,
    default: () => ({})
  }
   
})

const handleError = () => clearError({ redirect: '/' })
</script>