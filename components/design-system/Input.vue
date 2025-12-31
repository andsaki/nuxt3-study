<template>
  <div :class="css({ mb: '4' })">
    <!-- ラベル: for属性でinputと関連付け -->
    <label
      :for="inputId"
      :class="css({
        display: 'block',
        mb: '2',
        fontSize: 'sm',
        fontWeight: 'medium',
        color: 'contents.primary',
      })"
    >
      {{ label }}
      <!-- 必須項目の表示 -->
      <span
        v-if="required"
        :class="css({ color: 'red.600', ml: '1' })"
        aria-label="必須"
      >
        *
      </span>
    </label>

    <!-- 入力フィールドのラッパー（クリアボタン用） -->
    <div :class="css({ position: 'relative' })">
      <input
        :id="inputId"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :aria-required="required"
        :aria-invalid="!!error"
        :aria-describedby="ariaDescribedBy"
        :class="cx(inputClass, clearable && modelValue ? css({ paddingRight: '40px' }) : undefined)"
        @input="onInput"
      >

      <!-- クリアボタン -->
      <button
        v-if="clearable && modelValue && !disabled"
        type="button"
        aria-label="入力をクリア"
        :class="css({
          position: 'absolute',
          right: '2',
          top: '50%',
          transform: 'translateY(-50%)',
          padding: '2',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: 'contents.secondary',
          fontSize: 'lg',
          lineHeight: '1',
          borderRadius: 'sm',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          _hover: {
            backgroundColor: 'bg.tertiary',
            color: 'contents.primary',
          },
          _focus: {
            outline: '2px solid',
            outlineColor: 'border.focus',
          },
        })"
        @click="handleClear"
      >
        ✕
      </button>
    </div>

    <!-- エラーメッセージ: role="alert"で即座に読み上げ -->
    <div
      v-if="error"
      :id="errorId"
      role="alert"
      aria-live="polite"
      :class="css({
        mt: '2',
        fontSize: 'sm',
        color: 'red.700',
        lineHeight: 'normal',
      })"
    >
      {{ error }}
    </div>

    <!-- ヘルプテキスト: エラーがない場合のみ表示 -->
    <div
      v-if="helperText && !error"
      :id="helperId"
      :class="css({
        mt: '2',
        fontSize: 'sm',
        color: 'contents.secondary',
        lineHeight: 'normal',
      })"
    >
      {{ helperText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { css, cx } from '~/styled-system/css'
import { input as inputRecipe } from '~/styled-system/recipes'

/**
 * アクセシブルな入力コンポーネント
 *
 * 機能:
 * - ラベルとinputの関連付け（for/id）
 * - エラー状態の適切な伝達（aria-invalid, aria-describedby）
 * - 必須項目の明示（aria-required）
 * - フォーカス表示
 * - WCAG AA準拠のカラーコントラスト
 */

type WCAGLevel = 'A' | 'AA' | 'AAA'

interface Props {
  /** ラベルテキスト */
  label: string
  /** v-model用の値 */
  modelValue?: string | number
  /** エラーメッセージ */
  error?: string
  /** ヘルプテキスト */
  helperText?: string
  /** 入力欄のサイズ */
  size?: 'sm' | 'md' | 'lg'
  /** 必須項目かどうか */
  required?: boolean
  /** 無効化 */
  disabled?: boolean
  /** WCAGアクセシビリティレベル (A/AA/AAA) */
  wcagLevel?: WCAGLevel
  /** クリアボタンを表示するかどうか */
  clearable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  size: 'md',
  required: false,
  disabled: false,
  wcagLevel: 'AA',
  clearable: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'clear': []
}>()

// ユニークなIDを自動生成
const inputId = useId()
const errorId = `${inputId}-error`
const helperId = `${inputId}-helper`

// aria-describedbyの値を構築
const ariaDescribedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId)
  if (props.helperText && !props.error) ids.push(helperId)
  return ids.length > 0 ? ids.join(' ') : undefined
})

// レシピクラス
const inputClass = computed(() => inputRecipe({
  size: props.size,
  state: props.error ? 'error' : 'default',
  wcagLevel: props.wcagLevel,
}))

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleClear = () => {
  emit('update:modelValue', '')
  emit('clear')
}
</script>
