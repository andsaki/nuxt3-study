<script setup lang="ts">
const props = defineProps<{
  fail: boolean
}>()

watchEffect(() => {
  if (props.fail) {
    throw new Error('意図的にエラーを投げました')
  }
})
</script>

<template>
  <div class="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900">
    ErrorGenerator 子コンポーネント
  </div>
</template>
