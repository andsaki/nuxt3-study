<script setup lang="ts">
interface Post {
  id: number
  userId: number
  title: string
  body: string
}

// 自動でキャッシュされる（keyで管理）
const { data: posts, refresh, status } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=5',
  {
    key: 'posts-list', // キャッシュキー
    // デフォルトでキャッシュされるが、明示的に設定も可能
  }
)

// dedupe: 同時リクエストを防ぐ（デフォルト: 'cancel'）
const { data: user } = await useFetch(
  'https://jsonplaceholder.typicode.com/users/1',
  {
    key: 'user-1',
    dedupe: 'cancel', // 'cancel' | 'defer'
  }
)

// キャッシュを無効化して常に再取得
const { data: fresh } = await useFetch(
  'https://jsonplaceholder.typicode.com/posts/1',
  {
    key: 'fresh-post',
    getCachedData: () => null, // キャッシュを使わない
  }
)

// SWRライクな動作: stale-while-revalidate
const { data: _stale, refresh: _refreshStale } = await useFetch(
  'https://jsonplaceholder.typicode.com/posts/2',
  {
    key: 'stale-post',
    // キャッシュされたデータを即座に返し、バックグラウンドで再取得
    server: false, // サーバーでは実行しない
  }
)

// 条件付きフェッチ
const shouldFetch = ref(true)
const { data: _conditional } = await useFetch(
  'https://jsonplaceholder.typicode.com/posts/3',
  {
    key: 'conditional-post',
    watch: [shouldFetch],
    immediate: shouldFetch.value,
  }
)

const lastRefresh = ref<string>('')

const handleRefresh = async () => {
  await refresh()
  lastRefresh.value = new Date().toLocaleTimeString()
}
</script>

<template>
  <div class="container">
    <h1>useFetch キャッシュデモ</h1>

    <div class="info-box">
      <h2>キャッシュ機能</h2>
      <ul>
        <li>useFetchはデフォルトでkeyベースでキャッシュ</li>
        <li>同じkeyの場合、キャッシュされたデータを返す</li>
        <li>refresh()でキャッシュを更新</li>
        <li>dedupeで同時リクエストを制御</li>
        <li>getCachedDataでカスタムキャッシュロジック</li>
      </ul>
    </div>

    <div class="section">
      <div class="section-header">
        <h2>投稿リスト（キャッシュあり）</h2>
        <button class="btn" @click="handleRefresh">
          {{ status === 'pending' ? '更新中...' : '再取得' }}
        </button>
      </div>
      <p v-if="lastRefresh" class="text-sm">最終更新: {{ lastRefresh }}</p>

      <div v-if="posts" class="posts-list">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body.slice(0, 100) }}...</p>
        </article>
      </div>
    </div>

    <div class="section">
      <h2>ユーザー情報（dedupe設定）</h2>
      <pre v-if="user">{{ user }}</pre>
    </div>

    <div class="section">
      <h2>常に新しいデータ（キャッシュ無効）</h2>
      <pre v-if="fresh">{{ fresh }}</pre>
    </div>

    <div class="code-example">
      <h3>基本的な使い方</h3>
      <pre><code>const { data, refresh, status } = await useFetch('/api/posts', {
  key: 'posts-list', // キャッシュキー
  dedupe: 'cancel',  // 同時リクエスト制御
})</code></pre>
    </div>

    <div class="code-example">
      <h3>キャッシュを無効化</h3>
      <pre><code>const { data } = await useFetch('/api/posts', {
  getCachedData: () => null, // キャッシュを使わない
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
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.info-box {
  background: #f0f9ff;
  border-left: 4px solid #00dc82;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.info-box ul {
  margin: 0.5rem 0 0 1.5rem;
}

.info-box li {
  margin: 0.3rem 0;
}

.section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
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

.btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.text-sm {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1rem;
}

.posts-list {
  display: grid;
  gap: 1rem;
}

.post-card {
  background: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.post-card h3 {
  color: #1f2937;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.post-card p {
  color: #6b7280;
  font-size: 0.9rem;
}

pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
}

.code-example {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 4px;
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
