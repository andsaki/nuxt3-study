<template>
  <button
    :type="type"
    :disabled="disabled || isLoading"
    :aria-busy="isLoading"
    :aria-disabled="disabled || isLoading"
    :class="buttonClass"
    v-bind="$attrs"
  >
    <!-- ローディング状態の表示 -->
    <span v-if="isLoading" role="status" aria-label="読み込み中">
      ⏳
    </span>
    <!-- アイコンの表示（装飾的なのでaria-hidden） -->
    <span v-if="!isLoading && $slots.icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { button } from '../../styled-system/recipes'
import { cx } from '../../styled-system/css'

export type WCAGLevel = 'A' | 'AA' | 'AAA'
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  /** ボタンのバリエーション */
  variant?: ButtonVariant
  /** ボタンのサイズ */
  size?: ButtonSize
  /** ローディング状態 */
  isLoading?: boolean
  /** 無効状態 */
  disabled?: boolean
  /** ボタンのtype属性 */
  type?: 'button' | 'submit' | 'reset'
  /** WCAGアクセシビリティレベル (A/AA/AAA) @default 'AA' */
  wcagLevel?: WCAGLevel
  /** カスタムクラス */
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'md',
  isLoading: false,
  disabled: false,
  type: 'button',
  wcagLevel: 'AA'
})

defineOptions({
  inheritAttrs: false
})

/**
 * アクセシブルなボタンコンポーネント
 *
 * 機能:
 * - キーボード操作対応（Enter、Space）
 * - スクリーンリーダー対応
 * - フォーカス表示
 * - ARIA属性サポート
 * - aria-busyによるローディング状態
 * - Panda CSSレシピによる型安全なスタイリング
 */
const buttonClass = computed(() => {
  const recipeClassName = button({
    variant: props.variant,
    size: props.size,
    wcagLevel: props.wcagLevel
  })

  return cx(recipeClassName, props.class)
})
</script>
