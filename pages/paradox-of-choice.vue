<script setup lang="ts">
import { css } from '~/styled-system/css'
import { ref } from 'vue'

useSeoMeta({
  title: '選択のパラドックスデモ - Nuxt 3 Study',
  description: '選択肢が多すぎると、決定が困難になり満足度が下がる。適切な選択肢の数と満足度の関係を体験できるインタラクティブデモ',
})

// 商品選択状態
const selectedProductFew = ref<string | null>(null)
const selectedProductMany = ref<string | null>(null)
const satisfactionFew = ref<number | null>(null)
const satisfactionMany = ref<number | null>(null)

// 少ない選択肢の商品
const productsFew = [
  { id: 1, name: 'ベーシックプラン', price: '¥1,000/月', features: ['基本機能', 'メールサポート'] },
  { id: 2, name: 'スタンダードプラン', price: '¥3,000/月', features: ['全機能', '優先サポート', 'API利用'] },
  { id: 3, name: 'プレミアムプラン', price: '¥5,000/月', features: ['全機能', '24時間サポート', 'カスタマイズ'] },
]

// 多すぎる選択肢の商品
const productsMany = [
  { id: 1, name: 'ライトプラン', price: '¥500/月', features: ['制限機能'] },
  { id: 2, name: 'ベーシックプラン', price: '¥1,000/月', features: ['基本機能'] },
  { id: 3, name: 'ベーシック+', price: '¥1,500/月', features: ['基本機能+'] },
  { id: 4, name: 'スタンダード', price: '¥2,000/月', features: ['標準機能'] },
  { id: 5, name: 'スタンダード+', price: '¥2,500/月', features: ['標準機能+'] },
  { id: 6, name: 'プロフェッショナル', price: '¥3,000/月', features: ['プロ機能'] },
  { id: 7, name: 'プロフェッショナル+', price: '¥3,500/月', features: ['プロ機能+'] },
  { id: 8, name: 'ビジネス', price: '¥4,000/月', features: ['ビジネス機能'] },
  { id: 9, name: 'ビジネス+', price: '¥4,500/月', features: ['ビジネス機能+'] },
  { id: 10, name: 'エンタープライズ', price: '¥5,000/月', features: ['全機能'] },
]

// 商品選択（少ない選択肢）
const selectProductFew = (id: number) => {
  selectedProductFew.value = String(id)
  satisfactionFew.value = null
}

// 商品選択（多い選択肢）
const selectProductMany = (id: number) => {
  selectedProductMany.value = String(id)
  satisfactionMany.value = null
}

// 満足度評価（少ない選択肢）
const rateFew = (rating: number) => {
  satisfactionFew.value = rating
}

// 満足度評価（多い選択肢）
const rateMany = (rating: number) => {
  satisfactionMany.value = rating
}

// リセット
const resetFew = () => {
  selectedProductFew.value = null
  satisfactionFew.value = null
}

const resetMany = () => {
  selectedProductMany.value = null
  satisfactionMany.value = null
}

// スタイル
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
  color: 'orange.600',
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
  minHeight: '400px',
})

const productCardClass = css({
  padding: '1rem',
  border: '2px solid',
  borderColor: 'gray.200',
  borderRadius: 'md',
  marginBottom: '0.75rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    borderColor: 'orange.400',
    backgroundColor: 'orange.50',
  },
})

const productCardSmallClass = css({
  padding: '0.75rem',
  border: '2px solid',
  borderColor: 'gray.200',
  borderRadius: 'md',
  marginBottom: '0.5rem',
  cursor: 'pointer',
  transition: 'all 0.2s',
  fontSize: '0.875rem',
  _hover: {
    borderColor: 'orange.400',
    backgroundColor: 'orange.50',
  },
})

const ratingBoxClass = css({
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: 'orange.50',
  borderRadius: 'md',
})
</script>

<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1 :class="titleClass">
        選択のパラドックスデモ
      </h1>
      <p :class="subtitleClass">
        選択肢が多すぎると、決定が困難になり満足度が下がる
      </p>
    </header>

    <!-- セクション1: 商品選択の比較 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="1. 商品プランの選択"
        icon="🛒"
        color-scheme="yellow"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は3つのプラン、右は10個のプランから選びます。どちらが選びやすく、満足度が高いでしょうか？
        </p>

        <div :class="demoGridClass">
          <!-- 適切な選択肢数 -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                3つの選択肢
              </h3>
              <p :class="demoDescClass">
                プランを選んで満足度を評価してください
              </p>
            </div>
            <div :class="demoBoxClass">
              <div v-for="product in productsFew" :key="product.id">
                <div
                  :class="productCardClass"
                  :style="{
                    borderColor: selectedProductFew === String(product.id) ? '#fb923c' : '#e5e7eb',
                    backgroundColor: selectedProductFew === String(product.id) ? '#ffedd5' : 'white',
                  }"
                  @click="selectProductFew(product.id)"
                >
                  <div :class="css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' })">
                    <h4 :class="css({ fontWeight: 'bold', fontSize: '1.1rem' })">
                      {{ product.name }}
                    </h4>
                    <span :class="css({ color: 'orange.600', fontWeight: 'bold' })">
                      {{ product.price }}
                    </span>
                  </div>
                  <ul :class="css({ fontSize: '0.875rem', color: 'gray.600', paddingLeft: '1.25rem' })">
                    <li v-for="(feature, idx) in product.features" :key="idx">
                      {{ feature }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- 満足度評価 -->
              <div v-if="selectedProductFew" :class="ratingBoxClass">
                <p :class="css({ fontSize: '0.875rem', fontWeight: 'semibold', marginBottom: '0.5rem' })">
                  選択の満足度を評価してください：
                </p>
                <div :class="css({ display: 'flex', gap: '0.5rem', justifyContent: 'center' })">
                  <button
                    v-for="star in 5"
                    :key="star"
                    :class="css({
                      fontSize: '2rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      _hover: { transform: 'scale(1.2)' },
                    })"
                    @click="rateFew(star)"
                  >
                    {{ satisfactionFew && star <= satisfactionFew ? '⭐' : '☆' }}
                  </button>
                </div>
                <button
                  :class="css({
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'gray.200',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    width: '100%',
                    _hover: { backgroundColor: 'gray.300' },
                  })"
                  @click="resetFew"
                >
                  リセット
                </button>
              </div>
            </div>
          </div>

          <!-- 多すぎる選択肢 -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                10個の選択肢
              </h3>
              <p :class="demoDescClass">
                プランを選んで満足度を評価してください
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ maxHeight: '350px', overflowY: 'auto' })">
                <div v-for="product in productsMany" :key="product.id">
                  <div
                    :class="productCardSmallClass"
                    :style="{
                      borderColor: selectedProductMany === String(product.id) ? '#fb923c' : '#e5e7eb',
                      backgroundColor: selectedProductMany === String(product.id) ? '#ffedd5' : 'white',
                    }"
                    @click="selectProductMany(product.id)"
                  >
                    <div :class="css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center' })">
                      <h4 :class="css({ fontWeight: 'semibold' })">
                        {{ product.name }}
                      </h4>
                      <span :class="css({ color: 'orange.600', fontWeight: 'bold', fontSize: '0.875rem' })">
                        {{ product.price }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 満足度評価 -->
              <div v-if="selectedProductMany" :class="ratingBoxClass">
                <p :class="css({ fontSize: '0.875rem', fontWeight: 'semibold', marginBottom: '0.5rem' })">
                  選択の満足度を評価してください：
                </p>
                <div :class="css({ display: 'flex', gap: '0.5rem', justifyContent: 'center' })">
                  <button
                    v-for="star in 5"
                    :key="star"
                    :class="css({
                      fontSize: '2rem',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      _hover: { transform: 'scale(1.2)' },
                    })"
                    @click="rateMany(star)"
                  >
                    {{ satisfactionMany && star <= satisfactionMany ? '⭐' : '☆' }}
                  </button>
                </div>
                <button
                  :class="css({
                    marginTop: '0.75rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'gray.200',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    width: '100%',
                    _hover: { backgroundColor: 'gray.300' },
                  })"
                  @click="resetMany"
                >
                  リセット
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- 選択のパラドックスの説明 -->
    <DesignSystemInfoBox
      variant="info"
      title="選択のパラドックスとは？"
      icon="💡"
      left-border
      :class="css({ marginTop: '3rem' })"
    >
      <div
        :class="css({
          lineHeight: '1.8',
        })"
      >
        <p :class="css({ marginBottom: '1rem' })">
          選択のパラドックス（Paradox of Choice）は、選択肢が多すぎると決定が困難になり、満足度が下がる現象です。
        </p>
        <ul
          :class="css({
            listStyle: 'disc',
            paddingLeft: '1.5rem',
          })"
        >
          <li><strong>選択肢が多すぎると、決定できなくなる</strong></li>
          <li>多くの選択肢は意思決定の負担を増やす</li>
          <li>選択後も「他の選択肢の方が良かったのでは」と後悔しやすい</li>
          <li>適切な数の選択肢を提供することで満足度が向上</li>
          <li>提唱者: バリー・シュワルツ（Barry Schwartz）- 2004年</li>
        </ul>
      </div>
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
        <li>✅ 商品プランは3〜5個程度に絞る</li>
        <li>✅ おすすめプランを明示して決定を助ける</li>
        <li>✅ 比較表で違いを明確にする</li>
        <li>✅ フィルター機能で選択肢を絞り込めるようにする</li>
        <li>✅ デフォルト値を設定して選択の負担を減らす</li>
        <li>✅ ステップ形式で段階的に選択肢を絞る</li>
        <li>✅ 「よく選ばれているプラン」などの社会的証明を活用</li>
        <li>✅ 選択後のキャンセルや変更を簡単にして心理的負担を軽減</li>
      </ul>
    </DesignSystemInfoBox>

    <!-- 実例 -->
    <DesignSystemInfoBox
      variant="warning"
      title="実例: 選択肢の削減効果"
      icon="📊"
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
        <li>
          <strong>Netflixのプラン</strong>: 複雑な選択肢を3つのシンプルなプランに統合
        </li>
        <li>
          <strong>iPhoneのモデル</strong>: 無数の選択肢ではなく、3〜4モデルに絞る
        </li>
        <li>
          <strong>レストランのメニュー</strong>: おすすめ料理を明示して決定を助ける
        </li>
        <li>
          <strong>ECサイトのフィルター</strong>: 段階的に選択肢を絞り込む仕組み
        </li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
