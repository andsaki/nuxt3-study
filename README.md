# Nuxt 3 Study

Vue 3 + Nuxt 3 を使った、モダンなフロントエンド開発とUI/UXデザイン実装の学習プロジェクトです。

## 🎯 プロジェクト概要

このプロジェクトは、以下の2つの学習目的を持っています：

### 1. **Vue 3 / Nuxt 3 の学習**
Next.js版で実装された機能をNuxt 3で再現し、ReactとVueのエコシステムの違いを学習：

- **状態管理**: Zustand → Pinia
- **データフェッチング**: React Query/SWR → TanStack Vue Query/VueUse
- **フォームバリデーション**: React Hook Form → VeeValidate
- **データベース**: Prisma (そのまま使用可能)
- **テスト**: Vitest + Playwright

### 2. **UI/UX デザイン実装の学習**
プロダクショングレードのデザインシステムと、アクセシブルなUI実装を学習：

- **デザインシステム**: accessibility-learningプロジェクトからの移植
- **スタイリング**: Panda CSS（CSS-in-JS）
- **アクセシビリティ**: WAI-ARIA準拠のコンポーネント設計
- **ビジュアル確認**: Playwrightスクリプトによる自動確認
- **パフォーマンス**: Doherty Threshold（400ms以内のレスポンス）の実装

## 🚀 セットアップ

```bash
# 依存関係のインストール
npm install

# Panda CSSのスタイル生成
npx panda codegen

# 開発サーバーの起動
npm run dev

# プロダクションビルド
npm run build

# テストの実行
npm run test

# E2Eテストの実行
npm run e2e
```

### 開発ワークフロー

1. **コンポーネント開発**:
   ```bash
   # 開発サーバー起動
   npm run dev

   # Panda CSSレシピを追加したら
   npx panda codegen
   ```

2. **UI確認** (design-specialistスキルが自動実行):
   ```bash
   # Playwrightスクリプトが自動生成・実行される
   # スクリーンショット取得 → デザイン確認 → ファイル削除
   ```

## 📁 プロジェクト構造

```
nuxt3-study/
├── pages/                    # ページコンポーネント
├── components/               # 再利用可能なコンポーネント
│   └── design-system/        # デザインシステムコンポーネント
│       ├── Button.vue
│       ├── Card.vue
│       ├── Input.vue
│       └── ...
├── stores/                   # Piniaストア
├── composables/              # コンポーザブル関数
├── server/                   # サーバーAPI
│   └── api/
├── prisma/                   # Prismaスキーマとマイグレーション
├── tests/                    # テストファイル
├── panda-config/             # Panda CSS設定
│   ├── recipes/              # スタイルレシピ（button, card等）
│   └── tokens/               # デザイントークン
├── styled-system/            # Panda CSS生成ファイル
└── CLAUDE.md                 # Claude Code プロジェクト設定
```

### 🧭 サイト / ナビ構成の見取り図

「ホーム」と「ヘッダー」の役割、どのディレクトリがどのルートに対応するかをまとめた補足ドキュメントを追加しました。

- [docs/site-structure.md](docs/site-structure.md)
  - `/`（ホーム）と共通ヘッダーの違い
  - `pages/` / `components/` / `layouts/` などの対応表
  - ナビゲーションカテゴリの一覧（学習コンテンツ / デモ / UX 法則 / Examples）

新しいページや導線を追加する際は、この表を見れば「どのブロックにリンクを置くべきか」即座に判断できます。

## 📖 学習内容

### Vue 3 の学習
- **Composition API**: `<script setup>` による簡潔な記法
- **リアクティビティシステム**: `ref`, `computed`, `watch` の使い方
- **自動インポート**: Nuxt 3によるコンポーネント・コンポーザブルの自動インポート
- **TypeScript統合**: 型安全な開発環境
- **ライフサイクルフック**: `onMounted`, `onUnmounted` 等の活用

### UI/UX デザインの学習
- **Panda CSS**: CSS-in-JSによるスタイリング
  - インラインスタイル（`css()`関数）
  - レシピ（再利用可能なスタイルバリアント）
  - パターン（レイアウトパターン）
- **デザインシステム構築**:
  - コンポーネント設計（Button, Card, Input等）
  - カラートークン・スペーシングの一貫性
  - レスポンシブデザインパターン
- **アクセシビリティ**:
  - WAI-ARIAロールとプロパティ
  - キーボードナビゲーション
  - セマンティックHTML
- **パフォーマンス最適化**:
  - Doherty Threshold（400ms以内のレスポンス）
  - ユーザー体験の向上
- **ビジュアル確認ワークフロー**:
  - Playwrightスクリプトによる自動確認
  - `window.getComputedStyle()` での詳細スタイル分析

### React vs Vue の比較学習
- 状態管理の違い（Zustand vs Pinia）
- データフェッチングの違い（React Query vs TanStack Vue Query）
- フォームハンドリングの違い（React Hook Form vs VeeValidate）
- コンポーネント記法の違い（JSX vs Template）

## 🔄 Next.js からの移行マッピング

| Next.js | Nuxt 3 |
|---------|--------|
| Zustand | Pinia |
| React Query | TanStack Vue Query |
| SWR | @vueuse/core (useFetch) |
| Server Actions | Nuxt Server Routes |
| React Hook Form | VeeValidate |
| Tailwind CSS | Panda CSS |

## 📚 主要な機能デモ

### Vue 3 / 状態管理
- **カウンターストア**: Pinia による状態管理
- **データフェッチング比較**: TanStack Query vs VueUse
- **フォームバリデーション**: VeeValidate + Zod
- **楽観的更新**: サーバーAPIとの連携

### UI/UX デザイン
- **デザインシステムコンポーネント**:
  - Button, Card, Input, TextArea
  - Select, Checkbox, Radio
  - Modal, Tooltip, Loading
- **Doherty Threshold デモ**: 400ms以内のレスポンス実装
- **レスポンシブデザイン**: モバイル・タブレット・デスクトップ対応
- **アクセシビリティ**: キーボード操作、スクリーンリーダー対応

## 🛠️ 技術スタック

### コア技術
- **フレームワーク**: Nuxt 3
- **ランタイム**: Vue 3 (Composition API)
- **状態管理**: Pinia
- **データフェッチング**: TanStack Vue Query, VueUse

### UI/UX
- **スタイリング**: Panda CSS (CSS-in-JS)
- **デザインシステム**: カスタムコンポーネント + レシピ
- **アクセシビリティ**: WAI-ARIA準拠
- **ビジュアル確認**: Playwright

### バックエンド・バリデーション
- **バリデーション**: Zod, VeeValidate
- **データベース**: Prisma
- **テスト**: Vitest, Playwright
