<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          データフェッチング比較
        </h1>
        <p class="text-gray-600">
          TanStack Vue Query vs VueUse の比較
        </p>
        <NuxtLink to="/" class="text-blue-600 hover:underline mt-2 inline-block">
          ← ホームに戻る
        </NuxtLink>
      </div>

      <div class="grid md:grid-cols-2 gap-6">
        <!-- TanStack Vue Query -->
        <TanStackQueryDemo />

        <!-- VueUse -->
        <VueUseDemo />
      </div>

      <div class="mt-8 bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4">比較ポイント</h2>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <h3 class="font-semibold text-lg text-blue-600 mb-2">TanStack Vue Query</h3>
            <ul class="space-y-1 text-sm text-gray-700">
              <li>✅ 強力なキャッシュ管理</li>
              <li>✅ 自動再取得・再検証</li>
              <li>✅ 楽観的更新のサポート</li>
              <li>✅ DevTools が充実</li>
              <li>✅ Mutation の管理が容易</li>
              <li>⚠️ バンドルサイズが大きめ</li>
            </ul>
          </div>
          <div>
            <h3 class="font-semibold text-lg text-green-600 mb-2">VueUse</h3>
            <ul class="space-y-1 text-sm text-gray-700">
              <li>✅ 軽量でシンプル</li>
              <li>✅ Tree-shakable</li>
              <li>✅ Vue と統合性が高い</li>
              <li>✅ 100以上のユーティリティ</li>
              <li>⚠️ 高度なキャッシュ機能なし</li>
              <li>⚠️ Mutation は手動管理</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'データフェッチング比較 | Nuxt 3 Study',
})
</script>
