# Vue 3 / Nuxt 3 ベストプラクティス

## `<script setup>` の使い方

Vue 3とNuxt 3では、`<script setup>`構文が推奨されています。

### 従来の書き方 vs `<script setup>`

#### 従来の書き方（Options API / Composition API with setup()）

```vue
<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(0)
    const increment = () => {
      count.value++
    }

    // return で明示的にテンプレートに公開
    return {
      count,
      increment
    }
  }
})
</script>
```

#### `<script setup>` の書き方（推奨）

```vue
<script setup lang="ts">
import { ref } from 'vue'

const count = ref(0)
const increment = () => {
  count.value++
}

// return不要！自動的にテンプレートに公開される
</script>
```

### `<script setup>` のメリット

1. **簡潔なコード**: `return`やdefineComponentが不要
2. **自動公開**: トップレベルの変数・関数が自動的にテンプレートで使える
3. **TypeScript連携**: 型推論がより効果的
4. **パフォーマンス**: コンパイル時に最適化される

## Composition API の基本パターン

### リアクティブな状態管理

```vue
<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

// ref: プリミティブな値
const count = ref(0)
const message = ref('Hello')

// reactive: オブジェクト
const state = reactive({
  name: 'Taro',
  age: 25
})

// computed: 算出プロパティ
const doubleCount = computed(() => count.value * 2)
</script>
```

### Props と Emits

```vue
<script setup lang="ts">
// Props定義
const props = defineProps<{
  title: string
  count?: number
}>()

// Emits定義
const emit = defineEmits<{
  update: [value: number]
  delete: []
}>()

// 使用例
const handleClick = () => {
  emit('update', props.count ?? 0 + 1)
}
</script>
```

### ライフサイクルフック

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('コンポーネントがマウントされました')
})

onUnmounted(() => {
  console.log('コンポーネントがアンマウントされました')
})
</script>
```

## Nuxt 3 特有の機能

### Auto Imports

Nuxt 3では、主要な関数は自動インポートされます。

```vue
<script setup lang="ts">
// これらは明示的にimportしなくてもOK
const count = ref(0)          // Vue ref
const route = useRoute()       // Vue Router
const router = useRouter()     // Vue Router
const config = useRuntimeConfig() // Nuxt
</script>
```

### データフェッチング

```vue
<script setup lang="ts">
// useFetch - サーバーサイドとクライアントサイド両方で動作
const { data, pending, error } = await useFetch('/api/users')

// useAsyncData - カスタムフェッチロジック
const { data: posts } = await useAsyncData('posts', () =>
  $fetch('/api/posts')
)
</script>
```

## コンポーネント設計のベストプラクティス

### 1. 単一責任の原則

各コンポーネントは1つの責任だけを持つ

```vue
<!-- ❌ 悪い例: 複数の責任 -->
<UserProfileWithPostsAndComments />

<!-- ✅ 良い例: 責任を分離 -->
<UserProfile />
<UserPosts />
<UserComments />
```

### 2. Props は読み取り専用

```vue
<script setup lang="ts">
const props = defineProps<{ count: number }>()

// ❌ 悪い例: propsを直接変更
// props.count++

// ✅ 良い例: イベントで親に通知
const emit = defineEmits<{ increment: [] }>()
const handleIncrement = () => emit('increment')
</script>
```

### 3. Composables で再利用可能なロジックを作成

```typescript
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count: readonly(count),
    increment,
    decrement,
    reset
  }
}
```

```vue
<script setup lang="ts">
const { count, increment } = useCounter(10)
</script>
```

## フォームバリデーション

### VeeValidate + Zod の使用例

```vue
<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// Zodスキーマ定義
const validationSchema = toTypedSchema(
  z.object({
    email: z.string().email('有効なメールアドレスを入力してください'),
    password: z.string().min(8, 'パスワードは8文字以上で入力してください'),
  })
)

// フォーム設定
const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
})

const [email] = defineField('email')
const [password] = defineField('password')

const onSubmit = handleSubmit((values) => {
  console.log('送信:', values)
})
</script>

<template>
  <form @submit="onSubmit">
    <input v-model="email" type="email" />
    <p v-if="errors.email">{{ errors.email }}</p>

    <input v-model="password" type="password" />
    <p v-if="errors.password">{{ errors.password }}</p>

    <button type="submit">送信</button>
  </form>
</template>
```

## 状態管理（Pinia）

### Store の定義

```typescript
// stores/user.ts
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  // State
  const name = ref('')
  const email = ref('')

  // Getters
  const displayName = computed(() => name.value || 'ゲスト')

  // Actions
  function setUser(newName: string, newEmail: string) {
    name.value = newName
    email.value = newEmail
  }

  return {
    name,
    email,
    displayName,
    setUser
  }
})
```

### Store の使用

```vue
<script setup lang="ts">
const userStore = useUserStore()

userStore.setUser('太郎', 'taro@example.com')
</script>

<template>
  <div>{{ userStore.displayName }}</div>
</template>
```

## TypeScript の型定義

### Props の型定義

```vue
<script setup lang="ts">
interface User {
  id: number
  name: string
  email: string
}

const props = defineProps<{
  user: User
  isActive?: boolean
}>()
</script>
```

### Emit の型定義

```vue
<script setup lang="ts">
interface UpdatePayload {
  id: number
  value: string
}

const emit = defineEmits<{
  update: [payload: UpdatePayload]
  delete: [id: number]
  close: []
}>()
</script>
```

## パフォーマンス最適化

### 1. `v-memo` で再レンダリングを制御

```vue
<template>
  <div v-memo="[count]">
    <!-- countが変わった時だけ再レンダリング -->
    <p>Count: {{ count }}</p>
  </div>
</template>
```

### 2. `computed` を活用

```vue
<script setup lang="ts">
// ❌ 悪い例: 毎回計算される
const getFilteredItems = () => {
  return items.value.filter(item => item.active)
}

// ✅ 良い例: キャッシュされる
const filteredItems = computed(() => {
  return items.value.filter(item => item.active)
})
</script>
```

### 3. 大きなリストは仮想スクロールを使用

```vue
<script setup lang="ts">
// @nuxtjs/virtual-scroller などを使用
</script>
```

## まとめ

- **`<script setup>`** を使用して簡潔なコードを書く
- **Composition API** で再利用可能なロジックを作成
- **Props/Emits** で親子間のデータフローを明確に
- **Composables** でロジックを分離
- **TypeScript** で型安全性を確保
- **Pinia** で状態管理
- **パフォーマンス最適化** を意識
