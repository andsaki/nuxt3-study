<script setup lang="ts">
import { computed, ref, useAttrs, useId, watch } from 'vue'
import { css, cx } from '~/styled-system/css'
import { colorpicker } from '~/styled-system/recipes'
import type { ComponentWCAGLevel } from './constants/accessibility'

defineOptions({
  inheritAttrs: false,
})

const containerClass = css({ mb: 4 })
const labelClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  mb: 2,
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'contents.primary',
})
const pickerRowClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 3,
})
const valueBadgeClass = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  px: 3,
  py: 1,
  borderRadius: 'md',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  backgroundColor: 'bg.secondary',
  color: 'contents.primary',
})
const helperClass = css({
  mt: 2,
  fontSize: 'sm',
  color: 'contents.secondary',
})
const errorClass = css({
  mt: 2,
  fontSize: 'sm',
  color: 'colors.red.700',
})

type ColorPickerProps = {
  label: string
  helperText?: string
  error?: string
  showValueLabel?: boolean
  modelValue?: string
  defaultValue?: string
  size?: 'sm' | 'md' | 'lg'
  wcagLevel?: Extract<ComponentWCAGLevel, 'AA' | 'AAA'>
  class?: string
  required?: boolean
  disabled?: boolean
  name?: string
  id?: string
  autofocus?: boolean
  form?: string
}

const props = withDefaults(defineProps<ColorPickerProps>(), {
  helperText: undefined,
  error: undefined,
  showValueLabel: true,
  modelValue: undefined,
  defaultValue: '#000000',
  size: 'md',
  wcagLevel: 'AA',
  class: '',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [event: Event]
}>()

const attrs = useAttrs()
const autoId = useId()
const inputId = computed(() => props.id ?? autoId)
const helperId = computed(() => `${inputId.value}-helper`)
const errorId = computed(() => `${inputId.value}-error`)

const internalValue = ref(props.modelValue ?? props.defaultValue ?? '#000000')

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) {
      internalValue.value = value
    }
  },
)

const currentValue = computed(() => props.modelValue ?? internalValue.value)

const describedBy = computed(() => {
  const ids: string[] = []
  if (props.error) ids.push(errorId.value)
  if (props.helperText && !props.error) ids.push(helperId.value)
  return ids.length > 0 ? ids.join(' ') : undefined
})

const slots = computed(() =>
  colorpicker({
    size: props.size ?? 'md',
    wcagLevel: props.wcagLevel ?? 'AA',
  }))

const inputClass = computed(() => cx(slots.value, props.class))

const inputAttrs = computed(() => {
  const {
    class: _class,
    value: _value,
    id: _id,
    type: _type,
    modelValue: _model,
    onChange: _onChange,
    ...rest
  } = attrs as Record<string, unknown>
  return rest
})

const userChangeListener = computed(() => (attrs as Record<string, unknown>).onChange as ((event: Event) => void) | undefined)

const handleChange = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  if (props.modelValue === undefined) {
    internalValue.value = value
  }
  emit('update:modelValue', value)
  emit('change', event)
  userChangeListener.value?.(event)
}
</script>

<template>
  <div :class="containerClass">
    <label :for="inputId" :class="labelClass">
      {{ label }}
      <span
        v-if="required"
        :class="css({ color: 'colors.red.600', fontWeight: 'bold' })"
        aria-label="必須"
      >
        *
      </span>
    </label>
    <div :class="pickerRowClass">
      <input
        v-bind="inputAttrs"
        :id="inputId"
        type="color"
        :value="currentValue"
        :aria-describedby="describedBy"
        :aria-invalid="!!error"
        :aria-required="required || undefined"
        :disabled="disabled"
        :required="required"
        :class="inputClass"
        @change="handleChange"
      >
      <span
        v-if="showValueLabel"
        :class="valueBadgeClass"
        aria-live="polite"
      >
        {{ (currentValue || '').toUpperCase() }}
      </span>
    </div>
    <p
      v-if="error"
      :id="errorId"
      role="alert"
      aria-live="polite"
      :class="errorClass"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helperText"
      :id="helperId"
      :class="helperClass"
    >
      {{ helperText }}
    </p>
  </div>
</template>
