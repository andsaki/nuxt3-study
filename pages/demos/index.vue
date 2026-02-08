<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <h1 :class="titleClass">レンダリング・パフォーマンス デモ</h1>
      <p :class="descClass">
        SSR, SSG, ISR などのレンダリングモードと、Doherty Threshold (400ms) のパフォーマンス最適化デモを紹介します。
      </p>
    </div>

    <div :class="gridClass">
      <!-- Doherty Threshold -->
      <NuxtLink to="/doherty-threshold" :class="demoCardClass">
        <div :class="iconClass">⚡</div>
        <h2 :class="cardTitleClass">Doherty Threshold</h2>
        <p :class="cardDescClass">
          400ms以内のレスポンス実装とユーザー体験の向上
        </p>
      </NuxtLink>

      <!-- SSR デモ -->
      <NuxtLink to="/ssr-demo" :class="demoCardClass">
        <div :class="iconClass">🖥️</div>
        <h2 :class="cardTitleClass">SSR デモ</h2>
        <p :class="cardDescClass">
          Server-Side Rendering の動作確認とSEO最適化
        </p>
      </NuxtLink>

      <!-- SSG デモ -->
      <NuxtLink to="/ssg-demo" :class="demoCardClass">
        <div :class="iconClass">🏗️</div>
        <h2 :class="cardTitleClass">SSG デモ</h2>
        <p :class="cardDescClass">
          Static Site Generation によるビルド時の静的生成
        </p>
      </NuxtLink>

      <!-- ISR デモ -->
      <NuxtLink to="/isr-demo" :class="demoCardClass">
        <div :class="iconClass">⚡</div>
        <h2 :class="cardTitleClass">ISR デモ</h2>
        <p :class="cardDescClass">
          Incremental Static Regeneration の実装例
        </p>
      </NuxtLink>

      <!-- SSR 検証 -->
      <NuxtLink to="/verify-ssr" :class="demoCardClass">
        <div :class="iconClass">🔍</div>
        <h2 :class="cardTitleClass">SSR 検証ページ</h2>
        <p :class="cardDescClass">
          サーバーサイドレンダリングが正しく動作しているか検証
        </p>
      </NuxtLink>

      <!-- レンダリングモード解説 -->
      <NuxtLink to="/examples/rendering-modes" :class="demoCardClass">
        <div :class="iconClass">📚</div>
        <h2 :class="cardTitleClass">レンダリングモード解説</h2>
        <p :class="cardDescClass">
          各レンダリングモードの特徴と使い分けを解説
        </p>
      </NuxtLink>

      <!-- ClientOnly テスト -->
      <NuxtLink to="/examples/client-only-test" :class="demoCardClass">
        <div :class="iconClass">🧪</div>
        <h2 :class="cardTitleClass">ClientOnly 動作確認</h2>
        <p :class="cardDescClass">
          クライアントサイドのみで実行されるコンポーネントの検証
        </p>
      </NuxtLink>

      <!-- Error Boundary -->
      <NuxtLink to="/examples/error-boundary-demo" :class="demoCardClass">
        <div :class="iconClass">🛡️</div>
        <h2 :class="cardTitleClass">Error Boundary デモ</h2>
        <p :class="cardDescClass">
          エラーハンドリングとエラーバウンダリの実装
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

const demoCardClass = css({
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
    borderColor: 'blue.300',
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
