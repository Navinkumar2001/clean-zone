<template>
  <footer class="bg-gray-900 text-white py-12">
    <div class="max-w-6xl mx-auto px-5">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
            🌱 <span class="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">CleanZone</span>
          </h3>
          <p class="text-gray-400">Nurturing nature and restoring environmental harmony through community action.</p>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Quick Links</h4>
          <div class="space-y-2">
            <router-link to="/" class="block text-gray-400 hover:text-white transition-colors no-underline">Home</router-link>
            <router-link to="/report" class="block text-gray-400 hover:text-white transition-colors no-underline">Report Issue</router-link>
            <router-link to="/dashboard" class="block text-gray-400 hover:text-white transition-colors no-underline">Dashboard</router-link>
          </div>
        </div>
        <div>
          <h4 class="font-semibold mb-4">Contact</h4>
          <div class="space-y-2 text-gray-400">
            <p>📧 support@cleanzone.com</p>
            <p>📞 +1 (555) 123-4567</p>
            <p>🌍 Making cities cleaner, one report at a time</p>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 CleanZone. All rights reserved. Built with ❤️ for cleaner communities.</p>
      </div>
    </div>
  </footer>
</template>

<style>
.router-link-active {
  @apply text-blue-400 bg-gray-800 px-2 py-1 rounded !important;
}
</style>

<script setup lang="ts">
</script>