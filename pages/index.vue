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

      <!-- レンダリングモード -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">🎨 レンダリングモード</h3>
        <nav class="space-y-2">
          <NuxtLink
            to="/ssr-demo"
            class="block p-3 bg-yellow-50 hover:bg-yellow-100 rounded transition"
          >
            🖥️ SSR デモ
          </NuxtLink>
          <NuxtLink
            to="/ssg-demo"
            class="block p-3 bg-orange-50 hover:bg-orange-100 rounded transition"
          >
            🏗️ SSG デモ
          </NuxtLink>
          <NuxtLink
            to="/isr-demo"
            class="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition"
          >
            ⚡ ISR デモ
          </NuxtLink>
          <NuxtLink
            to="/verify-ssr"
            class="block p-3 bg-purple-50 hover:bg-purple-100 rounded transition"
          >
            🔍 SSR 検証ページ
          </NuxtLink>
          <NuxtLink
            to="/examples/rendering-modes"
            class="block p-3 bg-pink-50 hover:bg-pink-100 rounded transition"
          >
            📚 レンダリングモード解説
          </NuxtLink>
          <NuxtLink
            to="/examples/client-only-test"
            class="block p-3 bg-gray-50 hover:bg-gray-100 rounded transition"
          >
            🧪 ClientOnly 動作確認
          </NuxtLink>
          <NuxtLink
            to="/examples/error-boundary-demo"
            class="block p-3 bg-red-50 hover:bg-red-100 rounded transition"
          >
            🛡️ Error Boundary デモ
          </NuxtLink>
        </nav>
      </div>

      <!-- データ取得 -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">🔄 データ取得</h3>
        <nav class="space-y-2">
          <NuxtLink
            to="/examples/query-comparison"
            class="block p-3 bg-blue-50 hover:bg-blue-100 rounded transition"
          >
            🔄 TanStack Query vs VueUse
          </NuxtLink>
          <NuxtLink
            to="/examples/usefetch-cache"
            class="block p-3 bg-cyan-50 hover:bg-cyan-100 rounded transition"
          >
            💾 useFetch キャッシュ
          </NuxtLink>
          <NuxtLink
            to="/examples/usefetch-comparison"
            class="block p-3 bg-indigo-50 hover:bg-indigo-100 rounded transition"
          >
            ⚖️ Nuxt vs VueUse useFetch比較
          </NuxtLink>
        </nav>
      </div>

      <!-- フォーム -->
      <div class="bg-white shadow-md rounded-lg p-6">
        <h3 class="text-xl font-semibold mb-4">📝 フォーム</h3>
        <nav class="space-y-2">
          <NuxtLink
            to="/examples/form-validation"
            class="block p-3 bg-green-50 hover:bg-green-100 rounded transition"
          >
            📝 フォームバリデーション (VeeValidate + Zod)
          </NuxtLink>
          <NuxtLink
            to="/examples/zod-async-validation"
            class="block p-3 bg-teal-50 hover:bg-teal-100 rounded transition"
          >
            ⏳ Zod 同期・非同期バリデーション
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const counterStore = useCounterStore()
</script>
