<script setup lang="ts">
import { css } from '~/styled-system/css'
import { useFetch as useVueUseFetch } from '@vueuse/core'

interface Post {
  id: number
  title: string
  body: string
}

const { data: nuxtData, status: nuxtStatus, refresh: nuxtRefresh } = await useFetch<Post>(
  'https://jsonplaceholder.typicode.com/posts/1',
  { key: 'nuxt-fetch-demo' },
)

const {
  data: vueUseData,
  isFetching: vueUseFetching,
  execute: vueUseExecute,
} = useVueUseFetch('https://jsonplaceholder.typicode.com/posts/2').json<Post>()

const comparison = [
  { feature: 'SSR対応', nuxt: '✅ 対応', vueuse: '❌ 非対応（クライアントのみ）' },
  { feature: '自動キャッシュ', nuxt: '✅ keyベース', vueuse: '❌ なし' },
  { feature: 'サーバー実行', nuxt: '✅ 可能', vueuse: '❌ 不可' },
  { feature: 'リアクティブURL', nuxt: '✅ 対応', vueuse: '✅ 対応' },
  { feature: 'インターセプター', nuxt: '❌ なし', vueuse: '✅ beforeFetch/afterFetch' },
  { feature: 'タイムアウト', nuxt: '❌ なし', vueuse: '✅ timeout設定' },
]

const styles = {
  page: css({ minH: 'screen', bg: 'gray.50', py: '10' }),
  container: css({
    maxW: '6xl',
    mx: 'auto',
    px: { base: '4', sm: '6', lg: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  header: css({ display: 'flex', flexDirection: 'column', gap: '2' }),
  title: css({ fontSize: '4xl', fontWeight: 'bold', color: 'emerald.500' }),
  subtitle: css({ color: 'slate.600' }),
  backLink: css({
    color: 'blue.600',
    fontWeight: 'semibold',
    w: 'fit-content',
    _hover: { textDecoration: 'underline' },
  }),
  alert: css({
    bg: 'rose.50',
    borderWidth: '2px',
    borderColor: 'rose.400',
    borderRadius: '2xl',
    p: '6',
    color: 'rose.800',
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  }),
  demoGrid: css({
    display: 'grid',
    gap: '6',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, minmax(0, 1fr))' },
  }),
  demoSection: css({
    borderWidth: '2px',
    borderRadius: '2xl',
    p: '6',
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
  }),
  nuxtSection: css({ bg: 'emerald.50', borderColor: 'emerald.400' }),
  vueuseSection: css({ bg: 'blue.50', borderColor: 'blue.400' }),
  info: css({ display: 'flex', flexDirection: 'column', gap: '2' }),
  primaryButton: css({
    alignSelf: 'flex-start',
    mt: '2',
    bg: 'emerald.500',
    color: 'white',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    fontWeight: 'semibold',
    border: 'none',
    transition: 'all 0.2s',
    _hover: { bg: 'emerald.600' },
  }),
  secondaryButton: css({
    alignSelf: 'flex-start',
    mt: '2',
    bg: 'blue.500',
    color: 'white',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    fontWeight: 'semibold',
    border: 'none',
    transition: 'all 0.2s',
    _hover: { bg: 'blue.600' },
  }),
  codeBlock: css({
    bg: 'slate.900',
    color: 'slate.50',
    borderRadius: 'xl',
    p: '4',
    boxShadow: 'lg',
    fontFamily: 'mono',
    fontSize: 'sm',
    overflowX: 'auto',
  }),
  comparisonCard: css({
    bg: 'white',
    borderRadius: '2xl',
    p: '6',
    borderWidth: '1px',
    borderColor: 'gray.200',
    boxShadow: 'md',
  }),
  table: css({
    width: 'full',
    borderCollapse: 'collapse',
    mt: '4',
    '& th, & td': {
      px: '3',
      py: '3',
      borderBottomWidth: '1px',
      borderColor: 'gray.200',
      textAlign: 'left',
    },
    '& th': {
      bg: 'gray.50',
      fontWeight: 'semibold',
      color: 'slate.700',
    },
  }),
  recommendation: css({
    bg: 'amber.50',
    borderLeftWidth: '4px',
    borderColor: 'amber.500',
    borderRadius: 'xl',
    p: '5',
    '& ul': {
      mt: '3',
      pl: '5',
      lineHeight: 'tall',
    },
  }),
  homeLink: css({
    alignSelf: 'flex-start',
    color: 'emerald.500',
    borderWidth: '2px',
    borderColor: 'emerald.500',
    borderRadius: 'xl',
    px: '4',
    py: '2',
    fontWeight: 'medium',
    _hover: { bg: 'emerald.500', color: 'white' },
  }),
}
</script>

<template>
  <div :class="styles.page">
    <div :class="styles.container">
      <header :class="styles.header">
        <h1 :class="styles.title">useFetch 比較</h1>
        <p :class="styles.subtitle">TanStack Vue Query vs VueUse の比較</p>
        <NuxtLink to="/" :class="styles.backLink">← ホームに戻る</NuxtLink>
      </header>

      <section :class="styles.alert">
        <h2>⚠️ 重要</h2>
        <p>Vue本体には<code>useFetch</code>はありません！</p>
        <p><strong>VueUse</strong>と<strong>Nuxt</strong>にそれぞれ別の<code>useFetch</code>があります。</p>
      </section>

      <div :class="styles.demoGrid">
        <section :class="[styles.demoSection, styles.nuxtSection]">
          <h2>🟢 Nuxt useFetch（SSR対応）</h2>
          <div :class="styles.info">
            <p><strong>ステータス:</strong> {{ nuxtStatus }}</p>
            <p><strong>データ:</strong></p>
            <pre v-if="nuxtData" :class="styles.codeBlock">{{ nuxtData }}</pre>
            <button :class="styles.primaryButton" @click="nuxtRefresh()">再取得</button>
          </div>
          <div>
            <h3>コード例</h3>
            <pre :class="styles.codeBlock"><code>// Nuxtのusefetch（組み込み、SSR対応）
const { data, refresh } = await useFetch('/api/posts/1', {
  key: 'post-1', // キャッシュキー
  server: true,  // サーバーで実行
})</code></pre>
          </div>
        </section>

        <section :class="[styles.demoSection, styles.vueuseSection]">
          <h2>🔵 VueUse useFetch（クライアントのみ）</h2>
          <div :class="styles.info">
            <p><strong>読み込み中:</strong> {{ vueUseFetching }}</p>
            <p><strong>データ:</strong></p>
            <pre v-if="vueUseData" :class="styles.codeBlock">{{ vueUseData }}</pre>
            <button :class="styles.secondaryButton" @click="vueUseExecute()">再取得</button>
          </div>
          <div>
            <h3>コード例</h3>
            <pre :class="styles.codeBlock"><code>// VueUseのuseFetch（クライアントサイドのみ）
import { useFetch } from '@vueuse/core'

const { data, execute } = useFetch('/api/posts/2')
  .json()
  // クライアントでしか動作しない</code></pre>
          </div>
        </section>
      </div>

      <section :class="styles.comparisonCard">
        <h2>機能比較</h2>
        <table :class="styles.table">
          <thead>
            <tr>
              <th>機能</th>
              <th>Nuxt useFetch</th>
              <th>VueUse useFetch</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in comparison" :key="item.feature">
              <td>{{ item.feature }}</td>
              <td>{{ item.nuxt }}</td>
              <td>{{ item.vueuse }}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section :class="styles.recommendation">
        <h2>💡 推奨</h2>
        <ul>
          <li><strong>Nuxtプロジェクト:</strong> Nuxtの<code>useFetch</code>を使う（SSR対応、キャッシュ付き）</li>
          <li><strong>Vueプロジェクト:</strong> VueUseの<code>useFetch</code>またはTanStack Query</li>
          <li>
            <strong>混在時:</strong> 名前を変更してインポート
            <pre :class="styles.codeBlock"><code>import { useFetch as useVueUseFetch } from '@vueuse/core'</code></pre>
          </li>
        </ul>
      </section>

      <NuxtLink to="/" :class="styles.homeLink">← トップページに戻る</NuxtLink>
    </div>
  </div>
</template>
