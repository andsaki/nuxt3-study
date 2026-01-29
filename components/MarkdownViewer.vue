<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <DesignSystemButton
        variant="secondary"
        size="sm"
        @click="navigateTo('/vue-guide')"
      >
        ← 一覧に戻る
      </DesignSystemButton>
    </div>

    <article :class="articleClass">
      <div v-html="renderedContent" :class="contentClass" />
    </article>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const renderedContent = computed(() => {
  return marked(props.content)
})

// スタイル
const containerClass = css({
  minH: 'screen',
  bg: 'gray.50',
  py: 8,
})

const headerClass = css({
  maxW: '4xl',
  mx: 'auto',
  px: { base: 4, md: 6 },
  mb: 6,
})

const articleClass = css({
  maxW: '4xl',
  mx: 'auto',
  px: { base: 4, md: 6 },
  bg: 'white',
  rounded: 'lg',
  shadow: 'md',
  p: { base: 6, md: 8 },
})

const contentClass = css({
  '& h1': {
    fontSize: '2xl',
    fontWeight: 'bold',
    color: 'gray.900',
    mb: 4,
    pb: 2,
    borderBottom: '2px solid',
    borderColor: 'gray.200',
  },
  '& h2': {
    fontSize: 'xl',
    fontWeight: 'bold',
    color: 'gray.900',
    mt: 8,
    mb: 4,
  },
  '& h3': {
    fontSize: 'lg',
    fontWeight: 'semibold',
    color: 'gray.800',
    mt: 6,
    mb: 3,
  },
  '& p': {
    color: 'gray.700',
    lineHeight: '1.7',
    mb: 4,
  },
  '& ul, & ol': {
    ml: 6,
    mb: 4,
    color: 'gray.700',
    lineHeight: '1.7',
  },
  '& li': {
    mb: 2,
  },
  '& code': {
    bg: 'gray.100',
    color: 'pink.600',
    px: 1.5,
    py: 0.5,
    rounded: 'sm',
    fontSize: '0.9em',
    fontFamily: 'monospace',
  },
  '& pre': {
    bg: 'gray.900',
    color: 'gray.100',
    p: 4,
    rounded: 'md',
    overflow: 'auto',
    mb: 4,
  },
  '& pre code': {
    bg: 'transparent',
    color: 'inherit',
    p: 0,
  },
  '& blockquote': {
    borderLeft: '4px solid',
    borderColor: 'blue.500',
    pl: 4,
    py: 2,
    bg: 'blue.50',
    color: 'gray.700',
    mb: 4,
    fontStyle: 'italic',
  },
  '& a': {
    color: 'blue.600',
    textDecoration: 'underline',
    _hover: {
      color: 'blue.800',
    },
  },
  '& table': {
    width: 'full',
    borderCollapse: 'collapse',
    mb: 4,
  },
  '& th': {
    bg: 'gray.100',
    color: 'gray.900',
    fontWeight: 'semibold',
    px: 4,
    py: 2,
    borderBottom: '2px solid',
    borderColor: 'gray.300',
    textAlign: 'left',
  },
  '& td': {
    px: 4,
    py: 2,
    borderBottom: '1px solid',
    borderColor: 'gray.200',
    color: 'gray.700',
  },
  '& hr': {
    my: 8,
    borderColor: 'gray.200',
  },
})
</script>
