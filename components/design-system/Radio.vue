<template>
  <div :class="cx(slots.root)">
    <input
      :id="radioId"
      type="radio"
      v-bind="$attrs"
      :value="value"
      :checked="modelValue === value"
      :disabled="disabled"
      :aria-invalid="!!error"
      :aria-describedby="error ? errorId : helpText ? helpId : undefined"
      :class="slots.control"
      @change="handleChange"
    >
    <div>
      <label
        :for="radioId"
        :class="slots.label"
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
        :class="slots.error"
      >
        {{ error }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { cx } from '~/styled-system/css'
import { radio as radioRecipe } from '~/styled-system/recipes'

type WCAGLevel = 'A' | 'AA' | 'AAA'

interface Props {
  label: string
  value: string
  modelValue?: string
  error?: string
  helpText?: string
  disabled?: boolean
  wcagLevel?: WCAGLevel
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  wcagLevel: 'AA',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const radioId = useId()
const errorId = `${radioId}-error`
const helpId = `${radioId}-help`

const slots = computed(() => radioRecipe({
  wcagLevel: props.wcagLevel,
  state: props.error ? 'error' : 'default',
}))

const handleChange = () => {
  emit('update:modelValue', props.value)
}
</script>
