<template>
  <header :class="headerClass" role="banner">
    <div :class="containerClass">
      <NuxtLink
        to="/"
        :class="logoClass"
        aria-label="Nuxt 3 Studyのホームに戻る"
      >
        <span aria-hidden="true">🏠</span>
        <span>Nuxt 3 Study</span>
      </NuxtLink>

      <nav :class="navClass" aria-label="メインナビゲーション">
        <NuxtLink
          to="/"
          :class="linkClass"
        >
          ホーム
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { css } from '../styled-system/css'

/**
 * アプリケーションヘッダーコンポーネント
 *
 * 機能:
 * - ロゴとホームへのリンク
 * - アクセシブルなナビゲーション（role="banner", aria-label）
 * - スクリーンリーダー対応
 * - Panda CSSによるスタイリング
 */

const headerClass = css({
  bg: 'bg.primary',
  borderBottom: '1px solid',
  borderColor: 'border.default',
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
})

const containerClass = css({
  maxW: '7xl',
  mx: 'auto',
  px: 4,
  py: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const logoClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  fontSize: 'xl',
  fontWeight: 'semibold',
  color: 'contents.primary',
  textDecoration: 'none',
  transition: 'color 0.2s ease-in-out',
  _hover: {
    color: 'contents.link',
  },
  _focus: {
    outlineColor: 'border.focus',
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
  },
})

const navClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
})

const linkClass = css({
  px: 4,
  py: 2,
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'contents.secondary',
  textDecoration: 'none',
  borderRadius: 'md',
  transition: 'all 0.2s ease-in-out',
  _hover: {
    color: 'contents.link',
    bg: 'bg.secondary',
  },
  _focus: {
    outlineColor: 'border.focus',
    outlineWidth: '2px',
    outlineStyle: 'solid',
    outlineOffset: '2px',
  },
})
</script>
