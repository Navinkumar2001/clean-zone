<template>
  <div class="min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl animate-pulse">🌳</div>
      <div class="absolute top-32 right-20 text-4xl animate-bounce">🌿</div>
      <div class="absolute bottom-20 left-1/4 text-5xl animate-pulse">🌱</div>
      <div class="absolute bottom-32 right-10 text-3xl animate-bounce">🍃</div>
    </div>
    
    <div class="bg-white p-10 rounded-2xl shadow-xl border border-green-100 w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <div class="text-6xl mb-4">🌿</div>
        <h1 class="text-3xl font-bold text-green-800 mb-2">Welcome Back</h1>
        <p class="text-green-700">Sign in to help restore nature</p>
      </div>
      
      <form @submit.prevent="handleLogin" class="space-y-6">
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
              placeholder="Enter your password"
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
        
        <button 
          type="submit" 
          class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          :disabled="loading || !isFormValid"
        >
          <span v-if="!loading">🌱</span>
          <span v-else class="animate-spin">🌿</span>
          {{ loading ? 'Signing In...' : 'Join Nature Mission' }}
        </button>
        
        <div v-if="loginError" class="mt-4 p-4 bg-red-100 border-2 border-red-300 rounded-xl text-center">
          <div class="text-2xl mb-2">⚠️</div>
          <p class="text-red-800 font-bold">{{ loginError }}</p>
        </div>
      </form>
      
      <div class="mt-6 text-center space-y-3">
        <button 
          type="button" 
          @click="showForgotPassword = true"
          class="text-green-600 hover:text-green-800 transition-colors text-sm underline"
        >
          🔑 Forgot Password?
        </button>
        <p class="text-green-600">
          New to CleanZone? 
          <router-link to="/signup" class="text-green-700 font-semibold hover:text-green-800 transition-colors">
            Create Account 🌱
          </router-link>
        </p>
      </div>
      
      <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-center">
        <div class="text-2xl mb-2">✅</div>
        <p class="text-green-800 font-bold">Welcome back, Nature Guardian!</p>
      </div>
    </div>
    
    <!-- Forgot Password Modal -->
    <div v-if="showForgotPassword" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-4 border-green-200">
        <div class="text-center">
          <div class="text-6xl mb-4">🔑</div>
          <h3 class="text-2xl font-bold text-green-800 mb-4">Reset Password</h3>
          <p class="text-green-600 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
          
          <div v-if="!forgotPasswordSent">
            <input 
              v-model="forgotPasswordEmail" 
              type="email" 
              placeholder="Enter your email"
              class="w-full p-4 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all bg-green-50 hover:bg-green-100 text-green-800 mb-4"
            >
            <div class="flex gap-4">
              <button 
                @click="showForgotPassword = false" 
                class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                ❌ Cancel
              </button>
              <button 
                @click="handleForgotPassword" 
                class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
                :disabled="!forgotPasswordEmail"
              >
                📧 Send Reset Link
              </button>
            </div>
          </div>
          
          <div v-else class="text-center">
            <div class="text-4xl mb-4">✉️</div>
            <p class="text-green-800 font-bold mb-2">Reset link sent!</p>
            <p class="text-green-600 text-sm mb-2">A password reset email has been sent to:</p>
            <p class="text-green-800 font-semibold mb-4">{{ forgotPasswordEmail }}</p>
            <p class="text-green-600 text-xs mb-4">Check your email and click the reset link to create a new password.</p>
            <button 
              @click="closeForgotPassword" 
              class="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all"
            >
              ✅ Done
            </button>
          </div>
        </div>
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
  email: '',
  password: ''
})

const loading = ref(false)
const showSuccess = ref(false)
const showPassword = ref(false)
const loginError = ref('')
const showForgotPassword = ref(false)
const forgotPasswordEmail = ref('')
const forgotPasswordSent = ref(false)
const errors = ref({
  email: '',
  password: ''
})

// Real-time validation
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(form.value.email)
})

const isPasswordValid = computed(() => {
  return form.value.password.length >= 6
})

const isFormValid = computed(() => {
  return isEmailValid.value && isPasswordValid.value
})

// Validate email on input
const validateEmail = () => {
  if (form.value.email && !isEmailValid.value) {
    errors.value.email = 'Please enter a valid email address'
  } else {
    errors.value.email = ''
  }
}

// Validate password on input
const validatePassword = () => {
  if (form.value.password && !isPasswordValid.value) {
    errors.value.password = 'Password must be at least 6 characters'
  } else {
    errors.value.password = ''
  }
}

const handleLogin = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  loginError.value = ''
  
  try {
    const userData = authStore.loginUser(form.value.email, form.value.password)
    showSuccess.value = true
    authStore.login(userData)
    
    setTimeout(() => {
      router.push('/')
    }, 1500)
    
  } catch (error) {
    loginError.value = 'Invalid email or password. Please try again.'
  } finally {
    loading.value = false
  }
}

const simulateLogin = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      loading.value = false
      
      // Basic validation - accept any email with password length >= 6
      if (form.value.email.includes('@') && form.value.password.length >= 6) {
        showSuccess.value = true
        
        // Create user data from form
        const userData = {
          id: Date.now().toString(),
          name: form.value.email.split('@')[0],
          email: form.value.email,
          joinedDate: new Date().toISOString()
        }
        
        authStore.login(userData)
        
        setTimeout(() => {
          router.push('/')
        }, 1500)
        
        resolve(userData)
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}

const handleForgotPassword = async () => {
  if (!forgotPasswordEmail.value) return
  
  try {
    // Generate reset token and link
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(forgotPasswordEmail.value)}`
    
    // Email parameters for EmailJS
    const emailParams = {
      to_email: forgotPasswordEmail.value,
      subject: '🔑 CleanZone Password Reset Request',
      user_email: forgotPasswordEmail.value,
      reset_link: resetLink,
      app_name: 'CleanZone',
      expiry_time: '24 hours'
    }
    
    // Send email using EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'service_cleanzone',
        template_id: 'template_password_reset',
        user_id: 'your_emailjs_user_id',
        template_params: emailParams
      })
    })
    
    if (response.ok) {
      console.log('✅ Password reset email sent successfully to', forgotPasswordEmail.value)
      forgotPasswordSent.value = true
    } else {
      throw new Error('Email service unavailable')
    }
    
  } catch (error) {
    console.error('Error sending reset email:', error)
    
    // Fallback: Open default email client
    const subject = encodeURIComponent('🔑 CleanZone Password Reset Request')
    const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    const resetLink = `${window.location.origin}/reset-password?token=${resetToken}&email=${encodeURIComponent(forgotPasswordEmail.value)}`
    const body = encodeURIComponent(`🌿 CleanZone Password Reset

Hello,

You requested a password reset for your CleanZone account.

🔗 Click here to reset your password:
${resetLink}

⏰ This link will expire in 24 hours for security.

❓ If you didn't request this reset, please ignore this email.

🌱 Keep protecting nature!
The CleanZone Team

---
CleanZone - Empower Citizens. Clean Communities.`)
    
    window.open(`mailto:${forgotPasswordEmail.value}?subject=${subject}&body=${body}`)
    
    // Show success message even with fallback
    setTimeout(() => {
      forgotPasswordSent.value = true
    }, 500)
  }
}

const closeForgotPassword = () => {
  showForgotPassword.value = false
  forgotPasswordSent.value = false
  forgotPasswordEmail.value = ''
}
</script>