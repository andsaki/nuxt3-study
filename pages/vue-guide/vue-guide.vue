<template>
  <MarkdownViewer :content="content" />
</template>

<script setup lang="ts">
import vueGuideMd from '~/docs/vue-guide.md?raw'

const content = vueGuideMd
</script>
