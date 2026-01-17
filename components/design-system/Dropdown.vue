<script setup lang="ts">
import { computed, onBeforeUnmount, ref, useId, watch } from 'vue'
import type { HTMLAttributes } from 'vue'
import { css, cx } from '~/styled-system/css'
import { dropdown as dropdownRecipe } from '~/styled-system/recipes'
import type { ComponentWCAGLevel } from './constants/accessibility'

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  label: string
  options: DropdownOption[]
  modelValue?: string
  placeholder?: string
  error?: string
  helperText?: string
  disabled?: boolean
  required?: boolean
  wcagLevel?: ComponentWCAGLevel
}

const props = withDefaults(defineProps<DropdownProps>(), {
  placeholder: '選択してください',
  modelValue: undefined,
  error: undefined,
  helperText: undefined,
  disabled: false,
  required: false,
  wcagLevel: 'AA',
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  change: [value: string]
}>()

const dropdownRef = ref<HTMLDivElement | null>(null)
const buttonRef = ref<HTMLButtonElement | null>(null)
const isOpen = ref(false)
const focusedIndex = ref(-1)
const selectedValue = ref(props.modelValue ?? '')

watch(
  () => props.modelValue,
  (value) => {
    if (value !== undefined) {
      selectedValue.value = value
    }
  },
)

const autoId = useId()
const buttonId = `dropdown-button-${autoId}`
const listId = `dropdown-list-${autoId}`
const errorId = `dropdown-error-${autoId}`
const helperId = `dropdown-helper-${autoId}`

const selectedOption = computed(() => props.options.find(option => option.value === selectedValue.value))
const displayText = computed(() => selectedOption.value?.label ?? props.placeholder)

const slots = computed(() => dropdownRecipe({
  state: props.error ? 'error' : 'default',
  placeholder: selectedValue.value ? 'filled' : 'empty',
  wcagLevel: props.wcagLevel,
}))

const arrowOpenClass = css({
  transform: 'translateY(-50%) rotate(180deg)',
})
const optionFocusedClass = css({
  backgroundColor: 'blue.50',
})
const optionSelectedClass = css({
  backgroundColor: 'blue.100',
  fontWeight: 'semibold',
})
const optionDisabledClass = css({
  color: 'contents.disabled',
  cursor: 'not-allowed',
  _hover: { backgroundColor: 'transparent' },
})

const closeOnOutsideClick = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

watch(isOpen, (open) => {
  if (open) {
    document.addEventListener('mousedown', closeOnOutsideClick)
  } else {
    document.removeEventListener('mousedown', closeOnOutsideClick)
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', closeOnOutsideClick)
})

const handleSelect = (value: string) => {
  selectedValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
  isOpen.value = false
  buttonRef.value?.focus()
}

const toggleOpen = () => {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    const index = props.options.findIndex(option => option.value === selectedValue.value)
    focusedIndex.value = index >= 0 ? index : 0
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return
  switch (event.key) {
    case 'Enter':
    case ' ':
      event.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        focusedIndex.value = props.options.findIndex(option => option.value === selectedValue.value)
      } else if (focusedIndex.value >= 0) {
        const option = props.options[focusedIndex.value]
        if (!option?.disabled) {
          handleSelect(option.value)
        }
      }
      break
    case 'Escape':
      isOpen.value = false
      buttonRef.value?.focus()
      break
    case 'ArrowDown':
      event.preventDefault()
      if (!isOpen.value) {
        isOpen.value = true
        focusedIndex.value = 0
      } else {
        focusedIndex.value = Math.min(focusedIndex.value + 1, props.options.length - 1)
      }
      break
    case 'ArrowUp':
      event.preventDefault()
      if (isOpen.value) {
        focusedIndex.value = Math.max(focusedIndex.value - 1, 0)
      }
      break
  }
}
</script>

<template>
  <div :class="slots.root" ref="dropdownRef">
    <label :for="buttonId" :class="slots.label">
      {{ label }}
      <span
        v-if="required"
        :class="slots.requiredMark"
        aria-label="必須"
      >
        *
      </span>
    </label>
    <div :class="slots.triggerWrapper">
      <button
        ref="buttonRef"
        :id="buttonId"
        type="button"
        :disabled="disabled"
        :aria-haspopup="'listbox'"
        :aria-expanded="isOpen"
        :aria-label="`${label} ${displayText}`"
        :aria-describedby="error ? errorId : helperText ? helperId : undefined"
        :class="slots.trigger"
        @click="toggleOpen"
        @keydown="handleKeyDown"
      >
        {{ displayText }}
        <span :class="cx(slots.arrow, isOpen && arrowOpenClass)">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </button>

      <ul
        v-if="isOpen"
        :id="listId"
        role="listbox"
        :aria-labelledby="buttonId"
        :class="slots.menu"
      >
        <li
          v-for="(option, index) in props.options"
          :key="option.value"
          role="option"
          :aria-selected="selectedValue === option.value"
          :class="cx(
            slots.option,
            focusedIndex === index && optionFocusedClass,
            selectedValue === option.value && optionSelectedClass,
            option.disabled && optionDisabledClass
          )"
          @click="!option.disabled && handleSelect(option.value)"
          @keydown.enter.prevent="!option.disabled && handleSelect(option.value)"
          @keydown.space.prevent="!option.disabled && handleSelect(option.value)"
          @mouseenter="!option.disabled && (focusedIndex = index)"
        >
          {{ option.label }}
          <span
            v-if="selectedValue === option.value"
            :class="slots.checkmark"
          >
            ✓
          </span>
        </li>
      </ul>
    </div>

    <p
      v-if="error"
      :id="errorId"
      role="alert"
      :class="slots.error"
    >
      {{ error }}
    </p>
    <p
      v-else-if="helperText"
      :id="helperId"
      :class="slots.helper"
    >
      {{ helperText }}
    </p>
  </div>
</template>
