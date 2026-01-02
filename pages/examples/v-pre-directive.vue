<template>
  <div>
    <AppHeader />

    <div :class="css({ minH: 'screen', bg: 'gray.50', py: '12', px: '4' })">
      <div :class="css({ maxW: '4xl', mx: 'auto' })">
        <h1 :class="css({ fontSize: '4xl', fontWeight: 'bold', color: 'gray.900', mb: '4' })">
          v-pre ディレクティブ
        </h1>
        <p :class="css({ fontSize: 'lg', color: 'gray.600', mb: '8' })">
          Vueテンプレート構文をスキップして、そのまま表示するためのディレクティブ
        </p>

        <!-- v-preとは？ -->
        <DesignSystemCard title="📖 v-preとは？" color-scheme="blue">
          <p :class="css({ mb: '4' })">
            <code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm', fontWeight: 'semibold' })">v-pre</code>
            は、Vue.jsのディレクティブで、<strong>そのタグ内のVueテンプレート構文をコンパイルせず、スキップする</strong>ためのものです。
          </p>

          <div :class="css({ bg: 'blue.50', p: '4', rounded: 'md', borderLeft: '4px solid', borderColor: 'blue.500' })">
            <p :class="css({ fontWeight: 'semibold', color: 'blue.900', mb: '2' })">
              主な用途
            </p>
            <ul :class="css({ pl: '6', spaceY: '2', listStyleType: 'disc', color: 'blue.800' })">
              <li>Vueのコードサンプルをそのまま表示したい時</li>
              <li>Mustache構文（<code>{{ }}</code>）を文字列として表示したい時</li>
              <li>大量の静的コンテンツのパフォーマンスを最適化したい時</li>
            </ul>
          </div>
        </DesignSystemCard>

        <!-- 実際の動作比較 -->
        <DesignSystemCard title="🔍 実際の動作比較" color-scheme="green">
          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            v-preなしの場合
          </h3>

          <div :class="css({ mb: '6' })">
            <p :class="css({ mb: '2', fontSize: 'sm', color: 'gray.600' })">
              コード:
            </p>
            <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', mb: '3', overflow: 'auto' })">
              <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;p&gt;ユーザー名: {{ userName }}&lt;/p&gt;
&lt;p&gt;メールアドレス: {{ userEmail }}&lt;/p&gt;</code></pre>
            </div>

            <p :class="css({ mb: '2', fontSize: 'sm', color: 'gray.600' })">
              表示結果:
            </p>
            <div :class="css({ bg: 'white', p: '4', rounded: 'lg', border: '2px solid', borderColor: 'green.300' })">
              <p>ユーザー名: {{ userName }}</p>
              <p>メールアドレス: {{ userEmail }}</p>
            </div>
            <p :class="css({ mt: '2', fontSize: 'sm', color: 'green.700' })">
              ✅ Vueが変数を解釈して、値が表示されます
            </p>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            v-preありの場合
          </h3>

          <div>
            <p :class="css({ mb: '2', fontSize: 'sm', color: 'gray.600' })">
              コード:
            </p>
            <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', mb: '3', overflow: 'auto' })">
              <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;p v-pre&gt;ユーザー名: {{ userName }}&lt;/p&gt;
&lt;p v-pre&gt;メールアドレス: {{ userEmail }}&lt;/p&gt;</code></pre>
            </div>

            <p :class="css({ mb: '2', fontSize: 'sm', color: 'gray.600' })">
              表示結果:
            </p>
            <div :class="css({ bg: 'white', p: '4', rounded: 'lg', border: '2px solid', borderColor: 'green.300' })">
              <p v-pre>ユーザー名: {{ userName }}</p>
              <p v-pre>メールアドレス: {{ userEmail }}</p>
            </div>
            <p :class="css({ mt: '2', fontSize: 'sm', color: 'green.700' })">
              ✅ Mustache構文がそのまま文字列として表示されます
            </p>
          </div>
        </DesignSystemCard>

        <!-- 使用例 -->
        <DesignSystemCard title="💡 実践的な使用例" color-scheme="yellow">
          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            1. コードサンプルの表示
          </h3>

          <div :class="css({ mb: '6' })">
            <p :class="css({ mb: '3', color: 'gray.700' })">
              ドキュメントやチュートリアルでVueのコードを見せたい時に最適です。
            </p>
            <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
              <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;!-- Vueのコードサンプルを表示 --&gt;
&lt;code v-pre&gt;
  &lt;template&gt;
    &lt;div&gt;{{ message }}&lt;/div&gt;
  &lt;/template&gt;
&lt;/code&gt;</code></pre>
            </div>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            2. ディレクティブの説明
          </h3>

          <div :class="css({ mb: '6' })">
            <p :class="css({ mb: '3', color: 'gray.700' })">
              v-modelやv-ifなどのディレクティブを説明する時に便利です。
            </p>
            <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
              <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;p v-pre&gt;
  v-modelは :value="{{ value }}" と @input を
  組み合わせた糖衣構文です
&lt;/p&gt;</code></pre>
            </div>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            3. 大量の静的コンテンツ
          </h3>

          <div>
            <p :class="css({ mb: '3', color: 'gray.700' })">
              Vueの構文を含まない大量の静的HTMLがある場合、v-preでスキップすることでパフォーマンスが向上します。
            </p>
            <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
              <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;div v-pre&gt;
  &lt;!-- 大量の静的HTML --&gt;
  &lt;p&gt;ページの説明文...&lt;/p&gt;
  &lt;ul&gt;
    &lt;li&gt;アイテム1&lt;/li&gt;
    &lt;li&gt;アイテム2&lt;/li&gt;
    &lt;!-- ... --&gt;
  &lt;/ul&gt;
&lt;/div&gt;</code></pre>
            </div>
          </div>
        </DesignSystemCard>

        <!-- v-preとv-onceの違い -->
        <DesignSystemCard title="🔄 v-preとv-onceの違い" color-scheme="purple">
          <div :class="css({ spaceY: '4' })">
            <div :class="css({ bg: 'purple.50', p: '4', rounded: 'md' })">
              <p :class="css({ fontWeight: 'semibold', color: 'purple.900', mb: '2' })">
                v-pre
              </p>
              <p :class="css({ color: 'purple.800', mb: '2' })">
                テンプレート構文を<strong>完全にスキップ</strong>します。コンパイル自体を行いません。
              </p>
              <p :class="css({ fontSize: 'sm', color: 'purple.700' })">
                使用例: コードサンプル表示、ドキュメント
              </p>
            </div>

            <div :class="css({ bg: 'purple.50', p: '4', rounded: 'md' })">
              <p :class="css({ fontWeight: 'semibold', color: 'purple.900', mb: '2' })">
                v-once
              </p>
              <p :class="css({ color: 'purple.800', mb: '2' })">
                <strong>初回のみ</strong>レンダリングし、その後の更新をスキップします。リアクティブな更新が不要な要素に使います。
              </p>
              <p :class="css({ fontSize: 'sm', color: 'purple.700' })">
                使用例: 変更されない静的コンテンツの最適化
              </p>
            </div>
          </div>
        </DesignSystemCard>

        <!-- インタラクティブデモ -->
        <DesignSystemCard title="🎮 インタラクティブデモ" color-scheme="blue">
          <p :class="css({ mb: '4', color: 'gray.700' })">
            実際に動作を試してみましょう！
          </p>

          <div :class="css({ bg: 'white', p: '6', rounded: 'lg', border: '1px solid', borderColor: 'gray.200' })">
            <DesignSystemInput
              v-model="demoMessage"
              label="メッセージを入力"
              type="text"
              helper-text="下の2つのボックスで表示の違いを確認できます"
              clearable
              @clear="demoMessage = ''"
            />

            <div :class="css({ mt: '6', display: 'grid', gap: '4', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' } })">
              <!-- v-preなし -->
              <div>
                <p :class="css({ fontSize: 'sm', fontWeight: 'semibold', mb: '2', color: 'red.700' })">
                  ❌ v-preなし
                </p>
                <div :class="css({ bg: 'red.50', p: '4', rounded: 'md', border: '2px solid', borderColor: 'red.200', minH: '20' })">
                  <p :class="css({ fontFamily: 'mono', fontSize: 'sm' })">
                    入力値: {{ demoMessage }}
                  </p>
                </div>
                <p :class="css({ mt: '2', fontSize: 'xs', color: 'gray.600' })">
                  → 変数が解釈されて値が表示されます
                </p>
              </div>

              <!-- v-preあり -->
              <div>
                <p :class="css({ fontSize: 'sm', fontWeight: 'semibold', mb: '2', color: 'green.700' })">
                  ✅ v-preあり
                </p>
                <div :class="css({ bg: 'green.50', p: '4', rounded: 'md', border: '2px solid', borderColor: 'green.200', minH: '20' })">
                  <p v-pre :class="css({ fontFamily: 'mono', fontSize: 'sm' })">
                    入力値: {{ demoMessage }}
                  </p>
                </div>
                <p :class="css({ mt: '2', fontSize: 'xs', color: 'gray.600' })">
                  → Mustache構文がそのまま表示されます
                </p>
              </div>
            </div>
          </div>
        </DesignSystemCard>

        <!-- まとめ -->
        <DesignSystemCard title="✅ まとめ" color-scheme="green">
          <div :class="css({ spaceY: '3' })">
            <div :class="css({ bg: 'green.50', p: '4', rounded: 'md' })">
              <p :class="css({ fontWeight: 'semibold', color: 'green.900', mb: '2' })">
                v-preを使うべき場面
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc', color: 'green.800' })">
                <li>Vueのコードサンプルを表示する時</li>
                <li>Mustache構文やディレクティブを文字列として見せたい時</li>
                <li>ドキュメントやチュートリアルページ</li>
                <li>大量の静的HTMLのパフォーマンス最適化</li>
              </ul>
            </div>

            <div :class="css({ bg: 'green.50', p: '4', rounded: 'md' })">
              <p :class="css({ fontWeight: 'semibold', color: 'green.900', mb: '2' })">
                使い方
              </p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '3', rounded: 'md' })">
                <code v-pre>&lt;div v-pre&gt;{{ これはそのまま表示されます }}&lt;/div&gt;</code>
              </div>
            </div>

            <div :class="css({ bg: 'green.50', p: '4', rounded: 'md' })">
              <p :class="css({ fontWeight: 'semibold', color: 'green.900', mb: '2' })">
                覚えておくポイント
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc', color: 'green.800' })">
                <li>v-pre内ではVueの構文は一切解釈されません</li>
                <li>v-onceとは違い、コンパイル自体がスキップされます</li>
                <li>パフォーマンス最適化にも使えます</li>
              </ul>
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

// デモ用の変数
const userName = ref('山田太郎')
const userEmail = ref('yamada@example.com')
const demoMessage = ref('こんにちは！')
</script>
