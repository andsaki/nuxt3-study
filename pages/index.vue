<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h1 class="text-4xl font-bold text-gray-900 mb-2">Nuxt 3 Study</h1>
        <p class="text-gray-600">Next.js Study の Nuxt 3 版</p>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6 space-y-4">
        <h2 class="text-2xl font-semibold text-center">カウンター (Pinia)</h2>

        <div class="text-6xl font-bold text-center text-blue-600">
          {{ counterStore.count }}
        </div>

        <div class="flex gap-2 justify-center">
          <button
            @click="counterStore.decrement"
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            -1
          </button>
          <button
            @click="counterStore.reset"
            class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            リセット
          </button>
          <button
            @click="counterStore.increment"
            class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            +1
          </button>
        </div>

        <div class="text-sm text-gray-500 text-center mt-4">
          ※ LocalStorageに永続化されます
        </div>
      </div>

      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">実装例</h3>
        <nav class="space-y-2">
          <NuxtLink
            to="/examples/query-comparison"
            class="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition"
          >
            🔄 TanStack Query vs VueUse 比較
          </NuxtLink>
          <NuxtLink
            to="/examples/form-validation"
            class="block p-3 bg-green-50 hover:bg-green-100 rounded transition"
          >
            📝 フォームバリデーション (VeeValidate + Zod)
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const counterStore = useCounterStore()
</script>
