<script setup lang="ts">
import { css } from '~/styled-system/css'

interface Post {
  id: number
  title: string
  body: string
}

const { data: ssrData } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=3',
)

const { data: serverTime } = await useAsyncData('verify-time', async () => {
  return {
    generatedAt: new Date().toISOString(),
    random: Math.random(),
  }
})

const clientMountTime = ref('')
const clientRandom = ref(0)
const isHydrated = ref(false)

onMounted(() => {
  clientMountTime.value = new Date().toISOString()
  clientRandom.value = Math.random()
  isHydrated.value = true
})

const howToVerify = [
  'ページを右クリック → "ページのソースを表示"',
  'HTMLに投稿データ、サーバータイム、ランダム値が含まれているか確認',
  'DevTools で実際のDOMを確認し、値の違いを比較',
  'サーバー値とクライアント値が異なることを確認',
]

const infoRows = [
  { label: '生成時刻', value: () => serverTime.value?.generatedAt ?? '---' },
  { label: 'ランダム値', value: () => serverTime.value?.random ?? '---' },
  { label: 'データ件数', value: () => `${ssrData.value?.length ?? 0} 件` },
]

const clientRows = [
  { label: 'マウント時刻', value: () => clientMountTime.value || '未マウント' },
  { label: 'ランダム値', value: () => clientRandom.value || '未生成' },
  { label: 'Hydration', value: () => (isHydrated.value ? '完了' : '未完了') },
]

const styles = {
  page: css({
    maxW: '6xl',
    mx: 'auto',
    py: '10',
    px: { base: '4', md: '6', lg: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  title: css({ fontSize: '4xl', fontWeight: 'bold', color: 'emerald.500' }),
  card: css({
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'gray.200',
    borderRadius: '2xl',
    p: '6',
    boxShadow: 'md',
  }),
  sectionTitle: css({ fontSize: 'xl', fontWeight: 'semibold', color: 'slate.800', mb: '4' }),
  verifySteps: css({
    mt: '4',
    bg: 'slate.900',
    color: 'slate.100',
    borderRadius: 'lg',
    p: '4',
    lineHeight: 'tall',
    fontFamily: 'mono',
    whiteSpace: 'pre-wrap',
  }),
  list: css({ display: 'flex', flexDirection: 'column', gap: '3' }),
  infoSection: css({
    display: 'grid',
    gap: '4',
  }),
  infoGrid: css({
    display: 'grid',
    gap: '3',
  }),
  infoItem: css({
    display: 'flex',
    justifyContent: 'space-between',
    bg: 'gray.50',
    p: '3',
    borderRadius: 'lg',
    borderWidth: '1px',
    borderColor: 'gray.200',
  }),
  infoLabel: css({ fontWeight: 'semibold', color: 'slate.600' }),
  infoValue: css({ fontFamily: 'mono', color: 'slate.700' }),
  postsGrid: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', sm: 'repeat(auto-fit, minmax(240px, 1fr))' },
  }),
  postCard: css({
    bg: 'gray.50',
    borderRadius: 'xl',
    p: '4',
    borderWidth: '1px',
    borderColor: 'gray.200',
    position: 'relative',
  }),
  postId: css({
    position: 'absolute',
    top: '3',
    right: '3',
    fontSize: 'sm',
    fontWeight: 'semibold',
    bg: 'emerald.500',
    color: 'white',
    px: '2',
    py: '1',
    borderRadius: 'md',
  }),
  postTitle: css({ fontWeight: 'semibold', color: 'slate.800', mb: '2', pr: '10' }),
  postBody: css({ color: 'slate.600', lineHeight: 'relaxed', fontSize: 'sm' }),
  resultGrid: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', md: 'repeat(auto-fit, minmax(200px, 1fr))' },
  }),
  resultItem: css({
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    borderWidth: '2px',
    borderRadius: 'xl',
    p: '4',
    bg: 'white',
    borderColor: 'rose.400',
    '&.success': {
      borderColor: 'emerald.400',
    },
  }),
  icon: css({ fontSize: '2xl', fontWeight: 'bold' }),
  debugSection: css({
    bg: 'slate.900',
    color: 'slate.50',
    borderRadius: 'xl',
    p: '4',
    '& summary': { cursor: 'pointer', fontWeight: 'semibold' },
    '& pre': {
      mt: '3',
      bg: 'slate.800',
      p: '4',
      borderRadius: 'lg',
      overflowX: 'auto',
    },
  }),
  hint: css({ color: 'slate.500', fontStyle: 'italic', fontSize: 'sm', mb: '4' }),
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
    <h1 :class="styles.title">SSR 検証ページ</h1>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">🔍 検証方法</h2>
      <ul :class="styles.list">
        <li v-for="step in howToVerify" :key="step">
          {{ step }}
        </li>
      </ul>
      <pre :class="styles.verifySteps">SSRが正しく動作している場合:
→ HTMLソースにデータが含まれている
→ サーバーとクライアントのランダム値が異なる
→ クライアントのマウント時刻がサーバー時刻より遅い

CSRの場合:
→ HTMLソースにデータが含まれていない
→ ローディング表示だけがHTMLに含まれる</pre>
    </section>

    <section :class="styles.infoSection">
      <div :class="styles.card">
        <h2 :class="styles.sectionTitle">🖥️ サーバー情報（SSR）</h2>
        <div :class="styles.infoGrid">
          <div v-for="row in infoRows" :key="row.label" :class="styles.infoItem">
            <span :class="styles.infoLabel">{{ row.label }}:</span>
            <span :class="styles.infoValue">{{ row.value() }}</span>
          </div>
        </div>
      </div>

      <div :class="styles.card">
        <h2 :class="styles.sectionTitle">💻 クライアント情報（CSR）</h2>
        <div :class="styles.infoGrid">
          <div v-for="row in clientRows" :key="row.label" :class="styles.infoItem">
            <span :class="styles.infoLabel">{{ row.label }}:</span>
            <span :class="styles.infoValue">{{ row.value() }}</span>
          </div>
        </div>
      </div>
    </section>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">📄 SSRで取得されたデータ</h2>
      <p :class="styles.hint">
        ※このデータはHTMLソースに含まれています（ページソースを表示して確認）
      </p>

      <div v-if="ssrData" :class="styles.postsGrid">
        <article v-for="post in ssrData" :key="post.id" :class="styles.postCard">
          <div :class="styles.postId">ID: {{ post.id }}</div>
          <h3 :class="styles.postTitle">{{ post.title }}</h3>
          <p :class="styles.postBody">{{ post.body }}</p>
        </article>
      </div>
      <div v-else>
        データを読み込んでいます...
      </div>
    </section>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">✅ 検証結果</h2>
      <div :class="styles.resultGrid">
        <div :class="[styles.resultItem, ssrData && ssrData.length > 0 ? 'success' : '']">
          <span :class="styles.icon">{{ ssrData && ssrData.length > 0 ? '✓' : '✗' }}</span>
          <span>SSRデータ取得</span>
        </div>
        <div :class="[styles.resultItem, serverTime?.random ? 'success' : '']">
          <span :class="styles.icon">{{ serverTime?.random ? '✓' : '✗' }}</span>
          <span>サーバー値生成</span>
        </div>
        <div :class="[styles.resultItem, isHydrated ? 'success' : '']">
          <span :class="styles.icon">{{ isHydrated ? '✓' : '✗' }}</span>
          <span>クライアントHydration</span>
        </div>
        <div :class="[styles.resultItem, clientRandom !== serverTime?.random ? 'success' : '']">
          <span :class="styles.icon">{{ clientRandom !== serverTime?.random ? '✓' : '✗' }}</span>
          <span>サーバー/クライアント分離</span>
        </div>
      </div>
    </section>

    <details :class="styles.debugSection">
      <summary>🐛 デバッグ情報（JSON）</summary>
      <pre>{{ {
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

    <NuxtLink to="/" :class="styles.backLink">← トップページに戻る</NuxtLink>
  </div>
</template>
