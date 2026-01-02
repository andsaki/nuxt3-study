<template>
  <div>
    <AppHeader />

    <div :class="css({ maxW: '1200px', mx: 'auto', p: '8' })">
      <h1 :class="css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900', mb: '8' })">
        SSG デモページ
      </h1>

      <!-- SSG説明カード -->
      <DesignSystemCard title="🏗️ SSG (Static Site Generation)" color-scheme="yellow">
        <div :class="css({ spaceY: '3' })">
          <p><strong>ビルド時刻:</strong> {{ buildTime?.generatedAt }}</p>
          <p><strong>レンダリング:</strong> {{ buildTime?.type }}</p>
          <ul :class="css({ mt: '4', pl: '6', spaceY: '2', listStyleType: 'disc' })">
            <li>ビルド時に静的HTMLを生成</li>
            <li>全てのページが事前レンダリング</li>
            <li>CDNでの配信に最適</li>
            <li>超高速なページ表示</li>
          </ul>
        </div>
      </DesignSystemCard>

      <!-- データ表示カード -->
      <DesignSystemCard title="📝 ビルド時に取得された投稿">
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
            <p :class="css({ color: 'gray.600', lineHeight: '1.6' })">
              {{ post.body }}
            </p>
          </article>
        </div>
      </DesignSystemCard>

      <!-- 設定方法カード -->
      <DesignSystemCard title="⚙️ 設定方法（nuxt.config.ts）">
        <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', overflow: 'auto' })">
          <pre :class="css({ fontSize: 'sm' })"><code>export default defineNuxtConfig({
  routeRules: {
    '/ssg-demo': { prerender: true }, // SSG有効化
  }
})</code></pre>
        </div>
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
