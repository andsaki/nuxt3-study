# withDefaults 完全ガイド

Vue 3 Composition API の `withDefaults` について、基礎から実践まで詳しく解説します。

---

## 目次

1. [withDefaultsとは](#withdefaultsとは)
2. [なぜ必要なのか](#なぜ必要なのか)
3. [基本的な使い方](#基本的な使い方)
4. [実践例](#実践例)
5. [よくあるパターン](#よくあるパターン)
6. [注意点とベストプラクティス](#注意点とベストプラクティス)

---

## withDefaultsとは

`withDefaults` は、Vue 3 の `<script setup>` + TypeScript で **props のデフォルト値を設定する**ための関数です。

```typescript
const props = withDefaults(defineProps<PropsType>(), {
  // デフォルト値を定義
})
```

### 主な役割

- TypeScript の型定義と分離して、デフォルト値を設定
- props が渡されなかった時の初期値を定義
- 型安全性を保ちながら、実行時の動作を制御

---

## なぜ必要なのか

### Options API との違い

Vue 2 や Options API では、型とデフォルト値を一緒に定義できました：

```typescript
// Options API（古い書き方）
export default {
  props: {
    variant: {
      type: String,        // 型定義
      default: 'primary'   // デフォルト値
    },
    size: {
      type: String,
      default: 'md'
    }
  }
}
```

### Composition API の課題

`<script setup>` + TypeScript では、型定義とデフォルト値を別々に管理する必要があります：

```typescript
// ❌ これだけではデフォルト値を設定できない
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

const props = defineProps<ButtonProps>()
// variant と size が undefined の可能性がある
```

### withDefaults の登場

型定義とデフォルト値を分離して、両方の利点を得られます：

```typescript
// ✅ 型定義
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

// ✅ デフォルト値の設定
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',  // デフォルト値
  size: 'md'           // デフォルト値
})

// props.variant は常に 'primary' | 'secondary'（undefined ではない）
```

---

## 基本的な使い方

### 1. 基本パターン

```vue
<script setup lang="ts">
// 1. propsの型を定義
interface Props {
  message?: string
  count?: number
  isActive?: boolean
}

// 2. withDefaultsでデフォルト値を設定
const props = withDefaults(defineProps<Props>(), {
  message: 'Hello',
  count: 0,
  isActive: false
})

// 3. propsを使用
console.log(props.message)  // 'Hello' または親から渡された値
</script>
```

### 2. 使用例

```vue
<!-- 親コンポーネント -->
<template>
  <!-- messageを指定しない場合 -->
  <ChildComponent />
  <!-- → message = 'Hello' (デフォルト値) -->

  <!-- messageを指定する場合 -->
  <ChildComponent message="こんにちは" />
  <!-- → message = 'こんにちは' (指定した値) -->
</template>
```

---

## 実践例

### 例1: Buttonコンポーネント

実際の`components/design-system/Button.vue`から抜粋：

```vue
<template>
  <button
    :type="type"
    :disabled="disabled || isLoading"
    :class="buttonClass"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { button } from '~/styled-system/recipes'

// 型定義
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
}

// デフォルト値の設定
const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',   // 指定なし → primary
  size: 'md',           // 指定なし → md
  isLoading: false,     // 指定なし → false
  disabled: false,      // 指定なし → false
  type: 'button'        // 指定なし → button
})

// propsを使用
const buttonClass = computed(() => button({
  variant: props.variant,  // 常に値が存在する（undefined ではない）
  size: props.size
}))
</script>
```

**使用方法：**

```vue
<template>
  <!-- すべてデフォルト値 -->
  <DesignSystemButton>クリック</DesignSystemButton>
  <!-- variant='primary', size='md', type='button' -->

  <!-- 一部だけ指定 -->
  <DesignSystemButton variant="secondary">
    キャンセル
  </DesignSystemButton>
  <!-- variant='secondary', size='md', type='button' -->

  <!-- 全て指定 -->
  <DesignSystemButton
    variant="danger"
    size="lg"
    type="submit"
  >
    削除
  </DesignSystemButton>
</template>
```

### 例2: Cardコンポーネント

```vue
<script setup lang="ts">
interface CardProps {
  title?: string
  description?: string
  elevation?: 'low' | 'medium' | 'high'
  padding?: 'sm' | 'md' | 'lg'
  rounded?: boolean
}

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  description: '',
  elevation: 'low',
  padding: 'md',
  rounded: true
})
</script>
```

### 例3: 複雑な型のデフォルト値

```vue
<script setup lang="ts">
interface Config {
  theme: 'light' | 'dark'
  locale: string
}

interface Props {
  config?: Config
  tags?: string[]
  metadata?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  // オブジェクト: ファクトリ関数を使用
  config: () => ({ theme: 'light', locale: 'ja' }),

  // 配列: ファクトリ関数を使用
  tags: () => [],

  // オブジェクト: ファクトリ関数を使用
  metadata: () => ({})
})
</script>
```

---

## よくあるパターン

### パターン1: 文字列のデフォルト値

```typescript
interface Props {
  label?: string
  placeholder?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: '',
  placeholder: '入力してください'
})
```

### パターン2: 数値のデフォルト値

```typescript
interface Props {
  max?: number
  min?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  max: 100,
  min: 0,
  step: 1
})
```

### パターン3: ブール値のデフォルト値

```typescript
interface Props {
  disabled?: boolean
  required?: boolean
  readonly?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  required: false,
  readonly: false
})
```

### パターン4: Union型のデフォルト値

```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'tertiary'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',  // Union型の1つを選択
  size: 'md'
})
```

### パターン5: オブジェクト・配列のデフォルト値

```typescript
interface Props {
  options?: string[]
  config?: { theme: string; lang: string }
}

const props = withDefaults(defineProps<Props>(), {
  // 配列・オブジェクトは必ずファクトリ関数で
  options: () => [],
  config: () => ({ theme: 'light', lang: 'ja' })
})
```

---

## 注意点とベストプラクティス

### ⚠️ 注意点1: オブジェクト・配列は必ずファクトリ関数

```typescript
// ❌ 間違い: 配列を直接指定
const props = withDefaults(defineProps<Props>(), {
  tags: []  // すべてのインスタンスで同じ配列を共有してしまう
})

// ✅ 正しい: ファクトリ関数を使用
const props = withDefaults(defineProps<Props>(), {
  tags: () => []  // インスタンスごとに新しい配列を生成
})
```

**理由:** 直接指定すると、すべてのコンポーネントインスタンスで同じオブジェクトを共有してしまい、予期しない副作用が発生します。

### ⚠️ 注意点2: オプショナル（?）を付ける

```typescript
// ✅ 正しい: オプショナルプロパティ
interface Props {
  variant?: string  // ? を付ける
}

// デフォルト値を設定できる
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'
})
```

```typescript
// ❌ 間違い: 必須プロパティ
interface Props {
  variant: string  // ? がない = 必須
}

// デフォルト値を設定しても、親から渡す必要がある
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'  // これは効果がない
})
```

### ⚠️ 注意点3: 型推論を活用

```typescript
// withDefaults を使うと、propsの型が推論される
const props = withDefaults(defineProps<Props>(), {
  count: 0
})

// props.count の型は number（number | undefined ではない）
```

### ✅ ベストプラクティス1: 明示的なデフォルト値

```typescript
// ✅ 良い例: デフォルト値を明示
const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false
})

// ❌ 悪い例: デフォルト値がない
const props = defineProps<Props>()
// props.variant は undefined の可能性がある
```

### ✅ ベストプラクティス2: 型と値の整合性

```typescript
// ✅ 正しい: 型とデフォルト値が一致
interface Props {
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary'  // Union型の1つ
})

// ❌ 間違い: 型に存在しない値
const props = withDefaults(defineProps<Props>(), {
  variant: 'tertiary'  // 型エラー！
})
```

### ✅ ベストプラクティス3: コメントで意図を明示

```typescript
const props = withDefaults(defineProps<ButtonProps>(), {
  /** ボタンのバリエーション（デフォルト: primary） */
  variant: 'primary',

  /** ボタンのサイズ（デフォルト: md） */
  size: 'md',

  /** WCAGレベル（デフォルト: AA） */
  wcagLevel: 'AA'
})
```

---

## まとめ

### withDefaults を使うべき時

✅ `<script setup>` + TypeScript を使っている
✅ props にデフォルト値を設定したい
✅ 型安全性を保ちたい
✅ undefined チェックを減らしたい

### 重要ポイント

1. **型定義とデフォルト値を分離**して管理
2. **オブジェクト・配列は必ずファクトリ関数**（`() => []`）
3. **オプショナル（`?`）** を付けて、デフォルト値を設定
4. **Union型のデフォルト値**は、その1つを選択

### ReactとVueの比較

Reactを使ったことがある方向けに、デフォルト値の設定方法を比較します。

#### React の場合

Reactでは**分割代入（destructuring）**でデフォルト値を設定します：

```typescript
// React
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

function Button({ size = 'md', variant = 'primary' }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`}>
      クリック
    </button>
  )
}
```

**特徴:**
- 関数の引数でデフォルト値を設定
- シンプルで直感的
- JavaScriptの標準機能を活用

#### Vue の場合

Vueでは**withDefaults**関数でデフォルト値を設定します：

```vue
<script setup lang="ts">
// Vue
interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
}

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'md',
  variant: 'primary'
})
</script>

<template>
  <button :class="`btn-${variant} btn-${size}`">
    クリック
  </button>
</template>
```

**特徴:**
- withDefaults関数を使用
- propsオブジェクトとして管理
- リアクティブシステムと統合

#### どちらが良い？

両方とも**同じ結果**を実現しますが、アプローチが異なります：

| 観点 | React | Vue (withDefaults) |
|------|-------|-------------------|
| 構文 | 分割代入 `{ size = 'md' }` | 関数呼び出し `withDefaults()` |
| シンプルさ | ⭐⭐⭐ より直感的 | ⭐⭐ やや冗長 |
| 一貫性 | 関数の引数 | propsオブジェクト |
| リアクティブ | useState等が必要 | 自動的にリアクティブ |

**結論:** どちらも目的は同じですが、フレームワークの設計思想の違いを反映しています。

### Vue API比較表

| 項目 | Options API | Composition API (withDefaults) |
| ---- | ----------- | ------------------------------ |
| 型とデフォルト値 | 一緒に定義 | 別々に定義 |
| TypeScript型推論 | 弱い | 強い |
| IDEサポート | 普通 | 優れている |
| 可読性 | 良い | 良い |
| 推奨 | Vue 2 | Vue 3 |

---

## 参考リンク

- [Vue 3 公式ドキュメント - defineProps](https://ja.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits)
- [Vue 3 TypeScript Guide](https://ja.vuejs.org/guide/typescript/composition-api.html)
- プロジェクト内の実装例: `components/design-system/Button.vue`
