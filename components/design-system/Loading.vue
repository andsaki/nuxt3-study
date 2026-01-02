<template>
  <component :is="containerComponent" :class="containerClass" v-bind="containerAttrs">
    <div
      role="status"
      :aria-label="label"
      aria-live="polite"
      :class="slots.root"
    >
      <svg
        viewBox="0 0 24 24"
        :class="slots.spinner"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="50 50"
          opacity="0.25"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="3"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="31.4 31.4"
          stroke-dashoffset="0"
        />
      </svg>
      <span
        v-if="label"
        :class="cx(slots.label, color === 'white' && css({ color: 'white' }))"
      >
        {{ label }}
      </span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { css, cx } from '~/styled-system/css'
import { loading as loadingRecipe } from '~/styled-system/recipes'

interface Props {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'primary' | 'secondary' | 'white'
  label?: string
  fullscreen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  color: 'primary',
  label: '読み込み中',
  fullscreen: false,
})

const slots = computed(() => loadingRecipe({
  size: props.size,
  color: props.color,
}))

const overlayClass = css({
  position: 'fixed',
  inset: '0',
  bg: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: '9999',
})

const containerComponent = computed(() => props.fullscreen ? 'div' : 'template')
const containerClass = computed(() => props.fullscreen ? cx(overlayClass, 'loading__overlay') : undefined)
const containerAttrs = computed(() => props.fullscreen ? { 'aria-modal': 'true' } : {})
</script>
