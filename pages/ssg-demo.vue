<script setup lang="ts">
interface Post {
  id: number
  title: string
  body: string
}

const { data: posts } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=5'
)

const { data: buildTime } = await useAsyncData('build-time', async () => {
  return {
    generatedAt: new Date().toISOString(),
    type: 'SSG (Static Site Generation)',
  }
})
</script>

<template>
  <div class="container">
    <h1>SSG デモページ</h1>

    <div class="info-box ssg">
      <h2>🏗️ SSG (Static Site Generation)</h2>
      <p><strong>ビルド時刻:</strong> {{ buildTime?.generatedAt }}</p>
      <p><strong>レンダリング:</strong> {{ buildTime?.type }}</p>
      <ul>
        <li>ビルド時に静的HTMLを生成</li>
        <li>全てのページが事前レンダリング</li>
        <li>CDNでの配信に最適</li>
        <li>超高速なページ表示</li>
      </ul>
    </div>

    <div class="posts-section">
      <h2>ビルド時に取得された投稿</h2>
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
    '/ssg-demo': { prerender: true }, // SSG有効化
  }
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

.info-box {
  border-left: 4px solid;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.info-box.ssg {
  background: #fef3c7;
  border-color: #f59e0b;
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
</style>
