<script setup lang="ts">
// レンダリングモードはrouteRulesで設定
// useAsyncDataはデータ取得のみを担当

interface Data {
  timestamp: string
  mode: string
}

// 通常のuseAsyncData（レンダリングモードとは無関係）
const { data } = await useAsyncData<Data>('demo-data', async () => {
  return {
    timestamp: new Date().toISOString(),
    mode: 'データ取得メソッド',
  }
})
</script>

<template>
  <div class="container">
    <h1>レンダリングモードの設定</h1>

    <div class="alert">
      <h2>⚠️ 重要</h2>
      <p>useAsyncDataではSSG/ISRの設定はできません！</p>
    </div>

    <div class="comparison">
      <div class="card wrong">
        <h3>❌ できないこと</h3>
        <pre><code>// useAsyncDataでSSG/ISRは設定できない
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

      <div class="card correct">
        <h3>✅ 正しい方法</h3>
        <pre><code>// nuxt.config.ts で設定
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

    <div class="modes">
      <h2>レンダリングモード一覧</h2>

      <div class="mode-card">
        <h3>SSR (Server-Side Rendering)</h3>
        <pre><code>// デフォルト（設定不要）
routeRules: {
  '/page': { ssr: true }
}</code></pre>
        <ul>
          <li>リクエストごとにサーバーでレンダリング</li>
          <li>最新のデータを常に表示</li>
        </ul>
      </div>

      <div class="mode-card">
        <h3>SSG (Static Site Generation)</h3>
        <pre><code>routeRules: {
  '/page': { prerender: true }
}</code></pre>
        <ul>
          <li>ビルド時に静的HTML生成</li>
          <li>CDN配信に最適</li>
        </ul>
      </div>

      <div class="mode-card">
        <h3>ISR (Incremental Static Regeneration)</h3>
        <pre><code>routeRules: {
  '/page': { swr: 60 } // 60秒
}</code></pre>
        <ul>
          <li>キャッシュ + バックグラウンド再生成</li>
          <li>Stale-While-Revalidate方式</li>
        </ul>
      </div>

      <div class="mode-card">
        <h3>CSR (Client-Side Rendering)</h3>
        <pre><code>routeRules: {
  '/page': { ssr: false }
}</code></pre>
        <ul>
          <li>クライアントでのみレンダリング</li>
          <li>SPAモード</li>
        </ul>
      </div>
    </div>

    <div class="useasyncdata-options">
      <h2>useAsyncDataのオプション</h2>
      <p>レンダリングモードは設定できないが、以下は設定可能:</p>

      <pre><code>const { data } = await useAsyncData('key', async () => {...}, {
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

    <NuxtLink to="/" class="back-link">← トップページに戻る</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #00dc82;
  margin-bottom: 2rem;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

h3 {
  color: #555;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.alert {
  background: #fee2e2;
  border: 2px solid #ef4444;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.alert h2 {
  color: #991b1b;
  margin-bottom: 0.5rem;
}

.alert p {
  color: #7f1d1d;
  font-weight: 600;
  font-size: 1.1rem;
}

.comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .comparison {
    grid-template-columns: 1fr;
  }
}

.card {
  border-radius: 8px;
  padding: 1.5rem;
  border: 2px solid;
}

.card.wrong {
  background: #fee2e2;
  border-color: #ef4444;
}

.card.correct {
  background: #d1fae5;
  border-color: #10b981;
}

.card h3 {
  margin-bottom: 1rem;
}

.modes {
  margin-bottom: 2rem;
}

.mode-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.mode-card ul {
  margin-top: 0.5rem;
  padding-left: 1.5rem;
}

.mode-card li {
  margin: 0.3rem 0;
  color: #6b7280;
}

.useasyncdata-options {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.useasyncdata-options p {
  color: #1e40af;
  margin-bottom: 1rem;
}

pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.back-link {
  display: inline-block;
  color: #00dc82;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid #00dc82;
  border-radius: 4px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #00dc82;
  color: white;
}
</style>
