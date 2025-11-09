<template>
  <div id="app">
    <nav class="bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 shadow-xl sticky top-0 z-[100]">
      <div class="max-w-6xl mx-auto px-5 flex justify-between items-center h-16">
        <router-link to="/" class="text-xl font-bold text-white no-underline flex items-center gap-2">
          🌱 CleanZone
        </router-link>
        <div class="flex gap-6 items-center">
          <router-link to="/" class="no-underline text-white font-medium hover:text-yellow-200 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🏡 Home</router-link>
          <router-link to="/report" class="no-underline text-white font-medium hover:text-yellow-200 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🌿 Report</router-link>
          <router-link to="/dashboard" class="no-underline text-white font-medium hover:text-yellow-200 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🌳 Dashboard</router-link>
          
          <!-- Auth Links (when not logged in) -->
          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="no-underline text-white font-medium hover:text-yellow-200 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🔑 Login</router-link>
            <router-link to="/signup" class="no-underline text-white font-medium hover:text-yellow-200 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">🌱 Sign Up</router-link>
          </template>
          
          <!-- Profile Menu (when logged in) -->
          <div v-if="authStore.isAuthenticated" class="relative">
            <button @click="toggleProfileMenu" class="flex items-center gap-2 text-white font-medium hover:text-yellow-200 transition-all duration-200 px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20">
              👤 {{ authStore.user?.name }}
            </button>
            <div v-if="showProfileMenu" class="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-green-200 py-2 min-w-48">
              <div class="px-4 py-2 border-b border-green-100">
                <p class="font-semibold text-green-800">{{ authStore.user?.name }}</p>
                <p class="text-sm text-green-600">{{ authStore.user?.email }}</p>
              </div>
              <router-link to="/profile" @click="showProfileMenu = false" class="w-full text-left px-4 py-2 text-green-700 hover:bg-green-50 transition-colors flex items-center gap-2 no-underline">
                📝 Profile
              </router-link>
              <button @click="handleLogout" class="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2">
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from './stores/auth'
import Footer from './components/Footer.vue'

const router = useRouter()
const authStore = useAuthStore()
const showProfileMenu = ref(false)

const toggleProfileMenu = () => {
  showProfileMenu.value = !showProfileMenu.value
}

const handleLogout = () => {
  authStore.logout()
  showProfileMenu.value = false
  router.push('/')
}

// Close profile menu when clicking outside
const handleClickOutside = (event: Event) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    showProfileMenu.value = false
  }
}

onMounted(() => {
  authStore.initAuth()
  document.addEventListener('click', handleClickOutside)
})
</script>

<style>
.router-link-active {
  @apply text-yellow-200 bg-green-800 bg-opacity-50 !important;
}

.router-link-exact-active {
  @apply text-yellow-200 bg-green-800 bg-opacity-50 !important;
}

a[href="/"] {
  @apply text-white !important;
}
</style>