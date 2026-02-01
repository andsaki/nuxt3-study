<script setup lang="ts">
import { css } from '~/styled-system/css'
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'フィッツの法則デモ - Nuxt 3 Study',
  description: 'ターゲットが大きく近いほど、素早く正確に操作できる。ボタンサイズと距離による操作性の違いを体験できるインタラクティブデモ',
})

// タイマー管理（大きいボタン用）
const startTimeLarge = ref<number | null>(null)
const endTimeLarge = ref<number | null>(null)
const isTimerRunningLarge = ref(false)

const elapsedTimeLarge = computed(() => {
  if (startTimeLarge.value && endTimeLarge.value) {
    return ((endTimeLarge.value - startTimeLarge.value) / 1000).toFixed(3)
  }
  return null
})

const startTimerLarge = () => {
  startTimeLarge.value = Date.now()
  endTimeLarge.value = null
  isTimerRunningLarge.value = true
}

const stopTimerLarge = () => {
  if (isTimerRunningLarge.value) {
    endTimeLarge.value = Date.now()
    isTimerRunningLarge.value = false
  }
}

const resetTimerLarge = () => {
  startTimeLarge.value = null
  endTimeLarge.value = null
  isTimerRunningLarge.value = false
}

// タイマー管理（小さいボタン用）
const startTimeSmall = ref<number | null>(null)
const endTimeSmall = ref<number | null>(null)
const isTimerRunningSmall = ref(false)

const elapsedTimeSmall = computed(() => {
  if (startTimeSmall.value && endTimeSmall.value) {
    return ((endTimeSmall.value - startTimeSmall.value) / 1000).toFixed(3)
  }
  return null
})

const startTimerSmall = () => {
  startTimeSmall.value = Date.now()
  endTimeSmall.value = null
  isTimerRunningSmall.value = true
}

const stopTimerSmall = () => {
  if (isTimerRunningSmall.value) {
    endTimeSmall.value = Date.now()
    isTimerRunningSmall.value = false
  }
}

const resetTimerSmall = () => {
  startTimeSmall.value = null
  endTimeSmall.value = null
  isTimerRunningSmall.value = false
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
  minHeight: '300px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const timerBoxClass = css({
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: 'blue.50',
  borderRadius: 'md',
  textAlign: 'center',
})

const timerTextClass = css({
  fontSize: '0.875rem',
  color: 'gray.600',
  marginBottom: '0.5rem',
})

const timerValueClass = css({
  fontSize: '2rem',
  fontWeight: 'bold',
  color: 'blue.600',
})

const resetButtonClass = css({
  marginTop: '0.5rem',
  padding: '0.5rem 1rem',
  backgroundColor: 'gray.200',
  border: 'none',
  borderRadius: 'md',
  cursor: 'pointer',
  fontSize: '0.875rem',
  _hover: {
    backgroundColor: 'gray.300',
  },
})
</script>

<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1 :class="titleClass">
        フィッツの法則デモ
      </h1>
      <p :class="subtitleClass">
        ターゲットが大きく近いほど、素早く正確に操作できる
      </p>
    </header>

    <!-- セクション1: ボタンサイズの比較 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="1. ボタンサイズの比較"
        icon="🎯"
        color-scheme="blue"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は大きいボタン、右は小さいボタンです。どちらが素早くクリックできるか試してみてください。
        </p>

        <div :class="demoGridClass">
          <!-- 大きいボタン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                大きいボタン
              </h3>
              <p :class="demoDescClass">
                クリックしやすく、操作ミスが少ない
              </p>
            </div>
            <div :class="demoBoxClass">
              <button
                :class="css({
                  width: '200px',
                  height: '80px',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  backgroundColor: 'blue.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'lg',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    backgroundColor: 'blue.600',
                    transform: 'scale(1.05)',
                  },
                })"
              >
                クリック
              </button>
            </div>
          </div>

          <!-- 小さいボタン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                小さいボタン
              </h3>
              <p :class="demoDescClass">
                クリックしづらく、操作ミスが起きやすい
              </p>
            </div>
            <div :class="demoBoxClass">
              <button
                :class="css({
                  width: '80px',
                  height: '30px',
                  fontSize: '0.75rem',
                  backgroundColor: 'red.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'sm',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    backgroundColor: 'red.600',
                  },
                })"
              >
                クリック
              </button>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション2: ボタン距離の比較 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="2. ボタン距離の比較"
        icon="📏"
        color-scheme="green"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左はスタート位置から近い、右は遠い位置にボタンがあります。マウスの移動距離による操作性の違いを体験できます。
        </p>

        <div :class="demoGridClass">
          <!-- 近いボタン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                近い位置のボタン
              </h3>
              <p :class="demoDescClass">
                マウス移動が少なく、素早く操作できる
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '1rem' })">
                <div :class="css({ fontSize: '0.875rem', color: 'gray.600' })">
                  ▼ ここからスタート
                </div>
                <button
                  :class="css({
                    width: '150px',
                    height: '60px',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    backgroundColor: 'green.500',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    _hover: {
                      backgroundColor: 'green.600',
                    },
                  })"
                >
                  クリック
                </button>
              </div>
            </div>
          </div>

          <!-- 遠いボタン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                遠い位置のボタン
              </h3>
              <p :class="demoDescClass">
                マウス移動が多く、時間がかかる
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' })">
                <div :class="css({ fontSize: '0.875rem', color: 'gray.600' })">
                  ▼ ここからスタート
                </div>
                <button
                  :class="css({
                    width: '150px',
                    height: '60px',
                    fontSize: '1.25rem',
                    fontWeight: 'bold',
                    backgroundColor: 'red.500',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    alignSelf: 'flex-end',
                    transition: 'all 0.2s',
                    _hover: {
                      backgroundColor: 'red.600',
                    },
                  })"
                >
                  クリック
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション3: インタラクティブ計測デモ -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="3. 反応時間を計測してみよう"
        icon="⏱️"
        color-scheme="purple"
        variant="bordered"
      >
        <p :class="demoDescClass">
          「開始」ボタンを押してから、目的のボタンをクリックするまでの時間を計測します。ボタンサイズで反応時間がどう変わるか体験できます。
        </p>

        <div :class="demoGridClass">
          <!-- 大きいターゲット -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">大きいターゲット</span>
              </h3>
              <p :class="demoDescClass">
                青いボタンをクリック
              </p>
            </div>
            <div :class="demoBoxClass">
              <button
                :class="css({
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '2rem',
                  backgroundColor: 'green.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'md',
                  cursor: 'pointer',
                  fontWeight: 'semibold',
                  fontSize: '1rem',
                  _hover: { backgroundColor: 'green.600' },
                })"
                @click="startTimerLarge"
              >
                開始
              </button>
              <button
                :class="css({
                  width: '200px',
                  height: '100px',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  backgroundColor: 'blue.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'lg',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    backgroundColor: 'blue.600',
                  },
                })"
                @click="stopTimerLarge"
              >
                クリック！
              </button>
              <div v-if="elapsedTimeLarge" :class="timerBoxClass">
                <p :class="timerTextClass">
                  反応時間
                </p>
                <p :class="timerValueClass">
                  {{ elapsedTimeLarge }}秒
                </p>
                <button :class="resetButtonClass" @click="resetTimerLarge">
                  リセット
                </button>
              </div>
            </div>
          </div>

          <!-- 小さいターゲット -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">小さいターゲット</span>
              </h3>
              <p :class="demoDescClass">
                青いボタンをクリック
              </p>
            </div>
            <div :class="demoBoxClass">
              <button
                :class="css({
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '2rem',
                  backgroundColor: 'green.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'md',
                  cursor: 'pointer',
                  fontWeight: 'semibold',
                  fontSize: '1rem',
                  _hover: { backgroundColor: 'green.600' },
                })"
                @click="startTimerSmall"
              >
                開始
              </button>
              <button
                :class="css({
                  width: '60px',
                  height: '40px',
                  fontSize: '0.75rem',
                  backgroundColor: 'blue.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'sm',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  _hover: {
                    backgroundColor: 'blue.600',
                  },
                })"
                @click="stopTimerSmall"
              >
                クリック
              </button>
              <div v-if="elapsedTimeSmall" :class="timerBoxClass">
                <p :class="timerTextClass">
                  反応時間
                </p>
                <p :class="timerValueClass">
                  {{ elapsedTimeSmall }}秒
                </p>
                <button :class="resetButtonClass" @click="resetTimerSmall">
                  リセット
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- フィッツの法則の説明 -->
    <DesignSystemInfoBox
      variant="info"
      title="フィッツの法則とは？"
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
          フィッツの法則（Fitts's Law）は、ターゲットへの移動時間とサイズ・距離の関係を表す法則です。
        </p>
        <div
          :class="css({
            padding: '1rem',
            backgroundColor: 'gray.50',
            borderRadius: 'md',
            marginBottom: '1rem',
            fontFamily: 'monospace',
            textAlign: 'center',
          })"
        >
          <strong>MT = a + b × log₂(D/W + 1)</strong>
          <p :class="css({ fontSize: '0.875rem', marginTop: '0.5rem', color: 'gray.600' })">
            MT: 移動時間 / D: 距離 / W: ターゲットの幅 / a, b: 定数
          </p>
        </div>
        <ul
          :class="css({
            listStyle: 'disc',
            paddingLeft: '1.5rem',
          })"
        >
          <li><strong>ターゲットが大きいほど、素早く正確に操作できる</strong></li>
          <li>ターゲットが近いほど、短時間で到達できる</li>
          <li>重要なボタンは大きく、よくアクセスする場所に配置すべき</li>
          <li>タッチデバイスでは特に重要（指のサイズを考慮）</li>
          <li>提唱者: ポール・フィッツ（Paul Fitts）- 1954年</li>
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
        <li>✅ 主要なアクションボタンは大きく（最小44×44px推奨）</li>
        <li>✅ クリック可能な要素には十分なパディングを設定</li>
        <li>✅ よく使う機能は画面の端やコーナーに配置（無限の幅として機能）</li>
        <li>✅ モバイルでは指でタップしやすいサイズに（48×48px以上推奨）</li>
        <li>✅ 関連するボタンは近くに配置</li>
        <li>✅ ドロップダウンメニューは親要素に近い位置に表示</li>
        <li>✅ 重要でないボタンは小さくして誤クリックを防ぐ</li>
        <li>✅ ホバー状態で視覚的フィードバックを提供</li>
      </ul>
    </DesignSystemInfoBox>

    <!-- 実例 -->
    <DesignSystemInfoBox
      variant="warning"
      title="よくある適用例"
      icon="🔗"
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
          <strong>macOSのメニューバー</strong>: 画面上端に配置し、無限の高さとして機能
        </li>
        <li>
          <strong>Windowsのスタートボタン</strong>: 画面左下の角に配置し、マウス移動を最小化
        </li>
        <li>
          <strong>スマホのキーボード</strong>: よく使う文字を大きく、頻度が低い記号は小さく
        </li>
        <li>
          <strong>Webフォーム</strong>: 送信ボタンを大きく、キャンセルボタンを小さく
        </li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
