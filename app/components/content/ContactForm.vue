<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormInputGroup
        v-model="form.name"
        label="Name"
        placeholder="Your full name"
        required
        :error="errors.name"
        @blur="validateField('name')"
      />
      
      <FormInputGroup
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="your@email.com"
        required
        :error="errors.email"
        @blur="validateField('email')"
      />
    </div>
    
    <FormInputGroup
      v-model="form.subject"
      label="Subject"
      placeholder="What's this about?"
      :error="errors.subject"
    />
    
    <FormInputGroup
      v-model="form.message"
      label="Message"
      type="textarea"
      placeholder="Tell us about your project..."
      required
      :rows="6"
      :error="errors.message"
      @blur="validateField('message')"
    />
    
    <div class="flex items-start gap-3">
      <input
        id="privacy-consent"
        v-model="form.consent"
        type="checkbox"
        class="checkbox checkbox-primary mt-1"
        required
      />
      <label for="privacy-consent" class="text-sm text-base-content/80 leading-relaxed">
        I agree to the processing of my personal data and consent to being contacted regarding my inquiry.
        <span class="text-error">*</span>
      </label>
    </div>
    
    <ErrorMessage
      v-if="submitError"
      :message="submitError"
      :show="!!submitError"
      @dismiss="submitError = ''"
    />
    
    <div v-if="submitSuccess" class="alert alert-success">
      <Icon name="mdi:check-circle" size="24" />
      <div>
        <h3 class="font-bold">Message sent successfully!</h3>
        <div class="text-sm">We'll get back to you within 24 hours.</div>
      </div>
    </div>
    
    <div class="flex flex-col sm:flex-row gap-4">
      <SubmitButton
        text="Send Message"
        :loading="isSubmitting"
        loading-text="Sending..."
        type="submit"
        variant="primary"
        size="lg"
        :disabled="!isFormValid"
      />
      
      <button
        type="button"
        class="btn btn-outline"
        @click="resetForm"
        :disabled="isSubmitting"
      >
        Reset Form
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
  consent: boolean
}

const form = reactive<ContactForm>({
  name: '',
  email: '',
  subject: '',
  message: '',
  consent: false
})

const errors = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

const emit = defineEmits<{
  'submit': [form: ContactForm]
  'success': []
  'error': [error: string]
}>()

const validateField = (field: keyof typeof errors) => {
  errors[field] = ''
  
  switch (field) {
    case 'name':
      if (!form.name.trim()) {
        errors.name = 'Name is required'
      } else if (form.name.trim().length < 2) {
        errors.name = 'Name must be at least 2 characters'
      }
      break
      
    case 'email':
      if (!form.email.trim()) {
        errors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
        errors.email = 'Please enter a valid email address'
      }
      break
      
    case 'message':
      if (!form.message.trim()) {
        errors.message = 'Message is required'
      } else if (form.message.trim().length < 10) {
        errors.message = 'Message must be at least 10 characters'
      }
      break
  }
}

const validateForm = () => {
  validateField('name')
  validateField('email')
  validateField('message')
  
  return !Object.values(errors).some(error => error !== '')
}

const isFormValid = computed(() => {
  return form.name.trim() && 
         form.email.trim() && 
         form.message.trim() && 
         form.consent &&
         !Object.values(errors).some(error => error !== '')
})

const handleSubmit = async () => {
  if (!validateForm() || !form.consent) {
    return
  }
  
  isSubmitting.value = true
  submitError.value = ''
  submitSuccess.value = false
  
  try {
    // Emit the form data to parent component
    emit('submit', { ...form })
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    submitSuccess.value = true
    emit('success')
    
    // Reset form after successful submission
    setTimeout(() => {
      resetForm()
      submitSuccess.value = false
    }, 3000)
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message. Please try again.'
    submitError.value = errorMessage
    emit('error', errorMessage)
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  Object.assign(form, {
    name: '',
    email: '',
    subject: '',
    message: '',
    consent: false
  })
  
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  
  submitError.value = ''
  submitSuccess.value = false
}
</script>