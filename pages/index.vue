<template>
  <div :class="css({ minH: 'screen', display: 'flex', alignItems: 'center', justifyContent: 'center', bg: 'gray.50' })">
    <div :class="css({ maxW: 'md', w: 'full', spaceY: '8', p: '8', gap: '4' })">
      <!-- タイトル -->
      <div :class="css({ textAlign: 'center' })">
        <h1 :class="css({ fontSize: '4xl', fontWeight: 'bold', color: 'gray.900', mb: '2' })">
          Nuxt 3 Study
        </h1>
        <p :class="css({ color: 'gray.600' })">Next.js Study の Nuxt 3 版</p>
      </div>

      <!-- カウンター -->
      <DesignSystemCard title="カウンター (Pinia)" icon="🔢" color-scheme="blue">
        <div :class="css({ fontSize: '6xl', fontWeight: 'bold', textAlign: 'center', color: 'blue.600' })">
          {{ counterStore.count }}
        </div>

        <div :class="css({ display: 'flex', gap: '2', justifyContent: 'center', mt: '4' })">
          <DesignSystemButton
            variant="danger"
            size="md"
            @click="counterStore.decrement"
          >
            -1
          </DesignSystemButton>
          <DesignSystemButton
            variant="secondary"
            size="md"
            @click="counterStore.reset"
          >
            リセット
          </DesignSystemButton>
          <DesignSystemButton
            variant="primary"
            size="md"
            @click="counterStore.increment"
          >
            +1
          </DesignSystemButton>
        </div>

        <div :class="css({ fontSize: 'sm', color: 'gray.500', textAlign: 'center', mt: '4' })">
          ※ LocalStorageに永続化されます
        </div>
      </DesignSystemCard>

      <!-- 主要デモ -->
      <DesignSystemCard title="主要デモ" icon="✨" color-scheme="purple">
        <nav :class="css({ spaceY: '2', mt: '4' })">
          <NuxtLink
            to="/design-system"
            :class="css({ display: 'block', p: '3', bg: 'purple.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'purple.100' } })"
          >
            🎨 デザインシステム
          </NuxtLink>
          <NuxtLink
            to="/doherty-threshold"
            :class="css({ display: 'block', p: '3', bg: 'blue.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'blue.100' } })"
          >
            ⚡ Doherty Threshold (400ms以内)
          </NuxtLink>
          <NuxtLink
            to="/portfolio"
            :class="css({ display: 'block', p: '3', bg: 'purple.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'purple.100' } })"
          >
            💼 Portfolio
          </NuxtLink>
        </nav>
      </DesignSystemCard>

      <!-- レンダリングモード -->
      <DesignSystemCard title="レンダリングモード" icon="🎨">
        <nav :class="css({ spaceY: '2', mt: '4' })">
          <NuxtLink
            to="/examples/nuxt-auto-import"
            :class="css({ display: 'block', p: '3', bg: 'purple.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'purple.100' } })"
          >
            📚 Nuxt 3 自動インポート機能
          </NuxtLink>
          <NuxtLink
            to="/ssr-demo"
            :class="css({ display: 'block', p: '3', bg: 'yellow.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'yellow.100' } })"
          >
            🖥️ SSR デモ
          </NuxtLink>
          <NuxtLink
            to="/ssg-demo"
            :class="css({ display: 'block', p: '3', bg: 'yellow.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'yellow.100' } })"
          >
            🏗️ SSG デモ
          </NuxtLink>
          <NuxtLink
            to="/isr-demo"
            :class="css({ display: 'block', p: '3', bg: 'blue.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'blue.100' } })"
          >
            ⚡ ISR デモ
          </NuxtLink>
          <NuxtLink
            to="/verify-ssr"
            :class="css({ display: 'block', p: '3', bg: 'blue.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'blue.100' } })"
          >
            🔍 SSR 検証ページ
          </NuxtLink>
          <NuxtLink
            to="/examples/rendering-modes"
            :class="css({ display: 'block', p: '3', bg: 'blue.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'blue.100' } })"
          >
            📚 レンダリングモード解説
          </NuxtLink>
          <NuxtLink
            to="/examples/client-only-test"
            :class="css({ display: 'block', p: '3', bg: 'gray.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'gray.100' } })"
          >
            🧪 ClientOnly 動作確認
          </NuxtLink>
          <NuxtLink
            to="/examples/error-boundary-demo"
            :class="css({ display: 'block', p: '3', bg: 'red.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'red.100' } })"
          >
            🛡️ Error Boundary デモ
          </NuxtLink>
          <NuxtLink
            to="/examples/typescript-comparison"
            :class="css({ display: 'block', p: '3', bg: 'blue.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'blue.100' } })"
          >
            📘 TypeScript: React vs Vue
          </NuxtLink>
          <NuxtLink
            to="/examples/hooks-verification"
            :class="css({ display: 'block', p: '3', bg: 'blue.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'blue.100' } })"
          >
            ✅ React / Vue Hooks 検証
          </NuxtLink>
          <NuxtLink
            to="/examples/vue-composition-api"
            :class="css({ display: 'block', p: '3', bg: 'indigo.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'indigo.100' } })"
          >
            🧩 Vue Composition API 実例集
          </NuxtLink>
        </nav>
      </DesignSystemCard>

      <!-- 検索UI比較 -->
      <DesignSystemCard title="検索UI比較 (.vue / h / TSX)" icon="🔍" color-scheme="purple">
        <nav :class="css({ spaceY: '2', mt: '4' })">
          <NuxtLink
            to="/examples/search-sfc"
            :class="css({ display: 'block', p: '3', bg: 'purple.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'purple.100' } })"
          >
            📄 .vue テンプレート版
          </NuxtLink>
          <NuxtLink
            to="/examples/search-hyperscript"
            :class="css({ display: 'block', p: '3', bg: 'indigo.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'indigo.100' } })"
          >
            🧱 Hyperscript (h) 版
          </NuxtLink>
          <NuxtLink
            to="/examples/search-tsx"
            :class="css({ display: 'block', p: '3', bg: 'pink.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'pink.100' } })"
          >
            ⚡ TSX 版
          </NuxtLink>
        </nav>
      </DesignSystemCard>

      <!-- データ取得 -->
      <DesignSystemCard title="データ取得" icon="🔄" color-scheme="green">
        <nav :class="css({ spaceY: '2', mt: '4' })">
          <NuxtLink
            to="/examples/query-comparison"
            :class="css({ display: 'block', p: '3', bg: 'green.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'green.100' } })"
          >
            🔄 TanStack Query vs VueUse
          </NuxtLink>
          <NuxtLink
            to="/examples/usefetch-cache"
            :class="css({ display: 'block', p: '3', bg: 'green.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'green.100' } })"
          >
            💾 useFetch キャッシュ
          </NuxtLink>
          <NuxtLink
            to="/examples/usefetch-comparison"
            :class="css({ display: 'block', p: '3', bg: 'green.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'green.100' } })"
          >
            ⚖️ Nuxt vs VueUse useFetch比較
          </NuxtLink>
        </nav>
      </DesignSystemCard>

      <!-- フォーム -->
      <DesignSystemCard title="フォーム" icon="📝" color-scheme="yellow">
        <nav :class="css({ spaceY: '2', mt: '4' })">
          <NuxtLink
            to="/examples/form-best-practices"
            :class="css({ display: 'block', p: '3', bg: 'purple.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'purple.100' } })"
          >
            ✅ フォームバリデーション ベストプラクティス
          </NuxtLink>
          <NuxtLink
            to="/examples/form-validation"
            :class="css({ display: 'block', p: '3', bg: 'yellow.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'yellow.100' } })"
          >
            📝 フォームバリデーション (VeeValidate + Zod)
          </NuxtLink>
          <NuxtLink
            to="/examples/zod-async-validation"
            :class="css({ display: 'block', p: '3', bg: 'yellow.50', rounded: 'md', transition: 'all 0.2s', _hover: { bg: 'yellow.100' } })"
          >
            ⏳ Zod 同期・非同期バリデーション
          </NuxtLink>
        </nav>
      </DesignSystemCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const counterStore = useCounterStore()
</script>
