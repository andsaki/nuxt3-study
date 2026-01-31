# Vue 3 名前付き v-model (Named v-model)

## 概要

`v-model:propName` は Vue 3 で導入された**名前付き v-model** という記法です。複数の双方向バインディングを簡潔に記述できます。

---

## 基本的な仕組み

### 通常の v-model

```vue
<!-- 通常の v-model（デフォルトはmodelValue） -->
<CustomInput v-model="text" />

<!-- 展開すると -->
<CustomInput
  :model-value="text"
  @update:model-value="text = $event"
/>
```

### 名前付き v-model

```vue
<!-- 名前を指定した v-model -->
<Modal v-model:is-open="isModalOpen" />

<!-- 展開すると -->
<Modal
  :is-open="isModalOpen"
  @update:is-open="isModalOpen = $event"
/>
```

---

## 実装例

### 子コンポーネント（Modal.vue）

```vue
<script setup lang="ts">
// propsで受け取る
defineProps<{
  isOpen: boolean
}>()

// update:propName イベントを定義
const emit = defineEmits<{
  'update:isOpen': [value: boolean]
}>()

// 値を変更する関数
const close = () => {
  emit('update:isOpen', false)
}

const open = () => {
  emit('update:isOpen', true)
}
</script>

<template>
  <div v-if="isOpen" class="modal">
    <div class="modal-content">
      <button @click="close">✕</button>
      <slot />
    </div>
  </div>
</template>
```

### 親コンポーネント

```vue
<script setup lang="ts">
const isModalOpen = ref(false)
</script>

<template>
  <button @click="isModalOpen = true">モーダルを開く</button>

  <!-- v-model:is-open で双方向バインディング -->
  <Modal v-model:is-open="isModalOpen">
    <h2>モーダルコンテンツ</h2>
    <p>ここに内容を表示</p>
  </Modal>
</template>
```

---

## 複数の v-model

1つのコンポーネントに複数の v-model を設定できます。

```vue
<script setup lang="ts">
const title = ref('')
const content = ref('')
const isVisible = ref(false)
</script>

<template>
  <CustomComponent
    v-model:title="title"
    v-model:content="content"
    v-model:is-visible="isVisible"
  />
</template>
```

### 子コンポーネント側

```vue
<script setup lang="ts">
defineProps<{
  title: string
  content: string
  isVisible: boolean
}>()

const emit = defineEmits<{
  'update:title': [value: string]
  'update:content': [value: string]
  'update:isVisible': [value: boolean]
}>()
</script>

<template>
  <div v-if="isVisible">
    <input
      :value="title"
      @input="emit('update:title', ($event.target as HTMLInputElement).value)"
    />
    <textarea
      :value="content"
      @input="emit('update:content', ($event.target as HTMLTextAreaElement).value)"
    />
    <button @click="emit('update:isVisible', false)">閉じる</button>
  </div>
</template>
```

---

## よくある使用例

### 1. モーダル・ダイアログ

```vue
<Modal v-model:is-open="isOpen" />
<Dialog v-model:show="showDialog" />
```

### 2. ドロワー・サイドバー

```vue
<Drawer v-model:open="drawerOpen" />
<Sidebar v-model:collapsed="isCollapsed" />
```

### 3. アコーディオン

```vue
<Accordion v-model:expanded="isExpanded" />
```

### 4. タブ

```vue
<Tabs v-model:active-tab="activeTab" />
```

### 5. 複雑なフォーム

```vue
<DateRangePicker
  v-model:start-date="startDate"
  v-model:end-date="endDate"
/>
```

---

## メリット

1. **複数の双方向バインディングが可能**
   - 1つのコンポーネントで複数の状態を管理できる

2. **prop名を明示的に指定できる**
   - デフォルトの `modelValue` 以外の名前を使える
   - より意味のある名前を付けられる

3. **コードが簡潔になる**
   - `:prop` と `@update:prop` を別々に書く必要がない

4. **TypeScriptとの相性が良い**
   - 型安全な実装が可能

---

## 注意点

### イベント名は `update:propName` 形式

```vue
<!-- prop名が isOpen の場合 -->
<Modal v-model:is-open="value" />

<!-- イベント名は update:isOpen -->
emit('update:isOpen', newValue)
```

### ケバブケースとキャメルケースの変換

```vue
<!-- テンプレート: ケバブケース -->
<Modal v-model:is-open="value" />

<!-- スクリプト: キャメルケース -->
defineProps<{ isOpen: boolean }>()
emit('update:isOpen', false)
```

---

## Vue 2 との違い

### Vue 2

```vue
<!-- Vue 2 では .sync 修飾子を使用 -->
<Modal :is-open.sync="isOpen" />
```

### Vue 3

```vue
<!-- Vue 3 では v-model:propName を使用 -->
<Modal v-model:is-open="isOpen" />
```

`.sync` 修飾子は Vue 3 で削除され、`v-model:propName` に統一されました。

---

## 参考

- [Vue 3 公式ドキュメント - Component v-model](https://vuejs.org/guide/components/v-model.html)
- [Vue 3 Migration Guide - v-model](https://v3-migration.vuejs.org/breaking-changes/v-model.html)
