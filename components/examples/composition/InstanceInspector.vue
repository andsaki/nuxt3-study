<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'

const instance = getCurrentInstance()

const summary = computed(() => {
  if (!instance) {
    return {
      uid: 'n/a',
      parent: 'なし',
      version: 'unknown',
    }
  }

  return {
    uid: instance.uid,
    parent: instance.parent ? `#${instance.parent.uid}` : 'root',
    version: instance.appContext.app.version ?? 'unknown',
  }
})
</script>

<template>
  <section class="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800">
    <p class="font-semibold">getCurrentInstance()</p>
    <ul class="mt-2 space-y-1 font-mono">
      <li>uid: {{ summary.uid }}</li>
      <li>parent: {{ summary.parent }}</li>
      <li>app.version: {{ summary.version }}</li>
    </ul>
    <p class="mt-2 text-xs text-gray-500">プラグインや高度なローレベル API を書くときに利用します。</p>
  </section>
</template>
