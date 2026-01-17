<script setup lang="ts">
import { css, cx } from '~/styled-system/css'
import { defineComponent, h } from 'vue'
import { useForm, type FormContext, type Path } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import type { CSSProperties, InputHTMLAttributes, PropType, Ref } from 'vue'
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

export const FormWithHook = defineComponent({
  name: 'DesignSystemFormWithHook',
  inheritAttrs: false,
  props: {
    form: {
      type: Object as () => FormContext<Record<string, unknown>>,
      required: true,
    },
    style: {
      type: [Object, String] as PropType<CSSProperties | string | undefined>,
      default: undefined,
    },
    onSubmit: {
      type: Function as PropType<((values: Record<string, unknown>) => void) | undefined>,
      default: undefined,
    },
  },
  emits: ['submit'],
  setup(formProps, { slots, emit, attrs }) {
    const handle = formProps.form.handleSubmit((values) => {
      formProps.onSubmit?.(values)
      emit('submit', values)
    })

    return () =>
      h(
        'form',
        {
          ...attrs,
          class: cx(formClass, attrs.class as string | undefined),
          style: formProps.style,
          novalidate: true,
          onSubmit: (event: Event) => {
            event.preventDefault()
            handle()
          },
        },
        slots.default?.({ form: formProps.form }),
      )
  },
})

export const formSchemas = {
  email: z.string().email('有効なメールアドレスを入力してください'),
  required: (fieldName: string) => z.string().min(1, `${fieldName}は必須です`),
  minLength: (min: number, fieldName: string) =>
    z.string().min(min, `${fieldName}は${min}文字以上で入力してください`),
  maxLength: (max: number, fieldName: string) =>
    z.string().max(max, `${fieldName}は${max}文字以内で入力してください`),
  password: z
    .string()
    .min(8, 'パスワードは8文字以上で入力してください')
    .regex(/[A-Z]/, 'パスワードには大文字を含めてください')
    .regex(/[a-z]/, 'パスワードには小文字を含めてください')
    .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  urlString: z.string().url('有効なURLを入力してください'),
  phone: z
    .string()
    .regex(/^[0-9-]+$/, '電話番号は数字とハイフンのみで入力してください'),
} as const
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
