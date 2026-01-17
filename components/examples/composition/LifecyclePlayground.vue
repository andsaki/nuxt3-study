<script setup lang="ts">
import {
  nextTick,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'
import ErrorGenerator from '~/components/examples/composition/ErrorGenerator.vue'

const tick = ref(0)
const failChild = ref(false)
const logEntries = ref<
  {
    label: string
    detail?: string
    id: number
  }[]
>([])

let logId = 0
const pushLog = (label: string, detail?: string) => {
  logEntries.value = [{ label, detail, id: logId++ }, ...logEntries.value].slice(0, 18)
}

const increment = () => {
  tick.value++
}

const throwFromChild = async () => {
  failChild.value = true
  await nextTick()
  failChild.value = false
}

onBeforeMount(() => pushLog('onBeforeMount'))
onMounted(() => pushLog('onMounted'))
onBeforeUpdate(() => pushLog('onBeforeUpdate'))
onUpdated(() => pushLog('onUpdated'))
onBeforeUnmount(() => pushLog('onBeforeUnmount'))
onUnmounted(() => pushLog('onUnmounted'))
onActivated(() => pushLog('onActivated'))
onDeactivated(() => pushLog('onDeactivated'))

onErrorCaptured((err) => {
  pushLog('onErrorCaptured', (err as Error).message)
  // return false to keep bubbling disabled
  return false
})

onRenderTracked((event) => {
  pushLog('onRenderTracked', `${event.key as string} via ${event.type}`)
})

onRenderTriggered((event) => {
  pushLog('onRenderTriggered', `${event.key as string} changed`)
})
</script>

<template>
  <div class="space-y-4">
    <header class="space-y-1">
      <h3 class="text-lg font-semibold text-gray-900">ライフサイクルフックの流れ</h3>
      <p class="text-sm text-gray-600">
        各フックが呼ばれる順序をログします。更新ボタンで再レンダー、エラーボタンで
        <code>onErrorCaptured</code> を確認できます。
      </p>
    </header>

    <div class="flex flex-wrap gap-3">
      <button class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white" @click="increment">
        tick を更新 ({{ tick }})
      </button>
      <button class="rounded-md border border-rose-300 px-3 py-2 text-sm font-semibold text-rose-600" @click="throwFromChild">
        子コンポーネントでエラー
      </button>
    </div>

    <ErrorGenerator :fail="failChild" />

    <ul class="space-y-2 rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900">
      <li v-for="entry in logEntries" :key="entry.id" class="rounded-lg bg-white px-3 py-2">
        <span class="font-semibold">{{ entry.label }}</span>
        <span v-if="entry.detail" class="text-slate-500">— {{ entry.detail }}</span>
      </li>
    </ul>
  </div>
</template>
