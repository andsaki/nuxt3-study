<template>
  <div>
    <AppHeader />

    <div :class="css({ minH: 'screen', bg: 'gray.50', py: '12', px: '4' })">
      <div :class="css({ maxW: '4xl', mx: 'auto' })">
        <h1 :class="css({ fontSize: '4xl', fontWeight: 'bold', color: 'gray.900', mb: '4' })">
          Nuxt 3 自動インポート機能
        </h1>
        <p :class="css({ fontSize: 'lg', color: 'gray.600', mb: '8' })">
          import文を書かずにコンポーネント・関数を使える便利機能
        </p>

        <!-- 概要 -->
        <DesignSystemCard title="📚 自動インポートとは？" color-scheme="blue">
          <p :class="css({ mb: '4' })">
            Nuxt 3では、<strong>components/、composables/ディレクトリ配下のファイルは自動的にインポート</strong>されます。
            つまり、明示的に<code>import</code>文を書く必要がありません。
          </p>
          <div :class="css({ bg: 'blue.50', p: '4', rounded: 'md', borderLeft: '4px solid', borderColor: 'blue.500' })">
            <p :class="css({ fontWeight: 'semibold', color: 'blue.900', mb: '2' })">メリット</p>
            <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
              <li>コードがシンプルになる（import文が不要）</li>
              <li>ファイル移動時のパス修正が不要</li>
              <li>開発速度が向上する</li>
              <li>Tree-shakingで未使用コンポーネントは自動除外</li>
            </ul>
          </div>
        </DesignSystemCard>

        <!-- コンポーネントの自動インポート -->
        <DesignSystemCard title="🎨 コンポーネントの自動インポート" color-scheme="green">
          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            命名規則
          </h3>
          <p :class="css({ mb: '4' })">
            ディレクトリ構造に基づいて、自動的にコンポーネント名が決まります：
          </p>

          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', mb: '6', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code>components/
├── design-system/
│   ├── Input.vue       → &lt;DesignSystemInput&gt;
│   ├── Button.vue      → &lt;DesignSystemButton&gt;
│   └── Card.vue        → &lt;DesignSystemCard&gt;
└── AppHeader.vue       → &lt;AppHeader&gt;</code></pre>
          </div>

          <div :class="css({ bg: 'green.50', p: '4', rounded: 'md', mb: '4' })">
            <p :class="css({ fontWeight: 'semibold', color: 'green.900', mb: '2' })">
              ルール
            </p>
            <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc', color: 'green.800' })">
              <li>ディレクトリ名 + ファイル名 = コンポーネント名</li>
              <li>PascalCase（パスカルケース）に変換される</li>
              <li>ネストされたディレクトリもサポート</li>
            </ul>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            使用例
          </h3>
          <div :class="css({ display: 'grid', gap: '4', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' } })">
            <!-- ❌ 従来（Vue 3） -->
            <div>
              <p :class="css({ fontWeight: 'semibold', mb: '2', color: 'red.600' })">❌ 従来（Vue 3）</p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code>&lt;script setup&gt;
import AppHeader from
  '~/components/AppHeader.vue'
import DesignSystemInput from
  '~/components/design-system/Input.vue'
&lt;/script&gt;

&lt;template&gt;
  &lt;AppHeader /&gt;
  &lt;DesignSystemInput /&gt;
&lt;/template&gt;</code></pre>
              </div>
            </div>

            <!-- ✅ Nuxt 3 -->
            <div>
              <p :class="css({ fontWeight: 'semibold', mb: '2', color: 'green.600' })">✅ Nuxt 3</p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code>&lt;script setup&gt;
// import不要！
// 自動でインポートされる
&lt;/script&gt;

&lt;template&gt;
  &lt;AppHeader /&gt;
  &lt;DesignSystemInput /&gt;
&lt;/template&gt;</code></pre>
              </div>
            </div>
          </div>
        </DesignSystemCard>

        <!-- 組み込み関数の自動インポート -->
        <DesignSystemCard title="⚡ 組み込み関数の自動インポート" color-scheme="yellow">
          <p :class="css({ mb: '4' })">
            Vue 3とNuxt 3の組み込み関数も、<strong>import不要</strong>で使えます。
          </p>

          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', mb: '4', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code>&lt;script setup lang="ts"&gt;
// ❌ import不要！以下の関数はすべて自動インポートされる

// Vue 3 Composition API
const count = ref(0)              // ref
const doubled = computed(() => count.value * 2)  // computed
const message = reactive({ text: 'Hello' })      // reactive

// Nuxt 3 Composables
const route = useRoute()          // ルート情報
const router = useRouter()        // ルーター
const { data } = useFetch('/api') // データフェッチ
const config = useRuntimeConfig()  // 設定

// ライフサイクルフック
onMounted(() => {
  console.log('Mounted!')
})

watchEffect(() => {
  console.log('count:', count.value)
})
&lt;/script&gt;</code></pre>
          </div>

          <div :class="css({ bg: 'yellow.50', p: '4', rounded: 'md' })">
            <p :class="css({ fontWeight: 'semibold', color: 'yellow.900', mb: '2' })">
              自動インポートされる主な関数
            </p>
            <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc', color: 'yellow.800' })">
              <li><strong>Vue 3:</strong> ref, reactive, computed, watch, watchEffect, onMounted, onUnmounted...</li>
              <li><strong>Nuxt 3:</strong> useRoute, useRouter, useFetch, useAsyncData, useState, navigateTo...</li>
            </ul>
          </div>
        </DesignSystemCard>

        <!-- Composablesの自動インポート -->
        <DesignSystemCard title="🔧 Composablesの自動インポート">
          <p :class="css({ mb: '4' })">
            <code>composables/</code>ディレクトリ配下の関数も自動インポートされます。
          </p>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            ファイル構造
          </h3>
          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', mb: '4', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code>composables/
├── useCounter.ts      → useCounter()
├── useAuth.ts         → useAuth()
└── useTodo.ts         → useTodo()</code></pre>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            使用例
          </h3>
          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code>// composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0)
  const increment = () => count.value++
  const decrement = () => count.value--
  return { count, increment, decrement }
}

// pages/index.vue
&lt;script setup&gt;
// import不要！自動インポート
const { count, increment, decrement } = useCounter()
&lt;/script&gt;</code></pre>
          </div>
        </DesignSystemCard>

        <!-- 自動インポートされないもの -->
        <DesignSystemCard title="⚠️ 自動インポートされないもの">
          <p :class="css({ mb: '4' })">
            以下のものは<strong>明示的なimportが必要</strong>です：
          </p>

          <div :class="css({ spaceY: '4' })">
            <div :class="css({ bg: 'red.50', p: '4', rounded: 'md', borderLeft: '4px solid', borderColor: 'red.500' })">
              <p :class="css({ fontWeight: 'semibold', color: 'red.900', mb: '2' })">
                1. 外部ライブラリ
              </p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code>// ✅ 必要
import { css } from '~/styled-system/css'
import { useForm } from 'vee-validate'
import * as z from 'zod'</code></pre>
              </div>
            </div>

            <div :class="css({ bg: 'red.50', p: '4', rounded: 'md', borderLeft: '4px solid', borderColor: 'red.500' })">
              <p :class="css({ fontWeight: 'semibold', color: 'red.900', mb: '2' })">
                2. utils/配下のユーティリティ関数
              </p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code>// ✅ 必要
import { formatDate } from '~/utils/date'
import { validateEmail } from '~/utils/validation'</code></pre>
              </div>
            </div>

            <div :class="css({ bg: 'red.50', p: '4', rounded: 'md', borderLeft: '4px solid', borderColor: 'red.500' })">
              <p :class="css({ fontWeight: 'semibold', color: 'red.900', mb: '2' })">
                3. 型定義（TypeScript）
              </p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code>// ✅ 必要
import type { User } from '~/types/user'
import type { Post } from '~/types/post'</code></pre>
              </div>
            </div>
          </div>
        </DesignSystemCard>

        <!-- トラブルシューティング -->
        <DesignSystemCard title="🔍 トラブルシューティング">
          <div :class="css({ spaceY: '4' })">
            <div>
              <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2', color: 'gray.900' })">
                Q. コンポーネントが認識されない
              </h3>
              <p :class="css({ mb: '2' })">
                <strong>A.</strong> 以下を確認してください：
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
                <li><code>components/</code>ディレクトリ配下に配置されているか</li>
                <li>ファイル名が正しいか（.vue拡張子）</li>
                <li>コンポーネント名がPascalCaseになっているか</li>
                <li>開発サーバーを再起動してみる</li>
              </ul>
            </div>

            <div>
              <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2', color: 'gray.900' })">
                Q. TypeScriptの型推論が効かない
              </h3>
              <p :class="css({ mb: '2' })">
                <strong>A.</strong> <code>.nuxt/tsconfig.json</code>を確認してください。
              </p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code># 型情報を再生成
npm run dev

# または
npx nuxi prepare</code></pre>
              </div>
            </div>

            <div>
              <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2', color: 'gray.900' })">
                Q. 明示的にimportしたい
              </h3>
              <p>
                <strong>A.</strong> 可能です。自動インポートと明示的importは共存できます。
              </p>
            </div>
          </div>
        </DesignSystemCard>

        <!-- 戻るボタン -->
        <NuxtLink
          to="/"
          :class="css({
            display: 'inline-block',
            mt: '8',
            px: '6',
            py: '3',
            color: 'green.600',
            fontWeight: 'medium',
            border: '2px solid',
            borderColor: 'green.600',
            rounded: 'md',
            transition: 'all 0.2s',
            _hover: {
              bg: 'green.600',
              color: 'white'
            }
          })"
        >
          ← ホームに戻る
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
</script>
