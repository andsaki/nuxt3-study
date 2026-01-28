<script setup lang="ts">
import { css } from '~/styled-system/css'
import {
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '~/components/design-system/table-helpers'

type CardScheme = 'blue' | 'green' | 'yellow' | 'red' | 'gray' | 'purple'

interface CodeCard {
  title: string
  colorScheme: CardScheme
  code: string
}

interface CompilerCard extends CodeCard {
  note: string
}

const styles = {
  page: css({
    maxW: '1200px',
    mx: 'auto',
    py: '12',
    px: { base: '4', md: '6' },
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
  }),
  gridThree: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', lg: 'repeat(3, 1fr)' },
  }),
  gridTwo: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
  }),
  codeBlock: css({
    fontFamily:
      "'SFMono-Regular', Menlo, Consolas, 'Liberation Mono', 'Courier New', monospace",
    bg: 'gray.900',
    color: 'gray.50',
    fontSize: 'sm',
    lineHeight: '1.6',
    borderRadius: 'lg',
    p: '4',
    overflowX: 'auto',
    whiteSpace: 'pre-wrap',
  }),
  list: css({
    pl: '5',
    listStyleType: 'disc',
    color: 'contents.secondary',
    lineHeight: '1.6',
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
  }),
  backLink: css({
    alignSelf: 'flex-start',
    mt: '4',
    color: 'emerald.600',
    fontWeight: 'medium',
    borderWidth: '2px',
    borderColor: 'emerald.600',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    _hover: {
      bg: 'emerald.600',
      color: 'white',
    },
  }),
}

const strictModePoints = [
  'ReactもVueも同じTypeScriptのstrict設定を利用している。',
  'strictモードはコンパイル時の型チェックのみで、実行時パフォーマンスには影響なし。',
  'ビルド時に数秒遅くなる程度で、運用コストは非常に小さい。',
]

const typeInferenceExamples: CodeCard[] = [
  {
    title: 'Vue 3 (script setup)',
    colorScheme: 'green',
    code: `&lt;script setup lang="ts"&gt;
// ✅ 型推論が強力
const count = ref(0)           // Ref&lt;number&gt;
const name = ref('hello')      // Ref&lt;string&gt;

const props = defineProps&lt;{
  title: string
  count?: number
}&gt;()
// props.title は string型として推論
&lt;/script&gt;`,
  },
  {
    title: 'Vue 2 (Options API)',
    colorScheme: 'red',
    code: `&lt;script lang="ts"&gt;
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
&lt;/script&gt;`,
  },
  {
    title: 'React',
    colorScheme: 'blue',
    code: `// ❌ 明示的な型指定が必要
const [count, setCount] = useState&lt;number&gt;(0)
const [name, setName] = useState&lt;string&gt;('hello')

interface Props {
  title: string
  count?: number
}
const Component: React.FC&lt;Props&gt; = ({ title, count }) =&gt; {
  // ...
}`,
  },
]

const explanationCards: CodeCard[] = [
  {
    title: '純粋関数型言語の型推論',
    colorScheme: 'yellow',
    code: `-- Haskell（純粋関数型）
add x y = x + y
-- 推論: (Num a) => a -> a -> a

map f [] = []
map f (x:xs) = f x : map f xs
-- 推論: (a -> b) -> [a] -> [b]

型を全く書かなくても完全に推論される`,
  },
  {
    title: 'React = 関数型スタイル',
    colorScheme: 'purple',
    code: `// 普通のJavaScript関数
const useState = &lt;T&gt;(initial: T): [T, (value: T) => void] => {
  // ...
}

// TypeScriptは「ただの関数」として扱う
const [count, setCount] = useState(0)
// Tが何か推論できない場合がある

// 明示的に書く必要
const [user, setUser] = useState&lt;User | null&gt;(null)`,
  },
  {
    title: 'Vue = コンパイラマクロ',
    colorScheme: 'green',
    code: `&lt;script setup lang="ts"&gt;
// definePropsは「コンパイラマクロ」
const props = defineProps&lt;{ name: string }&gt;()

// コンパイラが特別に解析
const count = ref(0)  // Ref&lt;number&gt;と推論

// Vue SFCコンパイラが型を生成
&lt;/script&gt;`,
  },
]

const compilerCards: CompilerCard[] = [
  {
    title: 'Vue（SFCコンパイラが解析）',
    colorScheme: 'green',
    code: `&lt;script setup lang="ts"&gt;
// コンパイル前
const count = ref(0)

// ↓ コンパイラが解析して型を生成
// Ref&lt;number&gt; と推論

defineProps&lt;{ name: string }&gt;()
defineEmits&lt;{ click: [id: number] }&gt;()
&lt;/script&gt;`,
    note: 'コンパイラが「特別扱い」して最適な型を生成',
  },
  {
    title: 'React（通常のTypeScript）',
    colorScheme: 'blue',
    code: `function useState&lt;T&gt;(initial: T): [T, ...] {
  // ...
}

// Tが推論できない場合
const [state, setState] = useState(null)
// 型: null ← 弱い

const [state, setState] = useState&lt;User | null&gt;(null)`,
    note: 'Reactはライブラリであってコンパイラではない',
  },
]

const comparisonRows = [
  { label: 'アプローチ', vue2: 'Options API', react: 'ライブラリ + 標準TS', vue3: 'フレームワーク + コンパイラ' },
  { label: '型推論', vue2: '❌ 非常に弱い', react: 'TypeScriptの一般ルール', vue3: 'コンパイラマクロで強化' },
  { label: '関数型スタイル', vue2: '❌ なし', react: '✅ あり', vue3: '△ 部分的' },
  { label: '純粋関数型', vue2: '❌', react: '❌', vue3: '❌' },
  { label: '型推論の強さ', vue2: '弱い', react: '普通', vue3: '強い' },
  { label: '型を書く量', vue2: '多い（効果少ない）', react: '多い', vue3: '少ない' },
  { label: '学習コスト', vue2: '低い', react: 'やや高い', vue3: '低い' },
  { label: 'TypeScript推奨度', vue2: '❌ 非推奨', react: '✅ 推奨', vue3: '✅ 強く推奨' },
]

const warningCode = `&lt;script lang="ts"&gt;
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      count: 0  // ❌ any型になる
    }
  },
  computed: {
    doubled() {
      return this.count * 2  // ❌ 型エラーなし
    }
  },
  methods: {
    increment() {
      this.countt++  // ❌ タイポでも気づかない
    }
  }
})
&lt;/script&gt;`

const conclusionItems = [
  'Haskell / OCaml: 純粋関数型 → 型推論が超強力',
  'Vue 2: Options API → 型推論が弱くTypeScript非推奨',
  'React: JavaScriptベースの関数型スタイル → 通常の型推論',
  'Vue 3: コンパイラマクロで型推論を強化 → 書く型が少ない',
]

const keyPointParagraphs = [
 'ReactもVueもJavaScriptベースなので、本当の関数型ではありません。',
 'Vue 3はコンパイラという特殊な仕組みで型推論を強化しているため、書く型が少なくて済みます。',
 'Vue 2はTypeScriptとの相性が悪いため、新規プロジェクトではVue 3を推奨します。',
]

const perfRows = [
  { stage: '開発中（npm run dev）', strictFalse: '普通', strictTrue: '普通', impact: 'ほぼなし' },
  { stage: 'ビルド（npm run build）', strictFalse: '5秒', strictTrue: '6秒', impact: '+1秒程度' },
  { stage: '本番実行', strictFalse: '速い', strictTrue: '速い', impact: '影響ゼロ', highlight: true },
]
</script>

<template>
  <div :class="styles.page">
    <DesignSystemInfoBox variant="info" icon="📘" title="TypeScript: React vs Vue 3">
      <p>strict modeでの型推論を比較します。Vue 3はSFCコンパイラの力で型情報を増強できるため、Reactより少ない記述で型安全を確保できます。</p>
    </DesignSystemInfoBox>

    <DesignSystemCard title="📋 TypeScript strict mode とは" color-scheme="blue">
      <ul :class="styles.list">
        <li v-for="point in strictModePoints" :key="point">
          {{ point }}
        </li>
      </ul>
    </DesignSystemCard>

    <DesignSystemCard title="🔍 型推論の強さ比較">
      <div :class="styles.gridThree">
        <DesignSystemCard
          v-for="example in typeInferenceExamples"
          :key="example.title"
          variant="bordered"
          :title="example.title"
          :color-scheme="example.colorScheme"
        >
          <pre :class="styles.codeBlock"><code>{{ example.code }}</code></pre>
        </DesignSystemCard>
      </div>
    </DesignSystemCard>

    <DesignSystemCard title="💡 なぜVue 3の方が型推論が強いのか？" color-scheme="yellow">
      <p>ReactはライブラリとしてTypeScriptの一般的なルールに従いますが、Vue 3はSFCコンパイラでコードを解析し、型を増強できます。</p>
      <div :class="styles.gridThree">
        <DesignSystemCard
          v-for="card in explanationCards"
          :key="card.title"
          variant="bordered"
          :title="card.title"
          :color-scheme="card.colorScheme"
        >
          <pre :class="styles.codeBlock"><code>{{ card.code }}</code></pre>
        </DesignSystemCard>
      </div>
    </DesignSystemCard>

    <DesignSystemCard title="⚙️ コンパイラマクロの威力" color-scheme="purple">
      <div :class="styles.gridTwo">
        <DesignSystemCard
          v-for="card in compilerCards"
          :key="card.title"
          variant="bordered"
          :title="card.title"
          :color-scheme="card.colorScheme"
        >
          <pre :class="styles.codeBlock"><code>{{ card.code }}</code></pre>
          <DesignSystemInfoBox variant="tip" left-border>
            <p>{{ card.note }}</p>
          </DesignSystemInfoBox>
        </DesignSystemCard>
      </div>
    </DesignSystemCard>

    <DesignSystemCard title="📊 総合比較" color-scheme="green">
      <DesignSystemTable variant="striped" size="md">
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col">項目</TableHeaderCell>
            <TableHeaderCell scope="col">Vue 2</TableHeaderCell>
            <TableHeaderCell scope="col">React</TableHeaderCell>
            <TableHeaderCell scope="col">Vue 3</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in comparisonRows" :key="row.label">
            <TableHeaderCell scope="row">
              {{ row.label }}
            </TableHeaderCell>
            <TableCell>{{ row.vue2 }}</TableCell>
            <TableCell>{{ row.react }}</TableCell>
            <TableCell>{{ row.vue3 }}</TableCell>
          </TableRow>
        </TableBody>
      </DesignSystemTable>
    </DesignSystemCard>

    <DesignSystemInfoBox variant="warning" icon="⚠️" title="Vue 2の型推論の問題" left-border>
      <p>Options APIではthisの型がany扱いになるため、TypeScriptとの相性が悪いままです。</p>
      <pre :class="styles.codeBlock"><code>{{ warningCode }}</code></pre>
      <ul :class="styles.list">
        <li>Options APIは型推論が非常に弱い</li>
        <li><code>this</code>の型が正しく推論されない</li>
        <li>タイポやエラーに気づきにくい</li>
        <li>Vue 3のComposition APIで大幅改善</li>
      </ul>
    </DesignSystemInfoBox>

    <DesignSystemCard title="✅ 結論" color-scheme="green">
      <ul :class="styles.list">
        <li v-for="item in conclusionItems" :key="item">
          {{ item }}
        </li>
      </ul>
      <DesignSystemInfoBox variant="success" icon="🔑" left-border>
        <p v-for="paragraph in keyPointParagraphs" :key="paragraph">
          {{ paragraph }}
        </p>
      </DesignSystemInfoBox>
    </DesignSystemCard>

    <DesignSystemCard title="🚀 strict mode のパフォーマンス影響" color-scheme="blue">
      <DesignSystemTable variant="simple" size="sm">
        <TableHeader>
          <TableRow>
            <TableHeaderCell scope="col">タイミング</TableHeaderCell>
            <TableHeaderCell scope="col">strict: false</TableHeaderCell>
            <TableHeaderCell scope="col">strict: true</TableHeaderCell>
            <TableHeaderCell scope="col">影響</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="row in perfRows" :key="row.stage" :class="row.highlight ? css({ fontWeight: 'semibold', bg: 'emerald.50' }) : undefined">
            <TableHeaderCell scope="row">
              {{ row.stage }}
            </TableHeaderCell>
            <TableCell>{{ row.strictFalse }}</TableCell>
            <TableCell>{{ row.strictTrue }}</TableCell>
            <TableCell>
              <strong v-if="row.highlight">{{ row.impact }}</strong>
              <template v-else>{{ row.impact }}</template>
            </TableCell>
          </TableRow>
        </TableBody>
      </DesignSystemTable>
      <DesignSystemInfoBox variant="tip" icon="ℹ️" left-border>
        <p>strict modeは実行速度に影響せず、型情報はコンパイル時に消えます。</p>
      </DesignSystemInfoBox>
    </DesignSystemCard>

    <NuxtLink to="/" :class="styles.backLink">
      ← トップページに戻る
    </NuxtLink>
  </div>
</template>
