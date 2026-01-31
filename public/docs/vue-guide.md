# Vue 3 開発ガイド

## React との対応関係

### イベントハンドリング

#### `@input` vs `onChange`

Vue の `@input` は、React の `onChange` とほぼ同じ動作をします。

```jsx
// React
<input
  onChange={(e) => handleChange(e.target.value)}
  value={searchQuery}
/>
```

```vue
<!-- Vue -->
<input
  @input="(e) => handleChange((e.target as HTMLInputElement).value)"
  :value="searchQuery"
/>
```

どちらも**ユーザーが入力するたびにリアルタイムで発火**します。

#### `@click` vs `onClick`

Vue の `@click` は、React の `onClick` とほぼ同じ動作をします。

```jsx
// React
<button onClick={(e) => handleClick(e)}>
  クリック
</button>
```

```vue
<!-- Vue -->
<button @click="(e) => handleClick(e)">
  クリック
</button>
```

#### イベント修飾子

Vue には便利な**イベント修飾子**があり、よくある処理を簡潔に書けます：

```vue
<!-- preventDefault -->
<form @submit.prevent="handleSubmit">

<!-- stopPropagation -->
<div @click.stop="handleClick">

<!-- 組み合わせ可能 -->
<a @click.prevent.stop="handleClick">

<!-- Enterキーのみ -->
<input @keyup.enter="handleSubmit">

<!-- 1回だけ実行 -->
<button @click.once="handleClick">
```

React で書くと：

```jsx
// preventDefault
<form onSubmit={(e) => {
  e.preventDefault()
  handleSubmit()
}}>

// stopPropagation
<div onClick={(e) => {
  e.stopPropagation()
  handleClick()
}}>
```

**主な修飾子:**
- `.prevent` - `event.preventDefault()`
- `.stop` - `event.stopPropagation()`
- `.once` - 1回だけ実行
- `.capture` - キャプチャモードで実行
- `.self` - イベントターゲットが要素自身の時のみ実行
- `.passive` - パッシブリスナー（スクロール性能向上）

**キーボード修飾子:**
- `.enter`, `.tab`, `.delete`, `.esc`, `.space`
- `.up`, `.down`, `.left`, `.right`
- `.ctrl`, `.alt`, `.shift`, `.meta`

```vue
<!-- Ctrl + Enter で送信 -->
<textarea @keyup.ctrl.enter="handleSubmit">

<!-- ESC でモーダルを閉じる -->
<div @keyup.esc="closeModal">
```

#### `@input` vs `@change` と React の対応

Vue には2つのイベントがあります：

- **`@input`** - リアルタイムで発火（文字を入力するたび）→ React の `onChange`
- **`@change`** - 確定時に発火（フォーカスが外れた時やEnterキーを押した時）→ React の `onBlur` に近い

```vue
<!-- Vue: リアルタイム検索 -->
<input @input="handleSearch" />

<!-- Vue: 確定時のみ実行 -->
<input @change="handleSubmit" />
```

```jsx
// React: リアルタイム
<input onChange={(e) => handleSearch(e.target.value)} />

// React: フォーカスが外れた時
<input onBlur={(e) => handleSubmit(e.target.value)} />
```

**違いの詳細:**

| イベント | 発火タイミング | React の対応 |
|---------|--------------|-------------|
| `@input` | 文字を入力するたび | `onChange` |
| `@change` | フォーカスが外れた時、Enterキー | `onBlur` に近い（厳密には異なる） |

```vue
<!-- 実用例 -->
<script setup lang="ts">
const name = ref('')
const submitted = ref('')

// リアルタイムでバリデーション
const handleInput = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  console.log('入力中:', value)
}

// 確定時に保存
const handleChange = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  submitted.value = value
  console.log('確定:', value)
}
</script>

<template>
  <input
    v-model="name"
    @input="handleInput"
    @change="handleChange"
  />
</template>
```

#### v-model（Vue らしい書き方）

Vue では `v-model` を使うともっとシンプルに書けます：

```vue
<script setup lang="ts">
const searchQuery = ref('')

// デバウンス処理
const handleDebouncedSearch = useDebounceFn((value: string) => {
  console.log('検索:', value)
}, 300)

// searchQuery の変更を監視
watch(searchQuery, (newValue) => {
  handleDebouncedSearch(newValue)
})
</script>

<template>
  <input
    v-model="searchQuery"
    type="text"
    placeholder="検索してみて..."
  />
</template>
```

`v-model` は内部的に以下のように展開されます：

```vue
<!-- v-model -->
<input v-model="searchQuery" />

<!-- 上記は以下と同じ -->
<input
  :value="searchQuery"
  @input="(e) => searchQuery = (e.target as HTMLInputElement).value"
/>
```

---

## デバウンス処理

VueUse の `useDebounceFn` を使うと簡単にデバウンスを実装できます：

```vue
<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'

const searchQuery = ref('')

// 300ms 待ってから実行
const debouncedSearch = useDebounceFn((value: string) => {
  // API呼び出しなどの重い処理
  console.log('検索実行:', value)
}, 300)

watch(searchQuery, (newValue) => {
  debouncedSearch(newValue)
})
</script>

<template>
  <input v-model="searchQuery" placeholder="検索..." />
</template>
```

### デバウンス vs スロットル

- **デバウンス** - 最後の入力から指定時間経過後に実行（検索など）
- **スロットル** - 指定時間ごとに最大1回実行（スクロールイベントなど）

```ts
// デバウンス（入力が止まったら実行）
const debouncedFn = useDebounceFn(() => {
  console.log('実行')
}, 300)

// スロットル（300ms ごとに最大1回実行）
const throttledFn = useThrottleFn(() => {
  console.log('実行')
}, 300)
```

---

## Vue 3 Composition API の基本

### ref vs reactive

```ts
// ref - プリミティブ値や単一の値
const count = ref(0)
const name = ref('太郎')
console.log(count.value) // .value でアクセス

// reactive - オブジェクト全体
const user = reactive({
  name: '太郎',
  age: 25
})
console.log(user.name) // .value 不要
```

テンプレート内では、`ref` でも `.value` は不要です：

```vue
<template>
  <!-- .value 不要 -->
  <p>{{ count }}</p>
  <p>{{ name }}</p>
</template>
```

### computed

リアクティブな計算プロパティ：

```ts
const firstName = ref('太郎')
const lastName = ref('山田')

const fullName = computed(() => {
  return `${lastName.value} ${firstName.value}`
})

console.log(fullName.value) // "山田 太郎"
```

### watch

値の変更を監視：

```ts
const searchQuery = ref('')

watch(searchQuery, (newValue, oldValue) => {
  console.log(`変更: ${oldValue} -> ${newValue}`)
})
```

複数の値を監視：

```ts
watch([firstName, lastName], ([newFirst, newLast]) => {
  console.log(`名前: ${newFirst} ${newLast}`)
})
```

即座に実行：

```ts
watch(searchQuery, (value) => {
  console.log('検索:', value)
}, { immediate: true }) // マウント時にも実行
```

---

## ライフサイクル

React との対応関係：

| React | Vue 3 Composition API |
|-------|----------------------|
| `useEffect(() => {}, [])` | `onMounted(() => {})` |
| `useEffect(() => { return cleanup })` | `onUnmounted(() => {})` |
| - | `onBeforeMount(() => {})` |
| - | `onUpdated(() => {})` |

```ts
// コンポーネントマウント時
onMounted(() => {
  console.log('マウントされました')
})

// アンマウント時（クリーンアップ）
onUnmounted(() => {
  console.log('アンマウントされました')
})
```

---

## Composables（カスタムフック）

React のカスタムフックと同じ概念：

```ts
// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => count.value = initialValue

  return {
    count,
    increment,
    decrement,
    reset
  }
}
```

```vue
<script setup lang="ts">
const { count, increment, decrement, reset } = useCounter(10)
</script>

<template>
  <div>
    <p>カウント: {{ count }}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="reset">リセット</button>
  </div>
</template>
```

---

## その他の便利な機能

### テンプレートRef

DOM要素への参照：

```vue
<script setup lang="ts">
const inputRef = ref<HTMLInputElement>()

onMounted(() => {
  inputRef.value?.focus()
})
</script>

<template>
  <input ref="inputRef" />
</template>
```

### defineProps / defineEmits

```vue
<script setup lang="ts">
// Props
const props = defineProps<{
  title: string
  count?: number
}>()

// Events
const emit = defineEmits<{
  update: [value: string]
  close: []
}>()

const handleClick = () => {
  emit('update', 'new value')
}
</script>
```

### defineExpose

親コンポーネントに公開：

```vue
<script setup lang="ts">
const count = ref(0)
const increment = () => count.value++

// 親から使えるようにする
defineExpose({
  count,
  increment
})
</script>
```

---

## まとめ

- `@input` ≈ React の `onChange`
- `v-model` で双方向バインディング
- `ref` / `reactive` でリアクティブな状態管理
- `computed` で派生値
- `watch` で副作用
- Composables でロジックを再利用
