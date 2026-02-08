<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <h1 :class="titleClass">データフェッチング</h1>
      <p :class="descClass">
        TanStack Query, useFetch, VueUse などを使ったデータ取得パターンとキャッシング戦略を学びます。
      </p>
    </div>

    <div :class="gridClass">
      <!-- TanStack Query vs VueUse -->
      <NuxtLink to="/examples/query-comparison" :class="cardClass">
        <div :class="iconClass">🔄</div>
        <h2 :class="cardTitleClass">TanStack Query vs VueUse</h2>
        <p :class="cardDescClass">
          2つのデータフェッチングライブラリの比較と使い分け
        </p>
      </NuxtLink>

      <!-- useFetch キャッシュ -->
      <NuxtLink to="/examples/usefetch-cache" :class="cardClass">
        <div :class="iconClass">💾</div>
        <h2 :class="cardTitleClass">useFetch キャッシュ</h2>
        <p :class="cardDescClass">
          useFetchのキャッシング機能と再検証戦略
        </p>
      </NuxtLink>

      <!-- Nuxt vs VueUse useFetch比較 -->
      <NuxtLink to="/examples/usefetch-comparison" :class="cardClass">
        <div :class="iconClass">⚖️</div>
        <h2 :class="cardTitleClass">Nuxt vs VueUse useFetch比較</h2>
        <p :class="cardDescClass">
          NuxtのuseFetchとVueUseのuseFetchの違いを比較
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const containerClass = css({
  minH: 'screen',
  bg: 'gray.50',
  py: '12',
  px: { base: 4, md: 8 },
})

const headerClass = css({
  maxW: '4xl',
  mx: 'auto',
  mb: '12',
  textAlign: 'center',
})

const titleClass = css({
  fontSize: { base: '3xl', md: '4xl' },
  fontWeight: 'bold',
  color: 'gray.900',
  mb: '4',
})

const descClass = css({
  fontSize: { base: 'md', md: 'lg' },
  color: 'gray.600',
  lineHeight: '1.7',
})

const gridClass = css({
  maxW: '6xl',
  mx: 'auto',
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: '6',
})

const cardClass = css({
  display: 'block',
  p: '6',
  bg: 'white',
  rounded: 'xl',
  boxShadow: 'md',
  textDecoration: 'none',
  transition: 'all 0.3s',
  border: '2px solid',
  borderColor: 'transparent',
  _hover: {
    transform: 'translateY(-4px)',
    boxShadow: 'xl',
    borderColor: 'green.300',
  },
})

const iconClass = css({
  fontSize: '4xl',
  mb: '3',
})

const cardTitleClass = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  color: 'gray.900',
  mb: '2',
})

const cardDescClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  lineHeight: '1.6',
})
</script>
