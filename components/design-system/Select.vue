<template>
  <div :class="cx(selectSlots.root, css({ mb: '4' }))">
    <!-- ラベル -->
    <label
      :for="selectId"
      :class="selectSlots.label"
    >
      {{ label }}
      <span
        v-if="required"
        :class="css({ color: 'red.600', ml: '1' })"
        aria-label="必須"
      >
        *
      </span>
    </label>

    <!-- セレクトボックス -->
    <select
      :id="selectId"
      v-bind="$attrs"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error"
      :aria-describedby="describedBy"
      :aria-required="required"
      :class="selectSlots.trigger"
      @change="handleChange"
    >
      <option
        v-if="placeholder"
        value=""
        disabled
      >
        {{ placeholder }}
      </option>
      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </option>
    </select>

    <!-- エラーメッセージ -->
    <p
      v-if="error"
      :id="errorId"
      role="alert"
      :class="selectSlots.error"
    >
      {{ error }}
    </p>

    <!-- ヘルプテキスト -->
    <p
      v-if="helperText && !error"
      :id="helperId"
      :class="selectSlots.helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { css, cx } from '~/styled-system/css'
import { select as selectRecipe } from '~/styled-system/recipes'

/**
 * アクセシブルなセレクトボックスコンポーネント
 *
 * 機能:
 * - ラベルとselectの関連付け（for/id）
 * - エラー状態の適切な伝達（aria-invalid, aria-describedby）
 * - 必須項目の明示（aria-required）
 * - フォーカス表示
 * - WCAG準拠のカラーコントラスト
 */

type WCAGLevel = 'A' | 'AA' | 'AAA'

interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

interface Props {
  /** ラベルテキスト */
  label: string
  /** v-model用の値 */
  modelValue?: string
  /** エラーメッセージ */
  error?: string
  /** ヘルプテキスト */
  helperText?: string
  /** セレクトボックスのサイズ */
  size?: 'sm' | 'md' | 'lg'
  /** 必須項目かどうか */
  required?: boolean
  /** 無効化 */
  disabled?: boolean
  /** 選択肢 */
  options: SelectOption[]
  /** プレースホルダー（空の選択肢） */
  placeholder?: string
  /** WCAGアクセシビリティレベル (A/AA/AAA) */
  wcagLevel?: WCAGLevel
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  size: 'md',
  required: false,
  disabled: false,
  wcagLevel: 'AA',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// ユニークなIDを自動生成
const selectId = useId()
const errorId = `${selectId}-error`
const helperId = `${selectId}-helper`

// aria-describedbyの値を構築
const describedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId)
  if (props.helperText) ids.push(helperId)
  return ids.length > 0 ? ids.join(' ') : undefined
})

// レシピスロット
const selectSlots = computed(() => selectRecipe({
  size: props.size,
  state: props.error ? 'error' : 'default',
  wcagLevel: props.wcagLevel,
  disabled: props.disabled,
}))

const handleChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  emit('update:modelValue', target.value)
}
</script>
