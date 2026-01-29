<template>
  <MarkdownViewer :content="content" />
</template>

<script setup lang="ts">
import compositionApiMd from '~/docs/vue-composition-api-reference.md?raw'

const content = compositionApiMd
</script>
