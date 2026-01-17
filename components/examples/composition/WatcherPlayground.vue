<script setup lang="ts">
import { computed, customRef, ref, watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'

const makeDebouncedRef = (initial = '', delay = 400) => {
  return customRef<string>((track, trigger) => {
    let value = initial
    let timer: ReturnType<typeof setTimeout>
    return {
      get() {
        track()
        return value
      },
      set(newValue: string) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

const message = ref('Nuxt')
const debouncedQuery = makeDebouncedRef('', 500)
const uppercase = computed(() => message.value.toUpperCase())

const watcherLog = ref<
  {
    tag: string
    detail: string
    id: number
  }[]
>([])

let logId = 0
const pushLog = (tag: string, detail: string) => {
  const entry = { tag, detail, id: logId++ }
  queueMicrotask(() => {
    watcherLog.value = [...watcherLog.value.slice(-7), entry]
  })
}

watch(message, (newValue, oldValue) => {
  pushLog('watch', `${oldValue} → ${newValue}`)
})

watchEffect(() => {
  pushLog('watchEffect', `length=${message.value.length}`)
})

watchPostEffect(() => {
  pushLog('watchPostEffect', `DOM updated for "${message.value}"`)
})

watchSyncEffect(() => {
  pushLog('watchSyncEffect', `pre-render snapshot="${message.value}"`)
})

watch(debouncedQuery, (value) => {
  pushLog('customRef', `debounced value="${value || 'empty'}"`)
})
</script>

<template>
  <div class="space-y-4">
    <header class="space-y-1">
      <h3 class="text-lg font-semibold text-gray-900">ウォッチャ &amp; customRef</h3>
      <p class="text-sm text-gray-600">
        <code>watch</code> / <code>watchEffect</code> / <code>watchPostEffect</code> /
        <code>watchSyncEffect</code> のタイミングと <code>customRef</code> を使ったデバウンス入力をログに残します。
      </p>
    </header>

    <div class="grid gap-4 lg:grid-cols-2">
      <section class="space-y-4 rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
        <label class="space-y-1 text-sm text-emerald-900">
          <span class="font-semibold">message (ref)</span>
          <input
            v-model="message"
            class="w-full rounded-md border border-emerald-200 px-3 py-2"
            type="text"
            placeholder="Type anything"
          />
        </label>

        <p class="text-sm text-emerald-900">
          computed uppercase:
          <span class="font-semibold">{{ uppercase }}</span>
        </p>

        <label class="space-y-1 text-sm text-emerald-900">
          <span class="font-semibold">debouncedQuery (customRef)</span>
          <input
            v-model="debouncedQuery"
            class="w-full rounded-md border border-emerald-200 px-3 py-2"
            type="text"
            placeholder="500ms debounce"
          />
        </label>
      </section>

      <section class="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <h4 class="mb-2 font-semibold text-slate-800">発火ログ (最新8件)</h4>
        <ul class="space-y-2 text-sm text-slate-900">
          <li
            v-for="entry in [...watcherLog].reverse()"
            :key="entry.id"
            class="rounded-lg border border-slate-200 bg-white px-3 py-2"
          >
            <span class="font-mono text-xs uppercase tracking-wide text-slate-500">{{ entry.tag }}</span>
            <div>{{ entry.detail }}</div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
