<script setup lang="ts">
import { css } from '~/styled-system/css'

useHead({
  title: 'データフェッチング比較 | Nuxt 3 Study',
})

const styles = {
  page: css({
    minH: 'screen',
    bg: 'gray.50',
    py: '10',
  }),
  container: css({
    maxW: '7xl',
    mx: 'auto',
    px: { base: '4', sm: '6', lg: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  header: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  }),
  title: css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900' }),
  subtitle: css({ color: 'gray.600' }),
  backLink: css({
    color: 'blue.600',
    fontWeight: 'medium',
    _hover: { textDecoration: 'underline' },
  }),
  grid: css({
    display: 'grid',
    gap: '6',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
  }),
  comparisonCard: css({
    bg: 'white',
    borderRadius: '2xl',
    boxShadow: 'lg',
    p: '6',
    borderWidth: '1px',
    borderColor: 'gray.100',
  }),
  comparisonTitle: css({ fontSize: '2xl', fontWeight: 'semibold', mb: '4' }),
  comparisonSection: css({ display: 'grid', gap: '4', gridTemplateColumns: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))' } }),
  stackTitle: css({ fontWeight: 'semibold', fontSize: 'lg', mb: '2' }),
  list: css({ display: 'flex', flexDirection: 'column', gap: '1', color: 'gray.700', fontSize: 'sm' }),
}
</script>

<template>
  <div :class="styles.page">
    <div :class="styles.container">
      <header :class="styles.header">
        <h1 :class="styles.title">
          データフェッチング比較
        </h1>
        <p :class="styles.subtitle">
          TanStack Vue Query vs VueUse の比較
        </p>
        <NuxtLink to="/" :class="styles.backLink">
          ← ホームに戻る
        </NuxtLink>
      </header>

      <div :class="styles.grid">
        <TanStackQueryDemo />
        <VueUseDemo />
      </div>

      <section :class="styles.comparisonCard">
        <h2 :class="styles.comparisonTitle">比較ポイント</h2>
        <div :class="styles.comparisonSection">
          <div>
            <h3 :class="[styles.stackTitle, css({ color: 'blue.600' })]">TanStack Vue Query</h3>
            <ul :class="styles.list">
              <li>✅ 強力なキャッシュ管理</li>
              <li>✅ 自動再取得・再検証</li>
              <li>✅ 楽観的更新のサポート</li>
              <li>✅ DevTools が充実</li>
              <li>✅ Mutation の管理が容易</li>
              <li>⚠️ バンドルサイズが大きめ</li>
            </ul>
          </div>
          <div>
            <h3 :class="[styles.stackTitle, css({ color: 'green.600' })]">VueUse</h3>
            <ul :class="styles.list">
              <li>✅ 軽量でシンプル</li>
              <li>✅ Tree-shakable</li>
              <li>✅ Vue と統合性が高い</li>
              <li>✅ 100以上のユーティリティ</li>
              <li>⚠️ 高度なキャッシュ機能なし</li>
              <li>⚠️ Mutation は手動管理</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
