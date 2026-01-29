# ヤコブの法則（Jakob's Law）完全ガイド

UX/UIデザインの基本原則「ヤコブの法則」について、理論から実践まで詳しく解説します。

---

## 目次

1. [ヤコブの法則とは](#ヤコブの法則とは)
2. [なぜ重要なのか](#なぜ重要なのか)
3. [実践例](#実践例)
4. [よくある失敗パターン](#よくある失敗パターン)
5. [適用のベストプラクティス](#適用のベストプラクティス)
6. [例外と注意点](#例外と注意点)

---

## ヤコブの法則とは

> **"Users spend most of their time on other sites. This means that users prefer your site to work the same way as all the other sites they already know."**
>
> ユーザーは自分の時間のほとんどを他のサイトで過ごしている。つまり、ユーザーはあなたのサイトも、既に知っている他のサイトと同じように動作することを期待している。

**提唱者:** ヤコブ・ニールセン（Jakob Nielsen）— UX研究の第一人者、Nielsen Norman Group 共同創設者

### 核心的な考え方

1. **慣れ親しんだパターンを活用する**
   - ユーザーは既存の経験から学習している
   - 新しいインターフェースを学ぶコストを最小化すべき

2. **一貫性が使いやすさを生む**
   - 業界標準に従うことで、認知的負荷を減らす
   - ユーザーは「考えなくても使える」UIを好む

3. **独自性は戦略的に**
   - すべてを革新的にする必要はない
   - 差別化すべき部分と従うべき部分を見極める

---

## なぜ重要なのか

### 1. 学習コストの削減

ユーザーは新しいサイトやアプリを使うたびに、「どう使うか」を学ぶ必要があります。

**問題:**
```
独自のナビゲーション → ユーザーは迷う
独自のアイコン → 意味が伝わらない
独自の操作方法 → 使い方がわからない
```

**解決策:**
```
標準的なパターン → 直感的に理解できる
業界標準のアイコン → 即座に認識できる
慣れた操作方法 → すぐに使い始められる
```

### 2. ユーザーの期待に応える

ユーザーは過去の経験から、「こうあるべき」という期待を持っています。

**期待される場所:**
- ロゴは左上 → クリックでホームに戻る
- 検索バーは右上
- ハンバーガーメニューは左上または右上
- カートアイコンは右上
- フッターに会社情報・リンク

**期待される動作:**
- リンクは青または下線付き
- ボタンはクリック可能な見た目
- スクロールバーは右端
- 戻るボタンで前のページに戻る

### 3. コンバージョン率の向上

使いやすいUIは、ユーザーの目標達成を助けます。

**データで見る効果:**
- 標準的なチェックアウトフロー → カート放棄率が低い
- わかりやすいナビゲーション → 直帰率が低い
- 慣れたフォームレイアウト → 入力完了率が高い

---

## 実践例

### 例1: ナビゲーション

#### ❌ 悪い例（独自パターン）

```vue
<template>
  <!-- ナビゲーションが下部にある（非標準） -->
  <div class="page">
    <main>コンテンツ</main>
    <nav class="bottom-nav">
      <!-- ユーザーは上部を探す -->
      <a href="/">ホーム</a>
      <a href="/about">会社概要</a>
    </nav>
  </div>
</template>
```

**問題:**
- ユーザーは上部にナビゲーションを期待している
- 見つけるまでに時間がかかる
- 使いにくいと感じる

#### ✅ 良い例（標準パターン）

```vue
<template>
  <!-- ナビゲーションが上部にある（標準） -->
  <div class="page">
    <header>
      <nav class="top-nav">
        <a href="/" class="logo">
          <img src="/logo.svg" alt="サイト名">
        </a>
        <ul>
          <li><a href="/">ホーム</a></li>
          <li><a href="/about">会社概要</a></li>
          <li><a href="/contact">お問い合わせ</a></li>
        </ul>
      </nav>
    </header>
    <main>コンテンツ</main>
  </div>
</template>
```

**利点:**
- ユーザーの期待通りの位置
- すぐに見つけられる
- 迷わず使える

### 例2: フォームレイアウト

#### ❌ 悪い例（独自レイアウト）

```vue
<template>
  <!-- ラベルが入力欄の下にある（非標準） -->
  <form>
    <input type="text" id="name">
    <label for="name">お名前</label>

    <input type="email" id="email">
    <label for="email">メールアドレス</label>
  </form>
</template>
```

**問題:**
- ラベルが下にあるのは直感的でない
- 入力する前に何を入力すべきかわからない

#### ✅ 良い例（標準レイアウト）

```vue
<template>
  <!-- ラベルが入力欄の上または左にある（標準） -->
  <form>
    <div class="form-field">
      <label for="name">お名前</label>
      <input type="text" id="name">
    </div>

    <div class="form-field">
      <label for="email">メールアドレス</label>
      <input type="email" id="email">
    </div>
  </form>
</template>
```

**利点:**
- ラベルを読んでから入力できる
- フォーム全体の流れが自然

### 例3: ボタンの配置

#### ❌ 悪い例（独自配置）

```vue
<template>
  <!-- キャンセルボタンが右、確定ボタンが左（非標準） -->
  <div class="dialog">
    <p>本当に削除しますか？</p>
    <div class="actions">
      <button class="primary">削除</button>
      <button class="secondary">キャンセル</button>
    </div>
  </div>
</template>
```

**問題:**
- 多くのUIでは、確定ボタンは右側
- ユーザーが間違って削除してしまう可能性

#### ✅ 良い例（標準配置）

```vue
<template>
  <!-- キャンセルボタンが左、確定ボタンが右（標準） -->
  <div class="dialog">
    <p>本当に削除しますか？</p>
    <div class="actions">
      <button class="secondary">キャンセル</button>
      <button class="danger">削除</button>
    </div>
  </div>
</template>
```

**利点:**
- ユーザーの期待通りの配置
- 誤操作が減る
- 安心して使える

### 例4: アイコンの使用

#### ❌ 悪い例（独自アイコン）

```vue
<template>
  <!-- 一般的でないアイコン -->
  <button>
    🎯 <!-- 検索を表すつもり -->
    検索
  </button>

  <button>
    🌟 <!-- お気に入りを表すつもり -->
  </button>
</template>
```

**問題:**
- アイコンの意味が伝わらない
- ユーザーが推測する必要がある

#### ✅ 良い例（標準アイコン）

```vue
<template>
  <!-- 一般的なアイコン（Font Awesome、Material Icons等） -->
  <button>
    🔍 <!-- 虫眼鏡アイコン -->
    検索
  </button>

  <button>
    ⭐ <!-- 星アイコン -->
    お気に入り
  </button>
</template>
```

**利点:**
- 一目で意味がわかる
- 世界中で共通認識
- テキストなしでも理解できる

---

## よくある失敗パターン

### 1. 「革新的すぎる」デザイン

**失敗例:**
- 縦書きのナビゲーション
- 右から左へのスクロール
- 非標準のジェスチャー操作

**なぜ失敗するか:**
- ユーザーは使い方を学ぶコストを嫌う
- 「おしゃれ」は「使いやすい」を意味しない

### 2. デザイナーの自己表現

**失敗例:**
- 「他と違う」ことを目的にした独自UI
- 「クール」だが使いにくいインタラクション
- アート作品のようなナビゲーション

**なぜ失敗するか:**
- デザインの目的はユーザーの目標達成
- デザイナーの満足ではなく、ユーザーの満足が優先

### 3. モバイルとデスクトップの不一致

**失敗例:**
- モバイルでは標準パターン、デスクトップでは独自パターン
- プラットフォームごとに全く異なるUI

**なぜ失敗するか:**
- ユーザーは複数デバイスを使い分ける
- 一貫性がないと混乱する

---

## 適用のベストプラクティス

### 1. 業界標準を調査する

**実践方法:**
```
1. 競合サイトを5-10個チェック
2. 共通するパターンを抽出
3. そのパターンを採用する
```

**調査項目:**
- ナビゲーションの位置
- ボタンの配置
- フォームのレイアウト
- アイコンの使い方
- チェックアウトフロー

### 2. プラットフォームガイドラインに従う

**iOS:**
- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)

**Android:**
- [Material Design](https://material.io/design)

**Web:**
- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/)

### 3. A/Bテストで検証する

**テスト例:**
```
A: 標準的なナビゲーション
B: 独自のナビゲーション

測定指標:
- タスク完了率
- 完了時間
- ユーザー満足度
```

### 4. ユーザーテストを実施する

**観察ポイント:**
- ユーザーが迷っていないか
- 期待と違う動作に戸惑っていないか
- 「これどうやって使うの？」と言っていないか

---

## 例外と注意点

### 例外1: ブランドの差別化

**適切な独自性:**
- ビジュアルデザイン（色、タイポグラフィ）
- コンテンツの見せ方
- マイクロインタラクション

**避けるべき独自性:**
- 基本的なナビゲーション構造
- フォームの入力パターン
- 標準的な操作方法

### 例外2: イノベーションが必要な場合

**新しいパターンを導入すべき時:**
- 既存パターンでは問題が解決できない
- 技術的に新しい可能性がある
- 業界全体が変化しつつある

**注意点:**
- 十分なユーザーテストを実施
- 段階的に導入（一部のユーザーから）
- フィードバックを収集して改善

### 例外3: ターゲットユーザーが特殊な場合

**例:**
- デザイナー向けツール → より高度なUIも許容される
- ゲーム → 没入感のために独自UIが効果的
- アート作品 → 体験自体が目的

**判断基準:**
- ユーザーが学習コストを受け入れる価値があるか
- その独自性が体験の本質か

---

## Vue/Nuxtでの実装例

### 標準的なヘッダーコンポーネント

```vue
<template>
  <header :class="headerClass">
    <!-- ロゴは左上（クリックでホームへ） -->
    <NuxtLink to="/" class="logo">
      <img src="/logo.svg" alt="サイト名">
    </NuxtLink>

    <!-- ナビゲーションは右側 -->
    <nav class="main-nav">
      <ul>
        <li><NuxtLink to="/products">製品</NuxtLink></li>
        <li><NuxtLink to="/pricing">料金</NuxtLink></li>
        <li><NuxtLink to="/about">会社概要</NuxtLink></li>
      </ul>
    </nav>

    <!-- アクションボタンは最右 -->
    <div class="actions">
      <NuxtLink to="/login" class="btn-secondary">
        ログイン
      </NuxtLink>
      <NuxtLink to="/signup" class="btn-primary">
        無料で始める
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const headerClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 2rem',
  borderBottom: '1px solid',
  borderColor: 'gray.200'
})
</script>
```

### 標準的なフォームコンポーネント

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- ラベルは上 -->
    <div class="form-field">
      <label for="email">メールアドレス</label>
      <input
        id="email"
        v-model="email"
        type="email"
        placeholder="your@email.com"
        required
      >
    </div>

    <div class="form-field">
      <label for="password">パスワード</label>
      <input
        id="password"
        v-model="password"
        type="password"
        required
      >
    </div>

    <!-- 送信ボタンは下、全幅 -->
    <button type="submit" class="btn-primary full-width">
      ログイン
    </button>

    <!-- サブアクションは下部中央 -->
    <div class="form-footer">
      <NuxtLink to="/forgot-password">
        パスワードを忘れた方
      </NuxtLink>
    </div>
  </form>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')

const handleSubmit = () => {
  // ログイン処理
}
</script>
```

---

## まとめ

### ヤコブの法則の本質

1. **ユーザーは学習コストを嫌う**
   - 既知のパターンを使えば、すぐに使える
   - 新しいパターンは学習に時間がかかる

2. **一貫性が信頼を生む**
   - 標準パターンに従う = プロフェッショナル
   - 独自パターン = 使いにくい、信頼できない

3. **独自性は戦略的に**
   - 差別化すべき部分を見極める
   - 基本的な操作は標準パターンに従う

### 実践チェックリスト

✅ ナビゲーションは上部にあるか？
✅ ロゴは左上で、クリックでホームに戻るか？
✅ ボタンの配置は標準的か（確定ボタンは右）？
✅ フォームのラベルは入力欄の上または左か？
✅ アイコンは一般的なものを使っているか？
✅ リンクは青または下線付きか？
✅ 検索バーは右上にあるか？
✅ フッターに会社情報やリンクがあるか？

### 重要な原則

> **「独創的であることより、使いやすいことが重要」**

- デザインの目的は、ユーザーの目標達成を助けること
- 美しさや独自性は、使いやすさの後に来る
- ユーザーテストで常に検証する

---

## 参考リンク

- [Jakob's Law of Internet User Experience - Nielsen Norman Group](https://www.nngroup.com/videos/jakobs-law-internet-ux/)
- [Web Design Trends - Nielsen Norman Group](https://www.nngroup.com/articles/web-design-trends/)
- [UI Patterns](https://ui-patterns.com/)
- プロジェクト内の実装例: `components/design-system/` 配下のコンポーネント
