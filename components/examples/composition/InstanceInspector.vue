<script setup lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { css } from '~/styled-system/css'

const instance = getCurrentInstance()

const summary = computed(() => {
  if (!instance) {
    return {
      uid: 'n/a',
      parent: 'なし',
      version: 'unknown',
    }
  }

  return {
    uid: instance.uid,
    parent: instance.parent ? `#${instance.parent.uid}` : 'root',
    version: instance.appContext.app.version ?? 'unknown',
  }
})

const sectionClass = css({
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'gray.200',
  backgroundColor: 'gray.50',
  p: '4',
  fontSize: 'sm',
  color: 'gray.800',
})

const titleClass = css({
  fontWeight: 'semibold',
})

const listClass = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  marginTop: '2',
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
  fontFamily: 'mono',
})

const noteClass = css({
  marginTop: '2',
  fontSize: 'xs',
  color: 'gray.500',
})
</script>

<template>
  <section :class="sectionClass">
    <p :class="titleClass">getCurrentInstance()</p>
    <ul :class="listClass">
      <li>uid: {{ summary.uid }}</li>
      <li>parent: {{ summary.parent }}</li>
      <li>app.version: {{ summary.version }}</li>
    </ul>
    <p :class="noteClass">
      プラグインや高度なローレベル API を書くときに利用します。
    </p>
  </section>
</template>
