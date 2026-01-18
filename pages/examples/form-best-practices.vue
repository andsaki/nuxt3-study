<template>
  <div>
    <div :class="css({ minH: 'screen', bg: 'gray.50', py: '12', px: '4' })">
      <div :class="css({ maxW: '4xl', mx: 'auto', display: 'flex', flexDirection: 'column', gap: { base: '6', md: '8' } })">
        <h1 :class="css({ fontSize: '4xl', fontWeight: 'bold', color: 'gray.900', mb: '4' })">
          フォームバリデーション ベストプラクティス
        </h1>
        <p :class="css({ fontSize: 'lg', color: 'gray.600', mb: '8' })">
          Vueアプリケーションでのフォームバリデーションの実装方法とベストプラクティス
        </p>

        <!-- novalidate属性 -->
        <DesignSystemCard title="📋 novalidate属性とは？" color-scheme="blue">
          <p :class="css({ mb: '4' })">
            <code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm' })">novalidate</code>
            は、<strong>ブラウザのデフォルトバリデーション機能を無効化</strong>するHTML5のフォーム属性です。
          </p>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            なぜ使うのか？
          </h3>

          <div :class="css({ spaceY: '4', mb: '6' })">
            <DesignSystemInfoBox variant="info" icon="🛠️" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                1. カスタムバリデーションを使用するため
              </p>
              <p>
                VeeValidate + Zod で独自のバリデーションを実装している場合、ブラウザの標準バリデーションと競合しないようにする必要があります。
              </p>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="⚠️" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                2. ブラウザのデフォルトバリデーションの問題点
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
                <li>エラーメッセージのスタイルを変更できない</li>
                <li>多言語対応が困難</li>
                <li>ツールチップ表示でアクセシビリティが低い</li>
                <li>デザインの統一が難しい</li>
              </ul>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="🎨" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                3. 一貫したUXを実現
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
                <li>すべてのエラーメッセージを統一したデザインで表示</li>
                <li>エラーメッセージの文言を自由にカスタマイズ</li>
                <li>アクセシビリティ対応のエラー表示を実装</li>
              </ul>
            </DesignSystemInfoBox>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            比較例
          </h3>

          <div :class="css({ display: 'grid', gap: '4', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' } })">
            <!-- novalidateなし -->
            <div>
              <p :class="css({ fontWeight: 'semibold', mb: '2', color: 'red.600' })">❌ novalidateなし</p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;form @submit="onSubmit"&gt;
  &lt;input type="email" required /&gt;
  &lt;button type="submit"&gt;送信&lt;/button&gt;
&lt;/form&gt;

&lt;!--
  空のまま送信すると、ブラウザが
  「このフィールドを入力してください」
  というツールチップを表示（変更不可）
--&gt;</code></pre>
              </div>
            </div>

            <!-- novalidateあり -->
            <div>
              <p :class="css({ fontWeight: 'semibold', mb: '2', color: 'green.600' })">✅ novalidateあり</p>
              <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '4', rounded: 'lg', overflow: 'auto' })">
                <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;form novalidate @submit="onSubmit"&gt;
  &lt;input type="email" v-model="email" /&gt;
  &lt;p v-if="errors.email"&gt;
    {{ errors.email }}
  &lt;/p&gt;
  &lt;button type="submit"&gt;送信&lt;/button&gt;
&lt;/form&gt;

&lt;!--
  ブラウザの標準バリデーションは動かず、
  VeeValidateのエラーメッセージのみ表示
--&gt;</code></pre>
              </div>
            </div>
          </div>
        </DesignSystemCard>

        <!-- VeeValidate + Zod -->
        <DesignSystemCard title="🔧 VeeValidate + Zodの組み合わせ" color-scheme="green">
          <p :class="css({ mb: '4' })">
            このプロジェクトでは、<strong>VeeValidate</strong>（フォーム管理）と<strong>Zod</strong>（スキーマバリデーション）を組み合わせて使用しています。
          </p>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            それぞれの役割
          </h3>

          <div :class="css({ spaceY: '3', mb: '6' })">
            <DesignSystemInfoBox variant="success" icon="✅" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                VeeValidate
              </p>
              <p>
                Vue.js向けのフォームバリデーションライブラリ。フォームの状態管理、エラー表示、送信処理などを簡単に実装できる。
              </p>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="success" icon="📏" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                Zod
              </p>
              <p>
                TypeScript優先のスキーマバリデーションライブラリ。型安全なバリデーションルールを定義でき、TypeScriptの型推論も活用できる。
              </p>
            </DesignSystemInfoBox>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            実装例
          </h3>

          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', mb: '4', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code v-pre>import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// 1. Zodスキーマを定義
const validationSchema = toTypedSchema(
  z.object({
    email: z.string()
      .min(1, 'メールアドレスを入力してください')
      .email('有効なメールアドレスを入力してください'),
    password: z.string()
      .min(1, 'パスワードを入力してください')
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(/[A-Za-z]/, 'パスワードには英字を含めてください')
      .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  })
)

// 2. VeeValidateのuseFormで使用
const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
})

// 3. フィールドを定義
const [email] = defineField('email')
const [password] = defineField('password')

// 4. 送信処理
const onSubmit = handleSubmit((values) => {
  console.log('送信:', values)
})</code></pre>
          </div>

          <DesignSystemInfoBox variant="success" icon="✨" left-border>
            <p :class="css({ fontWeight: 'semibold', mb: '2' })">メリット</p>
            <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
              <li>型安全なバリデーション（TypeScriptの恩恵）</li>
              <li>再利用可能なスキーマ定義</li>
              <li>複雑なバリデーションルールも簡潔に記述</li>
              <li>エラーメッセージのカスタマイズが容易</li>
            </ul>
          </DesignSystemInfoBox>
        </DesignSystemCard>

        <!-- エラー表示のアクセシビリティ -->
        <DesignSystemCard title="♿ エラー表示のアクセシビリティ" color-scheme="yellow">
          <p :class="css({ mb: '4' })">
            フォームバリデーションでは、<strong>すべてのユーザーがエラーを認識できる</strong>ようにすることが重要です。
          </p>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            WCAGガイドライン
          </h3>

          <div :class="css({ spaceY: '3', mb: '6' })">
            <DesignSystemInfoBox variant="warning" icon="👁️" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                1. エラーの視覚的な識別（WCAG 3.3.1 - Level A）
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
                <li>エラーがあるフィールドを赤い枠線で強調</li>
                <li>エラーメッセージを赤い文字で表示</li>
                <li>エラーアイコン（✗）を表示</li>
              </ul>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="warning" icon="🔖" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                2. aria属性の使用
              </p>
              <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
                <li><code>aria-invalid="true"</code> - フィールドにエラーがあることを示す</li>
                <li><code>aria-describedby</code> - エラーメッセージとフィールドを関連付け</li>
                <li><code>role="alert"</code> - エラーメッセージをスクリーンリーダーに即座に通知</li>
              </ul>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="warning" icon="🎯" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                3. 色だけに依存しない（WCAG 1.4.1 - Level A）
              </p>
              <p>
                色覚異常のユーザーのため、色だけでなくアイコンやテキストでもエラーを伝える。
              </p>
            </DesignSystemInfoBox>
          </div>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            実装例
          </h3>

          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;!-- アクセシブルなエラー表示 --&gt;
&lt;div&gt;
  &lt;label :for="inputId"&gt;メールアドレス&lt;/label&gt;

  &lt;input
    :id="inputId"
    type="email"
    v-model="email"
    :aria-invalid="!!error"
    :aria-describedby="error ? errorId : undefined"
  /&gt;

  &lt;p
    v-if="error"
    :id="errorId"
    role="alert"
    :class="css({ color: 'red.600', fontSize: 'sm', mt: '1' })"
  &gt;
    ✗ {{ error }}
  &lt;/p&gt;
&lt;/div&gt;</code></pre>
          </div>
        </DesignSystemCard>

        <!-- Formコンポーネントの使い方 -->
        <DesignSystemCard title="🎯 Formコンポーネントの使い方">
          <p :class="css({ mb: '4' })">
            このプロジェクトでは、<code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm' })">DesignSystemForm</code>
            コンポーネントを使用してフォームを簡単に実装できます。
          </p>

          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '3', color: 'gray.900' })">
            基本的な使い方
          </h3>

          <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', mb: '4', overflow: 'auto' })">
            <pre :class="css({ fontSize: 'sm' })"><code v-pre>&lt;template&gt;
  &lt;DesignSystemForm
    :validation-schema="validationSchema"
    @submit="handleFormSubmit"
  &gt;
    &lt;template #default="{ errors, isSubmitting, defineField }"&gt;
      &lt;!-- フィールドを配置 --&gt;
      &lt;DesignSystemInput
        v-model="defineField('email')[0].value"
        label="メールアドレス"
        type="email"
        :error="errors.email"
      /&gt;

      &lt;DesignSystemButton
        type="submit"
        :disabled="isSubmitting"
      &gt;
        {{ isSubmitting ? '送信中...' : '送信' }}
      &lt;/DesignSystemButton&gt;
    &lt;/template&gt;
  &lt;/DesignSystemForm&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email('有効なメールアドレスを入力してください'),
  })
)

const handleFormSubmit = async (values: Record&lt;string, unknown&gt;) => {
  console.log('送信:', values)
}
&lt;/script&gt;</code></pre>
          </div>

          <DesignSystemInfoBox variant="info" icon="🧩" left-border>
            <p :class="css({ fontWeight: 'semibold', mb: '2' })">
              Formコンポーネントが提供するもの
            </p>
            <ul :class="css({ pl: '6', spaceY: '1', listStyleType: 'disc' })">
              <li><code>errors</code> - 各フィールドのエラーメッセージ</li>
              <li><code>isSubmitting</code> - 送信中かどうかの状態</li>
              <li><code>defineField</code> - フィールドをVeeValidateに登録する関数</li>
              <li><code>novalidate</code> - ブラウザのデフォルトバリデーションを無効化（自動）</li>
              <li>送信処理のハンドリング（自動）</li>
            </ul>
          </DesignSystemInfoBox>
        </DesignSystemCard>

        <!-- ベストプラクティスまとめ -->
        <DesignSystemCard title="✅ ベストプラクティスまとめ" color-scheme="blue">
          <div :class="css({ spaceY: '3' })">
            <DesignSystemInfoBox variant="info" icon="1️⃣" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                常に novalidate を使用
              </p>
              <p>
                ブラウザの標準バリデーションを無効化し、カスタムバリデーションで統一されたUXを提供する。
              </p>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="2️⃣" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                VeeValidate + Zod で型安全に
              </p>
              <p>
                スキーマベースのバリデーションで、型安全性と保守性を確保する。
              </p>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="3️⃣" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                アクセシビリティを考慮
              </p>
              <p>
                aria属性を使用し、すべてのユーザーがエラーを認識できるようにする。色だけに依存しない。
              </p>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="4️⃣" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                デザインシステムコンポーネントを活用
              </p>
              <p>
                DesignSystemFormやDesignSystemInputなど、既存のコンポーネントを使って一貫性のあるUIを構築する。
              </p>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="5️⃣" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">
                エラーメッセージは具体的に
              </p>
              <p>
                「入力してください」だけでなく、「メールアドレスを入力してください」のように、何を入力すべきか明確にする。
              </p>
            </DesignSystemInfoBox>
          </div>
        </DesignSystemCard>

        <!-- 戻るボタン -->
        <NuxtLink to="/" :class="css({ display: 'inline-block', mt: '8' })">
          <DesignSystemButton variant="secondary">
            ← ホームに戻る
          </DesignSystemButton>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
</script>
