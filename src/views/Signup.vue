<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 flex items-center justify-center relative overflow-hidden py-10">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl animate-pulse">🌳</div>
      <div class="absolute top-32 right-20 text-4xl animate-bounce">🌿</div>
      <div class="absolute bottom-20 left-1/4 text-5xl animate-pulse">🌱</div>
      <div class="absolute bottom-32 right-10 text-3xl animate-bounce">🍃</div>
    </div>
    
    <div class="bg-white p-10 rounded-2xl shadow-xl border border-green-100 w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <div class="text-6xl mb-4">🌱</div>
        <h1 class="text-3xl font-bold text-green-800 mb-2">Join CleanZone</h1>
        <p class="text-green-700">Become a nature guardian today</p>
      </div>
      
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label class="block mb-2 font-semibold text-green-700">👤 Full Name</label>
          <input 
            v-model="form.name" 
            @input="validateName"
            type="text" 
            required 
            :class="[
              'w-full p-4 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
              errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
            ]"
            placeholder="Your full name"
          >
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">⚠️ {{ errors.name }}</p>
        </div>
        
        <div>
          <label class="block mb-2 font-semibold text-green-700">📧 Email</label>
          <input 
            v-model="form.email" 
            @input="validateEmail"
            type="email" 
            required 
            :class="[
              'w-full p-4 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
              errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
            ]"
            placeholder="your@email.com"
          >
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">⚠️ {{ errors.email }}</p>
        </div>
        
        <div>
          <label class="block mb-2 font-semibold text-green-700">🔒 Password</label>
          <div class="relative">
            <input 
              v-model="form.password" 
              @input="validatePassword"
              :type="showPassword ? 'text' : 'password'" 
              required 
              :class="[
                'w-full p-4 pr-12 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
                errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
              ]"
              placeholder="Create a strong password"
            >
            <button 
              type="button" 
              @click="showPassword = !showPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors"
            >
              {{ showPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">⚠️ {{ errors.password }}</p>
        </div>
        
        <div>
          <label class="block mb-2 font-semibold text-green-700">🔒 Confirm Password</label>
          <div class="relative">
            <input 
              v-model="form.confirmPassword" 
              @input="validateConfirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'" 
              required 
              :class="[
                'w-full p-4 pr-12 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
                errors.confirmPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
              ]"
              placeholder="Confirm your password"
            >
            <button 
              type="button" 
              @click="showConfirmPassword = !showConfirmPassword"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors"
            >
              {{ showConfirmPassword ? '🙈' : '👁️' }}
            </button>
          </div>
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">⚠️ {{ errors.confirmPassword }}</p>
        </div>
        
        <div class="flex items-center gap-3">
          <input 
            v-model="form.agreeTerms" 
            type="checkbox" 
            required 
            class="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-green-500"
          >
          <label class="text-sm text-green-700">
            I agree to help protect the environment and follow community guidelines 🌍
          </label>
        </div>
        
        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          :disabled="loading || !isFormValid"
        >
          <span v-if="!loading">🌱</span>
          <span v-else class="animate-spin">🌿</span>
          {{ loading ? 'Creating Account...' : 'Start Nature Mission' }}
        </button>
      </form>
      
      <div class="mt-6 text-center">
        <p class="text-green-600">
          Already have an account? 
          <router-link to="/login" class="text-green-700 font-semibold hover:text-green-800 transition-colors">
            Sign In 🌿
          </router-link>
        </p>
      </div>
      
      <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-center">
        <div class="text-2xl mb-2">🎉</div>
        <p class="text-green-800 font-bold">Welcome to the Nature Guardian community!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
})

const loading = ref(false)
const showSuccess = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const errors = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Real-time validation
const isNameValid = computed(() => {
  return form.value.name.trim().length >= 2
})

const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(form.value.email)
})

const isPasswordValid = computed(() => {
  return form.value.password.length >= 6
})

const isConfirmPasswordValid = computed(() => {
  return form.value.confirmPassword === form.value.password && form.value.confirmPassword.length > 0
})

const isFormValid = computed(() => {
  const hasAllFields = form.value.name.trim().length > 0 &&
                      form.value.email.trim().length > 0 &&
                      form.value.password.length > 0 &&
                      form.value.confirmPassword.length > 0 &&
                      form.value.agreeTerms
  
  const allValidationsPass = isNameValid.value && 
                            isEmailValid.value && 
                            isPasswordValid.value && 
                            isConfirmPasswordValid.value
  
  return hasAllFields && allValidationsPass
})

// Validation functions
const validateName = () => {
  if (form.value.name && !isNameValid.value) {
    errors.value.name = 'Name must be at least 2 characters'
  } else {
    errors.value.name = ''
  }
}

const validateEmail = () => {
  if (form.value.email && !isEmailValid.value) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = ''
  }
}

const validatePassword = () => {
  if (form.value.password && !isPasswordValid.value) {
    errors.value.password = 'Password must be at least 6 characters'
  } else {
    errors.value.password = ''
  }
}

const validateConfirmPassword = () => {
  if (form.value.confirmPassword && !isConfirmPasswordValid.value) {
    errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = ''
  }
}

const handleSignup = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  
  try {
    const userData = authStore.signupUser(form.value.name, form.value.email, form.value.password)
    showSuccess.value = true
    authStore.login(userData)
    
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
    
  } catch (error: any) {
    console.error('Signup error:', error.message)
    // You can add error display here if needed
  } finally {
    loading.value = false
  }
}
</script>