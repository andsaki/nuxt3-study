<template>
  <form
    :class="css({ display: 'flex', flexDirection: 'column', gap: 4 })"
    novalidate
    @submit="onSubmit"
  >
    <slot
      :errors="errors"
      :is-submitting="isSubmitting"
      :define-field="defineField"
    />
  </form>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { css } from '~/styled-system/css'
import { useForm } from 'vee-validate'

interface Props {
  /**
   * Zodバリデーションスキーマ（toTypedSchemaでラップ済み）
   */
  validationSchema: unknown
  /**
   * デフォルト値
   */
  initialValues?: Record<string, unknown>
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [values: T]
}>()

// VeeValidateのフォーム設定
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
})

// 送信処理
const onSubmit = handleSubmit((values) => {
  emit('submit', values as T)
})

// 外部からアクセス可能にする
defineExpose({
  errors,
  isSubmitting,
  defineField,
})
</script>
