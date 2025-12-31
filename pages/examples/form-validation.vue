<template>
  <div>
    <AppHeader />

    <div :class="css({ minH: 'screen', bg: 'gray.50', py: '12', px: '4' })">
      <div :class="css({ maxW: '2xl', mx: 'auto' })">
        <h1 :class="css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900', mb: '8' })">
          フォームバリデーション
        </h1>

        <!-- ユーザー登録フォーム -->
        <DesignSystemCard title="ユーザー登録フォーム" icon="📝" color-scheme="blue">
          <DesignSystemForm
            :validation-schema="validationSchema"
            @submit="handleFormSubmit"
          >
            <template #default="{ errors, isSubmitting, defineField }">
              <!-- 名前 -->
              <DesignSystemInput
                v-model="defineField('name')[0].value"
                label="名前"
                type="text"
                :error="errors.name"
                helper-text="2文字以上で入力してください"
                required
                clearable
                @clear="defineField('name')[0].value = ''"
              />

              <!-- メールアドレス -->
              <DesignSystemInput
                v-model="defineField('email')[0].value"
                label="メールアドレス"
                type="email"
                :error="errors.email"
                helper-text="例: user@example.com"
                required
                clearable
                @clear="defineField('email')[0].value = ''"
              />

              <!-- パスワード -->
              <DesignSystemInput
                v-model="defineField('password')[0].value"
                label="パスワード"
                type="password"
                :error="errors.password"
                helper-text="8文字以上、英字と数字を含む"
                required
              />

              <!-- パスワード確認 -->
              <DesignSystemInput
                v-model="defineField('confirmPassword')[0].value"
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
                v-model="defineField('terms')[0].value"
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
            </template>
          </DesignSystemForm>

          <!-- 送信結果 -->
          <div
            v-if="submitStatus"
            :class="css({
              mt: '4',
              p: '4',
              rounded: 'md',
              bg: submitStatus === 'success' ? 'green.50' : 'red.50',
              color: submitStatus === 'success' ? 'green.800' : 'red.800',
            })"
          >
            <p v-if="submitStatus === 'success'">✓ 登録が完了しました！</p>
            <p v-if="submitStatus === 'error'">✗ エラーが発生しました。再度お試しください。</p>
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
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

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

// 追加フィールド（バリデーション不要）
const gender = ref('male')
const newsletter = ref(false)

// 送信状態
const submitStatus = ref<'success' | 'error' | null>(null)

// 送信処理
const handleFormSubmit = async (values: Record<string, unknown>) => {
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
