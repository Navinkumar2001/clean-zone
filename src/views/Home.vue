<template>
  <div>
    <section class="bg-gradient-to-br from-green-600 via-emerald-500 to-teal-600 text-white py-32 text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-black opacity-10"></div>
      <div class="absolute inset-0 opacity-20">
        <div class="absolute top-20 left-10 text-8xl animate-pulse">🌳</div>
        <div class="absolute top-40 right-20 text-6xl animate-bounce">🌿</div>
        <div class="absolute bottom-32 left-1/4 text-7xl animate-pulse">🌱</div>
        <div class="absolute bottom-20 right-10 text-5xl animate-bounce">🍃</div>
        <div class="absolute top-1/2 left-1/3 text-6xl animate-pulse">🌺</div>
        <div class="absolute top-60 right-1/3 text-4xl animate-bounce">🌸</div>
        <div class="absolute bottom-40 left-10 text-5xl animate-pulse">🌼</div>
      </div>
      <div class="max-w-6xl mx-auto px-5 relative z-10">
        <div class="animate-bounce mb-6">
          <span class="text-6xl">🌱</span>
        </div>
        <h1 class="text-6xl font-bold mb-6 leading-tight">
          Nurture Nature.<br>
          <span class="text-yellow-200">Clean Communities.</span>
        </h1>
        <p class="text-xl mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">Report environmental issues and help restore the natural beauty of your community. Together we grow greener.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/report" class="bg-yellow-400 text-green-800 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-300 transition-all duration-200 no-underline inline-block shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            🌿 Report Issue Now
          </router-link>
          <router-link to="/dashboard" class="bg-white bg-opacity-20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-opacity-30 transition-all duration-200 no-underline inline-block border border-white border-opacity-30">
            🌳 View Dashboard
          </router-link>
        </div>
      </div>
    </section>
    
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-6xl mx-auto px-5">
        <h2 class="text-4xl font-bold text-center mb-4 text-gray-800">Community Impact</h2>
        <p class="text-center text-gray-600 mb-12 text-lg">Together we're making our cities cleaner and better</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div class="text-5xl mb-4">📝</div>
            <h3 class="text-4xl font-bold text-blue-600 mb-3">{{ issues.length }}</h3>
            <p class="text-gray-600 font-medium text-lg">Total Reports</p>
            <div class="mt-4 bg-blue-50 rounded-lg p-3">
              <p class="text-sm text-blue-600 font-medium">Issues Reported</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div class="text-5xl mb-4">✅</div>
            <h3 class="text-4xl font-bold text-green-600 mb-3">{{ resolvedCount }}</h3>
            <p class="text-gray-600 font-medium text-lg">Resolved Issues</p>
            <div class="mt-4 bg-green-50 rounded-lg p-3">
              <p class="text-sm text-green-600 font-medium">Problems Solved</p>
            </div>
          </div>
          <div class="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
            <div class="text-5xl mb-4">🏆</div>
            <h3 class="text-4xl font-bold text-purple-600 mb-3">{{ ((resolvedCount / issues.length) * 100 || 0).toFixed(0) }}%</h3>
            <p class="text-gray-600 font-medium text-lg">Success Rate</p>
            <div class="mt-4 bg-purple-50 rounded-lg p-3">
              <p class="text-sm text-purple-600 font-medium">Efficiency Score</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-5">
        <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">How It Works</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div class="text-center">
            <div class="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">📷</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">1. Capture</h3>
            <p class="text-gray-600">Take a photo of the civic issue you want to report</p>
          </div>
          <div class="text-center">
            <div class="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">📍</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">2. Locate</h3>
            <p class="text-gray-600">Auto-detect GPS location or manually pin the exact spot</p>
          </div>
          <div class="text-center">
            <div class="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="text-3xl">🚀</span>
            </div>
            <h3 class="text-xl font-bold mb-4 text-gray-800">3. Submit</h3>
            <p class="text-gray-600">Submit your report and track its progress in real-time</p>
          </div>
        </div>
      </div>
    </section>
    

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useIssuesStore } from '../stores/issues'

const store = useIssuesStore()
const { issues } = store

const resolvedCount = computed(() => 
  issues.filter(issue => issue.status === 'resolved').length
)
</script>