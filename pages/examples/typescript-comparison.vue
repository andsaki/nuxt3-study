<script setup lang="ts">
// Vue 3の型推論デモ
const count = ref(0)  // Ref<number> と自動推論
const name = ref('hello')  // Ref<string> と自動推論

const props = defineProps<{
  title: string
  count?: number
}>()

const emit = defineEmits<{
  update: [id: number, value: string]
  delete: [id: number]
}>()
</script>

<template>
  <div class="container">
    <h1>TypeScript: React vs Vue 3</h1>

    <div class="intro">
      <p>
        strict modeでの型推論の比較。なぜVue 3の方が型を書く量が少ないのか？
      </p>
    </div>

    <!-- TypeScript strictモード -->
    <div class="section">
      <h2>📋 TypeScript strict mode とは</h2>
      <div class="info-box">
        <p><strong>TypeScriptのstrict modeは同じ:</strong></p>
        <ul>
          <li>ReactもVueも同じTypeScriptのstrict設定を使用</li>
          <li>実行速度への影響はゼロ（コンパイル時のみ）</li>
          <li>ビルド時に数秒遅くなるだけ</li>
        </ul>
      </div>
    </div>

    <!-- 型推論の強さ -->
    <div class="section">
      <h2>🔍 型推論の強さ比較</h2>

      <div class="comparison-grid-three">
        <div class="compare-card vue3">
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

        <div class="compare-card vue2">
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

        <div class="compare-card react">
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
    <div class="section highlight">
      <h2>💡 なぜVue 3の方が型推論が強いのか？</h2>

      <div class="reason-box">
        <h3>❓「Reactは関数型なのに、なぜ型推論が弱い？」</h3>
        <p>答え: <strong>Reactは純粋関数型言語ではない</strong>からです。</p>
      </div>

      <div class="explanation-grid">
        <div class="explanation-card">
          <h3>純粋関数型言語の型推論</h3>
          <pre><code>-- Haskell（純粋関数型）
add x y = x + y
-- 推論: (Num a) =&gt; a -&gt; a -&gt; a

map f [] = []
map f (x:xs) = f x : map f xs
-- 推論: (a -&gt; b) -&gt; [a] -&gt; [b]

型を全く書かなくても完全に推論される</code></pre>
        </div>

        <div class="explanation-card">
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

        <div class="explanation-card">
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
    <div class="section">
      <h2>⚙️ コンパイラマクロの威力</h2>

      <div class="compiler-grid">
        <div class="compiler-card">
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
          <p class="note">コンパイラが「特別扱い」して最適な型を生成</p>
        </div>

        <div class="compiler-card">
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
          <p class="note">Reactはライブラリであってコンパイラではない</p>
        </div>
      </div>
    </div>

    <!-- 総合比較表 -->
    <div class="section">
      <h2>📊 総合比較</h2>
      <table class="comparison-table">
        <thead>
          <tr>
            <th></th>
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
    <div class="section warning">
      <h2>⚠️ Vue 2の型推論の問題</h2>
      <div class="warning-box">
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
    <div class="section conclusion">
      <h2>✅ 結論</h2>
      <div class="conclusion-box">
        <h3>「関数型 = 型推論が強い」は純粋関数型言語の話</h3>
        <ul>
          <li><strong>Haskell/OCaml:</strong> 純粋関数型 → 型推論が超強力</li>
          <li><strong>Vue 2:</strong> Options API → 型推論が弱い（TypeScript非推奨）</li>
          <li><strong>React:</strong> JavaScriptベースの関数型スタイル → 通常の型推論</li>
          <li><strong>Vue 3:</strong> コンパイラマクロで型推論を強化 → 書く型が少ない</li>
        </ul>

        <div class="key-point">
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
    <div class="section">
      <h2>🚀 strict mode のパフォーマンス影響</h2>
      <table class="perf-table">
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
          <tr class="highlight-row">
            <td>本番実行</td>
            <td>速い</td>
            <td>速い</td>
            <td><strong>影響ゼロ</strong></td>
          </tr>
        </tbody>
      </table>

      <div class="perf-note">
        <p><strong>重要:</strong> strict modeは実行速度に影響しません。</p>
        <p>型情報はコンパイル時に消えるため、本番コードは全く同じです。</p>
      </div>
    </div>

    <NuxtLink to="/" class="back-link">← トップページに戻る</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #00dc82;
  margin-bottom: 2rem;
  font-size: 2rem;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

h3 {
  color: #555;
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
}

.intro {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.section.highlight {
  background: #fef3c7;
  border: 2px solid #f59e0b;
}

.section.conclusion {
  background: #d1fae5;
  border: 2px solid #10b981;
}

.section.warning {
  background: #fee2e2;
  border: 2px solid #ef4444;
}

.warning-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.warning-box h3 {
  color: #991b1b;
  margin-bottom: 1rem;
}

.warning-box ul {
  margin: 1rem 0 0 1.5rem;
}

.warning-box li {
  margin: 0.5rem 0;
  color: #7f1d1d;
}

.info-box {
  background: white;
  padding: 1.5rem;
  border-radius: 6px;
  margin-top: 1rem;
}

.info-box ul {
  margin: 0.5rem 0 0 1.5rem;
}

.info-box li {
  margin: 0.5rem 0;
}

.comparison-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.comparison-grid-three {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 1024px) {
  .comparison-grid-three {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}

.compare-card {
  border: 2px solid;
  border-radius: 8px;
  padding: 1.5rem;
}

.compare-card.vue3 {
  background: #d1fae5;
  border-color: #10b981;
}

.compare-card.vue2 {
  background: #fee2e2;
  border-color: #ef4444;
}

.compare-card.react {
  background: #dbeafe;
  border-color: #3b82f6;
}

.compare-card h3 {
  margin-bottom: 1rem;
  color: #1f2937;
}

pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
  margin: 0;
}

code {
  font-family: 'Courier New', monospace;
}

.reason-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  border: 2px solid #f59e0b;
}

.reason-box h3 {
  color: #92400e;
  margin-bottom: 0.75rem;
}

.reason-box p {
  color: #78350f;
  font-size: 1.1rem;
}

.explanation-grid {
  display: grid;
  gap: 1.5rem;
}

.explanation-card {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #d97706;
}

.explanation-card h3 {
  color: #92400e;
  margin-bottom: 1rem;
}

.compiler-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-top: 1.5rem;
}

@media (max-width: 768px) {
  .compiler-grid {
    grid-template-columns: 1fr;
  }
}

.compiler-card {
  background: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  border: 2px solid #e5e7eb;
}

.compiler-card h3 {
  color: #1f2937;
  margin-bottom: 1rem;
}

.note {
  margin-top: 1rem;
  padding: 0.75rem;
  background: #fef3c7;
  border-left: 3px solid #f59e0b;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #78350f;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.comparison-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.comparison-table tbody tr:hover {
  background: #f9fafb;
}

.conclusion-box {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
}

.conclusion-box h3 {
  color: #065f46;
  margin-bottom: 1rem;
}

.conclusion-box ul {
  margin: 1rem 0 1.5rem 1.5rem;
}

.conclusion-box li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

.key-point {
  background: #ecfdf5;
  border: 2px solid #10b981;
  padding: 1.5rem;
  border-radius: 6px;
  margin-top: 1.5rem;
}

.key-point p {
  margin: 0.75rem 0;
  line-height: 1.6;
}

.perf-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.perf-table th,
.perf-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.perf-table th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

.perf-table .highlight-row {
  background: #ecfdf5;
  font-weight: 600;
}

.perf-note {
  background: #dbeafe;
  padding: 1rem;
  border-radius: 6px;
  margin-top: 1rem;
  border-left: 4px solid #3b82f6;
}

.perf-note p {
  margin: 0.5rem 0;
  color: #1e40af;
}

.back-link {
  display: inline-block;
  color: #00dc82;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid #00dc82;
  border-radius: 6px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #00dc82;
  color: white;
}
</style>
