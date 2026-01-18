<script setup lang="ts">
import { css } from '~/styled-system/css'

const styles = {
  page: css({
    maxW: '5xl',
    mx: 'auto',
    py: '12',
    px: { base: '4', md: '6' },
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
  }),
  gridTwo: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
  }),
  modeGrid: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
  }),
  codeBlock: css({
    fontFamily:
      "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', 'Courier New', monospace",
    bg: 'gray.900',
    color: 'gray.50',
    fontSize: 'sm',
    lineHeight: '1.6',
    borderRadius: 'lg',
    p: '4',
    whiteSpace: 'pre-wrap',
    overflowX: 'auto',
  }),
  bulletList: css({
    mt: '3',
    pl: '5',
    listStyleType: 'disc',
    color: 'contents.secondary',
    spaceY: '1',
  }),
  backLink: css({
    alignSelf: 'flex-start',
    mt: '4',
    color: 'green.600',
    fontWeight: 'medium',
    borderWidth: '2px',
    borderColor: 'green.600',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    _hover: {
      bg: 'green.600',
      color: 'white',
    },
  }),
}

type CardScheme = 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'

interface ComparisonExample {
  title: string
  icon: string
  colorScheme: CardScheme
  description: string
  code: string
}

interface RenderingModeCard {
  title: string
  icon: string
  colorScheme: CardScheme
  code: string
  bullets: string[]
}

const comparisonExamples: ComparisonExample[] = [
  {
    title: '❌ できないこと',
    icon: '🚫',
    colorScheme: 'red',
    description: 'useAsyncDataのオプションではSSR / SSG / ISRを切り替えられません。',
    code: `// useAsyncDataでSSG/ISRは設定できない
const { data } = await useAsyncData('key',
  async () => { ... },
  {
    // こういうオプションは存在しない
    prerender: true,  // ❌
    swr: 60,          // ❌
    isr: true,        // ❌
  }
)`,
  },
  {
    title: '✅ 正しい方法',
    icon: '✅',
    colorScheme: 'green',
    description: 'routeRules（または各ページのdefinePageMeta）でレンダリングモードを宣言します。',
    code: `// nuxt.config.ts で設定
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
)`,
  },
]

const renderingModes: RenderingModeCard[] = [
  {
    title: 'SSR (Server-Side Rendering)',
    icon: '🖥️',
    colorScheme: 'blue',
    code: `// デフォルト（設定不要）
routeRules: {
  '/page': { ssr: true }
}`,
    bullets: ['リクエストごとにサーバーでレンダリング', '常に最新データを取得'],
  },
  {
    title: 'SSG (Static Site Generation)',
    icon: '🏗️',
    colorScheme: 'yellow',
    code: `routeRules: {
  '/page': { prerender: true }
}`,
    bullets: ['ビルド時に静的HTMLを生成', 'CDN配信に最適'],
  },
  {
    title: 'ISR (Incremental Static Regeneration)',
    icon: '⚡',
    colorScheme: 'purple',
    code: `routeRules: {
  '/page': { swr: 60 } // 60秒
}`,
    bullets: ['キャッシュ + バックグラウンド再生成', 'Stale-While-Revalidate方式'],
  },
  {
    title: 'CSR (Client-Side Rendering)',
    icon: '🧪',
    colorScheme: 'gray',
    code: `routeRules: {
  '/page': { ssr: false }
}`,
    bullets: ['クライアントでのみレンダリング', 'SPAモード'],
  },
]

const useAsyncDataOptionsExample = `const { data } = await useAsyncData('key', async () => {...}, {
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
})`
</script>

<template>
  <div :class="styles.page">
    <DesignSystemInfoBox variant="info" icon="ℹ️" title="レンダリングモードの設定">
      <p>
        Nuxt 3ではページ単位でSSR / SSG / ISR / CSRを切り替えられます。アプリの要件に合わせて、適切なレンダリング方法を組み合わせることが重要です。
      </p>
    </DesignSystemInfoBox>

    <DesignSystemInfoBox variant="warning" icon="⚠️" title="重要">
      <p>useAsyncDataのオプションではレンダリングモードを変更できません。設定は必ずnuxt.config.tsのrouteRulesで行います。</p>
    </DesignSystemInfoBox>

    <div :class="styles.gridTwo">
      <DesignSystemCard
        v-for="example in comparisonExamples"
        :key="example.title"
        :title="example.title"
        :icon="example.icon"
        :color-scheme="example.colorScheme"
      >
        <p>{{ example.description }}</p>
        <pre :class="styles.codeBlock"><code>{{ example.code }}</code></pre>
      </DesignSystemCard>
    </div>

    <DesignSystemCard title="レンダリングモード一覧" icon="🧭" color-scheme="blue">
      <div :class="styles.modeGrid">
        <DesignSystemCard
          v-for="mode in renderingModes"
          :key="mode.title"
          variant="bordered"
          :title="mode.title"
          :icon="mode.icon"
          :color-scheme="mode.colorScheme"
        >
          <pre :class="styles.codeBlock"><code>{{ mode.code }}</code></pre>
          <ul :class="styles.bulletList">
            <li v-for="point in mode.bullets" :key="point">
              {{ point }}
            </li>
          </ul>
        </DesignSystemCard>
      </div>
    </DesignSystemCard>

    <DesignSystemCard title="useAsyncDataのオプション" icon="🛠️" color-scheme="green">
      <p>レンダリングモードとは独立して、useAsyncDataでは実行タイミングやキャッシュ挙動を細かく制御できます。代表的なオプションは以下のとおりです。</p>
      <pre :class="styles.codeBlock"><code>{{ useAsyncDataOptionsExample }}</code></pre>
    </DesignSystemCard>

    <NuxtLink to="/" :class="styles.backLink">
      ← トップページに戻る
    </NuxtLink>
  </div>
</template>
