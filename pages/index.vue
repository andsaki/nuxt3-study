<template>
  <div :class="css({ minH: 'screen', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'gray.50', py: '12' })">
    <div :class="css({ maxW: '6xl', w: 'full', px: { base: 4, md: 8 }, spaceY: '8' })">
      <!-- タイトル -->
      <div :class="css({ textAlign: 'center', mb: '12' })">
        <h1 :class="css({ fontSize: { base: '3xl', md: '5xl' }, fontWeight: 'bold', color: 'gray.900', mb: '3' })">
          Nuxt 3 Study
        </h1>
        <p :class="css({ fontSize: { base: 'md', md: 'lg' }, color: 'gray.600' })">
          Vue 3 + Nuxt 3 を使った、モダンなフロントエンド開発とUI/UXデザイン実装の学習プロジェクト
        </p>
      </div>

      <!-- カウンター -->
      <div :class="css({ maxW: 'md', mx: 'auto', mb: '12' })">
        <DesignSystemCard title="カウンター (Pinia)" icon="🔢" color-scheme="blue">
          <div :class="css({ fontSize: '6xl', fontWeight: 'bold', textAlign: 'center', color: 'blue.600' })">
            {{ counterStore.count }}
          </div>

          <div :class="css({ display: 'flex', gap: '2', justifyContent: 'center', mt: '4' })">
            <DesignSystemButton
              variant="danger"
              size="md"
              @click="counterStore.decrement"
            >
              -1
            </DesignSystemButton>
            <DesignSystemButton
              variant="secondary"
              size="md"
              @click="counterStore.reset"
            >
              リセット
            </DesignSystemButton>
            <DesignSystemButton
              variant="primary"
              size="md"
              @click="counterStore.increment"
            >
              +1
            </DesignSystemButton>
          </div>

          <div :class="css({ fontSize: 'sm', color: 'gray.500', textAlign: 'center', mt: '4' })">
            ※ LocalStorageに永続化されます
          </div>
        </DesignSystemCard>
      </div>

      <!-- カテゴリグリッド -->
      <div>
        <h2 :class="css({ fontSize: '2xl', fontWeight: 'bold', color: 'gray.900', mb: '6', textAlign: 'center' })">
          学習コンテンツ
        </h2>
        <div :class="css({ display: 'grid', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: '6' })">
          <!-- デザインシステム -->
          <NuxtLink to="/design-system" :class="categoryCardClass">
            <div :class="css({ fontSize: '4xl', mb: '3' })">🎨</div>
            <h3 :class="categoryTitleClass">デザインシステム</h3>
            <p :class="categoryDescClass">
              Panda CSS + アクセシブルなコンポーネント設計
            </p>
          </NuxtLink>

          <!-- UX法則デモ -->
          <NuxtLink to="/ux-laws" :class="categoryCardClass">
            <div :class="css({ fontSize: '4xl', mb: '3' })">🧠</div>
            <h3 :class="categoryTitleClass">UX法則デモ</h3>
            <p :class="categoryDescClass">
              Hicks, Fitts, Miller's, Jakob's Law等の実装例
            </p>
          </NuxtLink>

          <!-- レンダリング・パフォーマンス -->
          <NuxtLink to="/demos" :class="categoryCardClass">
            <div :class="css({ fontSize: '4xl', mb: '3' })">⚡</div>
            <h3 :class="categoryTitleClass">レンダリング・パフォーマンス</h3>
            <p :class="categoryDescClass">
              SSR, SSG, ISR, Doherty Threshold (400ms)
            </p>
          </NuxtLink>

          <!-- Vue / Nuxt 学習 -->
          <NuxtLink to="/vue-guide" :class="categoryCardClass">
            <div :class="css({ fontSize: '4xl', mb: '3' })">📚</div>
            <h3 :class="categoryTitleClass">Vue / Nuxt 学習</h3>
            <p :class="categoryDescClass">
              Composition API, Auto Import, TypeScript比較
            </p>
          </NuxtLink>

          <!-- データフェッチング -->
          <NuxtLink to="/examples/data-fetching" :class="categoryCardClass">
            <div :class="css({ fontSize: '4xl', mb: '3' })">🔄</div>
            <h3 :class="categoryTitleClass">データフェッチング</h3>
            <p :class="categoryDescClass">
              TanStack Query, useFetch, キャッシング戦略
            </p>
          </NuxtLink>

          <!-- フォーム・バリデーション -->
          <NuxtLink to="/examples/forms" :class="categoryCardClass">
            <div :class="css({ fontSize: '4xl', mb: '3' })">📝</div>
            <h3 :class="categoryTitleClass">フォーム・バリデーション</h3>
            <p :class="categoryDescClass">
              VeeValidate + Zod によるフォーム実装
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const counterStore = useCounterStore()

// カテゴリカードのスタイル
const categoryCardClass = css({
  display: 'block',
  p: '6',
  bg: 'white',
  rounded: 'xl',
  boxShadow: 'md',
  textAlign: 'center',
  textDecoration: 'none',
  transition: 'all 0.3s',
  border: '2px solid',
  borderColor: 'transparent',
  cursor: 'pointer',
  minW: '200px',
  wordBreak: 'keep-all',
  _hover: {
    transform: 'translateY(-4px)',
    boxShadow: 'xl',
    borderColor: 'blue.300',
  },
})

const categoryTitleClass = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  color: 'gray.900',
  mb: '2',
  wordBreak: 'keep-all',
  whiteSpace: 'normal',
})

const categoryDescClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  lineHeight: '1.6',
  wordBreak: 'keep-all',
  whiteSpace: 'normal',
})
</script>
