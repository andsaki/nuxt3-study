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
import { token } from '~/styled-system/tokens'

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
  maxW: '6xl',
  mx: 'auto',
  px: { base: '4', md: '8', lg: '12' },
  py: { base: '8', md: '12', lg: '16' },
  bg: 'stone.50',
  minH: 'screen',
})

const headerSection = css({
  maxW: '3xl',
  mb: '16',
  pl: { base: '0', lg: '16' },
})

const categoryBadge = css({
  display: 'inline-flex',
  fontSize: 'xs',
  fontWeight: 'semibold',
  letterSpacing: 'widest',
  textTransform: 'uppercase',
  color: 'amber.800',
  mb: '6',
  pb: '2',
  borderBottomWidth: '2px',
  borderColor: 'amber.800',
})

const titleClass = css({
  fontFamily: '"Crimson Pro", "Georgia", serif',
  fontSize: { base: '4xl', md: '5xl', lg: '6xl' },
  fontWeight: 'semibold',
  lineHeight: 'tight',
  color: 'slate.900',
  mb: '8',
  letterSpacing: '-0.02em',
})

const metaInfo = css({
  display: 'flex',
  alignItems: 'center',
  gap: '3',
  fontSize: 'sm',
  color: 'slate.500',
  fontFamily: 'body',
})

const separator = css({ color: 'slate.300' })

const heroFigure = css({
  mb: '20',
  display: 'grid',
  gridTemplateColumns: { base: '1fr', lg: '1fr 20rem' },
  gap: '8',
  alignItems: 'start',
})

const imageWrapper = css({
  aspectRatio: '16 / 10',
  overflow: 'hidden',
  borderRadius: 'lg',
})

const imagePlaceholder = css({
  w: 'full',
  h: 'full',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  fontFamily: '"Crimson Pro", serif',
  fontSize: 'xl',
  fontStyle: 'italic',
  px: '8',
  textAlign: 'center',
  backgroundImage: `linear-gradient(135deg, ${token('colors.amber.300')} 0%, ${token('colors.orange.600')} 100%)`,
})

const caption = css({
  fontFamily: 'body',
  fontSize: 'sm',
  color: 'slate.500',
  fontStyle: 'italic',
  pt: { base: '0', lg: '8' },
})

const contentSection = css({
  maxW: '3xl',
  mx: 'auto',
  '& > * + *': {
    mt: '7',
  },
})

const leadParagraph = css({
  fontFamily: '"Crimson Pro", "Georgia", serif',
  fontSize: 'xl',
  lineHeight: 'tall',
  color: 'slate.800',
  mb: '8',
})

const dropCap = css({
  float: 'left',
  fontFamily: '"Crimson Pro", serif',
  fontSize: '6xl',
  lineHeight: '0.9',
  fontWeight: 'medium',
  mr: '2',
  mt: '1',
  color: 'amber.700',
})

const bodyParagraph = css({
  fontFamily: 'body',
  fontSize: 'lg',
  lineHeight: '2',
  color: 'slate.700',
  letterSpacing: 'wide',
})

const pullQuote = css({
  my: '16',
  pl: '12',
  borderLeftWidth: '3px',
  borderColor: 'amber.400',
  '& p': {
    fontFamily: '"Crimson Pro", serif',
    fontSize: '2xl',
    lineHeight: 'tall',
    fontStyle: 'italic',
    color: 'slate.800',
    m: '0',
  },
})

const authorSection = css({
  maxW: '3xl',
  mx: 'auto',
  mt: '20',
  py: '12',
  borderTopWidth: '1px',
  borderColor: 'gray.200',
  display: 'flex',
  gap: '6',
  alignItems: 'center',
})

const authorAvatar = css({
  w: '16',
  h: '16',
  borderRadius: 'full',
  bg: 'amber.800',
  color: 'white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: '"Crimson Pro", serif',
  fontSize: 'xl',
  fontWeight: 'semibold',
  flexShrink: 0,
})

const authorInfo = css({ flex: 1 })

const authorName = css({
  fontFamily: '"Crimson Pro", serif',
  fontSize: 'lg',
  fontWeight: 'semibold',
  color: 'slate.900',
  mb: '1',
})

const authorBio = css({
  fontFamily: 'body',
  fontSize: 'sm',
  color: 'slate.500',
})
</script>
