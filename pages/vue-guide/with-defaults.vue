<template>
  <MarkdownViewer v-if="content" :content="content" />
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/docs/withDefaults-guide.md', {
  transform: (data) => data as string
})
</script>
