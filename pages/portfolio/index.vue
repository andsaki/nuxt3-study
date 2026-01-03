<script setup lang="ts">
import { css } from '~/styled-system/css'

definePageMeta({
  layout: false
})

const hoveredProject = ref<number | null>(null)

const projects = [
  {
    id: 1,
    title: 'NEON DREAMS',
    category: 'Web Experience',
    tags: ['WebGL', 'Three.js', 'GLSL']
  },
  {
    id: 2,
    title: 'CYBER COMMERCE',
    category: 'E-Commerce Platform',
    tags: ['React', 'Node.js', 'Stripe']
  },
  {
    id: 3,
    title: 'RETRO ARCADE',
    category: 'Interactive Game',
    tags: ['Canvas', 'TypeScript', 'Physics']
  },
  {
    id: 4,
    title: 'DATA NEXUS',
    category: 'Dashboard UI',
    tags: ['Vue', 'D3.js', 'WebSocket']
  }
]

// レトロフューチャースタイル
const portfolioContainer = css({
  minHeight: '100vh',
  backgroundColor: '#0a0a0f',
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  fontFamily: '"Share Tech Mono", "Courier New", monospace'
})

// グリッド背景（パースペクティブ付き）
const gridBackground = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
  `,
  backgroundSize: '50px 50px',
  transform: 'perspective(500px) rotateX(60deg)',
  transformOrigin: 'center bottom',
  zIndex: 0,
  pointerEvents: 'none'
})

// スキャンライン効果
const scanlines = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)',
  pointerEvents: 'none',
  zIndex: 10,
  opacity: 0.3,
  animation: 'scanline 8s linear infinite'
})

const header = css({
  position: 'relative',
  zIndex: 1,
  padding: { base: '4rem 2rem', md: '6rem 4rem', lg: '8rem 6rem' },
  textAlign: 'center'
})

// グリッチエフェクト
const glitchTitle = css({
  fontSize: { base: '3rem', md: '5rem', lg: '7rem' },
  fontWeight: '700',
  letterSpacing: '0.1em',
  position: 'relative',
  display: 'inline-block',
  textShadow: `
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 30px #00ffff,
    0 0 40px #ff00ff,
    0 0 70px #ff00ff,
    0 0 80px #ff00ff
  `,
  animation: 'glitch 3s infinite',

  '&::before, &::after': {
    content: 'attr(data-text)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%'
  },

  '&::before': {
    animation: 'glitch-before 0.3s infinite',
    clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
    transform: 'translate(-2px, -2px)',
    textShadow: '2px 0 #ff00ff'
  },

  '&::after': {
    animation: 'glitch-after 0.3s infinite',
    clipPath: 'polygon(0 60%, 100% 60%, 100% 100%, 0 100%)',
    transform: 'translate(2px, 2px)',
    textShadow: '-2px 0 #00ffff'
  }
})

const subtitle = css({
  fontSize: { base: '0.875rem', md: '1rem' },
  letterSpacing: '0.3em',
  color: '#00ffff',
  marginTop: '1rem',
  textShadow: '0 0 10px #00ffff'
})

const projectsSection = css({
  position: 'relative',
  zIndex: 1,
  padding: { base: '2rem', md: '4rem' },
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
  gap: '2rem',
  maxWidth: '1400px',
  margin: '0 auto'
})

const projectCard = (index: number) => css({
  backgroundColor: 'rgba(10, 10, 15, 0.8)',
  border: '1px solid',
  borderColor: index % 2 === 0 ? '#00ffff' : '#ff00ff',
  padding: '0',
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: index % 2 === 0
    ? '0 0 20px rgba(0, 255, 255, 0.3)'
    : '0 0 20px rgba(255, 0, 255, 0.3)',

  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: index % 2 === 0
      ? '0 10px 40px rgba(0, 255, 255, 0.6)'
      : '0 10px 40px rgba(255, 0, 255, 0.6)'
  },

  // 非対称: 1つ目と4つ目は大きく
  gridColumn: (index === 0 || index === 3) ? { base: 'auto', md: 'span 2' } : 'auto'
})

const projectImage = css({
  aspectRatio: '16/9',
  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  position: 'relative',
  overflow: 'hidden'
})

const projectImageOverlay = (id: number) => css({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: id % 2 === 0
    ? 'radial-gradient(circle at center, rgba(0, 255, 255, 0.2), transparent)'
    : 'radial-gradient(circle at center, rgba(255, 0, 255, 0.2), transparent)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.3s ease',

  '&:hover': {
    background: id % 2 === 0
      ? 'radial-gradient(circle at center, rgba(0, 255, 255, 0.4), transparent)'
      : 'radial-gradient(circle at center, rgba(255, 0, 255, 0.4), transparent)'
  }
})

const projectNumber = css({
  fontSize: '8rem',
  fontWeight: '700',
  color: 'rgba(255, 255, 255, 0.1)',
  textShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
})

const projectInfo = css({
  padding: '2rem'
})

const projectTitle = css({
  fontSize: '1.5rem',
  fontWeight: '700',
  letterSpacing: '0.1em',
  marginBottom: '0.5rem',
  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
})

const projectCategory = css({
  fontSize: '0.875rem',
  color: '#00ffff',
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  marginBottom: '1rem'
})

const projectTags = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem'
})

const tag_ = css({
  fontSize: '0.75rem',
  padding: '0.25rem 0.75rem',
  border: '1px solid #ff00ff',
  color: '#ff00ff',
  letterSpacing: '0.1em',
  textShadow: '0 0 5px #ff00ff'
})

const footer = css({
  position: 'relative',
  zIndex: 1,
  padding: { base: '4rem 2rem', md: '6rem 4rem' },
  display: 'flex',
  justifyContent: 'center'
})

const terminal = css({
  maxWidth: '600px',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.9)',
  border: '1px solid #00ffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)'
})

const terminalHeader = css({
  backgroundColor: 'rgba(0, 255, 255, 0.1)',
  padding: '0.75rem 1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  borderBottom: '1px solid #00ffff'
})

const terminalDot = (color: string) => css({
  width: '12px',
  height: '12px',
  borderRadius: '50%',
  backgroundColor: color
})

const terminalTitle = css({
  fontSize: '0.875rem',
  color: '#00ffff',
  marginLeft: 'auto'
})

const terminalBody = css({
  padding: '1.5rem',
  fontFamily: '"Share Tech Mono", monospace'
})

const terminalLine = css({
  fontSize: '0.875rem',
  color: '#00ffff',
  marginBottom: '0.5rem',
  letterSpacing: '0.05em'
})

const prompt = css({
  color: '#ff00ff',
  marginRight: '0.5rem'
})

const blinkingCursor = css({
  animation: 'blink 1s infinite',
  color: '#00ffff'
})
</script>

<template>
  <div :class="portfolioContainer">
    <!-- グリッド背景 -->
    <div :class="gridBackground"></div>
    <div :class="scanlines"></div>

    <!-- ヘッダー: グリッチエフェクト付き -->
    <header :class="header">
      <h1 :class="glitchTitle" data-text="CYBER PORTFOLIO">
        CYBER PORTFOLIO
      </h1>
      <p :class="subtitle">// DIGITAL ARCHITECT & CODE ARTIST</p>
    </header>

    <!-- プロジェクトグリッド: 非対称レイアウト -->
    <section :class="projectsSection">
      <div
        v-for="(project, index) in projects"
        :key="project.id"
        :class="projectCard(index)"
        @mouseenter="hoveredProject = project.id"
        @mouseleave="hoveredProject = null"
      >
        <div :class="projectImage">
          <div :class="projectImageOverlay(project.id)">
            <span :class="projectNumber">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
        </div>
        <div :class="projectInfo">
          <h3 :class="projectTitle">{{ project.title }}</h3>
          <p :class="projectCategory">{{ project.category }}</p>
          <div :class="projectTags">
            <span
              v-for="tag in project.tags"
              :key="tag"
              :class="tag_"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- フッター: ターミナル風 -->
    <footer :class="footer">
      <div :class="terminal">
        <div :class="terminalHeader">
          <span :class="terminalDot('#FF5F56')"></span>
          <span :class="terminalDot('#FFBD2E')"></span>
          <span :class="terminalDot('#27C93F')"></span>
          <span :class="terminalTitle">contact.sh</span>
        </div>
        <div :class="terminalBody">
          <p :class="terminalLine">
            <span :class="prompt">$</span> echo "Get in touch"
          </p>
          <p :class="terminalLine">
            <span :class="prompt">&gt;</span> email: hello@cyberportfolio.dev
          </p>
          <p :class="terminalLine">
            <span :class="prompt">&gt;</span> github: @cyberartist
          </p>
          <p :class="terminalLine">
            <span :class="blinkingCursor">_</span>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@keyframes glitch {
  0%, 100% {
    transform: translate(0);
  }
  20% {
    transform: translate(-2px, 2px);
  }
  40% {
    transform: translate(-2px, -2px);
  }
  60% {
    transform: translate(2px, 2px);
  }
  80% {
    transform: translate(2px, -2px);
  }
}

@keyframes glitch-before {
  0%, 100% {
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
  50% {
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  }
}

@keyframes glitch-after {
  0%, 100% {
    clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%);
  }
  50% {
    clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

@keyframes scanline {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}
</style>
