<template>
  <main :class="css({ bg: 'gray.50', minH: 'screen', py: { base: '10', md: '16' }, px: { base: '4', md: '8' } })">
    <div :class="css({ maxW: '6xl', mx: 'auto', display: 'flex', flexDirection: 'column', gap: { base: '8', md: '10' } })">
      <header :class="css({ display: 'flex', flexDirection: 'column', gap: '4', textAlign: { base: 'left', md: 'center' } })">
        <p :class="css({ fontSize: 'sm', fontWeight: 'semibold', color: 'blue.600', textTransform: 'uppercase', letterSpacing: 'wider' })">
          VeeValidate × Zod
        </p>
        <h1 :class="css({ fontSize: { base: '3xl', md: '4xl' }, fontWeight: 'bold', color: 'gray.900' })">
          Zod 同期・非同期バリデーション
        </h1>
        <p :class="css({ color: 'gray.600', maxW: '3xl', mx: { base: 0, md: 'auto' } })">
          Zodの
          <code :class="codeClass">refine</code>
          による非同期チェックと、フォーム全体の同期ルールを同時に扱うデモです。Design Systemの入力コンポーネントでアクセシブルに構築しています。
        </p>
        <div :class="css({ display: 'flex', flexWrap: 'wrap', gap: '3', justifyContent: { base: 'flex-start', md: 'center' } })">
          <span :class="badgeClass">Async refine</span>
          <span :class="badgeClass">Panda CSS layout</span>
          <span :class="badgeClass">Helper texts</span>
        </div>
      </header>

      <div :class="css({ display: 'grid', gap: { base: '6', lg: '8' }, gridTemplateColumns: { base: '1fr', lg: '3fr 2fr' } })">
        <DesignSystemCard title="ユーザー登録フォーム（非同期チェック付き）" icon="🧾" color-scheme="blue">
          <DesignSystemFormWithHook :form="form" :class="css({ display: 'flex', flexDirection: 'column', gap: '5' })" @submit="onSubmit">
            <DesignSystemInput
              v-model="username"
              label="ユーザー名（非同期チェック）"
              type="text"
              autocomplete="username"
              :error="errors.username"
              helper-text="APIモックで test / admin / user を弾きます"
              required
              clearable
              @clear="username = ''"
            />

            <DesignSystemInput
              v-model="email"
              label="メールアドレス（同期チェック）"
              type="email"
              autocomplete="email"
              :error="errors.email"
              helper-text="例: user@example.com"
              required
              clearable
              @clear="email = ''"
            />

            <DesignSystemInput
              v-model="ageInputValue"
              label="年齢（同期チェック）"
              type="number"
              input-mode="numeric"
              :error="errors.age"
              helper-text="18〜120 歳の範囲で入力"
              required
            />

            <DesignSystemInput
              v-model="password"
              label="パスワード（同期チェック）"
              type="password"
              autocomplete="new-password"
              :error="errors.password"
              helper-text="8文字以上・英数字混在"
              required
            />

            <DesignSystemButton
              type="submit"
              size="lg"
              :is-loading="isSubmitting"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? '検証中...' : '登録する' }}
            </DesignSystemButton>

            <DesignSystemInfoBox
              v-if="submitStatus"
              :variant="submitStatus === 'success' ? 'success' : 'warning'"
              :icon="submitStatus === 'success' ? '✅' : '⚠️'"
              left-border
            >
              <p v-if="submitStatus === 'success'">登録が完了しました！</p>
              <p v-else>バリデーションエラーが発生しました。</p>
            </DesignSystemInfoBox>
          </DesignSystemFormWithHook>

          <dl :class="css({ mt: '6', display: 'grid', gap: '4', gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' } })">
            <div :class="css({ bg: 'green.50', p: '4', rounded: 'md', border: '1px solid', borderColor: 'green.100' })">
              <dt :class="css({ fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wide', color: 'green.700', mb: '1' })">
                同期バリデーション
              </dt>
              <dd :class="css({ color: 'green.900', lineHeight: 'snug' })">
                メール/年齢/パスワードで<code :class="codeClass">z.string()</code>や<code :class="codeClass">z.coerce.number()</code>を活用。
              </dd>
            </div>
            <div :class="css({ bg: 'blue.50', p: '4', rounded: 'md', border: '1px solid', borderColor: 'blue.100' })">
              <dt :class="css({ fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wide', color: 'blue.700', mb: '1' })">
                非同期バリデーション
              </dt>
              <dd :class="css({ color: 'blue.900', lineHeight: 'snug' })">
                ユーザー名は<code :class="codeClass">refine(async)</code>で500msのAPIモックを実行。
              </dd>
            </div>
          </dl>
        </DesignSystemCard>

        <div :class="css({ display: 'flex', flexDirection: 'column', gap: '4' })">
            <DesignSystemInfoBox variant="success" icon="🔍" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">ルールの内訳</p>
              <ul :class="css({ pl: '5', listStyle: 'disc', spaceY: '2' })">
                <li>ユーザー名は重複チェック + 3文字以上でローディング状態を表示</li>
                <li>メール・年齢・パスワードは同期で即座にエラー表示</li>
                <li>DesignSystemInputのARIA対応でスクリーンリーダーも安心</li>
              </ul>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="info" icon="🛰️" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">非同期チェックの流れ</p>
              <ol :class="css({ pl: '5', listStyle: 'decimal', spaceY: '2' })">
                <li>入力値を<code :class="codeClass">handleSubmit</code>に渡す</li>
                <li>Zodの<code :class="codeClass">refine</code>で擬似APIをawait</li>
                <li>500ms待って禁止リスト（test / admin / user）を参照</li>
                <li>結果をVeeValidateのエラーとしてUIに伝達</li>
              </ol>
            </DesignSystemInfoBox>

            <DesignSystemInfoBox variant="warning" icon="🛠️" left-border>
              <p :class="css({ fontWeight: 'semibold', mb: '2' })">実践メモ</p>
              <div :class="css({ display: 'flex', flexDirection: 'column', gap: '3' })">
                <p>
                  <strong>スキーマ共通化:</strong>
                  実案件ではバックエンドと共有することで整合性を保てます。
                </p>
                <p>
                  <strong>UX配慮:</strong>
                  送信前でも非同期エラーを逐次表示し、無駄なAPI呼び出しを減らします。
                </p>
                <p>
                  <strong>テスト:</strong>
                  擬似APIのタイムアウトを調整してエラーハンドリングを確認しましょう。
                </p>
              </div>
            </DesignSystemInfoBox>
        </div>
      </div>

      <NuxtLink to="/" :class="css({ alignSelf: { base: 'stretch', md: 'flex-start' }, display: 'inline-flex' })">
        <DesignSystemButton variant="secondary">
          ← ホームに戻る
        </DesignSystemButton>
      </NuxtLink>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { css } from '~/styled-system/css'
import DesignSystemFormWithHook from '~/components/design-system/FormWithHook'

// ユーザー名の重複チェックをシミュレート（非同期）
const checkUsernameAvailability = async (username: string): Promise<boolean> => {
  // 実際のAPIリクエストをシミュレート
  await new Promise(resolve => setTimeout(resolve, 500))

  // 予約済みユーザー名リスト
  const reservedUsernames = ['test', 'admin', 'user']
  return !reservedUsernames.includes(username.toLowerCase())
}

// Zodスキーマ定義（同期 + 非同期）
const validationSchema = toTypedSchema(
  z.object({
    // ユーザー名 - 非同期バリデーション
    username: z.string()
      .min(1, 'ユーザー名を入力してください')
      .min(3, 'ユーザー名は3文字以上で入力してください')
      .refine(
        async (value) => {
          return await checkUsernameAvailability(value)
        },
        {
          message: 'このユーザー名は既に使用されています',
        }
      ),

    // メールアドレス - 同期バリデーション
    email: z.string()
      .min(1, 'メールアドレスを入力してください')
      .email('有効なメールアドレスを入力してください'),

    // 年齢 - 同期バリデーション
    age: z.coerce.number({
      required_error: '年齢を入力してください',
      invalid_type_error: '数値を入力してください',
    })
      .min(18, '18歳以上である必要があります')
      .max(120, '有効な年齢を入力してください'),

    // パスワード - 同期バリデーション
    password: z.string()
      .min(1, 'パスワードを入力してください')
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(/[A-Za-z]/, 'パスワードには英字を含めてください')
      .regex(/[0-9]/, 'パスワードには数字を含めてください'),
  })
)

// 見出しやインラインコード用のスタイル
const badgeClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1',
  px: '3',
  py: '1',
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: 'wider',
  borderRadius: 'full',
  border: '1px solid',
  borderColor: 'gray.200',
  color: 'gray.700',
  bg: 'white',
})

const codeClass = css({
  fontFamily: 'mono',
  fontSize: 'sm',
  bg: 'gray.100',
  px: '2',
  py: '1',
  rounded: 'sm',
})

// フォーム設定
const form = useForm({
  validationSchema,
})
const { errors, defineField, isSubmitting } = form

// フィールド定義
const [username] = defineField('username')
const [email] = defineField('email')
const [age] = defineField('age')
const [password] = defineField('password')

const ageInputValue = computed({
  get: () => (Number.isNaN(age.value) ? '' : String(age.value ?? '')),
  set: (value: string) => {
    age.value = value === '' ? Number.NaN : Number(value)
  },
})

// 送信状態
const submitStatus = ref<'success' | 'error' | null>(null)

// 送信処理
const onSubmit = async (values: Record<string, unknown>) => {
  submitStatus.value = null

  try {
    // ここでAPIリクエストなどを行う
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('フォーム送信:', values)
    submitStatus.value = 'success'
  } catch (error) {
    console.error('送信エラー:', error)
    submitStatus.value = 'error'
  }
}
</script>
