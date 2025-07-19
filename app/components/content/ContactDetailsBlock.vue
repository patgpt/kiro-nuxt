<template>
  <div class="space-y-6">
    <!-- Contact Methods -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Phone -->
      <div class="flex items-start gap-4">
        <div class="bg-primary/10 p-3 rounded-full flex-shrink-0">
          <Icon name="mdi:phone" size="24" class="text-primary" />
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-1">Phone</h3>
          <p class="text-base-content/80 mb-2">{{ phoneHours || 'Mon-Fri, 8am-5pm' }}</p>
          <a 
            :href="`tel:${phone}`" 
            class="text-primary hover:underline font-semibold"
          >
            {{ formatPhone(phone) }}
          </a>
        </div>
      </div>
      
      <!-- Email -->
      <div class="flex items-start gap-4">
        <div class="bg-primary/10 p-3 rounded-full flex-shrink-0">
          <Icon name="mdi:email" size="24" class="text-primary" />
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-1">Email</h3>
          <p class="text-base-content/80 mb-2">{{ emailHours || '24/7 Support' }}</p>
          <a 
            :href="`mailto:${email}`" 
            class="text-primary hover:underline font-semibold break-all"
          >
            {{ email }}
          </a>
        </div>
      </div>
    </div>
    
    <!-- Address -->
    <div v-if="address" class="flex items-start gap-4">
      <div class="bg-primary/10 p-3 rounded-full flex-shrink-0">
        <Icon name="mdi:map-marker" size="24" class="text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-lg mb-1">Office Location</h3>
        <p class="text-base-content/80 mb-2">{{ officeHours || 'Mon-Fri, 8am-5pm' }}</p>
        <address class="not-italic text-base-content/90 whitespace-pre-line">{{ address }}</address>
        <a 
          v-if="mapsUrl" 
          :href="mapsUrl" 
          target="_blank" 
          rel="noopener noreferrer"
          class="text-primary hover:underline text-sm mt-2 inline-flex items-center gap-1"
        >
          <Icon name="mdi:map" size="16" />
          View on Maps
        </a>
      </div>
    </div>
    
    <!-- Social Media -->
    <div v-if="socialLinks && socialLinks.length > 0" class="flex items-start gap-4">
      <div class="bg-primary/10 p-3 rounded-full flex-shrink-0">
        <Icon name="mdi:account-group" size="24" class="text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-lg mb-1">Follow Us</h3>
        <p class="text-base-content/80 mb-3">Stay connected on social media</p>
        <div class="flex gap-3">
          <SocialIcon 
            v-for="social in socialLinks" 
            :key="social.platform"
            :platform="social.platform"
            :href="social.url"
            size="md"
            variant="ghost"
          />
        </div>
      </div>
    </div>
    
    <!-- Business Hours -->
    <div v-if="businessHours" class="flex items-start gap-4">
      <div class="bg-primary/10 p-3 rounded-full flex-shrink-0">
        <Icon name="mdi:clock" size="24" class="text-primary" />
      </div>
      <div>
        <h3 class="font-semibold text-lg mb-1">Business Hours</h3>
        <div class="space-y-1 text-base-content/90">
          <div v-for="(hours, day) in businessHours" :key="day" class="flex justify-between gap-4">
            <span class="font-semibold">{{ day }}:</span>
            <span>{{ hours }}</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Emergency Contact -->
    <div v-if="emergencyPhone" class="bg-error/10 border border-error/20 rounded-lg p-4">
      <div class="flex items-start gap-4">
        <div class="bg-error/20 p-2 rounded-full flex-shrink-0">
          <Icon name="mdi:phone-alert" size="20" class="text-error" />
        </div>
        <div>
          <h3 class="font-semibold text-lg mb-1 text-error">Emergency Contact</h3>
          <p class="text-base-content/80 mb-2">For urgent construction emergencies</p>
          <a 
            :href="`tel:${emergencyPhone}`" 
            class="text-error hover:underline font-semibold"
          >
            {{ formatPhone(emergencyPhone) }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SocialLink {
  platform: string
  url: string
}

interface BusinessHours {
  [key: string]: string
}

interface Props {
  phone: string
  email: string
  address?: string
  phoneHours?: string
  emailHours?: string
  officeHours?: string
  mapsUrl?: string
  socialLinks?: SocialLink[]
  businessHours?: BusinessHours
  emergencyPhone?: string
}

defineProps<Props>()

// Format phone number for display
function formatPhone(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`
  }
  
  // Return original if not a standard format
  return phone
}

// Format address with line breaks
function formatAddress(address: string): string {
  return address.replace(/\n/g, '<br>')
}
</script>