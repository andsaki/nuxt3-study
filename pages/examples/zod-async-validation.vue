<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Zod 同期・非同期バリデーション</h1>

      <div class="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 class="text-xl font-semibold text-blue-600 mb-4">ユーザー登録フォーム（非同期チェック付き）</h2>

        <form class="space-y-4" @submit="onSubmit">
          <!-- ユーザー名 -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-1">
              ユーザー名（非同期チェック）
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.username }"
            >
            <p v-if="errors.username" class="mt-1 text-sm text-red-600">{{ errors.username }}</p>
            <p class="mt-1 text-xs text-gray-500">※APIで重複チェックします（test, admin, userは使用不可）</p>
          </div>

          <!-- メールアドレス -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              メールアドレス（同期チェック）
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.email }"
            >
            <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
          </div>

          <!-- 年齢 -->
          <div>
            <label for="age" class="block text-sm font-medium text-gray-700 mb-1">
              年齢（同期チェック）
            </label>
            <input
              id="age"
              v-model.number="age"
              type="number"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.age }"
            >
            <p v-if="errors.age" class="mt-1 text-sm text-red-600">{{ errors.age }}</p>
          </div>

          <!-- パスワード -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">
              パスワード（同期チェック）
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              :class="{ 'border-red-500': errors.password }"
            >
            <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
          </div>

          <!-- 送信ボタン -->
          <button
            type="submit"
            class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? '検証中...' : '登録する' }}
          </button>
        </form>

        <!-- 送信結果 -->
        <div
v-if="submitStatus" class="mt-4 p-4 rounded-md" :class="{
          'bg-green-50 text-green-800': submitStatus === 'success',
          'bg-red-50 text-red-800': submitStatus === 'error'
        }">
          <p v-if="submitStatus === 'success'">✓ 登録が完了しました！</p>
          <p v-if="submitStatus === 'error'">✗ バリデーションエラーが発生しました。</p>
        </div>
      </div>

      <!-- 説明 -->
      <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
        <h3 class="font-semibold mb-2">Zodの同期・非同期バリデーション</h3>
        <ul class="list-disc list-inside space-y-1 text-sm">
          <li><strong>同期バリデーション:</strong> z.string(), .email(), .min(), .max(), .regex()など</li>
          <li><strong>非同期バリデーション:</strong> .refine()の第一引数にasync関数を渡す</li>
          <li>ユーザー名フィールドは非同期でAPIチェックをシミュレート</li>
          <li>その他のフィールドは同期的にバリデーション</li>
        </ul>
      </div>

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
    age: z.number({
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

// フォーム設定
const { errors, defineField, handleSubmit, isSubmitting } = useForm({
  validationSchema,
})

// フィールド定義
const [username] = defineField('username')
const [email] = defineField('email')
const [age] = defineField('age')
const [password] = defineField('password')

// 送信状態
const submitStatus = ref<'success' | 'error' | null>(null)

// 送信処理
const onSubmit = handleSubmit(async (values) => {
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
})
</script>
