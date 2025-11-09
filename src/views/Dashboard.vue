<template>
  <div class="py-10 min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
    <div class="max-w-7xl mx-auto px-5">
      <div class="text-center mb-10">
        <div class="text-6xl mb-4">🌳</div>
        <h1 class="text-4xl font-bold text-green-800 mb-2">Nature Dashboard</h1>
        <p class="text-green-700 text-lg">Monitor environmental restoration progress</p>
      </div>
      
      <div class="flex flex-wrap gap-4 mb-10 justify-center">
        <div class="flex items-center gap-2">
          <span class="text-gray-600 font-medium">🏷️ Filter by:</span>
        </div>
        <select v-model="filterType" class="p-3 border-2 border-green-200 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 font-medium shadow-sm hover:shadow-md transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100 cursor-pointer">
          <option value="">All Environmental Issues</option>
          <option value="garbage">🗑️ Waste/Litter</option>
          <option value="pothole">🕳️ Road Damage</option>
          <option value="streetlight">💡 Light Pollution</option>
          <option value="water">💧 Water Issues</option>
          <option value="other">🌿 Other Environmental</option>
        </select>
        
        <select v-model="filterStatus" class="p-3 border-2 border-green-200 rounded-xl bg-green-50 hover:bg-green-100 text-green-800 font-medium shadow-sm hover:shadow-md transition-all focus:border-green-600 focus:ring-2 focus:ring-green-100 cursor-pointer">
          <option value="">All Status</option>
          <option value="reported">🍂 Identified</option>
          <option value="progress">🌱 Healing</option>
          <option value="resolved">🌿 Restored</option>
        </select>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="lg:col-span-2">
          <div class="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-4">
            <h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              🗺️ Interactive Map
            </h3>
            <p class="text-gray-600 text-sm mb-4">Click on markers to view issue details</p>
          </div>
          <div id="map" ref="mapContainer" class="h-96 rounded-2xl shadow-lg border border-gray-200"></div>
        </div>
        
        <div>
          <div class="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-6">
            <h2 class="text-xl font-bold text-gray-800 flex items-center gap-2">
              📝 Recent Issues
              <span class="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">{{ filteredIssues.length }}</span>
            </h2>
          </div>
          <div v-if="filteredIssues.length === 0" class="text-center py-10 text-gray-500">
            No issues found. <router-link to="/report" class="text-blue-600 font-semibold no-underline">Report the first one!</router-link>
          </div>
          <div v-for="issue in filteredIssues" :key="issue.id" class="bg-white rounded-2xl shadow-lg mb-6 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 border border-gray-100">
            <div class="relative">
              <img :src="issue.image" :alt="issue.type" class="w-full h-40 object-cover">
              <div class="absolute top-3 left-3">
                <span class="bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800">
                  {{ getIssueIcon(issue.type) }} {{ issue.type.toUpperCase() }}
                </span>
              </div>
              <div class="absolute top-3 right-3">
                <span :class="getStatusClass(issue.status)">{{ issue.status.toUpperCase() }}</span>
              </div>
            </div>
            <div class="p-5">
              <p class="mb-4 text-gray-700 leading-relaxed text-sm">{{ issue.description || 'No description provided' }}</p>
              <div class="flex justify-between items-center text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <span class="flex items-center gap-1 font-mono">📍 {{ issue.location.lat.toFixed(4) }}, {{ issue.location.lng.toFixed(4) }}</span>
                <span class="flex items-center gap-1">🕒 {{ formatDate(issue.timestamp) }}</span>
                <button @click="upvote(issue.id)" class="bg-white border border-gray-200 rounded-full px-3 py-1 hover:bg-blue-50 hover:border-blue-300 transition-all text-xs font-medium flex items-center gap-1">
                  👍 {{ issue.upvotes }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import L from 'leaflet'
import { useIssuesStore } from '../stores/issues'
import type { Issue } from '../types'

const store = useIssuesStore()
const { issues } = store

const mapContainer = ref<HTMLElement>()
const map = ref<L.Map>()
const filterType = ref('')
const filterStatus = ref('')

const filteredIssues = computed(() => {
  return issues.filter(issue => {
    const typeMatch = !filterType.value || issue.type === filterType.value
    const statusMatch = !filterStatus.value || issue.status === filterStatus.value
    return typeMatch && statusMatch
  })
})

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const upvote = (id: string) => {
  store.upvoteIssue(id)
}

const getStatusClass = (status: Issue['status']) => {
  const classes = {
    reported: 'px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-600',
    progress: 'px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-600', 
    resolved: 'px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-600'
  }
  return classes[status]
}

const getIssueIcon = (type: Issue['type']) => {
  const icons = {
    garbage: '🗑️',
    pothole: '🕳️',
    streetlight: '💡',
    water: '💧',
    other: '📝'
  }
  return icons[type]
}

const getStatusColor = (status: Issue['status']) => {
  const colors = {
    reported: '#dc2626',
    progress: '#eab308', 
    resolved: '#16a34a'
  }
  return colors[status]
}

const initMap = () => {
  if (!mapContainer.value) return
  
  map.value = L.map(mapContainer.value).setView([11.6643, 78.1460], 12)
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map.value)
  
  updateMapMarkers()
}

const updateMapMarkers = () => {
  if (!map.value) return
  
  // Clear existing markers
  map.value.eachLayer(layer => {
    if (layer instanceof L.Marker) {
      map.value?.removeLayer(layer)
    }
  })
  
  // Add markers for filtered issues
  filteredIssues.value.forEach(issue => {
    const marker = L.marker([issue.location.lat, issue.location.lng])
      .addTo(map.value!)
      .bindPopup(`
        <div>
          <strong>${issue.type.toUpperCase()}</strong><br>
          <span style="color: ${getStatusColor(issue.status)}">${issue.status.toUpperCase()}</span><br>
          ${issue.description || 'No description'}<br>
          <small>${formatDate(issue.timestamp)}</small>
        </div>
      `)
  })
  
  // Fit map to show all markers
  if (filteredIssues.value.length > 0) {
    const group = new L.FeatureGroup(
      filteredIssues.value.map(issue => 
        L.marker([issue.location.lat, issue.location.lng])
      )
    )
    map.value.fitBounds(group.getBounds().pad(0.1))
  }
}

onMounted(() => {
  initMap()
})

watch(filteredIssues, () => {
  updateMapMarkers()
}, { deep: true })
</script>

