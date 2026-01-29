<template>
  <MarkdownViewer :content="content" />
</template>

<script setup lang="ts">
import stateManagementMd from '~/docs/state-management-comparison.md?raw'

const content = stateManagementMd
</script>
