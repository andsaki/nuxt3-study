<template>
  <div
    ref="triggerRef"
    :class="css({ position: 'relative', display: 'inline-block' })"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <slot />
    <Teleport to="body">
      <div
        v-if="isVisible"
        ref="tooltipRef"
        :id="tooltipId"
        role="tooltip"
        :class="tooltipClass"
        :style="tooltipStyle"
      >
        {{ content }}
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
import { tooltip as tooltipRecipe } from '~/styled-system/recipes'

interface Props {
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  delay: 300,
})

const isVisible = ref(false)
const triggerRef = ref<HTMLElement>()
const tooltipRef = ref<HTMLElement>()
const tooltipId = `tooltip-${Math.random().toString(36).substring(2, 11)}`
let timer: ReturnType<typeof setTimeout> | null = null

const tooltipClass = computed(() => tooltipRecipe({ position: props.position }))

const tooltipStyle = ref({})

const showTooltip = () => {
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => {
    isVisible.value = true
    nextTick(() => {
      updateTooltipPosition()
    })
  }, props.delay)
}

const hideTooltip = () => {
  if (timer) clearTimeout(timer)
  isVisible.value = false
}

const updateTooltipPosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()

  let top = 0
  let left = 0

  switch (props.position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - 8
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'bottom':
      top = triggerRect.bottom + 8
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      break
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.left - tooltipRect.width - 8
      break
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      left = triggerRect.right + 8
      break
  }

  tooltipStyle.value = {
    position: 'fixed',
    top: `${top}px`,
    left: `${left}px`,
    zIndex: 9999,
  }
}

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>
