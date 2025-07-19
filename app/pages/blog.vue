<template>
  <div>
    <PageHero 
      title="Construction Insights & News" 
      subtitle="Stay informed with the latest construction trends, tips, and project updates"
      background-image="/img/blog-hero.jpg"
      :breadcrumbs="[{ name: 'Blog', path: '/blog' }]"
    />
    
    <!-- Search and Filters -->
    <section class="py-8 bg-base-100 border-b">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <!-- Search -->
          <div class="flex-grow max-w-md">
            <PostSearchInput 
              v-model="searchQuery"
              placeholder="Search articles..."
              @search="handleSearch"
            />
          </div>
          
          <!-- Category Filter -->
          <div class="flex flex-wrap gap-3">
            <button 
              class="btn btn-sm" 
              :class="selectedCategory === null ? 'btn-primary' : 'btn-ghost'"
              @click="selectedCategory = null"
            >
              All Categories
            </button>
            
            <button 
              v-for="category in categories" 
              :key="category.slug"
              class="btn btn-sm" 
              :class="selectedCategory === category.slug ? 'btn-primary' : 'btn-ghost'"
              @click="selectedCategory = category.slug"
            >
              {{ category.title }}
            </button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Blog Posts -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <!-- Results Info -->
        <div class="mb-8">
          <p class="text-base-content/70">
            <span v-if="searchQuery">
              {{ filteredPosts.length }} result{{ filteredPosts.length !== 1 ? 's' : '' }} for "{{ searchQuery }}"
            </span>
            <span v-else-if="selectedCategory">
              {{ filteredPosts.length }} article{{ filteredPosts.length !== 1 ? 's' : '' }} in {{ getCategoryTitle(selectedCategory) }}
            </span>
            <span v-else>
              {{ filteredPosts.length }} article{{ filteredPosts.length !== 1 ? 's' : '' }} total
            </span>
          </p>
        </div>
        
        <!-- Posts Grid -->
        <PostGrid v-if="filteredPosts.length > 0" :posts="paginatedPosts" />
        
        <!-- Empty State -->
        <div v-else class="text-center py-12">
          <Icon name="mdi:file-document-outline" size="64" class="text-base-content/30 mb-4" />
          <h3 class="text-2xl font-semibold mb-2">No articles found</h3>
          <p class="text-base-content/70 mb-6">
            <span v-if="searchQuery">
              No articles match your search for "{{ searchQuery }}".
            </span>
            <span v-else-if="selectedCategory">
              No articles found in this category.
            </span>
            <span v-else>
              No articles have been published yet.
            </span>
          </p>
          <button 
            v-if="searchQuery || selectedCategory" 
            class="btn btn-primary"
            @click="clearFilters"
          >
            Clear Filters
          </button>
        </div>
        
        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-12">
          <div class="flex justify-center">
            <div class="join">
              <button 
                class="join-item btn" 
                :disabled="currentPage === 1"
                @click="currentPage = Math.max(1, currentPage - 1)"
              >
                <Icon name="mdi:chevron-left" size="20" />
                Previous
              </button>
              
              <button 
                v-for="page in visiblePages" 
                :key="page"
                class="join-item btn" 
                :class="{ 'btn-active': page === currentPage }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>
              
              <button 
                class="join-item btn" 
                :disabled="currentPage === totalPages"
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
              >
                Next
                <Icon name="mdi:chevron-right" size="20" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Newsletter CTA -->
    <section class="py-16 bg-base-200">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold mb-4">Stay Updated</h2>
        <p class="text-lg text-base-content/70 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to get the latest construction insights, project updates, and industry news delivered to your inbox.
        </p>
        <div class="max-w-md mx-auto">
          <div class="join w-full">
            <input 
              v-model="newsletterEmail"
              type="email" 
              placeholder="Enter your email" 
              class="input input-bordered join-item flex-grow">
            <button 
              class="btn btn-primary join-item"
               :disabled="!newsletterEmail || isSubscribing"
              @click="subscribeNewsletter"
             
            >
              <span v-if="isSubscribing">Subscribing...</span>
              <span v-else>Subscribe</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO metadata
useHead({
  title: 'Blog - Yellow Dog Construction',
  meta: [
    { name: 'description', content: 'Read the latest construction insights, project updates, and industry news from Yellow Dog Construction. Stay informed about construction trends and tips.' }
  ]
})

// Reactive state
const searchQuery = ref('')
const selectedCategory = ref<string | null>(null)
const currentPage = ref(1)
const postsPerPage = 9
const newsletterEmail = ref('')
const isSubscribing = ref(false)

// Fetch blog posts
const { data: posts } = await useAsyncData('blog', () => queryCollection('blog').all())

// Sample categories (in a real app, these would come from your content)
const categories = [
  { title: 'Construction Tips', slug: 'construction-tips' },
  { title: 'Project Updates', slug: 'project-updates' },
  { title: 'Industry News', slug: 'industry-news' },
  { title: 'Sustainability', slug: 'sustainability' }
]

// Computed properties
const filteredPosts = computed(() => {
  let filtered = posts.value || []
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(post => 
      post.title?.toLowerCase().includes(query) ||
      post.description?.toLowerCase().includes(query) ||
      post.tags?.some((tag: string) => tag.toLowerCase().includes(query))
    )
  }
  
  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(post => 
      post.category === selectedCategory.value ||
      post.tags?.includes(selectedCategory.value as string)
    )
  }
  
  // Sort by date (newest first)
  return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage))

const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage
  const end = start + postsPerPage
  return filteredPosts.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  
  return pages
})

// Methods
function handleSearch(query: string) {
  searchQuery.value = query
  currentPage.value = 1
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = null
  currentPage.value = 1
}

function getCategoryTitle(slug: string) {
  return categories.find(cat => cat.slug === slug)?.title || slug
}

async function subscribeNewsletter() {
  if (!newsletterEmail.value) return
  
  isSubscribing.value = true
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // In a real app, you would send this to your newsletter service
    console.log('Newsletter subscription:', newsletterEmail.value)
    
    // Reset form
    newsletterEmail.value = ''
    
    // Show success message (you could use a toast notification here)
    alert('Thank you for subscribing to our newsletter!')
    
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    alert('There was an error subscribing to the newsletter. Please try again.')
  } finally {
    isSubscribing.value = false
  }
}

// Watch for filter changes to reset pagination
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})
</script>
