<script setup lang="ts">
import { inject } from 'vue'
import { css } from '~/styled-system/css'
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

const sectionClass = css({
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'teal.200',
  backgroundColor: 'teal.50',
  p: '4',
  fontSize: 'sm',
  color: 'teal.900',
})

const headerClass = css({
  marginBottom: '2',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3',
  flexWrap: 'wrap',
})

const eyebrowClass = css({
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'teal.600',
})

const titleClass = css({
  fontSize: 'lg',
  fontWeight: 'semibold',
})

const paletteWrapperClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
})

const paletteButtonClass = css({
  borderRadius: 'full',
  borderWidth: '1px',
  borderColor: 'white',
  px: '3',
  py: '1',
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'white',
})
</script>

<template>
  <section :class="sectionClass">
    <header :class="headerClass">
      <div>
        <p :class="eyebrowClass">inject() で受け取ったテーマ</p>
        <p :class="titleClass">
          Mode: {{ ctx.mode.value }} / Accent: {{ ctx.accent.value }}
        </p>
      </div>
      <DesignSystemButton variant="outline" size="sm" @click="ctx.toggleMode">
        toggle mode
      </DesignSystemButton>
    </header>

    <div :class="paletteWrapperClass">
      <button
        v-for="preset in palettePresets"
        :key="preset.value"
        :class="paletteButtonClass"
        :style="{ background: preset.value, opacity: ctx.accent.value === preset.value ? 1 : 0.5 }"
        @click="ctx.setAccent(preset.value)"
      >
        {{ preset.label }}
      </button>
    </div>
  </section>
</template>
