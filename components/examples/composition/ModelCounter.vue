<script setup lang="ts">
import { css } from '~/styled-system/css'

const count = defineModel<number>({ default: 0 })

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}

const counterWrapperClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '4',
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'yellow.200',
  backgroundColor: 'yellow.50',
  px: '4',
  py: '3',
})

const controlButtonClass = css({
  fontFamily: 'mono',
  fontSize: 'lg',
  minWidth: '2.5rem',
})

const countTextClass = css({
  fontSize: '2xl',
  fontWeight: 'semibold',
  color: 'yellow.900',
})
</script>

<template>
  <div :class="counterWrapperClass">
    <DesignSystemButton
      variant="secondary"
      size="sm"
      :class="controlButtonClass"
      @click="decrement"
    >
      -
    </DesignSystemButton>
    <span :class="countTextClass">{{ count }}</span>
    <DesignSystemButton
      variant="secondary"
      size="sm"
      :class="controlButtonClass"
      @click="increment"
    >
      +
    </DesignSystemButton>
  </div>
</template>
