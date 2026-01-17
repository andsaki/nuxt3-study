<script setup lang="ts">
import { watchEffect } from 'vue'
import { css } from '~/styled-system/css'

const props = defineProps<{
  fail: boolean
}>()

watchEffect(() => {
  if (props.fail) {
    throw new Error('意図的にエラーを投げました')
  }
})

const containerClass = css({
  borderRadius: 'lg',
  borderWidth: '1px',
  borderColor: 'red.200',
  backgroundColor: 'red.50',
  px: '3',
  py: '2',
  fontSize: 'sm',
  color: 'red.900',
})
</script>

<template>
  <div :class="containerClass">
    ErrorGenerator 子コンポーネント
  </div>
</template>
