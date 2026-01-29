<script setup lang="ts">
import { css } from '~/styled-system/css'

useSeoMeta({
  title: 'ヤコブの法則デモ - Nuxt 3 Study',
  description: 'ユーザーは慣れ親しんだUIパターンを期待する。標準パターンと独自パターンの違いを体験できるインタラクティブデモ',
})

// スタイル（レイアウトのみ）
const containerClass = css({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: { base: '1rem', md: '2rem' },
})

const headerClass = css({
  marginBottom: '3rem',
  textAlign: 'center',
})

const titleClass = css({
  fontSize: { base: '2rem', md: '3rem' },
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: 'blue.600',
})

const subtitleClass = css({
  fontSize: { base: '1rem', md: '1.25rem' },
  color: 'gray.600',
})

const sectionClass = css({
  marginBottom: '2rem',
})

const demoGridClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
  gap: '1.5rem',
  marginTop: '1.5rem',
})

const goodBadgeClass = css({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderRadius: 'full',
  textTransform: 'uppercase',
  marginRight: '0.5rem',
  backgroundColor: 'green.100',
  color: 'green.800',
})

const badBadgeClass = css({
  display: 'inline-block',
  padding: '0.25rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: 'bold',
  borderRadius: 'full',
  textTransform: 'uppercase',
  marginRight: '0.5rem',
  backgroundColor: 'red.100',
  color: 'red.800',
})

const demoTitleClass = css({
  fontSize: '1.1rem',
  fontWeight: 'semibold',
  marginBottom: '0.75rem',
})

const demoDescClass = css({
  fontSize: '0.875rem',
  color: 'gray.600',
  marginBottom: '1rem',
})

const demoBoxClass = css({
  padding: '1.5rem',
  backgroundColor: 'white',
  border: '2px solid',
  borderColor: 'gray.200',
  borderRadius: 'lg',
})

// ヘッダーのスタイル
const standardHeaderClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
  backgroundColor: 'white',
  borderBottom: '1px solid',
  borderColor: 'gray.200',
})

const weirdHeaderClass = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem',
  backgroundColor: 'purple.100',
  gap: '0.5rem',
})

const logoClass = css({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: 'blue.600',
  cursor: 'pointer',
  _hover: {
    color: 'blue.700',
  },
})

const navClass = css({
  display: 'flex',
  gap: '1.5rem',
})

const navLinkClass = css({
  color: 'gray.700',
  textDecoration: 'none',
  _hover: {
    color: 'blue.600',
  },
})

// フォームのスタイル
const standardFormFieldClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  marginBottom: '1.5rem',
})

const weirdFormFieldClass = css({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '0.75rem',
  marginBottom: '1.5rem',
})

const labelClass = css({
  fontSize: '0.875rem',
  fontWeight: 'semibold',
  color: 'gray.700',
})

const inputClass = css({
  padding: '0.5rem 0.75rem',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontSize: '1rem',
  _focus: {
    outline: 'none',
    borderColor: 'blue.500',
    ring: '2px',
    ringColor: 'blue.200',
  },
})

// ボタン配置のスタイル
const standardDialogClass = css({
  padding: '1.5rem',
  backgroundColor: 'white',
  borderRadius: 'lg',
  border: '1px solid',
  borderColor: 'gray.300',
})

const dialogTitleClass = css({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
})

const dialogTextClass = css({
  color: 'gray.600',
  marginBottom: '1.5rem',
})

const dialogActionsClass = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
})

const dialogActionsReversedClass = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '0.75rem',
  flexDirection: 'row-reverse',
})

const secondaryButtonClass = css({
  padding: '0.5rem 1rem',
  backgroundColor: 'white',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  cursor: 'pointer',
  fontWeight: 'semibold',
  _hover: {
    backgroundColor: 'gray.50',
  },
})

const dangerButtonClass = css({
  padding: '0.5rem 1rem',
  backgroundColor: 'red.500',
  color: 'white',
  border: 'none',
  borderRadius: 'md',
  cursor: 'pointer',
  fontWeight: 'semibold',
  _hover: {
    backgroundColor: 'red.600',
  },
})

// 検索バーのスタイル
const searchBarRightClass = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
})

const searchInputClass = css({
  padding: '0.5rem',
  border: '1px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  width: '200px',
})
</script>

<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1 :class="titleClass">
        ヤコブの法則デモ
      </h1>
      <p :class="subtitleClass">
        ユーザーは慣れ親しんだUIパターンを期待する
      </p>
    </header>

    <!-- セクション1: ナビゲーションの配置 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="1. ナビゲーションの配置"
        icon="🧭"
        color-scheme="blue"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は標準的な配置（ロゴ左上、ナビゲーション右）、右は非標準的な配置です。どちらが使いやすいか比較してみてください。
        </p>

        <div :class="demoGridClass">
          <!-- 標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                標準的な配置
              </h3>
              <p :class="demoDescClass">
                ロゴ左上、ナビゲーション右側（業界標準）
              </p>
            </div>
            <div :class="demoBoxClass">
              <header :class="standardHeaderClass">
                <div :class="logoClass">
                  Logo
                </div>
                <nav :class="navClass">
                  <a href="#" :class="navLinkClass">ホーム</a>
                  <a href="#" :class="navLinkClass">製品</a>
                  <a href="#" :class="navLinkClass">会社概要</a>
                </nav>
              </header>
            </div>
          </div>

          <!-- 非標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                非標準的な配置
              </h3>
              <p :class="demoDescClass">
                中央配置、縦積み（ユーザーが迷う）
              </p>
            </div>
            <div :class="demoBoxClass">
              <header :class="weirdHeaderClass">
                <div :class="logoClass">
                  Logo
                </div>
                <nav :class="navClass">
                  <a href="#" :class="navLinkClass">ホーム</a>
                  <a href="#" :class="navLinkClass">製品</a>
                  <a href="#" :class="navLinkClass">会社概要</a>
                </nav>
              </header>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション2: フォームレイアウト -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="2. フォームレイアウト"
        icon="📝"
        color-scheme="green"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左はラベルが入力欄の上（標準）、右はラベルが入力欄の下（非標準）です。
        </p>

        <div :class="demoGridClass">
          <!-- 標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                標準的なフォーム
              </h3>
              <p :class="demoDescClass">
                ラベルが入力欄の上（読んでから入力）
              </p>
            </div>
            <div :class="demoBoxClass">
              <form>
                <div :class="standardFormFieldClass">
                  <label :class="labelClass">お名前</label>
                  <input
                    :class="inputClass"
                    type="text"
                    placeholder="山田 太郎"
                  >
                </div>
                <div :class="standardFormFieldClass">
                  <label :class="labelClass">メールアドレス</label>
                  <input
                    :class="inputClass"
                    type="email"
                    placeholder="your@email.com"
                  >
                </div>
              </form>
            </div>
          </div>

          <!-- 非標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                非標準的なフォーム
              </h3>
              <p :class="demoDescClass">
                ラベルが入力欄の下（何を入力すべきか分からない）
              </p>
            </div>
            <div :class="demoBoxClass">
              <form>
                <div :class="weirdFormFieldClass">
                  <label :class="labelClass">お名前</label>
                  <input
                    :class="inputClass"
                    type="text"
                    placeholder="???"
                  >
                </div>
                <div :class="weirdFormFieldClass">
                  <label :class="labelClass">メールアドレス</label>
                  <input
                    :class="inputClass"
                    type="email"
                    placeholder="???"
                  >
                </div>
              </form>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション3: ボタンの配置 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="3. ボタンの配置"
        icon="🔘"
        color-scheme="red"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左はキャンセルが左、削除が右（標準）、右はその逆（非標準）です。誤操作のリスクを比較してみてください。
        </p>

        <div :class="demoGridClass">
          <!-- 標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                標準的な配置
              </h3>
              <p :class="demoDescClass">
                キャンセル左、確定ボタン右（期待通り）
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="standardDialogClass">
                <h4 :class="dialogTitleClass">
                  削除の確認
                </h4>
                <p :class="dialogTextClass">
                  本当に削除しますか？この操作は取り消せません。
                </p>
                <div :class="dialogActionsClass">
                  <button :class="secondaryButtonClass">
                    キャンセル
                  </button>
                  <button :class="dangerButtonClass">
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 非標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                非標準的な配置
              </h3>
              <p :class="demoDescClass">
                削除が左、キャンセルが右（誤操作しやすい）
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="standardDialogClass">
                <h4 :class="dialogTitleClass">
                  削除の確認
                </h4>
                <p :class="dialogTextClass">
                  本当に削除しますか？この操作は取り消せません。
                </p>
                <div :class="dialogActionsReversedClass">
                  <button :class="secondaryButtonClass">
                    キャンセル
                  </button>
                  <button :class="dangerButtonClass">
                    削除
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション4: 検索バーの位置 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="4. 検索バーの位置"
        icon="🔍"
        color-scheme="purple"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は右上に検索（標準）、右は左下に検索（非標準）です。どちらがすぐに見つかるでしょうか？
        </p>

        <div :class="demoGridClass">
          <!-- 標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                標準的な位置
              </h3>
              <p :class="demoDescClass">
                検索バーが右上（すぐに見つかる）
              </p>
            </div>
            <div :class="demoBoxClass">
              <header :class="standardHeaderClass">
                <div :class="logoClass">
                  Logo
                </div>
                <div :class="searchBarRightClass">
                  <input
                    :class="searchInputClass"
                    type="search"
                    placeholder="検索..."
                  >
                </div>
              </header>
            </div>
          </div>

          <!-- 非標準パターン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                非標準的な位置
              </h3>
              <p :class="demoDescClass">
                検索バーが下部左（探すのに時間がかかる）
              </p>
            </div>
            <div :class="demoBoxClass">
              <header :class="weirdHeaderClass">
                <div :class="logoClass">
                  Logo
                </div>
              </header>
              <div :class="css({ padding: '1rem', display: 'flex' })">
                <input
                  :class="searchInputClass"
                  type="search"
                  placeholder="検索..."
                >
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- ヤコブの法則の説明 -->
    <DesignSystemInfoBox
      variant="info"
      title="ヤコブの法則とは？"
      icon="💡"
      left-border
      :class="css({ marginTop: '3rem' })"
    >
      <ul
        :class="css({
          listStyle: 'disc',
          paddingLeft: '1.5rem',
          lineHeight: '1.8',
        })"
      >
        <li><strong>ユーザーは他のサイトで多くの時間を過ごしている</strong></li>
        <li>既に知っているパターンと同じように動作することを期待</li>
        <li>学習コストを最小化することが重要</li>
        <li>標準的なパターンに従うことで、直感的に使える</li>
        <li>独自性は、基本的な操作以外の部分で発揮すべき</li>
        <li>提唱者: ヤコブ・ニールセン（Jakob Nielsen）</li>
      </ul>
    </DesignSystemInfoBox>

    <!-- ベストプラクティス -->
    <DesignSystemInfoBox
      variant="success"
      title="実践チェックリスト"
      icon="✅"
      left-border
      :class="css({ marginTop: '2rem' })"
    >
      <ul
        :class="css({
          listStyle: 'none',
          paddingLeft: '0',
          lineHeight: '1.8',
        })"
      >
        <li>✅ ロゴは左上で、クリックでホームに戻る</li>
        <li>✅ ナビゲーションは上部または左側</li>
        <li>✅ 検索バーは右上</li>
        <li>✅ フォームのラベルは入力欄の上または左</li>
        <li>✅ 確定ボタンは右側、キャンセルは左側</li>
        <li>✅ リンクは青または下線付き</li>
        <li>✅ フッターに会社情報やリンク</li>
        <li>✅ ハンバーガーメニューは左上または右上</li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
