<script setup lang="ts">
import { css } from '~/styled-system/css'

const timestamp = new Date().toISOString()

const instructions = [
  'このページで右クリック → 「ページのソースを表示」',
  'HTMLソースに何が含まれているか確認',
  'DevTools（F12）で実際のDOMを確認',
  '違いを比較',
]

const htmlSourceRows = [
  { case: 'fallbackあり', html: '✅ fallbackの内容', dom: '✅ デフォルトスロット' },
  { case: 'fallbackなし', html: '❌ コメントノードのみ', dom: '✅ デフォルトスロット' },
  { case: '通常のSSR', html: '✅ 全内容', dom: '✅ 全内容' },
]

const timelineSteps = [
  { title: 'サーバー側レンダリング', desc: '#fallback をHTMLとして出力', code: '<p>サーバー側の内容</p>' },
  { title: 'ブラウザでHTML受信', desc: 'fallbackの内容が表示される', code: '<p>サーバー側の内容</p>' },
  { title: 'Hydration（マッチング）', desc: 'fallbackとサーバーHTMLが一致 ✅', code: '<p>サーバー側の内容</p>' },
  { title: 'onMounted後', desc: 'デフォルトスロットに切り替え', code: '<p>クライアント側の内容</p>' },
]

const safeCaseCode = `&lt;script setup&gt;
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 初期値が一致するのでOK --&gt;
  &lt;p&gt;{{ isClient ? "クライアント" : "サーバー" }}&lt;/p&gt;
&lt;/template&gt;`

const dangerCaseCode = `&lt;template&gt;
  &lt;!-- サーバーとクライアントで値が違う --&gt;
  &lt;p&gt;{{ new Date().toISOString() }}&lt;/p&gt;

  &lt;!-- 毎回違う値 --&gt;
  &lt;p&gt;{{ Math.random() }}&lt;/p&gt;

  &lt;!-- 環境で最初から値が異なる --&gt;
  &lt;p&gt;{{ import.meta.client ? "クライアント" : "サーバー" }}&lt;/p&gt;
&lt;/template&gt;`

const comparisonRows = [
  { pattern: 'ref(false) + 三項演算子', server: '"サーバー"', client: '"サーバー"', result: '✅ 一致', safe: true },
  { pattern: 'ref(false) + v-if', server: 'elseブロック', client: 'elseブロック', result: '✅ 一致', safe: true },
  { pattern: 'ClientOnly', server: 'fallback表示', client: 'fallback表示', result: '✅ 一致（特別扱い）', safe: true },
  { pattern: 'new Date()', server: '2024-01-01T10:00:00', client: '2024-01-01T10:00:01', result: '❌ 不一致', safe: false },
  { pattern: 'import.meta.client', server: 'false', client: 'true', result: '❌ 不一致', safe: false },
]

const methodCards = [
  {
    title: '三項演算子',
    code: '&lt;p&gt;{{ isClient ? "A" : "B" }}&lt;/p&gt;',
    points: ['DOM構造は不変', 'テキストノードのみ変更', '軽量'],
  },
  {
    title: 'v-if / v-else',
    code: '&lt;p v-if="isClient"&gt;A&lt;/p&gt;\n&lt;p v-else&gt;B&lt;/p&gt;',
    points: ['要素の削除・追加', 'DOM構造が変化', 'やや重い'],
  },
  {
    title: 'ClientOnly',
    code: `&lt;ClientOnly&gt;
  &lt;p&gt;A&lt;/p&gt;
  &lt;template #fallback&gt;
    &lt;p&gt;B&lt;/p&gt;
  &lt;/template&gt;
&lt;/ClientOnly&gt;`,
    points: ['Vueが特別扱い', '明示的で安全', 'SEO/JSオフ考慮'],
  },
]

const recommendations = [
  { title: '初期値が一致', desc: '三項演算子や v-if でOK（シンプル）' },
  { title: '初期値が異なる', desc: 'ClientOnly を使う（安全）' },
  { title: 'SEOが重要', desc: 'ClientOnly + fallback（検索エンジン対応）' },
  { title: 'ブラウザAPI依存', desc: 'ClientOnly（window, localStorage等）' },
]

const styles = {
  page: css({
    maxW: '6xl',
    mx: 'auto',
    py: '10',
    px: { base: '4', md: '6', lg: '8' },
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
  }),
  title: css({ fontSize: '4xl', fontWeight: 'bold', color: 'emerald.500' }),
  instruction: css({
    bg: 'blue.50',
    borderLeftWidth: '4px',
    borderColor: 'cyan.500',
    borderRadius: 'xl',
    p: '6',
  }),
  instructionList: css({ mt: '4', pl: '5', listStyle: 'decimal', lineHeight: 'tall', color: 'slate.600' }),
  section: css({ display: 'flex', flexDirection: 'column', gap: '4' }),
  sectionTitle: css({ fontSize: 'xl', fontWeight: 'semibold', color: 'slate.800' }),
  demoBox: css({
    borderWidth: '1px',
    borderColor: 'gray.200',
    borderRadius: 'xl',
    bg: 'white',
    p: '6',
    boxShadow: 'sm',
  }),
  clientContent: css({
    bg: 'blue.100',
    borderWidth: '1px',
    borderColor: 'blue.500',
    borderRadius: 'lg',
    p: '4',
  }),
  serverContent: css({
    bg: 'amber.100',
    borderWidth: '1px',
    borderColor: 'amber.500',
    borderRadius: 'lg',
    p: '4',
  }),
  ssrContent: css({
    bg: 'emerald.100',
    borderWidth: '1px',
    borderColor: 'emerald.500',
    borderRadius: 'lg',
    p: '4',
  }),
  htmlTable: css({
    width: 'full',
    borderCollapse: 'collapse',
    mt: '4',
    '& th, & td': {
      px: '3',
      py: '3',
      borderBottomWidth: '1px',
      borderColor: 'gray.200',
      textAlign: 'left',
    },
    '& th': {
      bg: 'gray.50',
      fontWeight: 'semibold',
      color: 'slate.700',
    },
  }),
  card: css({
    bg: 'white',
    borderWidth: '1px',
    borderColor: 'gray.200',
    borderRadius: 'xl',
    p: '6',
    boxShadow: 'sm',
  }),
  timeline: css({ mt: '4', display: 'flex', flexDirection: 'column', gap: '3' }),
  step: css({ display: 'flex', gap: '4', alignItems: 'flex-start' }),
  stepNumber: css({
    w: '8',
    h: '8',
    borderRadius: 'full',
    bg: 'emerald.400',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'semibold',
    flexShrink: 0,
  }),
  stepContent: css({
    flex: 1,
    bg: 'gray.50',
    borderRadius: 'lg',
    p: '4',
    '& code': {
      display: 'block',
      mt: '2',
      bg: 'slate.900',
      color: 'slate.100',
      p: '3',
      borderRadius: 'md',
    },
  }),
  codeExample: css({
    bg: 'slate.900',
    color: 'slate.50',
    borderRadius: 'xl',
    p: '6',
    boxShadow: 'md',
    '& pre': {
      mt: '4',
      bg: 'slate.800',
      p: '4',
      borderRadius: 'lg',
      overflowX: 'auto',
    },
  }),
  link: css({
    alignSelf: 'flex-start',
    mt: '4',
    color: 'emerald.500',
    fontWeight: 'medium',
    borderWidth: '2px',
    borderColor: 'emerald.500',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    transition: 'all 0.2s',
    _hover: { bg: 'emerald.500', color: 'white' },
  }),
  hydrationGrid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(auto-fit, minmax(320px, 1fr))' },
    gap: '4',
    mt: '4',
  }),
  caseCard: css({
    borderWidth: '2px',
    borderRadius: 'xl',
    p: '5',
    '& pre': {
      mt: '4',
      bg: 'slate.900',
      color: 'slate.50',
      p: '4',
      borderRadius: 'lg',
      overflowX: 'auto',
    },
  }),
  caseExplanation: css({
    mt: '3',
    bg: 'white',
    borderRadius: 'lg',
    p: '3',
    fontSize: 'sm',
    color: 'slate.700',
  }),
  caseSafe: css({ bg: 'emerald.50', borderColor: 'emerald.400' }),
  caseDanger: css({ bg: 'rose.50', borderColor: 'rose.400' }),
  comparisonBox: css({ mt: '8' }),
  comparisonTable: css({
    width: 'full',
    borderCollapse: 'collapse',
    mt: '4',
    '& th, & td': {
      px: '3',
      py: '3',
      borderBottomWidth: '1px',
      borderColor: 'gray.200',
    },
    '& th': {
      bg: 'gray.50',
      fontWeight: 'semibold',
      color: 'slate.700',
    },
  }),
  safeRow: css({ bg: 'emerald.50' }),
  dangerRow: css({ bg: 'rose.50' }),
  methodGrid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(auto-fit, minmax(280px, 1fr))' },
    gap: '4',
    mt: '4',
  }),
  methodCard: css({
    borderWidth: '1px',
    borderColor: 'gray.200',
    borderRadius: 'xl',
    bg: 'gray.50',
    p: '5',
    '& pre': {
      mt: '3',
      bg: 'slate.900',
      color: 'slate.50',
      p: '3',
      borderRadius: 'lg',
      overflowX: 'auto',
    },
    '& ul': {
      mt: '3',
      pl: '5',
      color: 'slate.600',
    },
  }),
  methodTitle: css({ color: 'emerald.500', fontWeight: 'semibold' }),
  recommendation: css({
    bg: 'blue.50',
    borderLeftWidth: '4px',
    borderColor: 'cyan.500',
    borderRadius: 'xl',
    p: '5',
    mt: '6',
    '& ul': {
      mt: '3',
      pl: '5',
      color: 'slate.700',
      lineHeight: 'tall',
    },
  }),
}
</script>

<template>
  <div :class="styles.page">
    <h1 :class="styles.title">ClientOnly 動作確認</h1>

    <section :class="styles.instruction">
      <h2 :class="styles.sectionTitle">🔍 確認方法</h2>
      <ol :class="styles.instructionList">
        <li v-for="instruction in instructions" :key="instruction">
          {{ instruction }}
        </li>
      </ol>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">例1: fallbackあり</h2>
      <div :class="styles.demoBox">
        <ClientOnly>
          <div :class="styles.clientContent">
            <p><strong>クライアント側の内容</strong></p>
            <p>この内容は<code>HTMLソース</code>には含まれません</p>
            <p>DevToolsでのみ見えます</p>
          </div>

          <template #fallback>
            <div :class="styles.serverContent">
              <p><strong>サーバー側の内容（fallback）</strong></p>
              <p>この内容は<code>HTMLソース</code>に含まれます</p>
              <p>Hydration後に上の内容に切り替わります</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">例2: fallbackなし</h2>
      <div :class="styles.demoBox">
        <ClientOnly>
          <div :class="styles.clientContent">
            <p><strong>クライアント側のみ</strong></p>
            <p>HTMLソースには何も出力されません</p>
            <p>空のコメントノードだけが出力されます</p>
          </div>
        </ClientOnly>
      </div>
    </section>

    <section :class="styles.section">
      <h2 :class="styles.sectionTitle">例3: 通常のSSR（比較用）</h2>
      <div :class="styles.demoBox">
        <div :class="styles.ssrContent">
          <p><strong>通常のSSRコンテンツ</strong></p>
          <p>この内容は<code>HTMLソース</code>に含まれます</p>
          <p>タイムスタンプ: {{ timestamp }}</p>
        </div>
      </div>
    </section>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">📄 HTMLソースに含まれるもの</h2>
      <table :class="styles.htmlTable">
        <thead>
          <tr>
            <th>ケース</th>
            <th>HTMLソース</th>
            <th>DevTools（DOM）</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in htmlSourceRows" :key="row.case">
            <td>{{ row.case }}</td>
            <td>{{ row.html }}</td>
            <td>{{ row.dom }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">⏱️ ClientOnlyのライフサイクル</h2>
      <div :class="styles.timeline">
        <div v-for="(step, index) in timelineSteps" :key="step.title" :class="styles.step">
          <div :class="styles.stepNumber">{{ index + 1 }}</div>
          <div :class="styles.stepContent">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
            <code>{{ step.code }}</code>
          </div>
        </div>
      </div>
    </section>

    <section :class="styles.codeExample">
      <h2 :class="styles.sectionTitle">💻 実装</h2>
      <pre><code>&lt;ClientOnly&gt;
  &lt;!-- この部分はHTMLソースに含まれない --&gt;
  &lt;p&gt;クライアント側の内容&lt;/p&gt;

  &lt;!-- この部分がHTMLソースに含まれる --&gt;
  &lt;template #fallback&gt;
    &lt;p&gt;サーバー側の内容&lt;/p&gt;
  &lt;/template&gt;
&lt;/ClientOnly&gt;</code></pre>
    </section>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">⚠️ Hydrationエラーが起きるケース・起きないケース</h2>

      <div :class="styles.hydrationGrid">
        <div :class="[styles.caseCard, styles.caseSafe]">
          <h3>✅ エラーにならない（安全）</h3>
          <pre v-pre><code>{{ safeCaseCode }}</code></pre>
          <p :class="styles.caseExplanation">
            <strong>理由:</strong> サーバーもクライアントも初期値は<code>false</code>なので一致する
          </p>
        </div>

        <div :class="[styles.caseCard, styles.caseDanger]">
          <h3>❌ エラーになる（危険）</h3>
          <pre v-pre><code>{{ dangerCaseCode }}</code></pre>
          <p :class="styles.caseExplanation">
            <strong>理由:</strong> サーバーとクライアントでHydration時の値が異なる
          </p>
        </div>
      </div>

      <div :class="styles.comparisonBox">
        <h3>パターン別比較</h3>
        <table :class="styles.comparisonTable">
          <thead>
            <tr>
              <th>パターン</th>
              <th>サーバー</th>
              <th>クライアント（Hydration）</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="row in comparisonRows"
              :key="row.pattern"
              :class="row.safe ? styles.safeRow : styles.dangerRow"
            >
              <td><code>{{ row.pattern }}</code></td>
              <td>{{ row.server }}</td>
              <td>{{ row.client }}</td>
              <td>{{ row.result }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section :class="styles.card">
      <h2 :class="styles.sectionTitle">🔀 v-if vs 三項演算子 vs ClientOnly</h2>

      <div :class="styles.methodGrid">
        <div v-for="card in methodCards" :key="card.title" :class="styles.methodCard">
          <h3 :class="styles.methodTitle">{{ card.title }}</h3>
          <pre v-pre><code>{{ card.code }}</code></pre>
          <ul>
            <li v-for="point in card.points" :key="point">{{ point }}</li>
          </ul>
        </div>
      </div>

      <div :class="styles.recommendation">
        <h3>💡 推奨される使い分け</h3>
        <ul>
          <li v-for="recommendation in recommendations" :key="recommendation.title">
            <strong>{{ recommendation.title }}:</strong> {{ recommendation.desc }}
          </li>
        </ul>
      </div>
    </section>

    <NuxtLink to="/" :class="styles.link">← トップページに戻る</NuxtLink>
  </div>
</template>
