<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import ModelCounter from '~/components/examples/composition/ModelCounter.vue'
import SlotAwareCard from '~/components/examples/composition/SlotAwareCard.vue'
import ThemeConsumer from '~/components/examples/composition/ThemeConsumer.vue'
import { themeContextKey } from '~/components/examples/composition/theme-context'

const mode = ref<'light' | 'dark'>('light')
const accent = ref('#2563eb')

const toggleMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}

const setAccent = (hex: string) => {
  accent.value = hex
}

provide(themeContextKey, {
  mode,
  accent,
  toggleMode,
  setAccent,
})

const parentCount = ref(3)
const themePanelStyle = computed(() => ({
  borderColor: accent.value,
  background: mode.value === 'light' ? 'white' : '#0f172a',
  color: mode.value === 'light' ? '#0f172a' : 'white',
}))
</script>

<template>
  <section class="space-y-4">
    <div class="space-y-4 rounded-2xl border p-5 shadow-sm" :style="themePanelStyle">
      <ThemeConsumer />

      <SlotAwareCard data-demo="slot-card">
        <template #title>
          <h4 class="text-xl font-semibold">SlotAwareCard</h4>
        </template>
        provide/inject で共有されたテーマカラー: <span class="font-semibold">{{ accent }}</span>
        <template #footer>useSlots() でフッタースロットの存在を検知</template>
      </SlotAwareCard>

      <div class="space-y-2 rounded-xl border border-dashed border-current p-4 text-sm">
        <p>
          親から見る <code>v-model</code> の値:
          <span class="font-mono">{{ parentCount }}</span>
        </p>
        <ModelCounter v-model="parentCount" />
      </div>
    </div>
  </section>
</template>
