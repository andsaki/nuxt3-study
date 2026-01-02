<template>
  <div :class="css({ width: '100%' })">
    <label
      :for="textareaId"
      :class="css({
        display: 'block',
        mb: '2',
        fontSize: 'sm',
        fontWeight: 'medium',
        color: disabled ? 'contents.disabled' : 'contents.primary',
      })"
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

    <div :class="css({ position: 'relative' })">
      <textarea
        :id="textareaId"
        v-bind="$attrs"
        :value="modelValue"
        :disabled="disabled"
        :required="required"
        :maxlength="maxLength"
        :aria-invalid="!!error"
        :aria-required="required"
        :aria-describedby="ariaDescribedBy"
        :class="textareaClass"
        :style="{ resize: 'vertical' }"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        @mousedown="isKeyboardFocus = false"
      />
    </div>

    <!-- 文字数カウント -->
    <div
      v-if="showCount && maxLength"
      :id="countId"
      :class="css({
        mt: '1',
        fontSize: 'xs',
        color: charCount > maxLength ? 'red.600' : 'contents.secondary',
        textAlign: 'right',
      })"
      aria-live="polite"
    >
      {{ charCount }} / {{ maxLength }}
    </div>

    <!-- ヘルプテキスト -->
    <p
      v-if="helpText && !error"
      :id="helpId"
      :class="css({
        mt: '1',
        fontSize: 'sm',
        color: 'contents.secondary',
        lineHeight: 'normal',
      })"
    >
      {{ helpText }}
    </p>

    <!-- エラーメッセージ -->
    <p
      v-if="error"
      :id="errorId"
      role="alert"
      :class="css({
        mt: '1',
        fontSize: 'sm',
        color: 'red.600',
        lineHeight: 'normal',
      })"
    >
      {{ error }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
import { textarea as textareaRecipe } from '~/styled-system/recipes'

/**
 * アクセシブルなテキストエリアコンポーネント
 *
 * 機能:
 * - キーボード操作対応
 * - スクリーンリーダー対応
 * - エラー表示とaria-invalid
 * - 文字数カウント表示
 * - フォーカス表示（キーボード操作時のみ）
 * - リサイズ可能
 */

type WCAGLevel = 'A' | 'AA' | 'AAA'

interface Props {
  /** ラベルテキスト */
  label: string
  /** v-model用の値 */
  modelValue?: string
  /** エラーメッセージ */
  error?: string
  /** ヘルプテキスト */
  helpText?: string
  /** 必須項目かどうか */
  required?: boolean
  /** 無効化 */
  disabled?: boolean
  /** 文字数カウント表示 */
  showCount?: boolean
  /** 最大文字数 */
  maxLength?: number
  /** WCAGアクセシビリティレベル (A/AA/AAA) */
  wcagLevel?: WCAGLevel
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  required: false,
  disabled: false,
  showCount: false,
  wcagLevel: 'AA',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

// ユニークなIDを自動生成
const textareaId = useId()
const errorId = `${textareaId}-error`
const helpId = `${textareaId}-help`
const countId = `${textareaId}-count`

// キーボードフォーカスの検出
const isKeyboardFocus = ref(false)

// 文字数カウント
const charCount = ref(0)

// aria-describedbyの値を構築
const ariaDescribedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId)
  if (props.helpText && !props.error) ids.push(helpId)
  if (props.showCount && props.maxLength) ids.push(countId)
  return ids.length > 0 ? ids.join(' ') : undefined
})

// レシピクラス
const textareaClass = computed(() => textareaRecipe({
  state: props.error ? 'error' : 'default',
  wcagLevel: props.wcagLevel,
}))

// 初期文字数の設定
watch(() => props.modelValue, (newValue) => {
  charCount.value = (newValue || '').length
}, { immediate: true })

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  charCount.value = target.value.length
  emit('update:modelValue', target.value)
}

const handleFocus = (event: FocusEvent) => {
  if (isKeyboardFocus.value && !props.disabled) {
    (event.target as HTMLTextAreaElement).setAttribute('data-focused', 'true')
  }
}

const handleBlur = (event: FocusEvent) => {
  (event.target as HTMLTextAreaElement).removeAttribute('data-focused')
}

// グローバルなキーボード/マウス検出
onMounted(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      isKeyboardFocus.value = true
    }
  }

  const handleMouseDown = () => {
    isKeyboardFocus.value = false
  }

  window.addEventListener('keydown', handleKeyDown)
  window.addEventListener('mousedown', handleMouseDown)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeyDown)
    window.removeEventListener('mousedown', handleMouseDown)
  })
})
</script>
