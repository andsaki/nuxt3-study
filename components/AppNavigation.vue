<template>
  <nav :class="navClass">
    <div :class="containerClass">
      <!-- ロゴ/タイトル -->
      <NuxtLink to="/" :class="logoClass">
        <span :class="logoTextClass">Nuxt 3 Study</span>
      </NuxtLink>

      <!-- デスクトップメニュー -->
      <div :class="desktopMenuClass">
        <template v-for="item in navItems" :key="item.label">
          <NuxtLink
            v-if="item.type === 'link'"
            :to="item.to"
            :class="menuItemClass"
          >
            {{ item.label }}
          </NuxtLink>
          <div
            v-else
            :class="dropdownClass"
            @mouseenter="openDropdown(item.id)"
            @mouseleave="closeDropdown"
          >
            <button :class="menuItemClass">
              {{ item.label }}
              <span :class="arrowClass">▼</span>
            </button>
            <div v-if="activeDropdown === item.id" :class="dropdownMenuClass">
              <div
                v-for="(section, sectionIndex) in item.sections"
                :key="`${item.id}-${sectionIndex}`"
                :class="dropdownSectionClass"
              >
                <div v-if="section.title" :class="dropdownSectionTitleClass">
                  {{ section.title }}
                </div>
                <NuxtLink
                  v-for="link in section.links"
                  :key="link.to"
                  :to="link.to"
                  :class="dropdownItemClass"
                >
                  <span v-if="link.icon" :class="navIconClass">
                    {{ link.icon }}
                  </span>
                  <span>{{ link.label }}</span>
                </NuxtLink>
              </div>
            </div>
          </div>
        </template>
      </div>

      <!-- モバイルメニューボタン -->
      <button :class="mobileMenuButtonClass" @click="toggleMobileMenu" aria-label="メニュー">
        <span v-if="!isMobileMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- モバイルメニュー -->
    <div v-if="isMobileMenuOpen" :class="mobileMenuClass">
      <template v-for="item in navItems" :key="`mobile-${item.label}`">
        <NuxtLink
          v-if="item.type === 'link'"
          :to="item.to"
          :class="mobileMenuItemClass"
          @click="closeMobileMenu"
        >
          {{ item.label }}
        </NuxtLink>
        <div v-else>
          <div :class="mobileMenuSectionClass">
            {{ item.label }}
          </div>
          <div
            v-for="(section, sectionIndex) in item.sections"
            :key="`${item.id}-mobile-${sectionIndex}`"
            :class="mobileMenuSubsectionClass"
          >
            <div
              v-if="section.title"
              :class="mobileMenuSubsectionTitleClass"
            >
              {{ section.title }}
            </div>
            <NuxtLink
              v-for="link in section.links"
              :key="`${item.id}-${link.to}`"
              :to="link.to"
              :class="mobileMenuItemClass"
              @click="closeMobileMenu"
            >
              <span v-if="link.icon" :class="navIconClass">
                {{ link.icon }}
              </span>
              <span>{{ link.label }}</span>
            </NuxtLink>
          </div>
        </div>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const activeDropdown = ref<string | null>(null)
const isMobileMenuOpen = ref(false)

interface NavLink {
  label: string
  to: string
  icon?: string
}

interface NavSection {
  title?: string
  links: NavLink[]
}

type NavItem =
  | {
      type: 'link'
      label: string
      to: string
    }
  | {
      type: 'dropdown'
      label: string
      id: string
      sections: NavSection[]
    }

const navItems: NavItem[] = [
  {
    type: 'link',
    label: 'ホーム',
    to: '/',
  },
  {
    type: 'dropdown',
    id: 'learning',
    label: '学習コンテンツ',
    sections: [
      {
        title: '設計 / デザイン',
        links: [
          { label: 'デザインシステム', to: '/design-system', icon: '🎨' },
          { label: 'Portfolio', to: '/portfolio', icon: '💼' },
        ],
      },
      {
        title: 'Vue 3 ガイド',
        links: [
          { label: 'Vue Guide トップ', to: '/vue-guide', icon: '📚' },
          { label: 'Vue Guide 詳細', to: '/vue-guide/vue-guide', icon: '📘' },
          { label: 'Composition API', to: '/vue-guide/composition-api', icon: '🧩' },
          { label: 'Best Practices', to: '/vue-guide/best-practices', icon: '✨' },
          { label: 'withDefaults', to: '/vue-guide/with-defaults', icon: '⚙️' },
          { label: 'Named v-model', to: '/vue-guide/named-v-model', icon: '🔄' },
          { label: 'State Management', to: '/vue-guide/state-management', icon: '📊' },
        ],
      },
      {
        title: '読み物',
        links: [{ label: 'Blog Article', to: '/blog/article', icon: '📰' }],
      },
    ],
  },
  {
    type: 'dropdown',
    id: 'demos',
    label: 'デモ',
    sections: [
      {
        links: [
          { label: 'Doherty Threshold', to: '/doherty-threshold', icon: '⚡' },
          { label: 'SSR デモ', to: '/ssr-demo', icon: '🖥️' },
          { label: 'SSG デモ', to: '/ssg-demo', icon: '🏗️' },
          { label: 'ISR デモ', to: '/isr-demo', icon: '⚡' },
          { label: 'SSR 検証', to: '/verify-ssr', icon: '🔍' },
        ],
      },
    ],
  },
  {
    type: 'dropdown',
    id: 'ux-laws',
    label: 'UX 法則',
    sections: [
      {
        links: [
          { label: 'UX法則デモ集', to: '/ux-laws', icon: '🧠' },
          { label: 'ヒックの法則', to: '/hicks-law', icon: '🎯' },
          { label: 'フィッツの法則', to: '/fitts-law', icon: '🎮' },
          { label: 'ミラーの法則', to: '/millers-law', icon: '🧠' },
          { label: '選択のパラドックス', to: '/paradox-of-choice', icon: '🤔' },
          { label: 'ヤコブの法則', to: '/jakobs-law', icon: '🎨' },
        ],
      },
    ],
  },
  {
    type: 'dropdown',
    id: 'examples',
    label: 'Examples',
    sections: [
      {
        title: 'Vue / Nuxt 基礎',
        links: [
          { label: 'Composition API', to: '/examples/vue-composition-api', icon: '🧩' },
          { label: 'Nuxt Auto Import', to: '/examples/nuxt-auto-import', icon: '📚' },
          { label: 'TypeScript比較', to: '/examples/typescript-comparison', icon: '📘' },
          { label: 'v-pre ディレクティブ', to: '/examples/v-pre-directive', icon: '⚠️' },
          { label: 'Claude Code Demo', to: '/examples/claude-code-demo', icon: '🤖' },
        ],
      },
      {
        title: 'レンダリング',
        links: [
          { label: 'Rendering Modes', to: '/examples/rendering-modes', icon: '🎨' },
          { label: 'ClientOnly テスト', to: '/examples/client-only-test', icon: '🧪' },
          { label: 'Error Boundary', to: '/examples/error-boundary-demo', icon: '🛡️' },
          { label: 'Hooks 検証', to: '/examples/hooks-verification', icon: '✅' },
        ],
      },
      {
        title: 'データフェッチ',
        links: [
          { label: 'Query 比較', to: '/examples/query-comparison', icon: '🔄' },
          { label: 'useFetch 比較', to: '/examples/usefetch-comparison', icon: '⚖️' },
          { label: 'useFetch キャッシュ', to: '/examples/usefetch-cache', icon: '💾' },
        ],
      },
      {
        title: 'フォーム',
        links: [
          { label: 'フォームベストプラクティス', to: '/examples/form-best-practices', icon: '✅' },
          { label: 'フォームバリデーション', to: '/examples/form-validation', icon: '📝' },
          { label: 'Zodバリデーション', to: '/examples/zod-async-validation', icon: '⏳' },
        ],
      },
      {
        title: '検索UI',
        links: [
          { label: 'Search (.vue)', to: '/examples/search-sfc', icon: '📄' },
          { label: 'Search (h)', to: '/examples/search-hyperscript', icon: '🧱' },
          { label: 'Search (TSX)', to: '/examples/search-tsx', icon: '⚡' },
        ],
      },
    ],
  },
]

const openDropdown = (name: string) => {
  activeDropdown.value = name
}

const closeDropdown = () => {
  activeDropdown.value = null
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// スタイル
const navClass = css({
  bg: 'white',
  borderBottom: '1px solid',
  borderColor: 'gray.200',
  position: 'sticky',
  top: 0,
  zIndex: 50,
  boxShadow: 'sm',
})

const containerClass = css({
  maxW: '7xl',
  mx: 'auto',
  px: { base: 4, md: 6, lg: 8 },
  py: 4,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const logoClass = css({
  fontSize: 'xl',
  fontWeight: 'bold',
  color: 'blue.600',
  textDecoration: 'none',
  transition: 'color 0.2s',
  _hover: {
    color: 'blue.700',
  },
})

const logoTextClass = css({
  display: 'inline-block',
})

const desktopMenuClass = css({
  display: { base: 'none', md: 'flex' },
  gap: 1,
  alignItems: 'center',
})

const menuItemClass = css({
  px: 3,
  py: 2,
  rounded: 'md',
  fontSize: 'sm',
  fontWeight: 'medium',
  color: 'gray.700',
  textDecoration: 'none',
  transition: 'all 0.2s',
  cursor: 'pointer',
  border: 'none',
  bg: 'transparent',
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  _hover: {
    bg: 'gray.100',
    color: 'gray.900',
  },
})

const arrowClass = css({
  fontSize: 'xs',
  color: 'gray.500',
})

const dropdownClass = css({
  position: 'relative',
})

const dropdownMenuClass = css({
  position: 'absolute',
  top: 'calc(100% + 0.5rem)',
  left: 0,
  bg: 'white',
  border: '1px solid',
  borderColor: 'gray.200',
  rounded: 'md',
  boxShadow: 'lg',
  py: 2,
  minW: '240px',
  maxH: '80vh',
  overflowY: 'auto',
  zIndex: 50,
})

const dropdownItemClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  px: 4,
  py: 2,
  fontSize: 'sm',
  color: 'gray.700',
  textDecoration: 'none',
  transition: 'all 0.2s',
  _hover: {
    bg: 'gray.100',
    color: 'gray.900',
  },
})

const dropdownSectionClass = css({
  py: 2,
  borderBottom: '1px solid',
  borderColor: 'gray.100',
  _last: {
    borderBottom: 'none',
  },
})

const dropdownSectionTitleClass = css({
  px: 4,
  py: 1,
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'gray.500',
  textTransform: 'uppercase',
  letterSpacing: 'wide',
})

const mobileMenuButtonClass = css({
  display: { base: 'block', md: 'none' },
  p: 2,
  rounded: 'md',
  fontSize: '2xl',
  color: 'gray.600',
  border: 'none',
  bg: 'transparent',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    bg: 'gray.100',
  },
})

const mobileMenuClass = css({
  display: { base: 'block', md: 'none' },
  px: 4,
  py: 2,
  bg: 'white',
  borderBottom: '1px solid',
  borderColor: 'gray.200',
})

const mobileMenuItemClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: 2,
  px: 3,
  py: 2,
  fontSize: 'sm',
  color: 'gray.700',
  textDecoration: 'none',
  rounded: 'md',
  transition: 'all 0.2s',
  _hover: {
    bg: 'gray.100',
  },
})

const mobileMenuSectionClass = css({
  px: 3,
  py: 2,
  fontSize: 'xs',
  fontWeight: 'semibold',
  color: 'gray.500',
  textTransform: 'uppercase',
  letterSpacing: 'wide',
  mt: 2,
})

const mobileMenuSubsectionClass = css({
  mb: 2,
})

const mobileMenuSubsectionTitleClass = css({
  px: 3,
  py: 1,
  fontSize: 'xs',
  fontWeight: 'medium',
  color: 'gray.500',
})

const navIconClass = css({
  width: '1.5rem',
  display: 'inline-flex',
  justifyContent: 'center',
  fontSize: 'md',
})
</script>
