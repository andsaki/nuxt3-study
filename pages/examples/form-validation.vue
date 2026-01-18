<template>
  <div>
    <div :class="css({ minH: 'screen', bg: 'gray.50', py: '12', px: '4' })">
      <div :class="css({ maxW: '2xl', mx: 'auto', spaceY: '6' })">
        <h1 :class="css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900', mb: '8' })">
          フォームバリデーション
        </h1>
        <DesignSystemInfoBox variant="info" icon="🛠️" left-border>
          <p>
            VeeValidate + Zod + DesignSystemInput を組み合わせた基本のユーザー登録フォームです。
            ブラウザ標準バリデーションを無効化し、完全にカスタムエクスペリエンスで統一しています。
          </p>
        </DesignSystemInfoBox>

        <!-- ユーザー登録フォーム -->
        <DesignSystemCard title="ユーザー登録フォーム" icon="📝" color-scheme="blue">
          <DesignSystemFormWithHook :form="form" :class="css({ w: 'full' })" @submit="onSubmit">
            <div :class="css({ spaceY: '4' })">
              <!-- 名前 -->
              <DesignSystemInput
                v-model="name"
                label="名前"
                type="text"
                :error="errors.name"
                helper-text="2文字以上で入力してください"
                required
                clearable
                @clear="name = ''"
              />

              <!-- メールアドレス -->
              <DesignSystemInput
                v-model="email"
                label="メールアドレス"
                type="email"
                :error="errors.email"
                helper-text="例: user@example.com"
                required
                clearable
                @clear="email = ''"
              />

              <!-- パスワード -->
              <DesignSystemInput
                v-model="password"
                label="パスワード"
                type="password"
                :error="errors.password"
                helper-text="8文字以上、英字と数字を含む"
                required
              />

              <!-- パスワード確認 -->
              <DesignSystemInput
                v-model="confirmPassword"
                label="パスワード確認"
                type="password"
                :error="errors.confirmPassword"
                required
              />

              <!-- 性別 -->
              <div>
                <p :class="css({ fontSize: 'sm', fontWeight: 'medium', color: 'contents.primary', mb: '2' })">
                  性別
                </p>
                <div :class="css({ spaceY: '2' })">
                  <DesignSystemRadio
                    v-model="gender"
                    value="male"
                    label="男性"
                    name="gender"
                  />
                  <DesignSystemRadio
                    v-model="gender"
                    value="female"
                    label="女性"
                    name="gender"
                  />
                  <DesignSystemRadio
                    v-model="gender"
                    value="other"
                    label="その他"
                    name="gender"
                  />
                </div>
              </div>

              <!-- 利用規約 -->
              <DesignSystemCheckbox
                v-model="terms"
                label="利用規約に同意します"
                :error="errors.terms"
              />

              <!-- ニュースレター購読 -->
              <DesignSystemCheckbox
                v-model="newsletter"
                label="ニュースレターを受け取る"
                help-text="最新情報をメールでお届けします"
              />

              <!-- 送信ボタン -->
              <DesignSystemButton
                type="submit"
                variant="primary"
                size="lg"
                :disabled="isSubmitting"
                :class="css({ width: '100%' })"
              >
                {{ isSubmitting ? '送信中...' : '登録する' }}
              </DesignSystemButton>
            </div>
          </DesignSystemFormWithHook>

          <!-- 送信結果 -->
          <DesignSystemInfoBox
            v-if="submitStatus"
            :variant="submitStatus === 'success' ? 'success' : 'warning'"
            :icon="submitStatus === 'success' ? '✅' : '⚠️'"
            left-border
          >
            <p v-if="submitStatus === 'success'">登録が完了しました！</p>
            <p v-else>エラーが発生しました。再度お試しください。</p>
          </DesignSystemInfoBox>
        </DesignSystemCard>

        <!-- 戻るボタン -->
        <NuxtLink to="/" :class="css({ display: 'inline-block', mt: '4' })">
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
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { DesignSystemFormWithHook } from '~/components/design-system'

// Zodスキーマ定義
const validationSchema = toTypedSchema(
  z.object({
    name: z.string()
      .min(1, '名前を入力してください')
      .min(2, '名前は2文字以上で入力してください'),
    email: z.string()
      .min(1, 'メールアドレスを入力してください')
      .email('有効なメールアドレスを入力してください'),
    password: z.string()
      .min(1, 'パスワードを入力してください')
      .min(8, 'パスワードは8文字以上で入力してください')
      .regex(/[A-Za-z]/, 'パスワードには英字を含めてください')
      .regex(/[0-9]/, 'パスワードには数字を含めてください'),
    confirmPassword: z.string()
      .min(1, 'パスワード確認を入力してください'),
    terms: z.boolean()
      .refine((val: boolean) => val === true, '利用規約に同意してください'),
  }).refine((data: { password: string; confirmPassword: string }) => data.password === data.confirmPassword, {
    message: 'パスワードが一致しません',
    path: ['confirmPassword'],
  })
)

// VeeValidateのuseFormでフォーム管理
const form = useForm({
  validationSchema,
})
const { errors, defineField, isSubmitting } = form

// フィールド定義（型安全）
const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')
const [terms] = defineField('terms')

// 追加フィールド（バリデーション不要）
const gender = ref('male')
const newsletter = ref(false)

// 送信状態
const submitStatus = ref<'success' | 'error' | null>(null)

// 送信処理
const onSubmit = async (values: Record<string, unknown>) => {
  submitStatus.value = null

  try {
    // ここでAPIリクエストなどを行う
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('フォーム送信:', {
      ...values,
      gender: gender.value,
      newsletter: newsletter.value,
    })
    submitStatus.value = 'success'
  } catch (error) {
    console.error('送信エラー:', error)
    submitStatus.value = 'error'
  }
}
</script>
