# Claude Code プロジェクト設定

このファイルは、Claude Codeがこのプロジェクトでコードをレビューしたり、実装する際のルールを定義します。

---

## TypeScript 操作ルール

### 基本方針
- **構文の解析にはMCPを使用すること**
  - 手動でgrepやファイル検索するのではなく、TypeScript MCPツールを使用して正確に解析する

- **命名の置換に際してはMCPを使用し影響範囲を確定させること**
  - 変数名・関数名の変更時は `mcp__typescript__rename_symbol` を使用
  - これにより、プロジェクト全体への影響を事前に確認できる

---

### 1. セマンティックなファイル操作

#### ファイル移動 (`mcp__typescript__move_file`)
```typescript
// 使用例: src/utils/helper.ts → src/lib/helper.ts へ移動
// このツールを使うと、すべてのインポート文が自動更新される
// 手動でファイルを移動すると、インポートパスが壊れるリスクがある
```

**使用タイミング:**
- ファイル構造をリファクタリングする時
- ディレクトリを整理する時

---

#### ディレクトリ移動 (`mcp__typescript__move_directory`)
```typescript
// 使用例: src/components/common → src/shared に移動
// ディレクトリ全体を移動し、すべてのインポートを自動更新
```

**使用タイミング:**
- プロジェクト構造を大幅に変更する時
- モジュールを再編成する時

---

### 2. シンボル操作

#### シンボルのリネーム (`mcp__typescript__rename_symbol`)
```typescript
// 使用例: getUserData → fetchUserData に変更
// プロジェクト全体でシンボルを安全にリネーム
// すべての参照箇所が自動更新される
```

**使用タイミング:**
- 関数名、変数名、クラス名などを変更する時
- 命名規則を統一する時
- より適切な名前に変更する時

**重要:** 手動で検索・置換すると、コメント内の同名文字列まで変更される恐れがある

---

#### シンボルの削除 (`mcp__typescript__delete_symbol`)
```typescript
// 使用例: 不要になった関数やクラスを削除
// シンボルとその参照をすべて安全に削除
```

**使用タイミング:**
- デッドコードを削除する時
- リファクタリング後、古い実装を削除する時

---

#### 参照の検索 (`mcp__typescript__find_references`)
```typescript
// 使用例: この関数がどこで使われているか確認
// シンボルへのすべての参照を検索
```

**使用タイミング:**
- 変更の影響範囲を確認する時
- 削除しても安全か確認する時
- 使用箇所を把握する時

---

### 3. コード分析

#### 定義の取得 (`mcp__typescript__get_definitions`)
```typescript
// 使用例: インターフェースや型の定義位置を取得
// シンボルの定義位置を正確に特定
```

**使用タイミング:**
- 型定義を確認する時
- 実装箇所を探す時

---

#### 診断情報 (`mcp__typescript__get_diagnostics`)
```typescript
// 使用例: TypeScript のエラーや警告を取得
// コンパイラが検出する問題を事前に確認
```

**使用タイミング:**
- コード変更前に現在のエラー状態を確認
- リファクタリング後のエラーチェック
- 型エラーの原因を特定

---

#### モジュールシンボル (`mcp__typescript__get_module_symbols`)
```typescript
// 使用例: モジュールが何をエクスポートしているか確認
// public APIを把握
```

**使用タイミング:**
- ライブラリの使い方を確認する時
- 利用可能な機能を調べる時

---

#### 型情報の取得
- `mcp__typescript__get_type_in_module` - モジュール内の型情報
- `mcp__typescript__get_type_at_symbol` - 特定シンボルの型情報

```typescript
// 使用例: 詳細な型シグネチャを取得
// 関数の引数や戻り値の型を確認
```

**使用タイミング:**
- 型が複雑で把握しにくい時
- ジェネリック型の推論結果を確認する時

---

## Context7 ルール

### 基本方針
Context7は、最新ライブラリのドキュメントやAPIリファレンスを取得するツールです。

### 使用タイミング

1. **未知のバージョンのライブラリを使用する場合**
```markdown
例: Nuxt 3.13が最新だが、Claudeの学習データは3.10まで
→ Context7で最新ドキュメントを取得
→ 最新の書き方・破壊的変更を確認
```

2. **ライブラリの仕様を加味して実装を行う場合**
```markdown
例: Pinia、VeeValidate、Zodなどの公式推奨パターンを確認
→ Context7で公式ドキュメントを取得
→ ベストプラクティスに従った実装
```

3. **新しいライブラリを導入する場合**
```markdown
例: 初めて使うライブラリの使い方を確認
→ Context7で公式チュートリアルを取得
→ 正しいセットアップ手順を実行
```

### 期待される効果
- ✅ 最新の機能を正しく使える
- ✅ 非推奨APIを避けられる
- ✅ 公式のベストプラクティスに従える
- ✅ バージョンアップ時の移行がスムーズ

---

## Playwright MCP ルール

### 基本方針
Playwright MCPは、ブラウザを操作してUIの確認・テスト・スクリーンショット取得を行うツールです。

### 使用タイミング

1. **マークアップ（HTML/CSS）実装時**
```markdown
例: コンポーネントのスタイリングを実装する場合
→ 開発サーバーを起動
→ Playwright MCPでページにアクセス
→ スクリーンショットを取得して見た目を確認
→ 必要に応じてCSSを調整
```

2. **レスポンシブデザインの確認**
```markdown
例: モバイル・タブレット・デスクトップでの表示確認
→ mcp__playwright__playwright_resize でデバイスプリセットを使用
→ 各デバイスでスクリーンショットを取得
→ レイアウト崩れがないか確認
```

3. **UI動作の確認**
```markdown
例: フォーム送信、モーダル表示などのインタラクション確認
→ mcp__playwright__playwright_click でボタンをクリック
→ mcp__playwright__playwright_fill でフォームに入力
→ mcp__playwright__playwright_screenshot で結果を確認
```

### 主要ツール

#### ナビゲーション
- `mcp__playwright__playwright_navigate` - URLに移動
- `mcp__playwright__playwright_go_back` - 戻る
- `mcp__playwright__playwright_go_forward` - 進む

#### スクリーンショット
- `mcp__playwright__playwright_screenshot` - ページまたは要素のスクリーンショット取得

#### 操作
- `mcp__playwright__playwright_click` - 要素をクリック
- `mcp__playwright__playwright_fill` - 入力フィールドに値を入力
- `mcp__playwright__playwright_hover` - 要素にホバー

#### デバイス・ビューポート
- `mcp__playwright__playwright_resize` - デバイスプリセットまたは手動でビューポートをリサイズ

#### HTML/コンテンツ取得
- `mcp__playwright__playwright_get_visible_html` - ページのHTML取得
- `mcp__playwright__playwright_get_visible_text` - ページのテキスト取得

### 期待される効果
- ✅ 実際のブラウザで見た目を確認できる
- ✅ レスポンシブデザインを複数デバイスで確認できる
- ✅ UI動作を視覚的に確認できる
- ✅ スクリーンショットでユーザーと認識を合わせられる

---

## マークアップ・デザインシステムルール

### 基本方針
マークアップ（HTML/CSS）実装時は、既存のデザインシステムを最大限活用し、一貫性のあるUIを構築します。

### 参照元デザインシステム

このプロジェクトでは、以下のデザインシステムを参照できます：

**accessibility-learning プロジェクト**
- パス: `../accessibility-learning/` (同じweb-developディレクトリ内)
- 利用可能なコンポーネント:
  - Button, Card (未移植の場合はInfoBox), Input, TextArea, Select, Checkbox, Radio
  - Modal, Tooltip, Dropdown, Accordion, Breadcrumbs, Table
  - Loading, Toast, ColorPicker, Form, Text
- レシピ: `panda-config/recipes/` 配下に各コンポーネントのスタイル定義

### マークアップ実装フロー

1. **デザインシステムの確認**
```markdown
例: ページにカード形式のコンテンツを表示したい
→ accessibility-learningプロジェクトのCardコンポーネントを確認
→ レシピ（panda-config/recipes/card.ts）を確認
→ 必要に応じてVue 3に移植
```

2. **コンポーネントの移植**
```markdown
例: accessibility-learningからButtonを移植する場合
1. src/design-system/components/Button.tsx を確認（React実装）
2. panda-config/recipes/button.ts のレシピを確認
3. components/design-system/Button.vue として Vue 3 に移植
4. レシピは panda-config/recipes/button.ts にコピー
5. panda.config.ts に追加
6. npx panda codegen でスタイル生成
```

3. **Panda CSSの使用**
```vue
<!-- インラインスタイル -->
<template>
  <div :class="css({ p: 4, bg: 'gray.50', rounded: 'md' })">
    <!-- コンテンツ -->
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
</script>
```

```vue
<!-- レシピの使用 -->
<template>
  <button :class="buttonClass">
    クリック
  </button>
</template>

<script setup lang="ts">
import { button } from '~/styled-system/recipes'

const buttonClass = computed(() => button({
  variant: 'primary',
  size: 'md',
}))
</script>
```

4. **PlaywrightでUI確認**
```markdown
1. npm run dev で開発サーバー起動
2. mcp__playwright__playwright_navigate でページにアクセス
3. mcp__playwright__playwright_screenshot でスクリーンショット取得
4. デザインを確認し、必要に応じて調整
```

### コンポーネント命名規則

Nuxt 3の自動インポートでは、ディレクトリ構造に基づいた命名になります：

```
components/design-system/Button.vue
→ <DesignSystemButton>

components/design-system/Card.vue
→ <DesignSystemCard>

components/AppHeader.vue
→ <AppHeader>
```

### 既存コンポーネントの活用例

```vue
<template>
  <!-- Cardコンポーネントの使用 -->
  <DesignSystemCard
    title="カウンター"
    icon="🔢"
    color-scheme="blue"
  >
    <p>カード内のコンテンツ</p>
  </DesignSystemCard>

  <!-- Buttonコンポーネントの使用 -->
  <DesignSystemButton
    variant="primary"
    size="md"
    @click="handleClick"
  >
    送信
  </DesignSystemButton>
</template>
```

### スタイルトークンの活用

Panda CSSのトークンを使用して一貫性を保ちます：

```vue
<!-- 色トークン -->
:class="css({
  bg: 'blue.50',      // 背景: 青50
  color: 'gray.900',  // テキスト: グレー900
  borderColor: 'blue.200' // 枠線: 青200
})"

<!-- スペーシング -->
:class="css({
  p: 4,     // padding: 1rem
  mt: 2,    // margin-top: 0.5rem
  gap: 2    // gap: 0.5rem
})"

<!-- 角丸 -->
:class="css({
  rounded: 'md',  // border-radius: 0.375rem
  rounded: 'lg'   // border-radius: 0.5rem
})"
```

### 期待される効果
- ✅ デザインの一貫性を保てる
- ✅ 既存コンポーネントを再利用できる
- ✅ アクセシビリティ対応済みのコンポーネントを活用できる
- ✅ 開発速度が向上する
- ✅ メンテナンス性が向上する

---

## 実装ワークフロー例

### ケース1: 関数名を変更する
```
1. mcp__typescript__find_references で影響範囲を確認
2. mcp__typescript__rename_symbol で安全にリネーム
3. mcp__typescript__get_diagnostics でエラーがないか確認
```

### ケース2: 未知のライブラリを使う
```
1. Context7で公式ドキュメントを取得
2. 推奨されるインストール・セットアップ手順を実行
3. サンプルコードを参考に実装
4. mcp__typescript__get_diagnostics で型エラーチェック
```

### ケース3: ファイル構造をリファクタリング
```
1. mcp__typescript__move_directory でディレクトリ移動
2. すべてのインポートが自動更新されることを確認
3. mcp__typescript__get_diagnostics で問題がないか確認
4. git statusで変更ファイルを確認
```

### ケース4: コンポーネントのマークアップを実装
```
1. accessibility-learningプロジェクトでデザインシステムを確認
2. 必要なコンポーネント・レシピを移植
3. 開発サーバーを起動（npm run dev等）
4. mcp__playwright__playwright_navigate でページにアクセス
5. mcp__playwright__playwright_screenshot でスクリーンショット取得
6. デザインと比較して、Panda CSSで調整
7. 必要に応じて mcp__playwright__playwright_resize で各デバイス表示を確認
8. 再度スクリーンショットを取得して完成を確認
```

---

## カスタムスキル

### branch-name-helper

現在のGit差分を分析して、適切なブランチ名を提案・作成するカスタムスキルです。

#### 使い方

```
# ブランチ名を提案してもらう
ユーザー: ブランチ名を提案して
ユーザー: 適切なブランチ名を考えて
ユーザー: この変更に合うブランチ名は？

# 自動的にスキルが起動し、3つのブランチ名を提案します
Claude:
1. feature/add-panda-css-design-system
2. feature/integrate-panda-css
3. chore/setup-panda-css-tokens
```

#### ブランチ命名規則

このスキルは以下の命名規則に従います：

**ブランチタイプ:**
- `feature/` - 新機能追加
- `fix/` - バグ修正
- `refactor/` - リファクタリング
- `docs/` - ドキュメント更新
- `style/` - スタイル・UI変更
- `test/` - テスト追加・修正
- `chore/` - ビルド、ツール設定、依存関係更新
- `perf/` - パフォーマンス改善

**命名ルール:**
- 小文字のみ
- kebab-case（ハイフン区切り）
- 簡潔に（20-40文字推奨）
- 英語で記述

#### スキルの仕組み

1. `git status`, `git diff`, `git diff --cached` で変更を取得
2. 変更内容を分析（新規ファイル、変更ファイル、package.json等）
3. 変更内容に応じて3つのブランチ名を提案
4. ユーザーが選択したブランチを `git checkout -b` で作成

#### 注意事項

- 変更がない場合は提案できません
- Gitリポジトリでない場合はエラーになります
- ブランチ名が既に存在する場合は警告します

---

## 注意事項

- TypeScript MCPツールは、TypeScriptプロジェクトでのみ使用可能
- 大規模な変更の前は必ずgitでコミットしておくこと
- 自動更新後も目視で確認することを推奨
- Context7で取得した情報が最新とは限らないため、公式サイトでも確認すること
