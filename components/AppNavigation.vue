<template>
  <nav :class="navClass">
    <div :class="containerClass">
      <!-- ロゴ/タイトル -->
      <NuxtLink to="/" :class="logoClass">
        <span :class="logoTextClass">Nuxt 3 Study</span>
      </NuxtLink>

      <!-- デスクトップメニュー -->
      <div :class="desktopMenuClass">
        <NuxtLink to="/" :class="menuItemClass">
          ホーム
        </NuxtLink>

        <!-- デモページ -->
        <div :class="dropdownClass" @mouseenter="openDropdown('demos')" @mouseleave="closeDropdown">
          <button :class="menuItemClass">
            デモ
            <span :class="arrowClass">▼</span>
          </button>
          <div v-if="activeDropdown === 'demos'" :class="dropdownMenuClass">
            <NuxtLink to="/doherty-threshold" :class="dropdownItemClass">
              ⚡ Doherty Threshold
            </NuxtLink>
            <NuxtLink to="/ssg-demo" :class="dropdownItemClass">
              🏗️ SSG デモ
            </NuxtLink>
            <NuxtLink to="/ssr-demo" :class="dropdownItemClass">
              🖥️ SSR デモ
            </NuxtLink>
            <NuxtLink to="/isr-demo" :class="dropdownItemClass">
              ⚡ ISR デモ
            </NuxtLink>
            <NuxtLink to="/portfolio" :class="dropdownItemClass">
              💼 Portfolio
            </NuxtLink>
          </div>
        </div>

        <!-- デザインシステム -->
        <NuxtLink to="/design-system" :class="menuItemClass">
          デザインシステム
        </NuxtLink>

        <!-- Examples -->
        <div :class="dropdownClass" @mouseenter="openDropdown('examples')" @mouseleave="closeDropdown">
          <button :class="menuItemClass">
            Examples
            <span :class="arrowClass">▼</span>
          </button>
          <div v-if="activeDropdown === 'examples'" :class="dropdownMenuClass">
            <div :class="dropdownSectionClass">
              <div :class="dropdownSectionTitleClass">Vue 3 / Nuxt 3</div>
              <NuxtLink to="/examples/vue-composition-api" :class="dropdownItemClass">
                🧩 Composition API
              </NuxtLink>
              <NuxtLink to="/examples/nuxt-auto-import" :class="dropdownItemClass">
                📚 自動インポート
              </NuxtLink>
              <NuxtLink to="/examples/typescript-comparison" :class="dropdownItemClass">
                📘 React vs Vue
              </NuxtLink>
            </div>
            <div :class="dropdownSectionClass">
              <div :class="dropdownSectionTitleClass">データフェッチング</div>
              <NuxtLink to="/examples/query-comparison" :class="dropdownItemClass">
                🔄 Query 比較
              </NuxtLink>
              <NuxtLink to="/examples/usefetch-comparison" :class="dropdownItemClass">
                ⚖️ useFetch 比較
              </NuxtLink>
            </div>
            <div :class="dropdownSectionClass">
              <div :class="dropdownSectionTitleClass">フォーム</div>
              <NuxtLink to="/examples/form-best-practices" :class="dropdownItemClass">
                ✅ ベストプラクティス
              </NuxtLink>
              <NuxtLink to="/examples/form-validation" :class="dropdownItemClass">
                📝 バリデーション
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- モバイルメニューボタン -->
      <button :class="mobileMenuButtonClass" @click="toggleMobileMenu" aria-label="メニュー">
        <span v-if="!isMobileMenuOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <!-- モバイルメニュー -->
    <div v-if="isMobileMenuOpen" :class="mobileMenuClass">
      <NuxtLink to="/" :class="mobileMenuItemClass" @click="closeMobileMenu">
        ホーム
      </NuxtLink>

      <div>
        <div :class="mobileMenuSectionClass">デモ</div>
        <NuxtLink to="/doherty-threshold" :class="mobileMenuItemClass" @click="closeMobileMenu">
          ⚡ Doherty Threshold
        </NuxtLink>
        <NuxtLink to="/ssg-demo" :class="mobileMenuItemClass" @click="closeMobileMenu">
          🏗️ SSG デモ
        </NuxtLink>
        <NuxtLink to="/ssr-demo" :class="mobileMenuItemClass" @click="closeMobileMenu">
          🖥️ SSR デモ
        </NuxtLink>
        <NuxtLink to="/portfolio" :class="mobileMenuItemClass" @click="closeMobileMenu">
          💼 Portfolio
        </NuxtLink>
      </div>

      <div>
        <NuxtLink to="/design-system" :class="mobileMenuItemClass" @click="closeMobileMenu">
          デザインシステム
        </NuxtLink>
      </div>

      <div>
        <div :class="mobileMenuSectionClass">Examples</div>
        <NuxtLink to="/examples/vue-composition-api" :class="mobileMenuItemClass" @click="closeMobileMenu">
          🧩 Composition API
        </NuxtLink>
        <NuxtLink to="/examples/query-comparison" :class="mobileMenuItemClass" @click="closeMobileMenu">
          🔄 Query 比較
        </NuxtLink>
        <NuxtLink to="/examples/form-best-practices" :class="mobileMenuItemClass" @click="closeMobileMenu">
          ✅ フォーム
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const activeDropdown = ref<string | null>(null)
const isMobileMenuOpen = ref(false)

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
  display: 'block',
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
  display: 'block',
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
</script>
