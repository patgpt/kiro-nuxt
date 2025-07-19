<template>
  <div>
    <PageHero 
      title="Contact Us" 
      subtitle="Get in touch with our team for inquiries, quotes, or support"
      background-image="/img/contact-hero.jpg"
      :breadcrumbs="[{ name: 'Contact', path: '/contact' }]"
    />
    
    <!-- Contact Information -->
    <section class="py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Contact Form -->
          <div>
            <h2 class="text-3xl font-bold mb-6">Send Us a Message</h2>
            <p class="text-lg text-base-content/80 mb-8">
              Fill out the form below and our team will get back to you as soon as possible.
            </p>
            
            <ContactForm />
          </div>
          
          <!-- Contact Information -->
          <div>
            <h2 class="text-3xl font-bold mb-6">Contact Information</h2>
            <p class="text-lg text-base-content/80 mb-8">
              You can reach us through any of the following methods or visit our office during business hours.
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <!-- Phone -->
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200">
                <div class="card-body p-6">
                  <div class="flex items-start gap-4">
                    <div class="bg-primary/10 p-3 rounded-full">
                      <Icon name="mdi:phone" size="24" class="text-primary" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg mb-1">Phone</h3>
                      <p class="text-base-content/80 mb-2">Mon-Fri, 8am-5pm</p>
                      <a href="tel:+15035551234" class="text-primary hover:underline">(503) 555-1234</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Email -->
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200">
                <div class="card-body p-6">
                  <div class="flex items-start gap-4">
                    <div class="bg-primary/10 p-3 rounded-full">
                      <Icon name="mdi:email" size="24" class="text-primary" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg mb-1">Email</h3>
                      <p class="text-base-content/80 mb-2">24/7 Support</p>
                      <a href="mailto:info@yellowdog.com" class="text-primary hover:underline">info@yellowdog.com</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Office -->
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200">
                <div class="card-body p-6">
                  <div class="flex items-start gap-4">
                    <div class="bg-primary/10 p-3 rounded-full">
                      <Icon name="mdi:office-building" size="24" class="text-primary" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg mb-1">Office</h3>
                      <p class="text-base-content/80 mb-2">Mon-Fri, 8am-5pm</p>
                      <address class="not-italic">
                        123 Construction Way<br>
                        Portland, OR 97201
                      </address>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Social -->
              <div class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200">
                <div class="card-body p-6">
                  <div class="flex items-start gap-4">
                    <div class="bg-primary/10 p-3 rounded-full">
                      <Icon name="mdi:account-group" size="24" class="text-primary" />
                    </div>
                    <div>
                      <h3 class="font-semibold text-lg mb-1">Social Media</h3>
                      <p class="text-base-content/80 mb-2">Follow us online</p>
                      <div class="flex gap-3">
                        <SocialIcon platform="facebook" href="https://facebook.com" size="sm" />
                        <SocialIcon platform="instagram" href="https://instagram.com" size="sm" />
                        <SocialIcon platform="linkedin" href="https://linkedin.com" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Map -->
            <div class="card bg-base-100 shadow-lg overflow-hidden">
              <div class="aspect-video w-full">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178816.89644570924!2d-122.79450557858813!3d45.54348658299708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950b0b7da97427%3A0x1c36b9e6f6d18591!2sPortland%2C%20OR!5e0!3m2!1sen!2sus!4v1652892234400!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style="border:0;" 
                  allowfullscreen="false" 
                  loading="lazy" 
                  referrerpolicy="no-referrer-when-downgrade"
                  title="Yellow Dog Construction Office Location"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ Section -->
    <section class="py-16 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p class="text-lg text-base-content/70 max-w-2xl mx-auto">
            Find answers to common questions about our services and process.
          </p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-4">
            <div v-for="(faq, index) in faqs" :key="index" class="collapse collapse-plus bg-base-100 shadow-md">
              <input type="radio" name="faq-accordion" :checked="index === 0" >
              <div class="collapse-title text-xl font-semibold">
                {{ faq.question }}
              </div>
              <div class="collapse-content">
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="py-16 bg-primary text-primary-content">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
        <p class="text-xl mb-8 max-w-2xl mx-auto">
          Don't wait any longer. Contact us today and let's discuss how we can bring your construction vision to life.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:+15035551234" class="btn btn-lg bg-white text-primary hover:bg-gray-100">
            <Icon name="mdi:phone" size="20" class="mr-2" />
            Call Now
          </a>
          <a href="mailto:info@yellowdog.com" class="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary">
            <Icon name="mdi:email" size="20" class="mr-2" />
            Send Email
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SEO metadata
useHead({
  title: 'Contact Us - Yellow Dog Construction',
  meta: [
    { name: 'description', content: 'Get in touch with Yellow Dog Construction for inquiries, quotes, or support. Contact us by phone, email, or visit our Portland office.' }
  ]
})

// FAQ data
const faqs = [
  {
    question: 'How do I get a quote for my project?',
    answer: 'You can request a quote by filling out our contact form, calling us directly at (503) 555-1234, or emailing us at info@yellowdog.com. We\'ll schedule a consultation to discuss your project requirements and provide a detailed estimate.'
  },
  {
    question: 'What types of construction projects do you handle?',
    answer: 'We handle a wide range of construction projects including custom home building, commercial construction, renovations, additions, kitchen and bathroom remodeling, and specialty projects like historic restoration and sustainable building.'
  },
  {
    question: 'How long does a typical construction project take?',
    answer: 'Project timelines vary depending on the scope and complexity. A kitchen remodel might take 4-6 weeks, while a custom home could take 6-12 months. We provide detailed timelines during the planning phase and keep you updated throughout the process.'
  },
  {
    question: 'Are you licensed and insured?',
    answer: 'Yes, Yellow Dog Construction is fully licensed, bonded, and insured. We carry comprehensive liability insurance and workers\' compensation coverage to protect both our clients and our team members.'
  },
  {
    question: 'Do you provide warranties on your work?',
    answer: 'Absolutely! We stand behind our work with comprehensive warranties. Structural work comes with a 10-year warranty, while other construction elements have varying warranty periods. We\'ll provide detailed warranty information for your specific project.'
  },
  {
    question: 'Can you help with permits and inspections?',
    answer: 'Yes, we handle all necessary permits and coordinate inspections as part of our comprehensive service. Our team is familiar with local building codes and regulations, ensuring your project meets all requirements.'
  },
  {
    question: 'What is your payment schedule?',
    answer: 'We typically work with a payment schedule tied to project milestones. This usually includes an initial deposit, progress payments at key completion stages, and final payment upon project completion. We\'ll discuss the specific payment schedule during contract negotiations.'
  },
  {
    question: 'Do you offer financing options?',
    answer: 'While we don\'t directly provide financing, we can recommend trusted lending partners who specialize in construction loans and home improvement financing. We\'re happy to work with your chosen financing provider to ensure a smooth process.'
  }
]
</script>