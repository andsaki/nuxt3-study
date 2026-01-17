<script setup lang="ts">
import { computed, effectScope, getCurrentScope, onScopeDispose, ref, watchEffect } from 'vue'

const manualSource = ref(0)
const events = ref<string[]>([])
const scopeRef = ref<ReturnType<typeof effectScope> | null>(null)
let eventStore: string[] = []

const log = (message: string) => {
  eventStore = [message, ...eventStore].slice(0, 10)
  events.value = eventStore
}

const startScope = () => {
  stopScope()
  const scope = effectScope()
  scopeRef.value = scope
  scope.run(() => {
    log(`scope started (has scope? ${Boolean(getCurrentScope())})`)

    const cleanup = watchEffect(() => {
      log(`watchEffect sees value=${manualSource.value}`)
    })

    onScopeDispose(() => {
      log('onScopeDispose → watchEffect を停止')
      cleanup()
    })
  })
}

const stopScope = () => {
  if (scopeRef.value) {
    scopeRef.value.stop()
    scopeRef.value = null
  }
}

const bumpSource = () => {
  manualSource.value++
}

const scopeStatus = computed(() => (scopeRef.value ? 'active' : 'idle'))
</script>

<template>
  <section class="space-y-3 rounded-xl border border-fuchsia-200 bg-fuchsia-50 p-4 text-sm text-fuchsia-900">
    <header class="flex items-center justify-between">
      <div>
        <p class="text-xs uppercase tracking-wide text-fuchsia-500">effectScope / getCurrentScope</p>
        <p class="text-lg font-semibold">scope: {{ scopeStatus }}</p>
      </div>
      <div class="flex gap-2">
        <button class="rounded-md bg-fuchsia-600 px-3 py-1 text-xs font-semibold text-white" @click="startScope">
          scope再生成
        </button>
        <button
          class="rounded-md border border-fuchsia-300 px-3 py-1 text-xs font-semibold text-fuchsia-700"
          @click="stopScope"
        >
          stop
        </button>
      </div>
    </header>

    <button class="rounded-md border border-fuchsia-300 px-3 py-1 text-xs font-semibold" @click="bumpSource">
      manualSource を更新 ({{ manualSource }})
    </button>

    <ul class="space-y-1 rounded-lg border border-fuchsia-200 bg-white p-3 font-mono text-xs text-fuchsia-900">
      <li v-for="(event, index) in events" :key="index">{{ event }}</li>
    </ul>
  </section>
</template>
