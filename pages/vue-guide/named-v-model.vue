<template>
  <MarkdownViewer :content="content" />
</template>

<script setup lang="ts">
import namedVModelMd from '~/docs/named-v-model.md?raw'

const content = namedVModelMd
</script>
