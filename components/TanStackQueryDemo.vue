<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h3 class="text-xl font-semibold text-blue-600 mb-4">TanStack Vue Query</h3>

    <div v-if="isPending" class="text-gray-500">読み込み中...</div>
    <div v-else-if="error" class="text-red-500">エラー: {{ error.message }}</div>
    <div v-else class="space-y-4">
      <div class="text-sm text-gray-700">
        <strong>取得データ:</strong> {{ data }}
      </div>
      <div class="text-xs text-gray-500">
        <div>isFetching: {{ isFetching }}</div>
        <div>isRefetching: {{ isRefetching }}</div>
        <div>status: {{ status }}</div>
      </div>
      <button
        @click="() => refetch()"
        :disabled="isRefetching"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
      >
        {{ isRefetching ? '再取得中...' : '再取得' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'

// シンプルなデータフェッチ関数
const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `データ (TanStack Query) - ${new Date().toLocaleTimeString()}`
}

const { data, error, isPending, isFetching, isRefetching, status, refetch } = useQuery({
  queryKey: ['demo-data'],
  queryFn: fetchData,
  refetchOnWindowFocus: false,
})
</script>
