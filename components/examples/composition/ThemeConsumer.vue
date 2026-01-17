<script setup lang="ts">
import { inject } from 'vue'
import { themeContextKey } from '~/components/examples/composition/theme-context'

const ctx = inject(themeContextKey)
if (!ctx) {
  throw new Error('Theme context が見つかりません')
}

const palettePresets = [
  { label: 'Ocean', value: '#2563eb' },
  { label: 'Sunset', value: '#f97316' },
  { label: 'Forest', value: '#16a34a' },
]
</script>

<template>
  <section class="rounded-xl border border-teal-200 bg-teal-50 p-4 text-sm text-teal-900">
    <header class="mb-2 flex items-center justify-between gap-3">
      <div>
        <p class="text-xs uppercase tracking-wide text-teal-600">inject() で受け取ったテーマ</p>
        <p class="text-lg font-semibold">
          Mode: {{ ctx.mode.value }} / Accent: {{ ctx.accent.value }}
        </p>
      </div>
      <button class="rounded-md border border-teal-300 px-3 py-1 text-xs font-semibold" @click="ctx.toggleMode">
        toggle mode
      </button>
    </header>

    <div class="flex flex-wrap gap-2">
      <button
        v-for="preset in palettePresets"
        :key="preset.value"
        class="rounded-full border border-white px-3 py-1 text-xs font-semibold text-white"
        :style="{ background: preset.value, opacity: ctx.accent.value === preset.value ? 1 : 0.5 }"
        @click="ctx.setAccent(preset.value)"
      >
        {{ preset.label }}
      </button>
    </div>
  </section>
</template>
