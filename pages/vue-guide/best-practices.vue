<template>
  <MarkdownViewer :content="content" />
</template>

<script setup lang="ts">
import bestPracticesMd from '~/docs/vue-best-practices.md?raw'

const content = bestPracticesMd
</script>
