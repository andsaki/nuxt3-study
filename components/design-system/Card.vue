<template>
  <div :class="cardSlots.root" :style="style">
    <div v-if="title || icon" :class="cardSlots.title">
      <span v-if="icon" :class="cardSlots.icon">{{ icon }}</span>
      <span>{{ title }}</span>
    </div>
    <div :class="cardSlots.content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { card } from '~/styled-system/recipes'

export interface CardProps {
  /** カードのバリアント */
  variant?: 'default' | 'interactive' | 'bordered'
  /** カードのタイトル */
  title?: string
  /** タイトル横に表示するアイコン（絵文字） */
  icon?: string
  /** カラースキーム */
  colorScheme?: 'blue' | 'green' | 'yellow' | 'red' | 'gray'
  /** カスタムスタイル */
  style?: Record<string, string>
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: 'default',
})

const cardSlots = computed(() => card({
  variant: props.variant,
  colorScheme: props.colorScheme,
}))
</script>
