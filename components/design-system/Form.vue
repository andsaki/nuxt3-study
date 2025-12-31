<template>
  <form
    :class="css({ display: 'flex', flexDirection: 'column', gap: 4 })"
    @submit="onSubmit"
    novalidate
  >
    <slot
      :errors="errors"
      :is-submitting="isSubmitting"
      :define-field="defineField"
    />
  </form>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { css } from '~/styled-system/css'
import { useForm } from 'vee-validate'

interface Props {
  /**
   * Zodバリデーションスキーマ（toTypedSchemaでラップ済み）
   */
  validationSchema: any
  /**
   * デフォルト値
   */
  initialValues?: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  submit: [values: any]
}>()

// VeeValidateのフォーム設定
const { errors, handleSubmit, isSubmitting, defineField } = useForm({
  validationSchema: props.validationSchema,
  initialValues: props.initialValues,
})

// 送信処理
const onSubmit = handleSubmit((values) => {
  emit('submit', values)
})

// 外部からアクセス可能にする
defineExpose({
  errors,
  isSubmitting,
  defineField,
})
</script>
