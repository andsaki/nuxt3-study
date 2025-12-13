<script setup lang="ts">
// VueUseのuseFetch（名前を変更してインポート）
import { useFetch as useVueUseFetch } from '@vueuse/core'

interface Post {
  id: number
  title: string
  body: string
}

// 1. Nuxtのusefetch（SSR対応）
const { data: nuxtData, status: nuxtStatus, refresh: nuxtRefresh } = await useFetch<Post>(
  'https://jsonplaceholder.typicode.com/posts/1',
  {
    key: 'nuxt-fetch-demo'
  }
)

// 2. VueUseのuseFetch（クライアントのみ）
const {
  data: vueUseData,
  isFetching: vueUseFetching,
  execute: vueUseExecute,
} = useVueUseFetch('https://jsonplaceholder.typicode.com/posts/2').json<Post>()

const comparison = [
  {
    feature: 'SSR対応',
    nuxt: '✅ 対応',
    vueuse: '❌ 非対応（クライアントのみ）'
  },
  {
    feature: '自動キャッシュ',
    nuxt: '✅ keyベース',
    vueuse: '❌ なし'
  },
  {
    feature: 'サーバー実行',
    nuxt: '✅ 可能',
    vueuse: '❌ 不可'
  },
  {
    feature: 'リアクティブURL',
    nuxt: '✅ 対応',
    vueuse: '✅ 対応'
  },
  {
    feature: 'インターセプター',
    nuxt: '❌ なし',
    vueuse: '✅ beforeFetch/afterFetch'
  },
  {
    feature: 'タイムアウト',
    nuxt: '❌ なし',
    vueuse: '✅ timeout設定'
  },
]
</script>

<template>
  <div class="container">
    <h1>useFetch 比較</h1>

    <div class="alert">
      <h2>⚠️ 重要</h2>
      <p>Vue本体には<code>useFetch</code>はありません！</p>
      <p><strong>VueUse</strong>と<strong>Nuxt</strong>にそれぞれ別の<code>useFetch</code>があります。</p>
    </div>

    <!-- Nuxt useFetch -->
    <div class="demo-section nuxt">
      <h2>🟢 Nuxt useFetch（SSR対応）</h2>
      <div class="info">
        <p><strong>ステータス:</strong> {{ nuxtStatus }}</p>
        <p><strong>データ:</strong></p>
        <pre v-if="nuxtData">{{ nuxtData }}</pre>
        <button @click="nuxtRefresh()" class="btn">再取得</button>
      </div>
      <div class="code-block">
        <h3>コード例</h3>
        <pre><code>// Nuxtのusefetch（組み込み、SSR対応）
const { data, refresh } = await useFetch('/api/posts/1', {
  key: 'post-1', // キャッシュキー
  server: true,  // サーバーで実行
})</code></pre>
      </div>
    </div>

    <!-- VueUse useFetch -->
    <div class="demo-section vueuse">
      <h2>🔵 VueUse useFetch（クライアントのみ）</h2>
      <div class="info">
        <p><strong>読み込み中:</strong> {{ vueUseFetching }}</p>
        <p><strong>データ:</strong></p>
        <pre v-if="vueUseData">{{ vueUseData }}</pre>
        <button @click="vueUseExecute()" class="btn">再取得</button>
      </div>
      <div class="code-block">
        <h3>コード例</h3>
        <pre><code>// VueUseのuseFetch（クライアントサイドのみ）
import { useFetch } from '@vueuse/core'

const { data, execute } = useFetch('/api/posts/2')
  .json()
  // クライアントでしか動作しない</code></pre>
      </div>
    </div>

    <!-- 比較表 -->
    <div class="comparison-table">
      <h2>機能比較</h2>
      <table>
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
    </div>

    <!-- 推奨 -->
    <div class="recommendation">
      <h2>💡 推奨</h2>
      <ul>
        <li><strong>Nuxtプロジェクト:</strong> Nuxtの<code>useFetch</code>を使う（SSR対応、キャッシュ付き）</li>
        <li><strong>Vueプロジェクト:</strong> VueUseの<code>useFetch</code>またはTanStack Query</li>
        <li><strong>混在時:</strong> 名前を変更してインポート
          <pre><code>import { useFetch as useVueUseFetch } from '@vueuse/core'</code></pre>
        </li>
      </ul>
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
  font-size: 2rem;
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

code {
  background: #f3f4f6;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
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
  margin: 0.5rem 0;
}

.demo-section {
  border: 2px solid;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.demo-section.nuxt {
  background: #d1fae5;
  border-color: #10b981;
}

.demo-section.vueuse {
  background: #dbeafe;
  border-color: #3b82f6;
}

.info {
  margin-bottom: 1.5rem;
}

.info p {
  margin: 0.5rem 0;
}

.btn {
  padding: 0.5rem 1rem;
  background: #00dc82;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.2s;
}

.btn:hover {
  background: #00b86b;
}

.code-block {
  background: #1f2937;
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
}

.code-block h3 {
  color: #f9fafb;
  margin-bottom: 0.5rem;
}

pre {
  background: #111827;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0.5rem 0;
}

.comparison-table {
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

tbody tr:last-child td {
  border-bottom: none;
}

tbody tr:hover {
  background: #f9fafb;
}

.recommendation {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.recommendation ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

.recommendation li {
  margin: 0.75rem 0;
  line-height: 1.6;
}

.recommendation pre {
  margin-top: 0.5rem;
}

.back-link {
  display: inline-block;
  color: #00dc82;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid #00dc82;
  border-radius: 6px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #00dc82;
  color: white;
}
</style>
