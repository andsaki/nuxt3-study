# Markdownドキュメント表示アーキテクチャ

## 概要

このプロジェクトでは、Markdownファイルを動的に読み込んで表示する仕組みを実装しています。

## アーキテクチャ

### 1. ディレクトリ構成

```
nuxt3-study/
├── public/
│   └── docs/              # Markdownファイルを配置
│       ├── named-v-model.md
│       ├── vue-guide.md
│       └── ...
├── server/
│   └── api/
│       └── docs/
│           └── [slug].get.ts  # APIエンドポイント
├── components/
│   └── MarkdownViewer.vue     # Markdown表示コンポーネント
└── pages/
    └── vue-guide/
        ├── named-v-model.vue  # ページ
        └── ...
```

### 2. データフロー

```
Markdownファイル (public/docs/*.md)
    ↓
サーバーAPIルート (server/api/docs/[slug].get.ts)
    ↓
useFetch でデータ取得 (pages/*.vue)
    ↓
MarkdownViewerコンポーネント
    ↓
marked でHTML変換
    ↓
Panda CSSでスタイリング
    ↓
表示
```

---

## 実装詳細

### 1. サーバーAPIルート

**ファイル**: `server/api/docs/[slug].get.ts`

```typescript
import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')

  try {
    const filePath = join(process.cwd(), 'public', 'docs', `${slug}.md`)
    const content = readFileSync(filePath, 'utf-8')

    return content
  } catch (error) {
    throw createError({
      statusCode: 404,
      statusMessage: `Markdown file not found: ${slug}`
    })
  }
})
```

**役割:**
- URLの `slug` パラメータからMarkdownファイル名を取得
- `public/docs/` から対応するファイルを読み込み
- ファイルが存在しない場合は404エラーを返す

**エンドポイント:**
- `/api/docs/named-v-model` → `public/docs/named-v-model.md`
- `/api/docs/vue-guide` → `public/docs/vue-guide.md`

---

### 2. MarkdownViewerコンポーネント

**ファイル**: `components/MarkdownViewer.vue`

```vue
<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <DesignSystemButton
        variant="secondary"
        size="sm"
        @click="navigateTo('/vue-guide')"
      >
        ← 一覧に戻る
      </DesignSystemButton>
    </div>

    <article :class="articleClass">
      <div v-html="renderedContent" :class="contentClass" />
    </article>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
import { marked } from 'marked'

const props = defineProps<{
  content: string
}>()

const renderedContent = computed(() => {
  return marked(props.content)
})

// Panda CSSでスタイリング
const containerClass = css({
  minH: 'screen',
  bg: 'gray.50',
  py: 8,
})

// ... その他のスタイル定義
</script>
```

**役割:**
- Markdown文字列を受け取る
- `marked` ライブラリでHTMLに変換
- Panda CSSでMarkdown要素（h1, h2, code, table等）をスタイリング
- レスポンシブ対応

---

### 3. ページコンポーネント

**ファイル**: `pages/vue-guide/named-v-model.vue`

```vue
<template>
  <MarkdownViewer v-if="content" :content="content" />
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/docs/named-v-model')
</script>
```

**役割:**
- `useFetch` でサーバーAPIからMarkdownを取得
- MarkdownViewerコンポーネントにデータを渡す
- Nuxtの自動インポートにより、import不要

---

## なぜこのアーキテクチャ？

### ❌ 直接 public/ にアクセスしない理由

```vue
<!-- これは動かない -->
const { data } = await useFetch('/docs/named-v-model.md')
```

**問題:**
- Nuxtの開発サーバーでは、publicディレクトリの静的ファイルへの `useFetch` が不安定
- ファイルパーミッションの問題が発生しやすい
- SSR時に正しくファイルが読み込めない場合がある

### ✅ サーバーAPIルートを使う理由

```vue
<!-- これは動く -->
const { data } = await useFetch('/api/docs/named-v-model')
```

**メリット:**
1. **安定性**: Nitroサーバー経由で確実にファイルを読み込める
2. **エラーハンドリング**: 404エラーなどを適切に処理できる
3. **拡張性**: 将来的にキャッシュ、認証、前処理などを追加しやすい
4. **型安全性**: TypeScriptで型定義可能

---

## Markdownスタイリング

MarkdownViewerコンポーネントでは、Panda CSSを使って以下の要素をスタイリング：

| 要素 | スタイル |
|------|----------|
| `h1` | 2xl, bold, border-bottom |
| `h2` | xl, bold |
| `h3` | lg, semibold |
| `code` | gray.100背景, pink.600文字色 |
| `pre` | gray.900背景, gray.100文字色 |
| `blockquote` | blue.500左ボーダー, blue.50背景 |
| `table` | gray.100ヘッダー, gray.200ボーダー |

---

## 新しいドキュメントページの追加方法

### ステップ1: Markdownファイルを作成

```bash
# public/docs/ にMarkdownファイルを配置
touch public/docs/new-topic.md
```

### ステップ2: ページコンポーネントを作成

```vue
<!-- pages/vue-guide/new-topic.vue -->
<template>
  <MarkdownViewer v-if="content" :content="content" />
</template>

<script setup lang="ts">
const { data: content } = await useFetch('/api/docs/new-topic')
</script>
```

### ステップ3: ナビゲーションに追加

インデックスページや一覧ページにリンクを追加：

```vue
<NuxtLink to="/vue-guide/new-topic">新しいトピック</NuxtLink>
```

**完了！** サーバーAPIルートは自動的に動作します。

---

## トラブルシューティング

### 問題: ページが真っ白

**原因:**
- Markdownファイルが存在しない
- ファイルパーミッションが間違っている

**確認:**
```bash
# ファイルが存在するか
ls -la public/docs/

# パーミッションを確認（644であるべき）
ls -la public/docs/your-file.md

# パーミッション修正
chmod 644 public/docs/*.md
```

### 問題: 404エラー

**原因:**
- slugとファイル名が一致していない

**確認:**
```typescript
// ページ: /pages/vue-guide/named-v-model.vue
await useFetch('/api/docs/named-v-model')
                         // ↑ slugはこれ

// 対応するファイル: public/docs/named-v-model.md
                                    // ↑ 同じ名前
```

### 問題: スタイルが適用されない

**原因:**
- Panda CSSが正しくビルドされていない

**解決:**
```bash
npx panda codegen
npm run dev
```

---

## 依存ライブラリ

| ライブラリ | 用途 |
|-----------|------|
| `marked` | Markdown → HTML変換 |
| `@pandacss/dev` | CSSスタイリング |
| `nuxt` | フレームワーク |

---

## パフォーマンス考慮事項

### SSR対応

- `useFetch` を使用することで、サーバーサイドでMarkdownを取得
- 初回レンダリング時にHTMLが生成される
- クライアントサイドでのハイドレーションもスムーズ

### キャッシュ（将来的な拡張）

```typescript
// server/api/docs/[slug].get.ts に追加可能
export default defineEventHandler(async (event) => {
  // キャッシュヘッダーを設定
  setHeader(event, 'Cache-Control', 'public, max-age=3600')

  // ... ファイル読み込み
})
```

---

## まとめ

このアーキテクチャの特徴：

✅ **シンプル**: 3つのコンポーネントで実現
✅ **安定**: サーバーAPI経由で確実にファイル取得
✅ **拡張可能**: 認証、キャッシュ、前処理を追加しやすい
✅ **保守性**: 各責任が明確に分離
✅ **型安全**: TypeScriptで型定義

Markdownファイルを追加するだけで、自動的にスタイリングされたドキュメントページが作成されます。
