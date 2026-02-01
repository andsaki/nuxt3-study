<script setup lang="ts">
import { css } from '~/styled-system/css'

useSeoMeta({
  title: 'UX法則デモ集 - Nuxt 3 Study',
  description: 'ヒックの法則、フィッツの法則、ミラーの法則など、重要なUX法則を体験できるインタラクティブデモ集',
})

interface UXLaw {
  title: string
  description: string
  icon: string
  path: string
  category: string
  colorScheme: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'yellow'
}

const uxLaws: UXLaw[] = [
  {
    title: 'ヒックの法則',
    description: '選択肢が増えるほど、意思決定にかかる時間が長くなる',
    icon: '🎯',
    path: '/hicks-law',
    category: '認知負荷',
    colorScheme: 'purple',
  },
  {
    title: 'フィッツの法則',
    description: 'ターゲットが大きく近いほど、素早く正確に操作できる',
    icon: '🎯',
    path: '/fitts-law',
    category: '操作性',
    colorScheme: 'blue',
  },
  {
    title: 'ミラーの法則',
    description: '人間の短期記憶は7±2個の項目を保持できる',
    icon: '🧠',
    path: '/millers-law',
    category: '記憶',
    colorScheme: 'purple',
  },
  {
    title: '選択のパラドックス',
    description: '選択肢が多すぎると、決定が困難になり満足度が下がる',
    icon: '🤔',
    path: '/paradox-of-choice',
    category: '意思決定',
    colorScheme: 'orange',
  },
  {
    title: 'ドハティの閾値',
    description: 'システムが400ms以内に応答すると、ユーザーの集中力が維持される',
    icon: '⚡',
    path: '/doherty-threshold',
    category: 'パフォーマンス',
    colorScheme: 'yellow',
  },
]

// スタイル
const containerClass = css({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: { base: '1rem', md: '2rem' },
})

const headerClass = css({
  marginBottom: '3rem',
  textAlign: 'center',
})

const titleClass = css({
  fontSize: { base: '2.5rem', md: '3.5rem' },
  fontWeight: 'bold',
  marginBottom: '1rem',
})

const subtitleClass = css({
  fontSize: { base: '1rem', md: '1.25rem' },
  color: 'gray.600',
  marginBottom: '2rem',
})

const cardsGridClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: '1.5rem',
  marginBottom: '3rem',
})

const lawCardClass = css({
  padding: '2rem',
  backgroundColor: 'white',
  border: '2px solid',
  borderColor: 'gray.200',
  borderRadius: 'xl',
  cursor: 'pointer',
  transition: 'all 0.3s',
  _hover: {
    transform: 'translateY(-4px)',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
    borderColor: 'purple.400',
  },
})

const lawIconClass = css({
  fontSize: '3rem',
  marginBottom: '1rem',
})

const lawTitleClass = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: '0.75rem',
  color: 'gray.800',
})

const lawDescClass = css({
  fontSize: '0.95rem',
  color: 'gray.600',
  lineHeight: '1.6',
  marginBottom: '1rem',
})

const categoryBadgeClass = css({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderRadius: 'full',
  backgroundColor: 'purple.100',
  color: 'purple.800',
})
</script>

<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1
        :class="titleClass"
        :style="{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }"
      >
        UX法則デモ集
      </h1>
      <p :class="subtitleClass">
        重要なUX法則を体験できるインタラクティブデモ
      </p>
      <p :class="css({ fontSize: '0.875rem', color: 'gray.500' })">
        各カードをクリックして、法則を実際に体験してみましょう
      </p>
    </header>

    <!-- UX法則カード -->
    <div :class="cardsGridClass">
      <NuxtLink
        v-for="law in uxLaws"
        :key="law.path"
        :to="law.path"
        :class="lawCardClass"
      >
        <div :class="lawIconClass">
          {{ law.icon }}
        </div>
        <h2 :class="lawTitleClass">
          {{ law.title }}
        </h2>
        <p :class="lawDescClass">
          {{ law.description }}
        </p>
        <span :class="categoryBadgeClass">
          {{ law.category }}
        </span>
      </NuxtLink>
    </div>

    <!-- UX法則について -->
    <DesignSystemInfoBox
      variant="info"
      title="UX法則とは？"
      icon="💡"
      left-border
    >
      <div :class="css({ lineHeight: '1.8' })">
        <p :class="css({ marginBottom: '1rem' })">
          UX法則（UX Laws）は、人間の認知や行動に関する科学的な知見をもとに、
          ユーザーエクスペリエンスデザインに適用できる原則をまとめたものです。
        </p>
        <p>
          これらの法則を理解し活用することで、より使いやすく、
          直感的で、ユーザーに優しいインターフェースを設計できます。
        </p>
      </div>
    </DesignSystemInfoBox>

    <!-- ベストプラクティス -->
    <DesignSystemInfoBox
      variant="success"
      title="法則を活用するポイント"
      icon="✅"
      left-border
      :class="css({ marginTop: '2rem' })"
    >
      <ul
        :class="css({
          listStyle: 'none',
          paddingLeft: '0',
          lineHeight: '1.8',
        })"
      >
        <li>✅ <strong>複数の法則を組み合わせる</strong> - 単一の法則ではなく、状況に応じて複数を適用</li>
        <li>✅ <strong>ユーザーテストで検証</strong> - 法則は指針であり、実際のユーザーで確認することが重要</li>
        <li>✅ <strong>コンテキストを考慮</strong> - すべての状況に当てはまるわけではない</li>
        <li>✅ <strong>継続的な改善</strong> - ユーザーのフィードバックをもとに改善を続ける</li>
      </ul>
    </DesignSystemInfoBox>

    <!-- 関連リンク -->
    <DesignSystemInfoBox
      variant="warning"
      title="さらに学ぶ"
      icon="📚"
      left-border
      :class="css({ marginTop: '2rem' })"
    >
      <ul
        :class="css({
          listStyle: 'none',
          paddingLeft: '0',
          lineHeight: '1.8',
        })"
      >
        <li>
          <strong>Laws of UX</strong>:
          <a
            href="https://lawsofux.com"
            target="_blank"
            rel="noopener noreferrer"
            :class="css({ color: 'blue.600', textDecoration: 'underline' })"
          >
            lawsofux.com
          </a>
        </li>
        <li>
          <strong>NN/g (Nielsen Norman Group)</strong>: UXリサーチと設計のリソース
        </li>
        <li>
          <strong>書籍</strong>: 『誰のためのデザイン？』ドナルド・ノーマン
        </li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
