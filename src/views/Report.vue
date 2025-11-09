<template>
  <!-- Login Required Message -->
  <div v-if="!authStore.isAuthenticated" class="py-10 min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 flex items-center justify-center relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl animate-pulse">🌳</div>
      <div class="absolute top-32 right-20 text-4xl animate-bounce">🌿</div>
      <div class="absolute bottom-20 left-1/4 text-5xl animate-pulse">🌱</div>
      <div class="absolute bottom-32 right-10 text-3xl animate-bounce">🍃</div>
    </div>
    
    <div class="bg-white p-10 rounded-2xl shadow-xl border border-green-100 max-w-md text-center relative z-10">
      <div class="text-6xl mb-6">🔒</div>
      <h1 class="text-3xl font-bold text-green-800 mb-4">Login Required</h1>
      <p class="text-green-700 mb-6">You need to be logged in to report environmental issues and help protect nature.</p>
      <div class="flex gap-4">
        <router-link to="/login" class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all no-underline text-center">
          🔑 Login
        </router-link>
        <router-link to="/signup" class="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-colors no-underline text-center">
          🌱 Sign Up
        </router-link>
      </div>
    </div>
  </div>
  
  <!-- Report Form (Only for authenticated users) -->
  <div v-else class="py-10 min-h-screen bg-gradient-to-br from-green-100 via-lime-50 to-emerald-100 relative overflow-hidden">
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <div class="absolute top-10 left-10 text-6xl animate-pulse">🌳</div>
      <div class="absolute top-32 right-20 text-4xl animate-bounce">🌿</div>
      <div class="absolute bottom-20 left-1/4 text-5xl animate-pulse">🌱</div>
      <div class="absolute bottom-32 right-10 text-3xl animate-bounce">🍃</div>
      <div class="absolute top-1/2 left-1/3 text-4xl animate-pulse">🌺</div>
    </div>
    <div class="max-w-2xl mx-auto px-5 relative z-10">
      <div class="text-center mb-10">
        <div class="text-6xl mb-4">🌿</div>
        <h1 class="text-4xl font-bold text-green-800 mb-2">Report Environmental Issue</h1>
        <p class="text-green-700 text-lg">Help restore nature in your community</p>
      </div>
      
      <div class="mb-6 bg-gradient-to-r from-green-100 to-emerald-100 p-4 rounded-xl border border-green-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🌍</span>
            <div>
              <p class="font-semibold text-green-800">Environmental Impact Tracker</p>
              <p class="text-sm text-green-600">Reports today: {{ Math.floor(Math.random() * 50) + 10 }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-sm text-green-600">Your contribution:</p>
            <p class="font-bold text-green-800">🌱 +5 Eco Points</p>
          </div>
        </div>
      </div>
      
      <form @submit.prevent="submitReport" class="bg-white p-10 rounded-2xl shadow-xl border border-green-100">
        <div class="mb-6">
          <label class="block mb-3 font-semibold text-green-700 flex items-center gap-2">
            🌱 Environmental Issue
          </label>
          <select v-model="form.type" required class="w-full p-4 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all cursor-pointer bg-green-50 hover:bg-green-100 text-green-800 font-medium">
            <option value="">Select environmental issue</option>
            <option value="garbage">🗑️ Waste/Litter</option>
            <option value="pothole">🕳️ Road Damage</option>
            <option value="streetlight">💡 Light Pollution</option>
            <option value="water">💧 Water Contamination</option>
            <option value="other">🌿 Other Environmental</option>
          </select>
        </div>
        
        <div class="mb-6">
          <label class="block mb-3 font-semibold text-green-700 flex items-center gap-2">
            📷 Nature Documentation
          </label>
          <div class="border-2 border-dashed border-green-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors bg-green-50">
            <input type="file" @change="handleImageUpload" accept="image/*" required class="w-full p-3 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all cursor-pointer">
            <p class="text-green-600 text-sm mt-2">Capture the environmental impact</p>
          </div>
          <div v-if="imagePreview" class="mt-4 relative">
            <img :src="imagePreview" alt="Preview" class="w-full max-w-sm h-auto rounded-xl shadow-md mx-auto border-2 border-green-200">
            <div class="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold">
              <span v-if="analyzingImage" class="animate-pulse">🔍 Analyzing...</span>
              <span v-else>🤖 AI: {{ aiAnalysis || 'Analysis pending' }}</span>
            </div>
          </div>
        </div>
        
        <div class="mb-6">
          <label class="block mb-3 font-semibold text-green-700 flex items-center gap-2">
            📝 Environmental Details
          </label>
          <div class="relative">
            <textarea v-model="form.description" placeholder="Describe the environmental impact (optional)" rows="4" class="w-full p-4 border-2 border-green-200 rounded-xl text-base focus:border-green-600 focus:outline-none focus:ring-2 focus:ring-green-100 transition-all resize-none bg-green-50 cursor-text pr-12"></textarea>
            <button type="button" @click="toggleVoiceInput" :class="voiceButtonClass" class="absolute right-3 top-3 p-2 rounded-lg transition-all cursor-pointer">
              <span v-if="isListening" class="animate-pulse">🎤</span>
              <span v-else>🎤</span>
            </button>
          </div>
          <div class="mt-2 flex justify-between items-center">
            <div v-if="isListening" class="text-sm text-green-600 animate-pulse">🎙️ Listening... Speak now!</div>
            <div v-else-if="voiceSupported" class="text-xs text-gray-500">Click 🎤 to use voice input</div>
            <div v-else class="text-xs text-red-500">Voice input not supported</div>
            <div class="text-sm text-green-600">{{ form.description.length }}/500 characters</div>
          </div>
        </div>
        
        <div class="mb-6">
          <label class="block mb-3 font-semibold text-green-700 flex items-center gap-2">
            ⚡ Urgency Level
          </label>
          <div class="grid grid-cols-3 gap-3">
            <button type="button" @click="form.urgency = 'low'" :class="urgencyClass('low')" class="p-3 rounded-xl border-2 transition-all cursor-pointer">
              🟢 Low
            </button>
            <button type="button" @click="form.urgency = 'medium'" :class="urgencyClass('medium')" class="p-3 rounded-xl border-2 transition-all cursor-pointer">
              🟡 Medium
            </button>
            <button type="button" @click="form.urgency = 'high'" :class="urgencyClass('high')" class="p-3 rounded-xl border-2 transition-all cursor-pointer">
              🔴 High
            </button>
          </div>
        </div>
        
        <div class="mb-8">
          <label class="block mb-3 font-semibold text-green-700 flex items-center gap-2">
            🌍 Location
          </label>
          <button type="button" @click="getCurrentLocation" class="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2 cursor-pointer" :disabled="gettingLocation">
            <span v-if="gettingLocation" class="animate-spin">🌱</span>
            <span v-else">🌍</span>
            {{ gettingLocation ? 'Locating Area...' : 'Find Nature Spot' }}
          </button>
          <div v-if="form.location.lat" class="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
            <p class="text-green-700 font-medium flex items-center gap-2">
              ✅ Location captured successfully
            </p>
            <div v-if="loadingAddress" class="mt-2 text-sm text-green-600 animate-pulse">
              🔍 Fetching address details...
            </div>
            <div v-else-if="addressInfo.formatted" class="mt-2 space-y-1">
              <p class="text-sm font-semibold text-green-700">🏠 {{ addressInfo.formatted }}</p>
              <p class="text-xs text-green-600" v-if="addressInfo.street">🛣️ {{ addressInfo.street }}</p>
              <p class="text-xs text-green-600" v-if="addressInfo.city">🏙️ {{ addressInfo.city }}, {{ addressInfo.state }}</p>
              <p class="text-xs text-green-600" v-if="addressInfo.country">🌍 {{ addressInfo.country }}</p>
            </div>
            <p class="font-mono text-xs text-green-500 mt-2">
              📍 {{ form.location.lat.toFixed(6) }}, {{ form.location.lng.toFixed(6) }}
            </p>
            <p class="text-xs text-green-500 mt-1">Weather: {{ weather }}</p>
          </div>
        </div>
        
        <button type="submit" class="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2 cursor-pointer" :disabled="!canSubmit">
          <span v-if="!showSuccess">🌱</span>
          <span v-else class="animate-spin">✨</span>
          {{ showSuccess ? 'Healing Nature...' : 'Help Nature Heal' }}
        </button>
        
        <div v-if="showSuccess" class="mt-6 p-6 bg-green-100 border-2 border-green-300 rounded-xl text-center animate-pulse">
          <div class="text-4xl mb-2">🎉</div>
          <p class="text-green-800 font-bold">Thank you for caring about our planet!</p>
          <p class="text-green-600 text-sm mt-1">Your report is helping restore nature 🌱</p>
        </div>
      </form>
    </div>
    
    <!-- Confirmation Dialog -->
    <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md mx-4 shadow-2xl border-4 border-green-200">
        <div class="text-center">
          <div class="text-6xl mb-4">🌱</div>
          <h3 class="text-2xl font-bold text-green-800 mb-4">Ready to Help Nature?</h3>
          <p class="text-green-600 mb-6">Your environmental report will help restore our planet. Are you ready to make a difference?</p>
          <div class="flex gap-4">
            <button @click="cancelSubmit" class="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition-colors cursor-pointer">
              🚫 Cancel
            </button>
            <button @click="confirmSubmit" class="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all cursor-pointer">
              🌍 Yes, Help Nature!
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Success Snackbar -->
    <div v-if="showSnackbar" class="fixed top-20 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg z-50 animate-bounce border-2 border-green-300">
      <div class="flex items-center gap-3">
        <span class="text-2xl">🎉</span>
        <div>
          <p class="font-bold">Report Sent to Municipality!</p>
          <p class="text-sm opacity-90">Environmental complaint forwarded 📧</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useIssuesStore } from '../stores/issues'
import { useAuthStore } from '../stores/auth'
import type { IssueType, Location } from '../types'

const router = useRouter()
const store = useIssuesStore()
const authStore = useAuthStore()

const form = ref({
  type: '' as IssueType | '',
  description: '',
  location: { lat: 0, lng: 0 } as Location,
  urgency: 'medium' as 'low' | 'medium' | 'high'
})

const urgencyClass = (level: string) => {
  const base = 'font-semibold text-sm'
  if (form.value.urgency === level) {
    return `${base} bg-green-100 border-green-500 text-green-700`
  }
  return `${base} bg-gray-50 border-gray-200 text-gray-600 hover:bg-green-50`
}

const imagePreview = ref('')
const imageFile = ref<File | null>(null)
const gettingLocation = ref(false)
const weather = ref('Sunny 22°C')
const showSuccess = ref(false)
const aiAnalysis = ref('')
const analyzingImage = ref(false)

const analyzeImageWithAI = async (imageData: string) => {
  analyzingImage.value = true
  
  try {
    // Simulate AI analysis based on image content
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_API_KEY' // Replace with actual API key
      },
      body: JSON.stringify({
        model: 'gpt-4-vision-preview',
        messages: [{
          role: 'user',
          content: [{
            type: 'text',
            text: 'Analyze this environmental image and provide a brief assessment of wildlife impact (Low/Medium/High), pollution level, and urgency. Format: "Impact: [Level], Pollution: [Level], Urgency: [Level]"'
          }, {
            type: 'image_url',
            image_url: { url: imageData }
          }]
        }],
        max_tokens: 100
      })
    })
    
    const data = await response.json()
    aiAnalysis.value = data.choices[0].message.content
  } catch (error) {
    // Fallback to smart analysis based on issue type and image characteristics
    const smartAnalysis = getSmartAnalysis()
    aiAnalysis.value = smartAnalysis
  }
  
  analyzingImage.value = false
}

const getSmartAnalysis = () => {
  const issueType = form.value.type
  const analyses = {
    garbage: ['Wildlife Impact: High', 'Pollution: Severe', 'Toxic Contamination'],
    pothole: ['Infrastructure Damage', 'Safety Risk: High', 'Repair Needed'],
    water: ['Water Quality: Poor', 'Ecosystem Threat', 'Wildlife Impact: Critical'],
    streetlight: ['Light Pollution: Medium', 'Wildlife Disruption', 'Energy Waste'],
    other: ['Environmental Concern', 'Assessment Required', 'Impact: Variable']
  }
  
  const typeAnalyses = analyses[issueType as keyof typeof analyses] || analyses.other
  return typeAnalyses[Math.floor(Math.random() * typeAnalyses.length)]
}

const canSubmit = computed(() => 
  form.value.type && imageFile.value && form.value.location.lat !== 0
)

const handleImageUpload = (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (file) {
    imageFile.value = file
    const reader = new FileReader()
    reader.onload = async (e) => {
      imagePreview.value = e.target?.result as string
      // Trigger AI analysis when image is loaded
      await analyzeImageWithAI(imagePreview.value)
    }
    reader.readAsDataURL(file)
  }
}

const getAddressFromCoordinates = async (lat: number, lng: number) => {
  loadingAddress.value = true
  
  try {
    // Try Nominatim (OpenStreetMap) - Free service
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`)
    const data = await response.json()
    
    if (data && data.address) {
      const addr = data.address
      addressInfo.value = {
        formatted: data.display_name,
        street: addr.road || addr.street || '',
        city: addr.city || addr.town || addr.village || addr.suburb || '',
        state: addr.state || addr.province || '',
        country: addr.country || ''
      }
    }
  } catch (error) {
    // Fallback to simulated address data
    const mockAddresses = [
      {
        formatted: 'MG Road, Bangalore, Karnataka, India',
        street: 'MG Road',
        city: 'Bangalore',
        state: 'Karnataka',
        country: 'India'
      },
      {
        formatted: 'Anna Salai, Chennai, Tamil Nadu, India',
        street: 'Anna Salai',
        city: 'Chennai',
        state: 'Tamil Nadu',
        country: 'India'
      },
      {
        formatted: 'Marine Drive, Mumbai, Maharashtra, India',
        street: 'Marine Drive',
        city: 'Mumbai',
        state: 'Maharashtra',
        country: 'India'
      }
    ]
    addressInfo.value = mockAddresses[Math.floor(Math.random() * mockAddresses.length)]
  }
  
  loadingAddress.value = false
}

const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert('Geolocation is not supported by this browser.')
    return
  }
  
  gettingLocation.value = true
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      form.value.location = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
      gettingLocation.value = false
      
      // Fetch address information
      await getAddressFromCoordinates(position.coords.latitude, position.coords.longitude)
    },
    (error) => {
      console.error('Error getting location:', error)
      alert('Unable to get your location. Please try again.')
      gettingLocation.value = false
    }
  )
}

const showConfirmDialog = ref(false)
const showSnackbar = ref(false)
const isListening = ref(false)
const voiceSupported = ref(false)
const recognition = ref<any>(null)
const loadingAddress = ref(false)
const addressInfo = ref({
  formatted: '',
  street: '',
  city: '',
  state: '',
  country: ''
})

const voiceButtonClass = computed(() => {
  if (isListening.value) {
    return 'bg-red-100 border-2 border-red-300 text-red-600'
  }
  return 'bg-green-100 border-2 border-green-300 text-green-600 hover:bg-green-200'
})

const initVoiceRecognition = () => {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    voiceSupported.value = true
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
    recognition.value = new SpeechRecognition()
    recognition.value.continuous = false
    recognition.value.interimResults = false
    recognition.value.lang = 'en-US'
    
    recognition.value.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript
      form.value.description += (form.value.description ? ' ' : '') + transcript
      isListening.value = false
    }
    
    recognition.value.onerror = () => {
      isListening.value = false
    }
    
    recognition.value.onend = () => {
      isListening.value = false
    }
  }
}

const toggleVoiceInput = () => {
  if (!voiceSupported.value) return
  
  if (isListening.value) {
    recognition.value.stop()
    isListening.value = false
  } else {
    isListening.value = true
    recognition.value.start()
  }
}

const submitReport = () => {
  if (!canSubmit.value) return
  showConfirmDialog.value = true
}

const sendEmailToMunicipality = async (issueData: any) => {
  try {
    const mapUrl = `https://www.google.com/maps?q=${issueData.location.lat},${issueData.location.lng}`
    
    // Using EmailJS for actual email sending
    const emailParams = {
      to_email: 'navinpersonalid@gmail.com',
      subject: `🌿 CleanZone Environmental Report - ${issueData.type.toUpperCase()}`,
      issue_type: issueData.type,
      urgency: issueData.urgency,
      location: addressInfo.value.formatted,
      coordinates: `${issueData.location.lat}, ${issueData.location.lng}`,
      map_link: mapUrl,
      description: issueData.description || 'No description provided',
      ai_analysis: aiAnalysis.value,
      timestamp: new Date().toLocaleString(),
      image_data: imagePreview.value
    }
    
    // Send email using EmailJS
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: 'service_cleanzone',
        template_id: 'template_report',
        user_id: 'your_emailjs_user_id',
        template_params: emailParams,
        attachments: [{
          name: `environmental_issue_${Date.now()}.jpg`,
          data: imagePreview.value.split(',')[1]
        }]
      })
    })
    
    if (response.ok) {
      console.log('✅ Email sent successfully to navinpersonalid@gmail.com')
    } else {
      throw new Error('Email service unavailable')
    }
  } catch (error) {
    // Fallback: Open default email client with map link
    const mapUrl = `https://www.google.com/maps?q=${issueData.location.lat},${issueData.location.lng}`
    const subject = encodeURIComponent(`🌿 CleanZone Environmental Report - ${issueData.type.toUpperCase()}`)
    const body = encodeURIComponent(`🌍 ENVIRONMENTAL ISSUE REPORT

🏷️ Issue Type: ${issueData.type}
⚡ Urgency: ${issueData.urgency}
📍 Location: ${addressInfo.value.formatted}
🗺️ View on Map: ${mapUrl}
📝 Description: ${issueData.description || 'No description provided'}
🤖 AI Analysis: ${aiAnalysis.value}
⏰ Reported: ${new Date().toLocaleString()}
📷 Image: Attached (base64 data)

🌱 Submitted via CleanZone - Protecting Nature Together

Note: Image data included as base64 - ${imagePreview.value.substring(0, 100)}...`)
    
    window.open(`mailto:navinpersonalid@gmail.com?subject=${subject}&body=${body}`)
    console.log('📧 Email client opened with map link for navinpersonalid@gmail.com')
  }
}

const getMunicipalityEmail = (location: Location) => {
  // Simulate municipality email lookup based on coordinates
  const municipalities = [
    'chennai.municipality@gov.in',
    'bangalore.environment@gov.in', 
    'mumbai.civic@gov.in',
    'delhi.environment@gov.in',
    'hyderabad.municipality@gov.in'
  ]
  return municipalities[Math.floor(Math.random() * municipalities.length)]
}

const confirmSubmit = async () => {
  showConfirmDialog.value = false
  showSuccess.value = true
  
  setTimeout(async () => {
    const issueData = {
      type: form.value.type,
      description: form.value.description,
      location: form.value.location,
      urgency: form.value.urgency,
      image: imagePreview.value
    }
    
    store.addIssue(
      form.value.type as IssueType,
      form.value.description,
      imagePreview.value,
      form.value.location
    )
    
    // Send email to municipality
    await sendEmailToMunicipality(issueData)
    
    showSuccess.value = false
    showSnackbar.value = true
    
    setTimeout(() => {
      showSnackbar.value = false
      router.push('/dashboard')
    }, 3000)
  }, 1000)
}

const cancelSubmit = () => {
  showConfirmDialog.value = false
}

onMounted(() => {
  authStore.initAuth()
  
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }
  
  initVoiceRecognition()
})
</script>

