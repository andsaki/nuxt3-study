<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <h1 :class="titleClass">フォーム・バリデーション</h1>
      <p :class="descClass">
        VeeValidate + Zod を使った型安全なフォームバリデーションと、ベストプラクティスを学びます。
      </p>
    </div>

    <div :class="gridClass">
      <!-- フォームベストプラクティス -->
      <NuxtLink to="/examples/form-best-practices" :class="cardClass">
        <div :class="iconClass">✅</div>
        <h2 :class="cardTitleClass">フォームバリデーション ベストプラクティス</h2>
        <p :class="cardDescClass">
          アクセシブルで使いやすいフォーム実装のベストプラクティス
        </p>
      </NuxtLink>

      <!-- フォームバリデーション -->
      <NuxtLink to="/examples/form-validation" :class="cardClass">
        <div :class="iconClass">📝</div>
        <h2 :class="cardTitleClass">フォームバリデーション (VeeValidate + Zod)</h2>
        <p :class="cardDescClass">
          VeeValidateとZodを組み合わせた型安全なバリデーション
        </p>
      </NuxtLink>

      <!-- Zod 同期・非同期バリデーション -->
      <NuxtLink to="/examples/zod-async-validation" :class="cardClass">
        <div :class="iconClass">⏳</div>
        <h2 :class="cardTitleClass">Zod 同期・非同期バリデーション</h2>
        <p :class="cardDescClass">
          Zodによる同期バリデーションと非同期バリデーションの実装
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const containerClass = css({
  minH: 'screen',
  bg: 'gray.50',
  py: '12',
  px: { base: 4, md: 8 },
})

const headerClass = css({
  maxW: '4xl',
  mx: 'auto',
  mb: '12',
  textAlign: 'center',
})

const titleClass = css({
  fontSize: { base: '3xl', md: '4xl' },
  fontWeight: 'bold',
  color: 'gray.900',
  mb: '4',
})

const descClass = css({
  fontSize: { base: 'md', md: 'lg' },
  color: 'gray.600',
  lineHeight: '1.7',
})

const gridClass = css({
  maxW: '6xl',
  mx: 'auto',
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: '6',
})

const cardClass = css({
  display: 'block',
  p: '6',
  bg: 'white',
  rounded: 'xl',
  boxShadow: 'md',
  textDecoration: 'none',
  transition: 'all 0.3s',
  border: '2px solid',
  borderColor: 'transparent',
  _hover: {
    transform: 'translateY(-4px)',
    boxShadow: 'xl',
    borderColor: 'yellow.300',
  },
})

const iconClass = css({
  fontSize: '4xl',
  mb: '3',
})

const cardTitleClass = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  color: 'gray.900',
  mb: '2',
})

const cardDescClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  lineHeight: '1.6',
})
</script>
