<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h3 class="text-xl font-semibold text-green-600 mb-4">VueUse</h3>

    <div v-if="isLoading" class="text-gray-500">読み込み中...</div>
    <div v-else-if="error" class="text-red-500">エラー: {{ error }}</div>
    <div v-else class="space-y-4">
      <div class="text-sm text-gray-700">
        <strong>取得データ:</strong> {{ data }}
      </div>
      <div class="text-xs text-gray-500">
        <div>isFinished: {{ isFinished }}</div>
        <div>isFetching: {{ isFetching }}</div>
      </div>
      <button
        :disabled="isFetching"
        class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:bg-gray-400 transition"
        @click="() => execute()"
      >
        {{ isFetching ? '再取得中...' : '再取得' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch, type BeforeFetchContext, type AfterFetchContext } from '@vueuse/core'
import { ref, computed } from 'vue'

const counter = ref(0)

// VueUseのuseFetchを使用
const url = computed(() => `/api/demo?counter=${counter.value}`)

const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `データ (VueUse) - ${new Date().toLocaleTimeString()}`
}

const { data, error, isFetching, isFinished, execute } = useFetch(url, {
  immediate: true,
  beforeFetch({ options }: BeforeFetchContext) {
    // ここでヘッダーなどを設定可能
    return { options }
  },
  afterFetch(ctx: AfterFetchContext) {
    // データを加工
    ctx.data = fetchData()
    return ctx
  },
}).get().json()

// 手動で再取得
const isLoading = computed(() => isFetching.value && !isFinished.value)
</script>
