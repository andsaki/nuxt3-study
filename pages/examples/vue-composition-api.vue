<script setup lang="ts">
import { ref } from 'vue'
import { css } from '~/styled-system/css'
import InstanceInspector from '~/components/examples/composition/InstanceInspector.vue'
import LifecyclePlayground from '~/components/examples/composition/LifecyclePlayground.vue'
import ProvideInjectDemo from '~/components/examples/composition/ProvideInjectDemo.vue'
import ReactivityPlayground from '~/components/examples/composition/ReactivityPlayground.vue'
import ScopeCleanupDemo from '~/components/examples/composition/ScopeCleanupDemo.vue'
import WatcherPlayground from '~/components/examples/composition/WatcherPlayground.vue'

const showLifecycle = ref(true)
const keepAliveEnabled = ref(true)
const docUrl = '/docs/vue-composition-api-reference.md'

const openDoc = () => {
  if (import.meta.client) {
    window.open(docUrl, '_blank', 'noreferrer')
  }
}

const goToComparison = () => {
  navigateTo('/examples/typescript-comparison')
}

const styles = {
  page: css({ bg: 'slate.950', color: 'slate.50' }),
  heroSection: css({
    position: 'relative',
    isolation: 'isolate',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(180deg, rgba(15,23,42,1) 0%, rgba(2,6,23,1) 100%)',
  }),
  heroGlow: css({
    position: 'absolute',
    insetY: '0',
    right: '0',
    display: { base: 'none', sm: 'block' },
    width: '50%',
    backgroundImage: 'radial-gradient(circle at top, rgba(56,189,248,0.25), transparent 65%)',
  }),
  heroContainer: css({
    maxW: '6xl',
    mx: 'auto',
    px: { base: '4', sm: '6', lg: '8' },
    py: '14',
    display: 'flex',
    flexDirection: 'column',
    gap: '10',
  }),
  heroBlock: css({ display: 'flex', flexDirection: 'column', gap: '6' }),
  heroEyebrow: css({
    fontSize: 'sm',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    letterSpacing: 'widest',
    color: 'emerald.300',
  }),
  heroTitleGroup: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  heroTitle: css({
    fontSize: { base: '3xl', sm: '4xl', lg: '5xl' },
    fontWeight: 'bold',
    lineHeight: 'tight',
    color: 'white',
  }),
  heroDescription: css({ fontSize: 'lg', color: 'slate.200', lineHeight: 'relaxed' }),
  heroActions: css({ display: 'flex', flexWrap: 'wrap', gap: '3' }),
  heroStats: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', sm: 'repeat(3, minmax(0, 1fr))' },
    borderRadius: '2xl',
    borderWidth: '1px',
    borderColor: 'rgba(255,255,255,0.15)',
    borderStyle: 'solid',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: '6',
    fontSize: 'sm',
  }),
  heroStatLabel: css({ color: 'slate.300' }),
  heroStatValue: css({ fontSize: '2xl', fontWeight: 'semibold', color: 'white' }),
  contentWrapper: css({
    maxW: '6xl',
    mx: 'auto',
    px: { base: '4', sm: '6', lg: '8' },
    pt: '10',
    pb: '16',
    display: 'flex',
    flexDirection: 'column',
    gap: '16',
  }),
  section: css({ display: 'flex', flexDirection: 'column', gap: '6' }),
  sectionHeader: css({ display: 'flex', flexDirection: 'column', gap: '2' }),
  sectionEyebrow: css({
    fontSize: 'sm',
    fontWeight: 'semibold',
    textTransform: 'uppercase',
    letterSpacing: 'widest',
    color: 'slate.400',
  }),
  sectionTitle: css({ fontSize: '2xl', fontWeight: 'bold', color: 'white' }),
  sectionDescription: css({ fontSize: 'base', color: 'slate.300', lineHeight: 'relaxed' }),
  twoColumnGrid: css({
    display: 'grid',
    gap: '6',
    gridTemplateColumns: { base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' },
  }),
  cardSpacingMd: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  cardSpacingLg: css({ display: 'flex', flexDirection: 'column', gap: '6' }),
  cardParagraph: css({ fontSize: 'sm', color: 'slate.600', lineHeight: 'relaxed' }),
  buttonRow: css({ display: 'flex', flexWrap: 'wrap', gap: '2' }),
}
</script>

<template>
  <main :class="styles.page">
    <section :class="styles.heroSection">
      <div :class="styles.heroGlow" />
      <div :class="styles.heroContainer">
        <div :class="styles.heroBlock">
          <p :class="styles.heroEyebrow">Vue 3 Composition API</p>
          <div :class="styles.heroTitleGroup">
            <h1 :class="styles.heroTitle">
              Reactivity・Lifecycle・DI・Scope を横断的に体験できる実験ラボ
            </h1>
            <p :class="styles.heroDescription">
              <code>ref</code> / <code>watch</code> / <code>provide &amp; inject</code> / <code>effectScope</code> まで、
              プロダクションで使う API をすべて実行しながら学べる検証ページです。手元の挙動を見つつ、詳細は設計ノートを参照してください。
            </p>
          </div>
          <div :class="styles.heroActions">
            <DesignSystemButton variant="primary" size="md" @click="openDoc">
              📘 ドキュメントを開く
            </DesignSystemButton>
            <DesignSystemButton variant="secondary" size="md" @click="goToComparison">
              React vs Vue 型の違い
            </DesignSystemButton>
          </div>
          <dl :class="styles.heroStats">
            <div>
              <dt :class="styles.heroStatLabel">収録 API</dt>
              <dd :class="styles.heroStatValue">25+</dd>
            </div>
            <div>
              <dt :class="styles.heroStatLabel">監視できるログ</dt>
              <dd :class="styles.heroStatValue">Lifecycle / Watcher</dd>
            </div>
            <div>
              <dt :class="styles.heroStatLabel">共有パターン</dt>
              <dd :class="styles.heroStatValue">DI / Scope / Slots</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <div :class="styles.contentWrapper">
      <section :class="styles.section">
        <header :class="styles.sectionHeader">
          <p :class="styles.sectionEyebrow">Fundamentals</p>
          <h2 :class="styles.sectionTitle">リアクティビティとウォッチャの挙動を把握する</h2>
          <p :class="styles.sectionDescription">
            単一値・オブジェクトの追跡方法や <code>watchEffect</code> / <code>watch</code> のタイミング差を視覚的に比較します。
          </p>
        </header>
        <div :class="styles.twoColumnGrid">
          <DesignSystemCard :class="styles.cardSpacingMd" color-scheme="blue" icon="🧪" title="リアクティビティ基礎">
            <p :class="styles.cardParagraph">
              <code>ref</code> / <code>reactive</code> / <code>shallow*</code> / <code>readonly</code> の差分と <code>toRef</code> 連携をまとめて確認。
            </p>
            <ReactivityPlayground />
          </DesignSystemCard>
          <DesignSystemCard :class="styles.cardSpacingMd" color-scheme="green" icon="👀" title="ウォッチャと customRef">
            <p :class="styles.cardParagraph">
              <code>watchEffect</code> の自動依存収集と <code>watch</code> の遅延発火、<code>customRef</code> のデバウンス実装を比較。
            </p>
            <WatcherPlayground />
          </DesignSystemCard>
        </div>
      </section>

      <section :class="styles.section">
        <header :class="styles.sectionHeader">
          <p :class="styles.sectionEyebrow">Lifecycle &amp; KeepAlive</p>
          <h2 :class="styles.sectionTitle">描画サイクルとキャッシュ挙動を実機で切り替える</h2>
          <p :class="styles.sectionDescription">
            ライフサイクルログを見ながら KeepAlive 有無をワンクリックで切り替え。チームレビューでもそのまま使えるコンソール UI です。
          </p>
        </header>
        <DesignSystemCard :class="styles.cardSpacingMd" color-scheme="yellow" icon="⏱️" title="ライフサイクル &amp; KeepAlive">
          <p :class="styles.cardParagraph">
            <code>onBeforeMount</code> から <code>onDeactivated</code> までをリスト表示。KeepAlive を ON/OFF してキャッシュ時のフロー差を確認できます。
          </p>
          <div :class="styles.buttonRow">
            <DesignSystemButton variant="outline" size="sm" @click="showLifecycle = !showLifecycle">
              {{ showLifecycle ? 'unmount' : 'mount' }} コンポーネント
            </DesignSystemButton>
            <DesignSystemButton variant="secondary" size="sm" @click="keepAliveEnabled = !keepAliveEnabled">
              KeepAlive: {{ keepAliveEnabled ? 'ON' : 'OFF' }}
            </DesignSystemButton>
          </div>
          <KeepAlive v-if="keepAliveEnabled">
            <LifecyclePlayground v-if="showLifecycle" />
          </KeepAlive>
          <LifecyclePlayground v-else-if="showLifecycle" />
          <DesignSystemInfoBox v-else status="neutral">
            コンポーネントはアンマウントされています。mount ボタンで戻せます。
          </DesignSystemInfoBox>
        </DesignSystemCard>
      </section>

      <section :class="styles.section">
        <header :class="styles.sectionHeader">
          <p :class="styles.sectionEyebrow">DI &amp; Slots</p>
          <h2 :class="styles.sectionTitle">provide/inject と Slot Contract を同時に検証</h2>
          <p :class="styles.sectionDescription">
            テーマを provide し、下層では <code>useAttrs</code> / <code>useSlots</code> / <code>defineModel</code> を使って型安全に連携するパターンを収録。
          </p>
        </header>
        <DesignSystemCard :class="styles.cardSpacingMd" color-scheme="purple" icon="🪢" title="provide/inject とスロット連携">
          <ProvideInjectDemo />
        </DesignSystemCard>
      </section>

      <section :class="styles.section">
        <header :class="styles.sectionHeader">
          <p :class="styles.sectionEyebrow">Advanced Scope</p>
          <h2 :class="styles.sectionTitle">コンポーネントインスタンスと effectScope のクリーンアップ</h2>
          <p :class="styles.sectionDescription">
            <code>getCurrentInstance</code> の参照情報や <code>effectScope</code> / <code>onScopeDispose</code> でリソースを畳むテクニックを左右で比較できます。
          </p>
        </header>
        <DesignSystemCard :class="styles.cardSpacingLg" color-scheme="gray" icon="🧠" title="インスタンス &amp; effectScope">
          <div :class="styles.twoColumnGrid">
            <InstanceInspector />
            <ScopeCleanupDemo />
          </div>
        </DesignSystemCard>
      </section>
    </div>
  </main>
</template>
