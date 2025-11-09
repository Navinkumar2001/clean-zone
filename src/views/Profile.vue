<template>
  <div class="py-10 min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl animate-pulse">🌳</div>
      <div class="absolute top-32 right-20 text-4xl animate-bounce">🌿</div>
      <div class="absolute bottom-20 left-1/4 text-5xl animate-pulse">🌱</div>
      <div class="absolute bottom-32 right-10 text-3xl animate-bounce">🍃</div>
    </div>
    
    <div class="max-w-2xl mx-auto px-5 relative z-10">
      <div class="text-center mb-10">
        <div class="text-6xl mb-4">👤</div>
        <h1 class="text-4xl font-bold text-green-800 mb-2">My Profile</h1>
        <p class="text-green-700 text-lg">Manage your nature guardian account</p>
      </div>
      
      <div class="bg-white p-10 rounded-2xl shadow-xl border border-green-100">
        <form @submit.prevent="handleUpdate" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-2 font-semibold text-green-700">👤 Full Name</label>
              <input 
                v-model="form.name" 
                type="text" 
                required 
                :class="[
                  'w-full p-4 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
                  errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
                ]"
                placeholder="Your full name"
                @input="validateName"
              >
              <p v-if="errors.name" class="text-red-500 text-sm mt-1">⚠️ {{ errors.name }}</p>
            </div>
            
            <div>
              <label class="block mb-2 font-semibold text-green-700">📧 Email</label>
              <input 
                v-model="form.email" 
                type="email" 
                required 
                :class="[
                  'w-full p-4 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
                  errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
                ]"
                placeholder="your@email.com"
                @input="validateEmail"
              >
              <p v-if="errors.email" class="text-red-500 text-sm mt-1">⚠️ {{ errors.email }}</p>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-2 font-semibold text-green-700">📱 Phone Number</label>
              <input 
                v-model="form.phone" 
                type="tel" 
                :class="[
                  'w-full p-4 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-green-50 hover:bg-green-100 text-green-800',
                  errors.phone ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
                ]"
                placeholder="+1 (555) 123-4567"
                @input="validatePhone"
              >
              <p v-if="errors.phone" class="text-red-500 text-sm mt-1">⚠️ {{ errors.phone }}</p>
            </div>
            
            <div class="relative">
              <label class="block mb-2 font-semibold text-green-700">🏛️ State</label>
              <input 
                v-model="stateInput" 
                @input="handleStateInput"
                @focus="showStateDropdown = true"
                @blur="handleStateBlur"
                type="text" 
                class="w-full p-4 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all bg-green-50 hover:bg-green-100 text-green-800"
                placeholder="Search or select state"
                autocomplete="off"
              >
              <div v-if="showStateDropdown && filteredStates.length > 0" class="absolute z-10 w-full mt-1 bg-white border-2 border-green-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                <div 
                  v-for="state in filteredStates" 
                  :key="state"
                  @click="selectState(state)"
                  class="px-4 py-3 hover:bg-green-50 cursor-pointer text-green-800 border-b border-green-100 last:border-b-0"
                >
                  {{ state }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block mb-2 font-semibold text-green-700">🏙️ City</label>
              <input 
                v-model="form.city" 
                type="text" 
                class="w-full p-4 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all bg-green-50 hover:bg-green-100 text-green-800"
                placeholder="Your city"
              >
            </div>
            
            <div>
              <label class="block mb-2 font-semibold text-green-700">📅 Member Since</label>
              <input 
                :value="formatDate(authStore.user?.joinedDate || new Date().toISOString())"
                type="text" 
                disabled
                class="w-full p-4 border-2 border-gray-200 rounded-xl text-base bg-gray-100 text-gray-600 cursor-not-allowed"
              >
            </div>
          </div>
          
          <div>
            <label class="block mb-2 font-semibold text-green-700">🏠 Address</label>
            <textarea 
              v-model="form.address" 
              rows="3"
              class="w-full p-4 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all bg-green-50 hover:bg-green-100 text-green-800 resize-none"
              placeholder="Your full address"
            ></textarea>
          </div>
          
          <!-- Change Password Section -->
          <div class="border-t border-green-200 pt-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-green-700 flex items-center gap-2">
                🔒 Security Settings
              </h3>
              <button 
                type="button" 
                @click="showChangePassword = !showChangePassword"
                class="bg-green-100 text-green-700 px-4 py-2 rounded-xl font-medium hover:bg-green-200 transition-colors"
              >
                {{ showChangePassword ? '❌ Cancel' : '🔑 Change Password' }}
              </button>
            </div>
            
            <div v-if="showChangePassword" class="space-y-4 bg-green-50 p-6 rounded-xl border border-green-200">
              <div>
                <label class="block mb-2 font-semibold text-green-700">🔒 Current Password</label>
                <div class="relative">
                  <input 
                    v-model="passwordForm.currentPassword" 
                    @input="validateCurrentPassword"
                    :type="showCurrentPassword ? 'text' : 'password'" 
                    required 
                    :class="[
                      'w-full p-4 pr-12 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-white text-green-800',
                      passwordErrors.currentPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
                    ]"
                    placeholder="Enter current password"
                  >
                  <button 
                    type="button" 
                    @click="showCurrentPassword = !showCurrentPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors"
                  >
                    {{ showCurrentPassword ? '🙈' : '👁️' }}
                  </button>
                </div>
                <p v-if="passwordErrors.currentPassword" class="text-red-500 text-sm mt-1">⚠️ {{ passwordErrors.currentPassword }}</p>
              </div>
              
              <div>
                <label class="block mb-2 font-semibold text-green-700">🆕 New Password</label>
                <div class="relative">
                  <input 
                    v-model="passwordForm.newPassword" 
                    @input="validateNewPassword"
                    :type="showNewPassword ? 'text' : 'password'" 
                    required 
                    :class="[
                      'w-full p-4 pr-12 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-white text-green-800',
                      passwordErrors.newPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
                    ]"
                    placeholder="Enter new password"
                  >
                  <button 
                    type="button" 
                    @click="showNewPassword = !showNewPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors"
                  >
                    {{ showNewPassword ? '🙈' : '👁️' }}
                  </button>
                </div>
                <p v-if="passwordErrors.newPassword" class="text-red-500 text-sm mt-1">⚠️ {{ passwordErrors.newPassword }}</p>
              </div>
              
              <div>
                <label class="block mb-2 font-semibold text-green-700">✅ Confirm New Password</label>
                <div class="relative">
                  <input 
                    v-model="passwordForm.confirmNewPassword" 
                    @input="validateConfirmNewPassword"
                    :type="showConfirmNewPassword ? 'text' : 'password'" 
                    required 
                    :class="[
                      'w-full p-4 pr-12 border-2 rounded-xl text-base focus:outline-none focus:ring-2 transition-all bg-white text-green-800',
                      passwordErrors.confirmNewPassword ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : 'border-green-200 focus:border-green-600 focus:ring-green-100'
                    ]"
                    placeholder="Confirm new password"
                  >
                  <button 
                    type="button" 
                    @click="showConfirmNewPassword = !showConfirmNewPassword"
                    class="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-800 transition-colors"
                  >
                    {{ showConfirmNewPassword ? '🙈' : '👁️' }}
                  </button>
                </div>
                <p v-if="passwordErrors.confirmNewPassword" class="text-red-500 text-sm mt-1">⚠️ {{ passwordErrors.confirmNewPassword }}</p>
              </div>
              
              <div class="flex gap-4 pt-2">
                <button 
                  type="button" 
                  @click="handleChangePassword"
                  class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  :disabled="passwordLoading || !isPasswordFormValid"
                >
                  <span v-if="!passwordLoading">🔒</span>
                  <span v-else class="animate-spin">🌿</span>
                  {{ passwordLoading ? 'Updating...' : 'Update Password' }}
                </button>
                
                <button 
                  type="button" 
                  @click="cancelPasswordChange"
                  class="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          </div>
          
          <div class="flex gap-4 pt-4">
            <button 
              type="submit" 
              class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              :disabled="loading || !isFormValid"
            >
              <span v-if="!loading">💾</span>
              <span v-else class="animate-spin">🌿</span>
              {{ loading ? 'Updating...' : 'Update Profile' }}
            </button>
            
            <button 
              type="button" 
              @click="resetForm"
              class="px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
            >
              🔄 Reset
            </button>
          </div>
        </form>
        
        <div v-if="showSuccess" class="mt-6 p-4 bg-green-100 border-2 border-green-300 rounded-xl text-center">
          <div class="text-2xl mb-2">✅</div>
          <p class="text-green-800 font-bold">Profile updated successfully!</p>
        </div>
        
        <div v-if="passwordSuccess" class="mt-6 p-4 bg-blue-100 border-2 border-blue-300 rounded-xl text-center">
          <div class="text-2xl mb-2">🔒</div>
          <p class="text-blue-800 font-bold">Password changed successfully!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
]

const form = ref({
  name: '',
  email: '',
  phone: '',
  state: '',
  city: '',
  address: ''
})

const loading = ref(false)
const showSuccess = ref(false)
const showStateDropdown = ref(false)
const stateInput = ref('')
const showChangePassword = ref(false)
const passwordLoading = ref(false)
const passwordSuccess = ref(false)
const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmNewPassword = ref(false)
const errors = ref({
  name: '',
  email: '',
  phone: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const passwordErrors = ref({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
})

const filteredStates = computed(() => {
  if (!stateInput.value) return indianStates
  return indianStates.filter(state => 
    state.toLowerCase().includes(stateInput.value.toLowerCase())
  )
})

// Validation
const isNameValid = computed(() => form.value.name.trim().length >= 2)
const isEmailValid = computed(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email))
const isPhoneValid = computed(() => !form.value.phone || /^[\+]?[1-9][\d]{0,15}$/.test(form.value.phone.replace(/\D/g, '')))
const isFormValid = computed(() => isNameValid.value && isEmailValid.value && isPhoneValid.value)

const validateName = () => {
  errors.value.name = form.value.name && !isNameValid.value ? 'Name must be at least 2 characters' : ''
}

const validateEmail = () => {
  errors.value.email = form.value.email && !isEmailValid.value ? 'Please enter a valid email address' : ''
}

const validatePhone = () => {
  errors.value.phone = form.value.phone && !isPhoneValid.value ? 'Please enter a valid phone number' : ''
}

const selectState = (state: string) => {
  form.value.state = state
  stateInput.value = state
  showStateDropdown.value = false
}

const handleStateInput = () => {
  form.value.state = stateInput.value
  showStateDropdown.value = true
}

const handleStateBlur = () => {
  setTimeout(() => {
    showStateDropdown.value = false
  }, 200)
}

// Password validation
const isCurrentPasswordValid = computed(() => passwordForm.value.currentPassword.length >= 6)
const isNewPasswordValid = computed(() => passwordForm.value.newPassword.length >= 6)
const isConfirmNewPasswordValid = computed(() => 
  passwordForm.value.confirmNewPassword === passwordForm.value.newPassword && 
  passwordForm.value.confirmNewPassword.length > 0
)
const isPasswordFormValid = computed(() => 
  isCurrentPasswordValid.value && isNewPasswordValid.value && isConfirmNewPasswordValid.value
)

const validateCurrentPassword = () => {
  passwordErrors.value.currentPassword = passwordForm.value.currentPassword && !isCurrentPasswordValid.value ? 
    'Current password must be at least 6 characters' : ''
}

const validateNewPassword = () => {
  passwordErrors.value.newPassword = passwordForm.value.newPassword && !isNewPasswordValid.value ? 
    'New password must be at least 6 characters' : ''
}

const validateConfirmNewPassword = () => {
  passwordErrors.value.confirmNewPassword = passwordForm.value.confirmNewPassword && !isConfirmNewPasswordValid.value ? 
    'Passwords do not match' : ''
}

const handleChangePassword = async () => {
  if (!isPasswordFormValid.value) return
  
  passwordLoading.value = true
  
  setTimeout(() => {
    passwordLoading.value = false
    passwordSuccess.value = true
    passwordForm.value = { currentPassword: '', newPassword: '', confirmNewPassword: '' }
    showChangePassword.value = false
    
    setTimeout(() => {
      passwordSuccess.value = false
    }, 3000)
  }, 1000)
}

const cancelPasswordChange = () => {
  passwordForm.value = { currentPassword: '', newPassword: '', confirmNewPassword: '' }
  passwordErrors.value = { currentPassword: '', newPassword: '', confirmNewPassword: '' }
  showChangePassword.value = false
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const resetForm = () => {
  if (authStore.user) {
    form.value = {
      name: authStore.user.name,
      email: authStore.user.email,
      phone: authStore.user.phone || '',
      state: authStore.user.state || '',
      city: authStore.user.city || '',
      address: authStore.user.address || ''
    }
    stateInput.value = authStore.user.state || ''
  }
}

const handleUpdate = async () => {
  if (!isFormValid.value) return
  
  loading.value = true
  
  setTimeout(() => {
    authStore.updateUser({
      name: form.value.name,
      email: form.value.email,
      phone: form.value.phone,
      state: form.value.state,
      city: form.value.city,
      address: form.value.address
    })
    
    loading.value = false
    showSuccess.value = true
    
    setTimeout(() => {
      showSuccess.value = false
    }, 3000)
  }, 1000)
}

onMounted(() => {
  resetForm()
})
</script>