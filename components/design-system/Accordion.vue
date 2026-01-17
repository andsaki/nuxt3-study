<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  onBeforeUnmount,
  onMounted,
  ref,
  useAttrs,
} from 'vue'
import type { HTMLAttributes } from 'vue'
import { accordion } from '~/styled-system/recipes'
import { css, cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'

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

const summaryTextClass = css({ flex: 1 })

export interface AccordionSummaryProps {
  class?: string
}

export const AccordionSummary = defineComponent({
  name: 'AccordionSummary',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(summaryProps, { slots, attrs, expose }) {
    const summaryRef = ref<HTMLElement | null>(null)
    const wcagLevel = ref<ComponentWCAGLevel>('AA')
    const isKeyboardFocus = ref(false)

    const summaryClasses = computed(() => accordion({ wcagLevel: wcagLevel.value }))
    const summaryClass = computed(() => cx(summaryClasses.value.summary, summaryProps.class))

    const filteredAttrs = computed<Record<string, unknown>>(() => {
      const result: Record<string, unknown> = {}
      Object.entries(attrs).forEach(([key, value]) => {
        if (key !== 'class' && key !== 'onFocus' && key !== 'onBlur') {
          result[key] = value
        }
      })
      return result
    })

    const updateWcagLevel = () => {
      if (!summaryRef.value) return
      const closestDetails = summaryRef.value.closest('details')
      const level = closestDetails?.getAttribute('data-wcag-level') as ComponentWCAGLevel | null
      if (level) {
        wcagLevel.value = level
      }
    }

    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        isKeyboardFocus.value = true
      }
    }

    const handleGlobalMouseDown = () => {
      isKeyboardFocus.value = false
    }

    const handleFocus = (event: FocusEvent) => {
      if (isKeyboardFocus.value) {
        (event.currentTarget as HTMLElement)?.setAttribute('data-focused', 'true')
      }
      const userFocus = attrs.onFocus as ((e: FocusEvent) => void) | undefined
      userFocus?.(event)
    }

    const handleBlur = (event: FocusEvent) => {
      ;(event.currentTarget as HTMLElement)?.removeAttribute('data-focused')
      const userBlur = attrs.onBlur as ((e: FocusEvent) => void) | undefined
      userBlur?.(event)
    }

    onMounted(() => {
      updateWcagLevel()
      window.addEventListener('keydown', handleGlobalKeyDown)
      window.addEventListener('mousedown', handleGlobalMouseDown)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('keydown', handleGlobalKeyDown)
      window.removeEventListener('mousedown', handleGlobalMouseDown)
    })

    expose({
      focus: () => summaryRef.value?.focus(),
    })

    return () =>
      h(
        'summary',
        {
          ref: summaryRef,
          ...filteredAttrs.value,
          class: summaryClass.value,
          onFocus: handleFocus,
          onBlur: handleBlur,
        },
        [
          h(AccordionIcon, { class: summaryClasses.value.icon }),
          h('span', { class: summaryTextClass }, slots.default?.() ?? []),
        ],
      )
  },
})

export interface AccordionContentProps {
  class?: string
}

export const AccordionContent = defineComponent({
  name: 'AccordionContent',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(contentProps, { slots, attrs }) {
    const contentClasses = computed(() => accordion({}))
    const contentClass = computed(() => cx(contentClasses.value.content, contentProps.class))

    const filteredAttrs = computed<Record<string, unknown>>(() => {
      const result: Record<string, unknown> = {}
      Object.entries(attrs).forEach(([key, value]) => {
        if (key !== 'class') {
          result[key] = value
        }
      })
      return result
    })

    return () =>
      h(
        'div',
        {
          ...filteredAttrs.value,
          class: contentClass.value,
        },
        slots.default?.(),
      )
  },
})

const AccordionIcon = defineComponent({
  name: 'AccordionIcon',
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(iconProps) {
    return () =>
      h(
        'svg',
        {
          width: '24',
          height: '24',
          viewBox: '0 0 24 24',
          fill: 'none',
          xmlns: 'http://www.w3.org/2000/svg',
          'aria-hidden': 'true',
          class: cx('accordion-icon', iconProps.class),
        },
        [
          h('path', {
            d: 'M7 10L12 15L17 10H7Z',
            fill: 'currentColor',
          }),
        ],
      )
  },
})
</script>

<template>
  <details
    v-bind="rootAttrs"
    :open="defaultOpen"
    :data-wcag-level="wcagLevel"
    :class="rootClass"
  >
    <slot />
  </details>
</template>
