<script setup lang="ts">
import { css } from '~/styled-system/css'
import { useForm, type Path } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { z } from 'zod'
import type { CSSProperties, InputHTMLAttributes, Ref } from 'vue'
import DesignSystemInput from './Input.vue'
import DesignSystemButton from './Button.vue'
import type { ComponentWCAGLevel } from './constants/accessibility'

defineOptions({
  inheritAttrs: false,
})

const formClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
})

export interface FormFieldConfig {
  name: string
  label: string
  type?: InputHTMLAttributes['type']
  placeholder?: string
  helperText?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  isThirdPartyInput?: boolean
  autoComplete?: InputHTMLAttributes['autocomplete']
}

type SubmitVariant = 'primary' | 'secondary' | 'outline'

type FormValue = string | number | undefined
type FormValues = Record<string, FormValue>

interface FormProps {
  schema: z.ZodTypeAny
  fields: FormFieldConfig[]
  submitText?: string
  submitVariant?: SubmitVariant
  submitSize?: 'sm' | 'md' | 'lg'
  wcagLevel?: ComponentWCAGLevel
  defaultValues?: FormValues
  style?: CSSProperties | string
  isSubmitting?: boolean
  onSubmit?: (values: FormValues) => void
}

const props = withDefaults(defineProps<FormProps>(), {
  submitText: '送信',
  submitVariant: 'primary',
  submitSize: 'md',
  wcagLevel: 'AA',
  defaultValues: undefined,
  style: undefined,
  isSubmitting: false,
  onSubmit: undefined,
})

const emit = defineEmits<{
  submit: [values: FormValues]
}>()

const { handleSubmit, errors, defineField } = useForm<FormValues>({
  validationSchema: toTypedSchema(props.schema),
  initialValues: props.defaultValues,
})

type FieldModel = {
  config: FormFieldConfig
  model: Ref<FormValue>
}

const fieldsWithModels: FieldModel[] = props.fields.map((field) => {
  const [model] = defineField<Path<FormValues>, FormValue>(field.name as Path<FormValues>)
  return {
    config: field,
    model,
  }
})

const onSubmit = handleSubmit((values) => {
  props.onSubmit?.(values)
  emit('submit', values)
})
</script>

<template>
  <form
    :class="formClass"
    :style="style"
    novalidate
    @submit.prevent="onSubmit"
  >
    <DesignSystemInput
      v-for="field in fieldsWithModels"
      :key="field.config.name"
      :model-value="field.model.value ?? ''"
      @update:modelValue="field.model.value = $event"
      :label="field.config.label"
      :type="field.config.type || 'text'"
      :placeholder="field.config.placeholder"
      :helper-text="field.config.helperText"
      :error="errors[field.config.name]"
      :required="field.config.required"
      :size="field.config.size"
      :wcag-level="wcagLevel"
      :autocomplete="field.config.isThirdPartyInput ? 'off' : field.config.autoComplete"
    />

    <DesignSystemButton
      type="submit"
      :variant="submitVariant"
      :size="submitSize"
      :wcag-level="wcagLevel"
      :is-loading="isSubmitting"
      :style="{ alignSelf: 'flex-start' }"
    >
      {{ submitText }}
    </DesignSystemButton>
  </form>
</template>
