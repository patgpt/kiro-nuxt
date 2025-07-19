<template>
  <footer class="bg-neutral text-neutral-content">
    <!-- Main Footer -->
    <div class="container mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Brand Column -->
        <div>
          <div class="flex items-center gap-2 mb-4">
            <div class="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span class="text-primary-content font-bold text-lg">YD</span>
            </div>
            <span class="font-bold text-xl">Yellowdog</span>
          </div>
          <p class="mb-6 text-neutral-content/80">
            Interactive agency specializing in AI, web, mobile, and game development. We transform ideas into powerful digital experiences.
          </p>
          <div class="flex gap-3">
            <a href="https://facebook.com" class="btn btn-ghost btn-sm" aria-label="Facebook">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://instagram.com" class="btn btn-ghost btn-sm" aria-label="Instagram">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.197-2.25-1.197-3.654 0-1.404.449-2.706 1.197-3.654.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948 1.197 2.25 1.197 3.654 0 1.404-.449 2.706-1.197 3.654-.749.948-1.9 1.559-3.197 1.559zm7.138 0c-1.297 0-2.448-.611-3.197-1.559-.748-.948-1.197-2.25-1.197-3.654 0-1.404.449-2.706 1.197-3.654.749-.948 1.9-1.559 3.197-1.559s2.448.611 3.197 1.559c.748.948 1.197 2.25 1.197 3.654 0 1.404-.449 2.706-1.197 3.654-.749.948-1.9 1.559-3.197 1.559z"/>
              </svg>
            </a>
            <a href="https://linkedin.com" class="btn btn-ghost btn-sm" aria-label="LinkedIn">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
        
        <!-- Services Column -->
        <div>
          <h3 class="footer-title mb-4">Services</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/services/residential-construction" class="hover:text-primary transition-colors">Residential Construction</NuxtLink></li>
            <li><NuxtLink to="/services/commercial-construction" class="hover:text-primary transition-colors">Commercial Construction</NuxtLink></li>
            <li><NuxtLink to="/services/renovations" class="hover:text-primary transition-colors">Renovations</NuxtLink></li>
            <li><NuxtLink to="/services/project-management" class="hover:text-primary transition-colors">Project Management</NuxtLink></li>
            <li><NuxtLink to="/services" class="hover:text-primary transition-colors">All Services</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Company Column -->
        <div>
          <h3 class="footer-title mb-4">Company</h3>
          <ul class="space-y-2">
            <li><NuxtLink to="/about" class="hover:text-primary transition-colors">About Us</NuxtLink></li>
            <li><NuxtLink to="/projects" class="hover:text-primary transition-colors">Our Projects</NuxtLink></li>
            <li><NuxtLink to="/blog" class="hover:text-primary transition-colors">Blog</NuxtLink></li>
            <li><NuxtLink to="/careers" class="hover:text-primary transition-colors">Careers</NuxtLink></li>
            <li><NuxtLink to="/contact" class="hover:text-primary transition-colors">Contact</NuxtLink></li>
          </ul>
        </div>
        
        <!-- Contact Column -->
        <div>
          <h3 class="footer-title mb-4">Contact Us</h3>
          <ul class="space-y-3">
            <li class="flex items-start gap-2">
              <svg class="w-5 h-5 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>123 Construction Way<br>Portland, OR 97201</span>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <a href="tel:+15035551234" class="hover:text-primary transition-colors">(503) 555-1234</a>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <a href="mailto:info@yellowdog.com" class="hover:text-primary transition-colors">info@yellowdog.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    
    <!-- Copyright Bar -->
    <div class="bg-neutral-focus py-4">
      <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="text-sm text-neutral-content/70">
          &copy; {{ new Date().getFullYear() }} Yellow Dog Construction. All rights reserved.
        </div>
        <div class="flex gap-4 text-sm text-neutral-content/70">
          <NuxtLink to="/privacy" class="hover:text-primary transition-colors">Privacy Policy</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-primary transition-colors">Terms of Service</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>