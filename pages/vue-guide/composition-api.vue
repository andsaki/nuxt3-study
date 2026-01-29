<template>
  <MarkdownViewer v-if="content" :content="content" />
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/docs/vue-composition-api-reference.md', {
  transform: (data) => data as string
})
</script>
