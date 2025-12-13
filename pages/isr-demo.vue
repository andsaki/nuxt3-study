<script setup lang="ts">
interface Post {
  id: number
  title: string
  body: string
}

const { data: posts } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=5'
)

const { data: pageInfo } = await useAsyncData('isr-time', async () => {
  return {
    generatedAt: new Date().toISOString(),
    type: 'ISR (Incremental Static Regeneration)',
    cacheTime: '60秒',
  }
})
</script>

<template>
  <div class="container">
    <h1>ISR デモページ</h1>

    <div class="info-box isr">
      <h2>⚡ ISR (Incremental Static Regeneration)</h2>
      <p><strong>生成時刻:</strong> {{ pageInfo?.generatedAt }}</p>
      <p><strong>レンダリング:</strong> {{ pageInfo?.type }}</p>
      <p><strong>キャッシュ:</strong> {{ pageInfo?.cacheTime }}</p>
      <ul>
        <li>初回は静的生成されたページを配信</li>
        <li>60秒経過後、バックグラウンドで再生成</li>
        <li>古いキャッシュを返しつつ、新しいデータを生成（SWR）</li>
        <li>大量のページでも高速</li>
      </ul>
    </div>

    <div class="refresh-info">
      <h3>🔄 動作確認</h3>
      <ol>
        <li>このページをリロードして生成時刻を確認</li>
        <li>60秒以内なら同じ時刻が表示される</li>
        <li>60秒経過後にリロードすると、バックグラウンドで再生成</li>
        <li>次回アクセス時には新しい時刻が表示される</li>
      </ol>
    </div>

    <div class="posts-section">
      <h2>データ（ISR更新対象）</h2>
      <div v-if="posts" class="posts-list">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </article>
      </div>
    </div>

    <div class="code-box">
      <h3>設定方法（nuxt.config.ts）</h3>
      <pre><code>export default defineNuxtConfig({
  routeRules: {
    '/isr-demo': { swr: 60 }, // 60秒キャッシュ + SWR
  }
})</code></pre>
    </div>

    <div class="cache-info">
      <h2>💾 キャッシュの保存場所</h2>
      <p class="note">環境によってキャッシュの場所が異なります:</p>

      <div class="env-grid">
        <div class="env-card dev">
          <h3>🔧 開発環境</h3>
          <p><code>npm run dev</code></p>
          <ul>
            <li><strong>場所:</strong> Nitroのメモリキャッシュ</li>
            <li><strong>保持:</strong> サーバー再起動まで</li>
            <li><strong>種類:</strong> サーバー内部</li>
          </ul>
        </div>

        <div class="env-card cdn">
          <h3>🌐 本番環境（CDN）</h3>
          <p><code>Vercel / Netlify / Cloudflare Pages</code></p>
          <ul>
            <li><strong>場所:</strong> エッジキャッシュ（CDN）</li>
            <li><strong>保持:</strong> グローバル分散</li>
            <li><strong>速度:</strong> 超高速（エッジ配信）</li>
          </ul>
        </div>

        <div class="env-card server">
          <h3>🖥️ 本番環境（Node.js）</h3>
          <p><code>VPS / Docker / EC2</code></p>
          <ul>
            <li><strong>場所:</strong> Nitroキャッシュレイヤー</li>
            <li><strong>保持:</strong> サーバーメモリ</li>
            <li><strong>種類:</strong> サーバー内部</li>
          </ul>
        </div>

        <div class="env-card static">
          <h3>📦 静的ホスティング</h3>
          <p><code>S3 / GitHub Pages</code></p>
          <ul>
            <li><strong>動作:</strong> ❌ ISRは機能しない</li>
            <li><strong>理由:</strong> サーバー再生成不可</li>
            <li><strong>代替:</strong> SSGを使用</li>
          </ul>
        </div>
      </div>

      <div class="hosting-table">
        <h3>ホスティング別対応表</h3>
        <table>
          <thead>
            <tr>
              <th>ホスティング</th>
              <th>キャッシュ場所</th>
              <th>ISR対応</th>
              <th>パフォーマンス</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Vercel</td>
              <td>エッジキャッシュ（CDN）</td>
              <td>✅ 完全対応</td>
              <td>⚡⚡⚡</td>
            </tr>
            <tr>
              <td>Netlify</td>
              <td>エッジキャッシュ（CDN）</td>
              <td>✅ 完全対応</td>
              <td>⚡⚡⚡</td>
            </tr>
            <tr>
              <td>Cloudflare Pages</td>
              <td>Workers Cache API（CDN）</td>
              <td>✅ 完全対応</td>
              <td>⚡⚡⚡</td>
            </tr>
            <tr>
              <td>Node.js Server</td>
              <td>サーバーメモリ</td>
              <td>⚠️ 部分対応</td>
              <td>⚡⚡</td>
            </tr>
            <tr>
              <td>S3 / GitHub Pages</td>
              <td>なし</td>
              <td>❌ 非対応</td>
              <td>⚡ (SSGのみ)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="recommendation-box">
        <h3>💡 推奨デプロイ先</h3>
        <ul>
          <li><strong>ISRを使いたい:</strong> Vercel / Netlify / Cloudflare Pages</li>
          <li><strong>完全静的でOK:</strong> S3 / GitHub Pages + SSG</li>
          <li><strong>自前サーバー:</strong> Node.js + Redis/Memcached でキャッシュ強化</li>
        </ul>
      </div>
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

.info-box {
  border-left: 4px solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.info-box.isr {
  background: #dbeafe;
  border-color: #3b82f6;
}

.info-box p {
  margin: 0.5rem 0;
}

.info-box ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

.info-box li {
  margin: 0.3rem 0;
}

.refresh-info {
  background: #f0fdf4;
  border-left: 4px solid #22c55e;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.refresh-info ol {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

.refresh-info li {
  margin: 0.5rem 0;
}

.posts-section {
  margin-bottom: 2rem;
}

.posts-list {
  display: grid;
  gap: 1rem;
}

.post-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
}

.post-card h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.post-card p {
  color: #6b7280;
  line-height: 1.6;
}

.code-box {
  background: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.code-box h3 {
  color: #f9fafb;
  margin-bottom: 1rem;
}

.code-box pre {
  background: #111827;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
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

.cache-info {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.cache-info .note {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.env-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.env-card {
  border: 2px solid;
  border-radius: 8px;
  padding: 1.25rem;
}

.env-card.dev {
  background: #fef3c7;
  border-color: #f59e0b;
}

.env-card.cdn {
  background: #d1fae5;
  border-color: #10b981;
}

.env-card.server {
  background: #dbeafe;
  border-color: #3b82f6;
}

.env-card.static {
  background: #fee2e2;
  border-color: #ef4444;
}

.env-card h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.env-card p {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.75rem;
}

.env-card code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-size: 0.8rem;
}

.env-card ul {
  margin: 0;
  padding-left: 1.25rem;
  font-size: 0.875rem;
}

.env-card li {
  margin: 0.4rem 0;
}

.hosting-table {
  margin-bottom: 2rem;
}

.hosting-table table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 1rem;
}

.hosting-table th,
.hosting-table td {
  padding: 0.875rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.hosting-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
  font-size: 0.875rem;
}

.hosting-table tbody tr:last-child td {
  border-bottom: none;
}

.hosting-table tbody tr:hover {
  background: #f9fafb;
}

.recommendation-box {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  border-radius: 8px;
  padding: 1.5rem;
}

.recommendation-box h3 {
  color: #0c4a6e;
  margin-bottom: 0.75rem;
}

.recommendation-box ul {
  margin: 0;
  padding-left: 1.5rem;
}

.recommendation-box li {
  margin: 0.5rem 0;
  line-height: 1.6;
}
</style>
