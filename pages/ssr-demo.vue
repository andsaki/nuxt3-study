<template>
  <div>
    <AppHeader />

    <div :class="css({ maxW: '1200px', mx: 'auto', p: '8' })">
      <h1 :class="css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900', mb: '8' })">
        SSR デモページ
      </h1>

      <!-- レンダリング情報カード -->
      <DesignSystemCard title="🖥️ レンダリング情報" color-scheme="blue">
        <div :class="css({ spaceY: '2' })">
          <p><strong>現在の環境:</strong> {{ isClient ? "クライアント" : "サーバー" }}</p>
          <p><strong>サーバータイムスタンプ:</strong> {{ serverTime?.timestamp }}</p>
          <p>{{ serverTime?.message }}</p>
        </div>
      </DesignSystemCard>

      <!-- データ表示カード -->
      <DesignSystemCard title="📝 サーバーサイドで取得した投稿">
        <div v-if="posts" :class="css({ spaceY: '4' })">
          <article
            v-for="post in posts"
            :key="post.id"
            :class="css({
              bg: 'white',
              border: '1px solid',
              borderColor: 'gray.200',
              rounded: 'lg',
              p: '6',
              transition: 'all 0.2s',
              _hover: { shadow: 'md', borderColor: 'gray.300' }
            })"
          >
            <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', color: 'gray.900', mb: '2' })">
              {{ post.title }}
            </h3>
            <p :class="css({ color: 'gray.600', lineHeight: '1.6', mb: '2' })">
              {{ post.body }}
            </p>
            <small :class="css({ color: 'gray.400', fontSize: 'sm' })">
              投稿 ID: {{ post.id }}
            </small>
          </article>
        </div>
        <p v-else :class="css({ color: 'gray.500' })">読み込み中...</p>
      </DesignSystemCard>

      <!-- SSR説明カード -->
      <DesignSystemCard title="💡 SSRについて" color-scheme="yellow">
        <ul :class="css({ pl: '6', spaceY: '2', listStyleType: 'disc' })">
          <li>このページはサーバーサイドでレンダリングされます</li>
          <li>初回ロード時、HTMLは既にデータを含んでいます</li>
          <li>useAsyncDataとuseFetchはSSRに対応しています</li>
          <li>ページソースを表示すると、データが含まれていることが確認できます</li>
        </ul>
      </DesignSystemCard>

      <!-- 戻るリンク -->
      <NuxtLink
        to="/"
        :class="css({
          display: 'inline-block',
          mt: '8',
          px: '6',
          py: '3',
          color: 'green.600',
          fontWeight: 'medium',
          border: '2px solid',
          borderColor: 'green.600',
          rounded: 'md',
          transition: 'all 0.2s',
          _hover: {
            bg: 'green.600',
            color: 'white'
          }
        })"
      >
        ← トップページに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

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
