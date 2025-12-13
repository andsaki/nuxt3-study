<script setup lang="ts">
interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// サーバーサイドでデータを取得
const { data: serverTime } = await useAsyncData("server-time", async () => {
  return {
    timestamp: new Date().toISOString(),
    message: "このデータはサーバーサイドで生成されました",
  };
});

// JSONPlaceholderからデータを取得（SSR）
const { data: posts } = await useFetch<Post[]>(
  "https://jsonplaceholder.typicode.com/posts?_limit=5"
);

// クライアント情報
const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});
</script>

<template>
  <div class="container">
    <h1>SSR デモページ</h1>

    <div class="info-box">
      <h2>レンダリング情報</h2>
      <p>現在の環境: {{ isClient ? "クライアント" : "サーバー" }}</p>
      <p>サーバータイムスタンプ: {{ serverTime?.timestamp }}</p>
      <p>{{ serverTime?.message }}</p>
    </div>

    <div class="posts-section">
      <h2>サーバーサイドで取得した投稿</h2>
      <div v-if="posts" class="posts-list">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
          <small>投稿 ID: {{ post.id }}</small>
        </article>
      </div>
      <p v-else>読み込み中...</p>
    </div>

    <div class="explanation">
      <h2>SSRについて</h2>
      <ul>
        <li>このページはサーバーサイドでレンダリングされます</li>
        <li>初回ロード時、HTMLは既にデータを含んでいます</li>
        <li>useAsyncDataとuseFetchはSSRに対応しています</li>
        <li>
          ページソースを表示すると、データが含まれていることが確認できます
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
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.info-box {
  background: #f0f9ff;
  border-left: 4px solid #00dc82;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.info-box p {
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
  transition: box-shadow 0.2s;
}

.post-card:hover {
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.post-card h3 {
  color: #1f2937;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.post-card p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.post-card small {
  color: #9ca3af;
}

.explanation {
  background: #fef3c7;
  border-left: 4px solid #f59e0b;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 4px;
}

.explanation ul {
  margin: 0;
  padding-left: 1.5rem;
}

.explanation li {
  margin: 0.5rem 0;
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
