<script setup lang="ts">
import { css } from '~/styled-system/css'

// レンダリングモードはrouteRulesで設定
// useAsyncDataはデータ取得のみを担当

interface Data {
  timestamp: string
  mode: string
}

// 通常のuseAsyncData（レンダリングモードとは無関係）
const { data: _data } = await useAsyncData<Data>('demo-data', async () => {
  return {
    timestamp: new Date().toISOString(),
    mode: 'データ取得メソッド',
  }
})

const styles = {
  container: css({
    maxW: '1200px',
    mx: 'auto',
    py: '8',
    px: { base: '4', md: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  title: css({ color: '#00dc82', fontSize: '2rem', fontWeight: 'bold' }),
  sectionTitle: css({ color: '#333333', fontSize: '1.3rem', fontWeight: '600', mb: '4' }),
  subTitle: css({ color: '#555555', fontSize: '1.1rem', fontWeight: '600', mb: '3' }),
  alert: css({
    bg: '#fee2e2',
    borderWidth: '2px',
    borderColor: '#ef4444',
    borderRadius: '8px',
    p: '6',
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    '& h2': { color: '#991b1b', fontWeight: 'bold', fontSize: '1.2rem' },
    '& p': { color: '#7f1d1d', fontWeight: '600', fontSize: '1.1rem' },
  }),
  comparison: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
    gap: '6',
  }),
  card: css({
    borderRadius: '8px',
    borderWidth: '2px',
    p: '6',
    '& pre': { mt: '4' },
  }),
  cardWrong: css({ bg: '#fee2e2', borderColor: '#ef4444' }),
  cardCorrect: css({ bg: '#d1fae5', borderColor: '#10b981' }),
  modes: css({
    display: 'grid',
    gap: '4',
  }),
  modeCard: css({
    bg: 'white',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    borderRadius: '8px',
    p: '6',
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    '& ul': { pl: '6', listStyleType: 'disc', color: '#6b7280' },
    '& li': { my: '1' },
  }),
  useAsyncDataOptions: css({
    bg: '#f0f9ff',
    borderLeftWidth: '4px',
    borderLeftColor: '#3b82f6',
    borderRadius: '8px',
    p: '6',
    '& p': { color: '#1e40af', mb: '4' },
  }),
  codeBlock: css({
    bg: '#1f2937',
    color: '#f9fafb',
    p: '4',
    borderRadius: '6px',
    overflowX: 'auto',
    fontSize: '0.875rem',
    lineHeight: '1.6',
    fontFamily: "'Courier New', monospace",
  }),
  backLink: css({
    alignSelf: 'flex-start',
    color: '#00dc82',
    textDecoration: 'none',
    fontWeight: '500',
    px: '4',
    py: '2',
    borderWidth: '2px',
    borderColor: '#00dc82',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    _hover: { bg: '#00dc82', color: 'white' },
  }),
}
</script>

<template>
  <div :class="styles.container">
    <h1 :class="styles.title">レンダリングモードの設定</h1>

    <div :class="styles.alert">
      <h2>⚠️ 重要</h2>
      <p>useAsyncDataではSSG/ISRの設定はできません！</p>
    </div>

    <div :class="styles.comparison">
      <div :class="[styles.card, styles.cardWrong]">
        <h3 :class="styles.subTitle">❌ できないこと</h3>
        <pre :class="styles.codeBlock"><code>// useAsyncDataでSSG/ISRは設定できない
const { data } = await useAsyncData('key',
  async () => { ... },
  {
    // こういうオプションは存在しない
    prerender: true,  // ❌
    swr: 60,          // ❌
    isr: true,        // ❌
  }
)</code></pre>
      </div>

      <div :class="[styles.card, styles.cardCorrect]">
        <h3 :class="styles.subTitle">✅ 正しい方法</h3>
        <pre :class="styles.codeBlock"><code>// nuxt.config.ts で設定
export default defineNuxtConfig({
  routeRules: {
    '/page': { prerender: true },  // SSG
    '/page': { swr: 60 },          // ISR
    '/page': { ssr: false },       // CSR
  }
})

// ページ内ではuseAsyncDataは普通に使う
const { data } = await useAsyncData('key',
  async () => { ... }
)</code></pre>
      </div>
    </div>

    <div :class="styles.modes">
      <h2 :class="styles.sectionTitle">レンダリングモード一覧</h2>

      <div :class="styles.modeCard">
        <h3 :class="styles.subTitle">SSR (Server-Side Rendering)</h3>
        <pre :class="styles.codeBlock"><code>// デフォルト（設定不要）
routeRules: {
  '/page': { ssr: true }
}</code></pre>
        <ul>
          <li>リクエストごとにサーバーでレンダリング</li>
          <li>最新のデータを常に表示</li>
        </ul>
      </div>

      <div :class="styles.modeCard">
        <h3 :class="styles.subTitle">SSG (Static Site Generation)</h3>
        <pre :class="styles.codeBlock"><code>routeRules: {
  '/page': { prerender: true }
}</code></pre>
        <ul>
          <li>ビルド時に静的HTML生成</li>
          <li>CDN配信に最適</li>
        </ul>
      </div>

      <div :class="styles.modeCard">
        <h3 :class="styles.subTitle">ISR (Incremental Static Regeneration)</h3>
        <pre :class="styles.codeBlock"><code>routeRules: {
  '/page': { swr: 60 } // 60秒
}</code></pre>
        <ul>
          <li>キャッシュ + バックグラウンド再生成</li>
          <li>Stale-While-Revalidate方式</li>
        </ul>
      </div>

      <div :class="styles.modeCard">
        <h3 :class="styles.subTitle">CSR (Client-Side Rendering)</h3>
        <pre :class="styles.codeBlock"><code>routeRules: {
  '/page': { ssr: false }
}</code></pre>
        <ul>
          <li>クライアントでのみレンダリング</li>
          <li>SPAモード</li>
        </ul>
      </div>
    </div>

    <div :class="styles.useAsyncDataOptions">
      <h2 :class="styles.sectionTitle">useAsyncDataのオプション</h2>
      <p>レンダリングモードは設定できないが、以下は設定可能:</p>

      <pre :class="styles.codeBlock"><code>const { data } = await useAsyncData('key', async () => {...}, {
  // データ取得制御
  server: true,        // サーバーで実行するか
  lazy: false,         // 遅延読み込み
  immediate: true,     // 即座に実行

  // キャッシュ制御
  getCachedData: (key) => {
    // カスタムキャッシュロジック
    return nuxtApp.payload.data[key] ?? null
  },

  // 監視
  watch: [someRef],    // 再取得のトリガー

  // 変換
  transform: (data) => data,
  pick: ['id', 'name'],
})</code></pre>
    </div>

    <NuxtLink to="/" :class="styles.backLink">← トップページに戻る</NuxtLink>
  </div>
</template>
