<template>
  <header class="bg-base-100 shadow-md sticky top-0 z-50">
    <div class="container mx-auto px-4">
      <div class="navbar min-h-16">
        <!-- Logo/Brand -->
        <div class="navbar-start">
          <NuxtLink to="/" class="flex items-center gap-2">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span class="text-primary-content font-bold text-lg">YD</span>
            </div>
            <span class="font-bold text-xl hidden md:inline-block">Yellowdog</span>
          </NuxtLink>
        </div>
        
        <!-- Desktop Navigation -->
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal gap-1">
            <li><NuxtLink to="/" class="font-semibold">Home</NuxtLink></li>
            <li><NuxtLink to="/services" class="font-semibold">Services</NuxtLink></li>
            <li><NuxtLink to="/projects" class="font-semibold">Projects</NuxtLink></li>
            <li><NuxtLink to="/blog" class="font-semibold">Blog</NuxtLink></li>
            <li><NuxtLink to="/about" class="font-semibold">About</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Actions -->
        <div class="navbar-end">
          <NuxtLink to="/contact" class="btn btn-primary btn-sm md:btn-md hidden md:flex">
            Contact Us
          </NuxtLink>
          
          <!-- Mobile menu button -->
          <button 
            class="btn btn-ghost lg:hidden"   
            aria-label="Toggle menu"
            @click="isMenuOpen = !isMenuOpen"
          
          >
            <svg v-if="!isMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <div 
      v-show="isMenuOpen" 
      class="lg:hidden bg-base-100 shadow-lg absolute w-full transition-all duration-300"
    >
      <div class="container mx-auto px-4 py-4">
        <ul class="menu w-full">
          <li><NuxtLink to="/" class="font-semibold" @click="isMenuOpen = false">Home</NuxtLink></li>
          <li><NuxtLink to="/services" class="font-semibold" @click="isMenuOpen = false">Services</NuxtLink></li>
          <li><NuxtLink to="/projects" class="font-semibold" @click="isMenuOpen = false">Projects</NuxtLink></li>
          <li><NuxtLink to="/blog" class="font-semibold" @click="isMenuOpen = false">Blog</NuxtLink></li>
          <li><NuxtLink to="/about" class="font-semibold" @click="isMenuOpen = false">About</NuxtLink></li>
          <li>
            <NuxtLink to="/contact" class="font-semibold text-primary" @click="isMenuOpen = false">
              Contact Us
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

// Close mobile menu when route changes
watch(() => useRoute().path, () => {
  isMenuOpen.value = false
})

// Close mobile menu when clicking outside
onMounted(() => {
  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('header') && isMenuOpen.value) {
      isMenuOpen.value = false
    }
  }
  
  document.addEventListener('click', handleClickOutside)
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
})
</script>