<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { HTMLAttributes } from 'vue'
import { accordion } from '~/styled-system/recipes'
import { css, cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'
import { AccordionSummary, AccordionContent } from './accordion-helpers'

defineOptions({
  inheritAttrs: false,
})

interface AccordionProps {
  class?: string
  defaultOpen?: boolean
  wcagLevel?: ComponentWCAGLevel
}

const props = withDefaults(defineProps<AccordionProps>(), {
  class: '',
  defaultOpen: false,
  wcagLevel: 'AA',
})

const attrs = useAttrs()
const slotClasses = computed(() => accordion({ wcagLevel: props.wcagLevel }))
const rootClass = computed(() => cx(slotClasses.value.root, props.class))

const rootAttrs = computed(() => {
  const { class: _class, open: _open, 'data-wcag-level': _wcag, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <details
    :class="rootClass"
    :data-wcag-level="props.wcagLevel"
    :open="props.defaultOpen"
    v-bind="rootAttrs"
  >
    <AccordionSummary>
      <slot name="summary" />
    </AccordionSummary>
    <AccordionContent>
      <slot />
    </AccordionContent>
  </details>
</template>
