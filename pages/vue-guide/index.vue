<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <h1 :class="titleClass">Vue 3 学習ガイド</h1>
      <p :class="descriptionClass">
        Vue 3 Composition API、Nuxt 3、TypeScriptの学習コンテンツ集
      </p>
    </div>

    <!-- Core Concepts -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Core Concepts</h2>
      <div :class="gridClass">
        <DesignSystemCard
          title="Vue Guide"
          icon="📚"
          color-scheme="blue"
        >
          <p :class="descClass">Vue 3 Composition APIの基礎から応用まで</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/vue-guide/vue-guide')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>

        <DesignSystemCard
          title="Composition API Reference"
          icon="🔧"
          color-scheme="purple"
        >
          <p :class="descClass">ref, reactive, computed, watchなどのAPI解説</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/vue-guide/composition-api')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>

        <DesignSystemCard
          title="Vue Best Practices"
          icon="✨"
          color-scheme="green"
        >
          <p :class="descClass">Vue 3のベストプラクティスとアンチパターン</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/vue-guide/best-practices')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>
      </div>
    </section>

    <!-- Component Patterns -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Component Patterns</h2>
      <div :class="gridClass">
        <DesignSystemCard
          title="withDefaults Guide"
          icon="⚙️"
          color-scheme="blue"
        >
          <p :class="descClass">definePropsとwithDefaultsの使い方</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/vue-guide/with-defaults')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>

        <DesignSystemCard
          title="Named v-model"
          icon="🔄"
          color-scheme="purple"
        >
          <p :class="descClass">v-model:propNameによる双方向バインディング</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/vue-guide/named-v-model')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>
      </div>
    </section>

    <!-- State Management -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">State Management</h2>
      <div :class="gridClass">
        <DesignSystemCard
          title="State Management Comparison"
          icon="📊"
          color-scheme="yellow"
        >
          <p :class="descClass">Pinia vs Vuex vs Composition APIの比較</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/vue-guide/state-management')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>
      </div>
    </section>

    <!-- UI/UX Principles -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">UI/UX Principles</h2>
      <div :class="gridClass">
        <DesignSystemCard
          title="Jakob's Law"
          icon="🎨"
          color-scheme="red"
        >
          <p :class="descClass">ユーザーは他のサイトでの経験を期待する</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/jakobs-law')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>

        <DesignSystemCard
          title="Hick's Law"
          icon="⏱️"
          color-scheme="purple"
        >
          <p :class="descClass">選択肢が増えるほど、意思決定に時間がかかる</p>
          <DesignSystemButton variant="primary" size="sm" @click="navigateTo('/hicks-law')">
            詳細を見る
          </DesignSystemButton>
        </DesignSystemCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

// スタイル
const containerClass = css({
  minH: 'screen',
  bg: 'gray.50',
  py: 8,
})

const headerClass = css({
  maxW: '7xl',
  mx: 'auto',
  px: { base: 4, md: 6, lg: 8 },
  mb: 12,
  textAlign: 'center',
})

const titleClass = css({
  fontSize: { base: '3xl', md: '4xl' },
  fontWeight: 'bold',
  color: 'gray.900',
  mb: 4,
})

const descriptionClass = css({
  fontSize: { base: 'base', md: 'lg' },
  color: 'gray.600',
  maxW: '2xl',
  mx: 'auto',
})

const sectionClass = css({
  maxW: '7xl',
  mx: 'auto',
  px: { base: 4, md: 6, lg: 8 },
  mb: 16,
})

const sectionTitleClass = css({
  fontSize: { base: '2xl', md: '3xl' },
  fontWeight: 'bold',
  color: 'gray.900',
  mb: 6,
})

const gridClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 6,
})

const descClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  mb: 4,
})
</script>
