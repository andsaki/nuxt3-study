<template>
  <article :class="articleContainer">
    <!-- ヘッダー: 非対称なレイアウト -->
    <header :class="headerSection">
      <div :class="categoryBadge">{{ article.category }}</div>
      <h1 :class="titleClass">{{ article.title }}</h1>
      <div :class="metaInfo">
        <time :datetime="article.date">{{ formattedDate }}</time>
        <span :class="separator">·</span>
        <span>{{ article.readTime }} min read</span>
      </div>
    </header>

    <!-- ヒーロー画像: 非対称な配置 -->
    <figure :class="heroFigure">
      <div :class="imageWrapper">
        <div :class="imagePlaceholder">
          {{ article.imageCaption }}
        </div>
      </div>
      <figcaption :class="caption">{{ article.imageCaption }}</figcaption>
    </figure>

    <!-- 記事本文: ドロップキャップと大きな余白 -->
    <div :class="contentSection">
      <p :class="leadParagraph">
        <span :class="dropCap">{{ article.content[0][0] }}</span>{{ article.content[0].slice(1) }}
      </p>

      <p v-for="(paragraph, index) in article.content.slice(1)" :key="index" :class="bodyParagraph">
        {{ paragraph }}
      </p>

      <!-- プルクオート: 視覚的なアクセント -->
      <blockquote :class="pullQuote">
        <p>{{ article.quote }}</p>
      </blockquote>

      <p :class="bodyParagraph">
        {{ article.closingText }}
      </p>
    </div>

    <!-- フッター: 著者情報 -->
    <footer :class="authorSection">
      <div :class="authorAvatar">{{ article.author.initials }}</div>
      <div :class="authorInfo">
        <div :class="authorName">{{ article.author.name }}</div>
        <div :class="authorBio">{{ article.author.bio }}</div>
      </div>
    </footer>
  </article>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

// サンプル記事データ
const article = ref({
  category: 'Design',
  title: 'The Art of Minimalist Typography in Modern Web Design',
  date: '2026-01-02',
  readTime: 8,
  imageCaption: 'Exploring the intersection of form and function',
  author: {
    name: 'Elena Martinez',
    initials: 'EM',
    bio: 'Design Director & Typography Enthusiast'
  },
  content: [
    'Typography is not merely about making letters legible—it is about creating an emotional connection between the reader and the content. In the realm of modern web design, minimalist typography has emerged as a powerful tool for crafting sophisticated digital experiences.',
    'The philosophy behind minimalist typography extends beyond simple aesthetics. It represents a deliberate choice to eliminate unnecessary elements and focus on what truly matters: clarity, hierarchy, and rhythm. Each typeface selection, each line height adjustment, each letter spacing decision contributes to the overall reading experience.',
    'Consider the work of legendary typographers like Jan Tschichold and Emil Ruder. Their principles of asymmetric layouts and generous white space continue to influence contemporary design. These masters understood that what we leave out is just as important as what we include.',
  ],
  quote: 'White space is not empty space. It is a powerful design element that gives content room to breathe.',
  closingText: 'As we move forward in web design, the principles of minimalist typography will continue to guide us toward creating more thoughtful, intentional digital experiences. The challenge lies not in adding more, but in knowing what to take away.'
})

const formattedDate = computed(() => {
  return new Date(article.value.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
})

// エディトリアルスタイル: 洗練されたタイポグラフィと非対称レイアウト
const articleContainer = css({
  maxWidth: '72rem',
  margin: '0 auto',
  padding: { base: '2rem', md: '4rem 2rem', lg: '6rem 4rem' },
  backgroundColor: '#FAFAF8', // 温かみのあるオフホワイト
  minHeight: '100vh'
})

const headerSection = css({
  maxWidth: '42rem',
  marginBottom: '4rem',
  paddingLeft: { base: '0', lg: '8rem' } // 非対称な左パディング
})

const categoryBadge = css({
  display: 'inline-block',
  fontSize: '0.75rem',
  fontWeight: '600',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: '#8B4513', // サドルブラウン
  marginBottom: '1.5rem',
  paddingBottom: '0.5rem',
  borderBottom: '2px solid currentColor'
})

const titleClass = css({
  fontFamily: '"Crimson Pro", "Georgia", serif', // 独特なセリフ体
  fontSize: { base: '2.5rem', md: '3.5rem', lg: '4.5rem' },
  fontWeight: '400',
  lineHeight: '1.1',
  color: '#1a1a1a',
  marginBottom: '2rem',
  letterSpacing: '-0.02em'
})

const metaInfo = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  fontSize: '0.875rem',
  color: '#666',
  fontFamily: 'system-ui, -apple-system, sans-serif'
})

const separator = css({
  color: '#ccc'
})

const heroFigure = css({
  marginBottom: '5rem',
  display: 'grid',
  gridTemplateColumns: { base: '1fr', lg: '1fr 20rem' },
  gap: '2rem',
  alignItems: 'start'
})

const imageWrapper = css({
  aspectRatio: '16/10',
  overflow: 'hidden',
  borderRadius: '2px'
})

const imagePlaceholder = css({
  width: '100%',
  height: '100%',
  background: 'linear-gradient(135deg, #D4A574 0%, #8B7355 100%)', // ゴールデンブラウン
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontFamily: '"Crimson Pro", serif',
  fontSize: '1.25rem',
  fontStyle: 'italic',
  padding: '2rem',
  textAlign: 'center'
})

const caption = css({
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '0.875rem',
  color: '#666',
  fontStyle: 'italic',
  paddingTop: { base: '0', lg: '2rem' }
})

const contentSection = css({
  maxWidth: '38rem',
  margin: '0 auto',
  '& > * + *': {
    marginTop: '1.75rem'
  }
})

const leadParagraph = css({
  fontFamily: '"Crimson Pro", "Georgia", serif',
  fontSize: '1.375rem',
  lineHeight: '1.7',
  color: '#2a2a2a',
  marginBottom: '2rem'
})

const dropCap = css({
  float: 'left',
  fontFamily: '"Crimson Pro", serif',
  fontSize: '4.5rem',
  lineHeight: '0.85',
  fontWeight: '400',
  marginRight: '0.5rem',
  marginTop: '0.15rem',
  color: '#8B4513'
})

const bodyParagraph = css({
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontSize: '1.0625rem',
  lineHeight: '1.8',
  color: '#3a3a3a',
  letterSpacing: '0.01em'
})

const pullQuote = css({
  margin: '4rem 0',
  padding: '0 0 0 3rem',
  borderLeft: '3px solid #D4A574',
  '& p': {
    fontFamily: '"Crimson Pro", serif',
    fontSize: '1.75rem',
    lineHeight: '1.5',
    fontStyle: 'italic',
    color: '#2a2a2a',
    margin: '0'
  }
})

const authorSection = css({
  maxWidth: '38rem',
  margin: '5rem auto 0',
  padding: '3rem 0',
  borderTop: '1px solid #ddd',
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'center'
})

const authorAvatar = css({
  width: '4rem',
  height: '4rem',
  borderRadius: '50%',
  backgroundColor: '#8B4513',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '"Crimson Pro", serif',
  fontSize: '1.25rem',
  fontWeight: '600',
  flexShrink: 0
})

const authorInfo = css({
  flex: 1
})

const authorName = css({
  fontFamily: '"Crimson Pro", serif',
  fontSize: '1.125rem',
  fontWeight: '600',
  color: '#1a1a1a',
  marginBottom: '0.25rem'
})

const authorBio = css({
  fontFamily: 'system-ui, sans-serif',
  fontSize: '0.875rem',
  color: '#666'
})
</script>
