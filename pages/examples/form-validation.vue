<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">フォームバリデーション</h1>

      <!-- VeeValidate + Zod Example -->
      <div class="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">ユーザー登録フォーム</h2>

        <form @submit="onSubmit" class="space-y-4">
          <!-- 名前 -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">名前</label>
            <input
              v-model="name"
              type="text"
              id="name"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.name }"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
          </div>

          <!-- メールアドレス -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">メールアドレス</label>
            <input
              v-model="email"
              type="email"
              id="email"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.email }"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- パスワード -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">パスワード</label>
            <input
              v-model="password"
              type="password"
              id="password"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.password }"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- パスワード確認 -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">パスワード確認</label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.confirmPassword }"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-600">{{ errors.confirmPassword }}</p>
          </div>

          <!-- 利用規約 -->
          <div class="flex items-start">
            <input
              v-model="terms"
              type="checkbox"
              id="terms"
              class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="terms" class="ml-2 text-sm text-gray-700">
              利用規約に同意します
            </label>
          </div>
          <p v-if="errors.terms" class="mt-1 text-sm text-red-600">{{ errors.terms }}</p>

          <!-- 送信ボタン -->
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '送信中...' : '登録する' }}
          </button>
        </form>

        <!-- 送信結果 -->
        <div v-if="submitStatus" class="mt-4 p-4 rounded-md" :class="{
          'bg-green-50 text-green-800': submitStatus === 'success',
          'bg-red-50 text-red-800': submitStatus === 'error'
        }">
          <p v-if="submitStatus === 'success'">✓ 登録が完了しました！</p>
          <p v-if="submitStatus === 'error'">✗ エラーが発生しました。再度お試しください。</p>
        </div>
      </div>

      <!-- 戻るボタン -->
      <NuxtLink
        to="/"
        class="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
      >
        ← ホームに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { ref } from 'vue'

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

// フォーム設定
const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema,
})

// フィールド定義
const [name] = defineField('name')
const [email] = defineField('email')
const [password] = defineField('password')
const [confirmPassword] = defineField('confirmPassword')
const [terms] = defineField('terms')

// 送信状態
const submitStatus = ref<'success' | 'error' | null>(null)

// 送信処理
const onSubmit = handleSubmit(async (values: Record<string, any>) => {
  submitStatus.value = null

  try {
    // ここでAPIリクエストなどを行う
    await new Promise(resolve => setTimeout(resolve, 1000))

    console.log('フォーム送信:', values)
    submitStatus.value = 'success'

    // 成功後、フォームをリセット（オプション）
    // resetForm()
  } catch (error) {
    console.error('送信エラー:', error)
    submitStatus.value = 'error'
  }
})
</script>
