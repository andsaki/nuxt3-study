<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { infoBox } from '~/styled-system/recipes'
import { cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'

defineOptions({
  inheritAttrs: false,
})

export type InfoBoxVariant = 'info' | 'warning' | 'success' | 'tip'

interface InfoBoxProps {
  variant?: InfoBoxVariant
  title?: string
  icon?: string
  leftBorder?: boolean
  wcagLevel?: ComponentWCAGLevel
  class?: string
}

const props = withDefaults(defineProps<InfoBoxProps>(), {
  variant: 'info',
  leftBorder: false,
  wcagLevel: 'AA',
  class: '',
})

const attrs = useAttrs()
const slotsClasses = computed(() => infoBox({
  variant: props.variant,
  wcagLevel: props.wcagLevel,
  leftBorder: props.leftBorder ? true : undefined,
}))

const rootClass = computed(() => cx(slotsClasses.value.root, props.class))

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <div
    v-bind="forwardedAttrs"
    :class="rootClass"
  >
    <div v-if="title || icon" :class="slotsClasses.title">
      <span v-if="icon" :class="slotsClasses.icon">
        {{ icon }}
      </span>
      {{ title }}
    </div>
    <div :class="slotsClasses.content">
      <slot />
    </div>
  </div>
</template>
