<script setup lang="ts">
import { css } from '~/styled-system/css'

// Vue 3の型推論デモ（実際には使用していないがサンプルコード用）
const _count = ref(0)  // Ref<number> と自動推論
const _name = ref('hello')  // Ref<string> と自動推論

const _props = defineProps<{
  title: string
  count?: number
}>()

const _emit = defineEmits<{
  update: [id: number, value: string]
  delete: [id: number]
}>()

const styles = {
  container: css({
    maxW: '1200px',
    mx: 'auto',
    p: '8',
    display: 'flex',
    flexDirection: 'column',
    gap: '8',
    '& h1': { color: '#00dc82', mb: '8', fontSize: '2rem' },
    '& h2': { color: '#333333', mb: '4', fontSize: '1.3rem' },
    '& h3': { color: '#555555', mb: '3', fontSize: '1.1rem' },
    '& pre': {
      bg: '#1f2937',
      color: '#f9fafb',
      p: '4',
      borderRadius: '6px',
      overflowX: 'auto',
      fontSize: '0.875rem',
      lineHeight: '1.6',
      m: 0,
    },
    '& code': { fontFamily: "'Courier New', monospace" },
  }),
  intro: css({
    bg: '#f0f9ff',
    borderLeftWidth: '4px',
    borderLeftColor: '#0ea5e9',
    p: '6',
    mb: '8',
    borderRadius: '8px',
  }),
  section: css({
    bg: 'white',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
    borderRadius: '8px',
    p: '8',
    mb: '8',
  }),
  sectionHighlight: css({
    bg: '#fef3c7',
    borderColor: '#f59e0b',
    borderWidth: '2px',
  }),
  sectionConclusion: css({
    bg: '#d1fae5',
    borderColor: '#10b981',
    borderWidth: '2px',
  }),
  sectionWarning: css({
    bg: '#fee2e2',
    borderColor: '#ef4444',
    borderWidth: '2px',
  }),
  infoBox: css({
    bg: 'white',
    borderRadius: '6px',
    p: '6',
    mt: '4',
    '& ul': { mt: '2', ml: '6' },
    '& li': { mt: '2' },
  }),
  comparisonGridThree: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', lg: 'repeat(3, 1fr)' },
    gap: '6',
    mt: '6',
  }),
  compareCard: css({
    borderWidth: '2px',
    borderColor: '#d1d5db',
    borderRadius: '8px',
    p: '6',
  }),
  compareCardVue3: css({ bg: '#d1fae5', borderColor: '#10b981' }),
  compareCardVue2: css({ bg: '#fee2e2', borderColor: '#ef4444' }),
  compareCardReact: css({ bg: '#dbeafe', borderColor: '#3b82f6' }),
  reasonBox: css({
    bg: 'white',
    p: '6',
    borderRadius: '8px',
    mb: '6',
    borderWidth: '2px',
    borderColor: '#f59e0b',
    '& h3': { color: '#92400e', mb: '3' },
    '& p': { color: '#78350f', fontSize: '1.1rem' },
  }),
  explanationGrid: css({
    display: 'grid',
    gap: '6',
    mt: '6',
  }),
  explanationCard: css({
    bg: 'white',
    p: '6',
    borderRadius: '8px',
    borderWidth: '1px',
    borderColor: '#d97706',
    '& h3': { color: '#92400e', mb: '4' },
  }),
  compilerGrid: css({
    display: 'grid',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
    gap: '6',
    mt: '6',
  }),
  compilerCard: css({
    bg: '#f9fafb',
    p: '6',
    borderRadius: '8px',
    borderWidth: '2px',
    borderColor: '#e5e7eb',
    '& h3': { color: '#1f2937', mb: '4' },
  }),
  note: css({
    mt: '4',
    p: '3',
    bg: '#fef3c7',
    borderLeftWidth: '3px',
    borderLeftColor: '#f59e0b',
    borderRadius: '4px',
    fontSize: '0.9rem',
    color: '#78350f',
  }),
  comparisonTable: css({
    width: '100%',
    borderCollapse: 'collapse',
    mt: '4',
    bg: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    '& th, & td': {
      p: '4',
      textAlign: 'left',
      borderBottom: '1px solid #e5e7eb',
    },
    '& th': {
      bg: '#f9fafb',
      fontWeight: '600',
      color: '#374151',
    },
    '& tbody tr:hover': {
      bg: '#f9fafb',
    },
  }),
  warningBox: css({
    bg: 'white',
    p: '6',
    borderRadius: '8px',
    '& h3': { color: '#991b1b', mb: '4' },
    '& ul': { mt: '4', ml: '6' },
    '& li': { mt: '2', color: '#7f1d1d' },
  }),
  conclusionBox: css({
    bg: 'white',
    p: '6',
    borderRadius: '8px',
    '& h3': { color: '#065f46', mb: '4' },
    '& ul': { mt: '4', mb: '6', ml: '6' },
    '& li': { mt: '2', lineHeight: '1.6' },
  }),
  keyPoint: css({
    bg: '#ecfdf5',
    borderWidth: '2px',
    borderColor: '#10b981',
    p: '6',
    borderRadius: '6px',
    mt: '6',
    '& p': { mt: '3', lineHeight: '1.6' },
  }),
  perfTable: css({
    width: '100%',
    borderCollapse: 'collapse',
    mt: '4',
    bg: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    '& th, & td': {
      p: '4',
      textAlign: 'left',
      borderBottom: '1px solid #e5e7eb',
    },
    '& th': {
      bg: '#f9fafb',
      fontWeight: '600',
      color: '#374151',
    },
  }),
  perfTableHighlightRow: css({
    bg: '#ecfdf5',
    fontWeight: '600',
  }),
  perfNote: css({
    bg: '#dbeafe',
    p: '4',
    borderRadius: '6px',
    mt: '4',
    borderLeftWidth: '4px',
    borderLeftColor: '#3b82f6',
    '& p': { mt: '2', color: '#1e40af' },
  }),
  backLink: css({
    display: 'inline-block',
    color: '#00dc82',
    textDecoration: 'none',
    fontWeight: '500',
    px: '6',
    py: '3',
    borderWidth: '2px',
    borderColor: '#00dc82',
    borderRadius: '6px',
    transition: 'all 0.2s ease',
    _hover: { bg: '#00dc82', color: 'white' },
  }),
}
</script>

<template>
  <div :class="styles.container">
    <h1>TypeScript: React vs Vue 3</h1>

    <div :class="styles.intro">
      <p>
        strict modeでの型推論の比較。なぜVue 3の方が型を書く量が少ないのか？
      </p>
    </div>

    <!-- TypeScript strictモード -->
    <div :class="styles.section">
      <h2>📋 TypeScript strict mode とは</h2>
      <div :class="styles.infoBox">
        <p><strong>TypeScriptのstrict modeは同じ:</strong></p>
        <ul>
          <li>ReactもVueも同じTypeScriptのstrict設定を使用</li>
          <li>実行速度への影響はゼロ（コンパイル時のみ）</li>
          <li>ビルド時に数秒遅くなるだけ</li>
        </ul>
      </div>
    </div>

    <!-- 型推論の強さ -->
    <div :class="styles.section">
      <h2>🔍 型推論の強さ比較</h2>

      <div :class="styles.comparisonGridThree">
        <div :class="[styles.compareCard, styles.compareCardVue3]">
          <h3>Vue 3 (script setup)</h3>
          <pre v-pre><code>&lt;script setup lang="ts"&gt;
// ✅ 型推論が強力
const count = ref(0)           // Ref&lt;number&gt;
const name = ref('hello')      // Ref&lt;string&gt;

const props = defineProps&lt;{
  title: string
  count?: number
}&gt;()
// props.title は string型として推論
&lt;/script&gt;</code></pre>
        </div>

        <div :class="[styles.compareCard, styles.compareCardVue2]">
          <h3>Vue 2 (Options API)</h3>
          <pre v-pre><code>&lt;script lang="ts"&gt;
import Vue from 'vue'

// ❌ 型推論が弱い
export default Vue.extend({
  props: {
    title: String,  // 型安全性が低い
    count: Number
  },
  data() {
    return {
      count: 0,      // any扱い
      name: 'hello'  // any扱い
    }
  }
})
&lt;/script&gt;</code></pre>
        </div>

        <div :class="[styles.compareCard, styles.compareCardReact]">
          <h3>React</h3>
          <pre v-pre><code>// ❌ 明示的な型指定が必要
const [count, setCount] = useState&lt;number&gt;(0)
const [name, setName] = useState&lt;string&gt;('hello')

interface Props {
  title: string
  count?: number
}
const Component: React.FC&lt;Props&gt; = ({ title, count }) =&gt; {
  // ...
}</code></pre>
        </div>
      </div>
    </div>

    <!-- なぜVueの方が型推論が強いか -->
    <div :class="[styles.section, styles.sectionHighlight]">
      <h2>💡 なぜVue 3の方が型推論が強いのか？</h2>

      <div :class="styles.reasonBox">
        <h3>❓「Reactは関数型なのに、なぜ型推論が弱い？」</h3>
        <p>答え: <strong>Reactは純粋関数型言語ではない</strong>からです。</p>
      </div>

      <div :class="styles.explanationGrid">
        <div :class="styles.explanationCard">
          <h3>純粋関数型言語の型推論</h3>
          <pre><code>-- Haskell（純粋関数型）
add x y = x + y
-- 推論: (Num a) =&gt; a -&gt; a -&gt; a

map f [] = []
map f (x:xs) = f x : map f xs
-- 推論: (a -&gt; b) -&gt; [a] -&gt; [b]

型を全く書かなくても完全に推論される</code></pre>
        </div>

        <div :class="styles.explanationCard">
          <h3>React = JavaScriptベースの関数型スタイル</h3>
          <pre v-pre><code>// 普通のJavaScript関数
const useState = &lt;T&gt;(initial: T): [T, (value: T) =&gt; void] =&gt; {
  // ...
}

// TypeScriptは「ただの関数呼び出し」
const [count, setCount] = useState(0)
// Tが何か推論できない場合がある

// 明示的に書く必要
const [user, setUser] = useState&lt;User | null&gt;(null)</code></pre>
        </div>

        <div :class="styles.explanationCard">
          <h3>Vue = コンパイラマクロで型推論を強化</h3>
          <pre v-pre><code>&lt;script setup lang="ts"&gt;
// definePropsは「コンパイラマクロ」
// 実行時には存在しない
const props = defineProps&lt;{ name: string }&gt;()

// コンパイラが特別に解析
const count = ref(0)  // Ref&lt;number&gt;と推論

// Vue SFCコンパイラが型を生成
&lt;/script&gt;</code></pre>
        </div>
      </div>
    </div>

    <!-- コンパイラマクロの威力 -->
    <div :class="styles.section">
      <h2>⚙️ コンパイラマクロの威力</h2>

      <div :class="styles.compilerGrid">
        <div :class="styles.compilerCard">
          <h3>Vue（SFCコンパイラが解析）</h3>
          <pre v-pre><code>&lt;script setup lang="ts"&gt;
// コンパイル前
const count = ref(0)

// ↓ コンパイラが解析して型を生成
// Ref&lt;number&gt; と推論

// defineProps, defineEmits, defineExposeは
// 全て「コンパイラマクロ」
defineProps&lt;{ name: string }&gt;()
defineEmits&lt;{ click: [id: number] }&gt;()
&lt;/script&gt;</code></pre>
          <p :class="styles.note">コンパイラが「特別扱い」して最適な型を生成</p>
        </div>

        <div :class="styles.compilerCard">
          <h3>React（通常のTypeScript）</h3>
          <pre v-pre><code>// ただの関数なので、
// TypeScriptの一般的な型推論

function useState&lt;T&gt;(initial: T): [T, ...] {
  // ...
}

// Tが推論できない場合
const [state, setState] = useState(null)
// 型: null ← 弱い

// 明示的に書く必要
const [state, setState] = useState&lt;User | null&gt;(null)</code></pre>
          <p :class="styles.note">Reactはライブラリであってコンパイラではない</p>
        </div>
      </div>
    </div>

    <!-- 総合比較表 -->
    <div :class="styles.section">
      <h2>📊 総合比較</h2>
      <table :class="styles.comparisonTable">
        <thead>
          <tr>
            <th/>
            <th>Vue 2</th>
            <th>React</th>
            <th>Vue 3</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>アプローチ</td>
            <td>Options API</td>
            <td>ライブラリ + 標準TS</td>
            <td>フレームワーク + コンパイラ</td>
          </tr>
          <tr>
            <td>型推論</td>
            <td>❌ 非常に弱い</td>
            <td>TypeScriptの一般ルール</td>
            <td>コンパイラマクロで強化</td>
          </tr>
          <tr>
            <td>関数型スタイル</td>
            <td>❌ なし</td>
            <td>✅ あり</td>
            <td>△ 部分的</td>
          </tr>
          <tr>
            <td>純粋関数型</td>
            <td>❌ いいえ</td>
            <td>❌ いいえ</td>
            <td>❌ いいえ</td>
          </tr>
          <tr>
            <td>型推論の強さ</td>
            <td>弱い</td>
            <td>普通</td>
            <td>強い</td>
          </tr>
          <tr>
            <td>型を書く量</td>
            <td>多い（効果少ない）</td>
            <td>多い</td>
            <td>少ない</td>
          </tr>
          <tr>
            <td>学習コスト</td>
            <td>低い</td>
            <td>やや高い</td>
            <td>低い</td>
          </tr>
          <tr>
            <td>TypeScript推奨度</td>
            <td>❌ 非推奨</td>
            <td>✅ 推奨</td>
            <td>✅ 強く推奨</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Vue 2の問題 -->
    <div :class="[styles.section, styles.sectionWarning]">
      <h2>⚠️ Vue 2の型推論の問題</h2>
      <div :class="styles.warningBox">
        <h3>Vue 2 + TypeScriptは非推奨</h3>
        <pre v-pre><code>&lt;script lang="ts"&gt;
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      count: 0  // ❌ any型になる
    }
  },
  computed: {
    doubled() {
      return this.count * 2  // ❌ 型エラーが出ない
    }
  },
  methods: {
    increment() {
      this.countt++  // ❌ タイポしても気づかない
    }
  }
})
&lt;/script&gt;</code></pre>
        <ul>
          <li>Options APIは型推論が非常に弱い</li>
          <li>`this`の型が正しく推論されない</li>
          <li>タイポやエラーに気づきにくい</li>
          <li>Vue 3のComposition APIで大幅改善</li>
        </ul>
      </div>
    </div>

    <!-- 結論 -->
    <div :class="[styles.section, styles.sectionConclusion]">
      <h2>✅ 結論</h2>
      <div :class="styles.conclusionBox">
        <h3>「関数型 = 型推論が強い」は純粋関数型言語の話</h3>
        <ul>
          <li><strong>Haskell/OCaml:</strong> 純粋関数型 → 型推論が超強力</li>
          <li><strong>Vue 2:</strong> Options API → 型推論が弱い（TypeScript非推奨）</li>
          <li><strong>React:</strong> JavaScriptベースの関数型スタイル → 通常の型推論</li>
          <li><strong>Vue 3:</strong> コンパイラマクロで型推論を強化 → 書く型が少ない</li>
        </ul>

        <div :class="styles.keyPoint">
          <p>
            <strong>ReactもVueもJavaScriptベースなので、本当の関数型ではありません。</strong>
          </p>
          <p>
            Vue 3は<strong>コンパイラという特殊な仕組み</strong>で型推論を強化しているため、
            書く型が少なくて済みます。
          </p>
          <p>
            <strong>Vue 2はTypeScriptとの相性が悪いため、新規プロジェクトではVue 3を推奨。</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- strict modeの影響 -->
    <div :class="styles.section">
      <h2>🚀 strict mode のパフォーマンス影響</h2>
      <table :class="styles.perfTable">
        <thead>
          <tr>
            <th>タイミング</th>
            <th>strict: false</th>
            <th>strict: true</th>
            <th>影響</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>開発中（npm run dev）</td>
            <td>普通</td>
            <td>普通</td>
            <td>ほぼなし</td>
          </tr>
          <tr>
            <td>ビルド（npm run build）</td>
            <td>5秒</td>
            <td>6秒</td>
            <td>+1秒程度</td>
          </tr>
          <tr :class="styles.perfTableHighlightRow">
            <td>本番実行</td>
            <td>速い</td>
            <td>速い</td>
            <td><strong>影響ゼロ</strong></td>
          </tr>
        </tbody>
      </table>

      <div :class="styles.perfNote">
        <p><strong>重要:</strong> strict modeは実行速度に影響しません。</p>
        <p>型情報はコンパイル時に消えるため、本番コードは全く同じです。</p>
      </div>
    </div>

    <NuxtLink to="/" :class="styles.backLink">← トップページに戻る</NuxtLink>
  </div>
</template>
