<script setup lang="ts">
import { css } from '~/styled-system/css'

interface Post {
  id: number
  userId: number
  title: string
  body: string
}

const { data: posts, refresh, status } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=5',
  { key: 'posts-list' },
)

const { data: user } = await useFetch('https://jsonplaceholder.typicode.com/users/1', {
  key: 'user-1',
  dedupe: 'cancel',
})

const { data: fresh } = await useFetch('https://jsonplaceholder.typicode.com/posts/1', {
  key: 'fresh-post',
  getCachedData: () => null,
})

const { data: stale, refresh: refreshStale } = await useFetch('https://jsonplaceholder.typicode.com/posts/2', {
  key: 'stale-post',
  server: false,
})

const shouldFetch = ref(true)
const { data: conditional } = await useFetch('https://jsonplaceholder.typicode.com/posts/3', {
  key: 'conditional-post',
  watch: [shouldFetch],
  immediate: shouldFetch.value,
})

const lastRefresh = ref<string>('')

const handleRefresh = async () => {
  await refresh()
  lastRefresh.value = new Date().toLocaleTimeString()
}

const styles = {
  page: css({ minH: 'screen', bg: 'gray.50', py: '10' }),
  container: css({
    maxW: '6xl',
    mx: 'auto',
    px: { base: '4', sm: '6', lg: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
  }),
  title: css({ fontSize: '4xl', fontWeight: 'bold', color: 'emerald.500' }),
  section: css({
    bg: 'white',
    borderRadius: '2xl',
    borderWidth: '1px',
    borderColor: 'gray.100',
    p: '6',
    boxShadow: 'md',
  }),
  infoBox: css({
    bg: 'blue.50',
    borderLeftWidth: '4px',
    borderColor: 'cyan.500',
    borderRadius: 'xl',
    p: '5',
    color: 'slate.700',
  }),
  sectionHeader: css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '4' }),
  primaryButton: css({
    bg: 'emerald.500',
    color: 'white',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    fontWeight: 'semibold',
    border: 'none',
    _hover: { bg: 'emerald.600' },
  }),
  postsGrid: css({ display: 'grid', gap: '4' }),
  postCard: css({
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: 'gray.200',
    p: '4',
    bg: 'gray.50',
  }),
  codeBlock: css({
    bg: 'slate.900',
    color: 'slate.50',
    borderRadius: 'xl',
    p: '4',
    fontFamily: 'mono',
    overflowX: 'auto',
  }),
  backLink: css({
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
      <h1 :class="styles.title">useFetch キャッシュデモ</h1>

      <section :class="styles.infoBox">
        <h2>キャッシュ機能</h2>
        <ul>
          <li>useFetchはデフォルトでkeyベースでキャッシュ</li>
          <li>同じkeyの場合、キャッシュされたデータを返す</li>
          <li>refresh()でキャッシュを更新</li>
          <li>dedupeで同時リクエストを制御</li>
          <li>getCachedDataでカスタムキャッシュロジック</li>
        </ul>
      </section>

      <section :class="styles.section">
        <div :class="styles.sectionHeader">
          <h2>投稿リスト（キャッシュあり）</h2>
          <button :class="styles.primaryButton" @click="handleRefresh">
            {{ status === 'pending' ? '更新中...' : '再取得' }}
          </button>
        </div>
        <p v-if="lastRefresh">最終更新: {{ lastRefresh }}</p>
        <div v-if="posts" :class="styles.postsGrid">
          <article v-for="post in posts" :key="post.id" :class="styles.postCard">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body.slice(0, 100) }}...</p>
          </article>
        </div>
      </section>

      <section :class="styles.section">
        <h2>ユーザー情報（dedupe設定）</h2>
        <pre v-if="user" :class="styles.codeBlock">{{ user }}</pre>
      </section>

      <section :class="styles.section">
        <h2>常に新しいデータ（キャッシュ無効）</h2>
        <pre v-if="fresh" :class="styles.codeBlock">{{ fresh }}</pre>
      </section>

      <section :class="styles.section">
        <h3>基本的な使い方</h3>
        <pre :class="styles.codeBlock"><code>const { data, refresh, status } = await useFetch('/api/posts', {
  key: 'posts-list', // キャッシュキー
  dedupe: 'cancel',  // 同時リクエスト制御
})</code></pre>
      </section>

      <section :class="styles.section">
        <h3>キャッシュを無効化</h3>
        <pre :class="styles.codeBlock"><code>const { data } = await useFetch('/api/posts', {
  getCachedData: () => null, // キャッシュを使わない
})</code></pre>
      </section>

      <NuxtLink to="/" :class="styles.backLink">← トップページに戻る</NuxtLink>
    </div>
  </div>
</template>
