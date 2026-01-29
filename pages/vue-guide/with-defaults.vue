<template>
  <MarkdownViewer :content="content" />
</template>

<script setup lang="ts">
import withDefaultsMd from '~/docs/withDefaults-guide.md?raw'

const content = withDefaultsMd
</script>
