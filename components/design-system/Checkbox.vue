<template>
  <div :class="cx(slots.root)">
    <div :class="slots.control">
      <input
        :id="checkboxId"
        ref="checkboxRef"
        type="checkbox"
        v-bind="$attrs"
        :checked="modelValue"
        :disabled="disabled"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorId : helpText ? helpId : undefined"
        :class="slots.input"
        @change="handleChange"
      >
    </div>
    <div :class="css({ flex: '1' })">
      <label
        :for="checkboxId"
        :class="cx(slots.label, disabled && css({ cursor: 'not-allowed' }))"
        :data-disabled="disabled ? 'true' : undefined"
      >
        {{ label }}
      </label>
      <p
        v-if="helpText && !error"
        :id="helpId"
        :class="slots.helper"
      >
        {{ helpText }}
      </p>
      <p
        v-if="error"
        :id="errorId"
        role="alert"
        :class="slots.errorText"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css, cx } from '~/styled-system/css'
import { checkbox } from '~/styled-system/recipes'

type WCAGLevel = 'A' | 'AA' | 'AAA'

interface Props {
  label: string
  modelValue?: boolean
  error?: string
  helpText?: string
  indeterminate?: boolean
  disabled?: boolean
  wcagLevel?: WCAGLevel
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  indeterminate: false,
  disabled: false,
  wcagLevel: 'AA',
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const checkboxId = useId()
const errorId = `${checkboxId}-error`
const helpId = `${checkboxId}-help`
const checkboxRef = ref<HTMLInputElement>()

const slots = computed(() => checkbox({
  wcagLevel: props.wcagLevel,
  state: props.error ? 'error' : 'default',
}))

watch(() => props.indeterminate, (newValue) => {
  if (checkboxRef.value) {
    checkboxRef.value.indeterminate = newValue
  }
}, { immediate: true })

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>
