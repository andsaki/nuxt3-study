<script setup lang="ts">
interface Post {
  id: number
  title: string
  body: string
}

// SSRで取得されるデータ
const { data: ssrData } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=3'
)

const { data: serverTime } = await useAsyncData('verify-time', async () => {
  return {
    generatedAt: new Date().toISOString(),
    random: Math.random(),
  }
})

// クライアントサイドの情報
const clientMountTime = ref<string>('')
const clientRandom = ref<number>(0)
const isHydrated = ref(false)

onMounted(() => {
  clientMountTime.value = new Date().toISOString()
  clientRandom.value = Math.random()
  isHydrated.value = true
})

// HTMLソースを確認するための説明
const howToVerify = `
1. ページを右クリック → "ページのソースを表示"
2. HTMLの中に以下が含まれているか確認:
   - 投稿データ（title、bodyなど）
   - サーバータイムスタンプ
   - ランダム値

SSRが正しく動作している場合:
→ HTMLソースにデータが含まれている
→ サーバーとクライアントのランダム値が異なる
→ クライアントのマウント時刻がサーバー時刻より遅い

CSRの場合:
→ HTMLソースにデータが含まれていない
→ ローディング表示だけがHTMLに含まれる
`
</script>

<template>
  <div class="container">
    <h1>SSR 検証ページ</h1>

    <!-- 検証方法 -->
    <div class="verify-box">
      <h2>🔍 検証方法</h2>
      <pre class="verify-steps">{{ howToVerify }}</pre>
    </div>

    <!-- サーバー情報 -->
    <div class="info-section server">
      <h2>🖥️ サーバー情報（SSR）</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">生成時刻:</span>
          <span class="value">{{ serverTime?.generatedAt }}</span>
        </div>
        <div class="info-item">
          <span class="label">ランダム値:</span>
          <span class="value">{{ serverTime?.random }}</span>
        </div>
        <div class="info-item">
          <span class="label">データ件数:</span>
          <span class="value">{{ ssrData?.length }} 件</span>
        </div>
      </div>
    </div>

    <!-- クライアント情報 -->
    <div class="info-section client">
      <h2>💻 クライアント情報（CSR）</h2>
      <div class="info-grid">
        <div class="info-item">
          <span class="label">マウント時刻:</span>
          <span class="value">{{ clientMountTime || '未マウント' }}</span>
        </div>
        <div class="info-item">
          <span class="label">ランダム値:</span>
          <span class="value">{{ clientRandom || '未生成' }}</span>
        </div>
        <div class="info-item">
          <span class="label">Hydration:</span>
          <span class="value">{{ isHydrated ? '完了' : '未完了' }}</span>
        </div>
      </div>
    </div>

    <!-- SSRデータ表示 -->
    <div class="data-section">
      <h2>📄 SSRで取得されたデータ</h2>
      <p class="hint">
        ※このデータはHTMLソースに含まれています（ページソースを表示して確認）
      </p>

      <div v-if="ssrData" class="posts-grid">
        <article v-for="post in ssrData" :key="post.id" class="post-card">
          <div class="post-id">ID: {{ post.id }}</div>
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </article>
      </div>
      <div v-else class="loading">
        データを読み込んでいます...
      </div>
    </div>

    <!-- 検証結果 -->
    <div class="result-section">
      <h2>✅ 検証結果</h2>
      <div class="result-grid">
        <div class="result-item" :class="{ success: ssrData && ssrData.length > 0 }">
          <span class="icon">{{ ssrData && ssrData.length > 0 ? '✓' : '✗' }}</span>
          <span>SSRデータ取得</span>
        </div>
        <div class="result-item" :class="{ success: serverTime?.random }">
          <span class="icon">{{ serverTime?.random ? '✓' : '✗' }}</span>
          <span>サーバー値生成</span>
        </div>
        <div class="result-item" :class="{ success: isHydrated }">
          <span class="icon">{{ isHydrated ? '✓' : '✗' }}</span>
          <span>クライアントHydration</span>
        </div>
        <div class="result-item" :class="{ success: clientRandom !== serverTime?.random }">
          <span class="icon">{{ clientRandom !== serverTime?.random ? '✓' : '✗' }}</span>
          <span>サーバー/クライアント分離</span>
        </div>
      </div>
    </div>

    <!-- デバッグ情報 -->
    <details class="debug-section">
      <summary>🐛 デバッグ情報（JSON）</summary>
      <pre class="json-view">{{ {
  server: {
    time: serverTime?.generatedAt,
    random: serverTime?.random,
    dataCount: ssrData?.length,
  },
  client: {
    mountTime: clientMountTime,
    random: clientRandom,
    hydrated: isHydrated,
  },
  rawData: ssrData,
} }}</pre>
    </details>

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
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.verify-box {
  background: #f0f9ff;
  border: 2px solid #0ea5e9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.verify-steps {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

.info-section {
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 2px solid;
}

.info-section.server {
  background: #fef3c7;
  border-color: #f59e0b;
}

.info-section.client {
  background: #dbeafe;
  border-color: #3b82f6;
}

.info-grid {
  display: grid;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem;
  background: white;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
}

.label {
  font-weight: 600;
  color: #374151;
}

.value {
  font-family: 'Courier New', monospace;
  color: #6b7280;
}

.data-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.hint {
  color: #6b7280;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  font-style: italic;
}

.posts-grid {
  display: grid;
  gap: 1rem;
}

.post-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  padding: 1.25rem;
  position: relative;
}

.post-id {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #00dc82;
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
}

.post-card h3 {
  color: #1f2937;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  padding-right: 3rem;
}

.post-card p {
  color: #6b7280;
  line-height: 1.6;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  color: #9ca3af;
  padding: 2rem;
}

.result-section {
  background: #f0fdf4;
  border: 2px solid #22c55e;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border-radius: 6px;
  border: 2px solid #ef4444;
}

.result-item.success {
  border-color: #22c55e;
}

.icon {
  font-size: 1.5rem;
  font-weight: bold;
}

.result-item.success .icon {
  color: #22c55e;
}

.result-item:not(.success) .icon {
  color: #ef4444;
}

.debug-section {
  background: #1f2937;
  color: #f9fafb;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.debug-section summary {
  cursor: pointer;
  font-weight: 600;
  padding: 0.5rem;
  user-select: none;
}

.debug-section summary:hover {
  background: #374151;
  border-radius: 4px;
}

.json-view {
  background: #111827;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  margin-top: 1rem;
  line-height: 1.6;
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
