<template>
  <div :class="styles.page">
    <div :class="styles.container">
      <header :class="styles.header">
        <h1 :class="styles.title">Claude Code デモページ</h1>
        <p :class="styles.lead">
          このページはClaude Codeの自動PRレビュー機能をテストするために作成されました。
        </p>
      </header>

      <section :class="styles.featuresSection">
        <h2 :class="styles.sectionTitle">Claude Codeの主な機能</h2>

        <div :class="styles.featureGrid">
          <div v-for="feature in features" :key="feature.title" :class="styles.featureCard">
            <h3 :class="styles.featureTitle">{{ feature.title }}</h3>
            <p :class="styles.featureText">
              {{ feature.description }}
            </p>
            <code v-if="feature.codeHint" :class="styles.codeHint">
              {{ feature.codeHint }}
            </code>
          </div>
        </div>
      </section>

      <section :class="styles.demoSection">
        <div>
          <h2 :class="styles.demoTitle">インタラクティブデモ</h2>
          <p :class="styles.demoDescription">
            実行すると数秒間だけ成功メッセージが表示される簡易デモです。
          </p>
        </div>
        <div :class="styles.demoControls">
          <DesignSystemButton variant="secondary" size="lg" @click="runDemo">
            デモを実行
          </DesignSystemButton>
          <p v-if="demoResult" :class="styles.demoResult">
            {{ demoResult }}
          </p>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { css } from '~/styled-system/css'
import { token } from '~/styled-system/tokens'

const demoResult = ref('')

const runDemo = () => {
  demoResult.value = 'Claude Code PR Review デモが実行されました！ ✨'

  setTimeout(() => {
    demoResult.value = ''
  }, 3000)
}

const features = [
  {
    title: '🤖 Plan Mode',
    description: '読み取り専用モードでコードベースを安全に分析できます。',
    codeHint: 'Shift+Tab でモード切り替え',
  },
  {
    title: '🔍 Code Review',
    description: ' /review コマンドで即座にコードレビューを実行できます。',
  },
  {
    title: '🚀 Subagents',
    description: '特定タスクに特化したAIアシスタントが利用可能です。',
  },
  {
    title: '⚡ GitHub Actions',
    description: 'PRに自動でレビューコメントを追加できます。',
  },
]

const styles = {
  page: css({
    minH: 'screen',
    bg: 'slate.50',
    py: { base: '8', md: '12' },
  }),
  container: css({
    maxW: '6xl',
    mx: 'auto',
    px: { base: '4', md: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '10',
  }),
  header: css({
    bg: 'white',
    borderRadius: '2xl',
    boxShadow: 'xl',
    p: { base: '6', md: '10' },
    borderWidth: '1px',
    borderColor: 'gray.100',
  }),
  title: css({ fontSize: '4xl', fontWeight: 'bold', color: 'slate.900', mb: '4' }),
  lead: css({ fontSize: 'lg', color: 'slate.600', lineHeight: 'relaxed' }),
  featuresSection: css({ display: 'flex', flexDirection: 'column', gap: '6' }),
  sectionTitle: css({ fontSize: '2xl', fontWeight: 'semibold', color: 'slate.800' }),
  featureGrid: css({
    display: 'grid',
    gap: '6',
    gridTemplateColumns: { base: 'repeat(auto-fit, minmax(240px, 1fr))' },
  }),
  featureCard: css({
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'gray.100',
    borderRadius: '2xl',
    p: '6',
    transition: 'all 0.2s ease',
    boxShadow: 'sm',
    _hover: {
      transform: 'translateY(-4px)',
      boxShadow: 'xl',
    },
  }),
  featureTitle: css({ fontSize: 'xl', fontWeight: 'semibold', color: 'slate.900', mb: '3' }),
  featureText: css({ color: 'slate.600', lineHeight: 'relaxed', mb: '3' }),
  codeHint: css({
    display: 'inline-flex',
    fontSize: 'sm',
    bg: 'slate.100',
    color: 'slate.700',
    px: '2',
    py: '1',
    borderRadius: 'md',
  }),
  demoSection: css({
    display: 'grid',
    gap: '6',
    color: 'white',
    borderRadius: '2xl',
    p: { base: '6', md: '10' },
    borderWidth: '1px',
    borderColor: 'indigo.200',
    boxShadow: '2xl',
    backgroundImage: `linear-gradient(135deg, ${token('colors.indigo.500')}, ${token('colors.purple.600')})`,
  }),
  demoTitle: css({ fontSize: '2xl', fontWeight: 'bold' }),
  demoDescription: css({ color: 'whiteAlpha.800' }),
  demoControls: css({ textAlign: 'center', mt: '4', display: 'flex', flexDirection: 'column', gap: '4' }),
  demoResult: css({
    fontSize: 'xl',
    fontWeight: 'semibold',
    transition: 'opacity 0.3s ease, transform 0.3s ease',
  }),
}
</script>
