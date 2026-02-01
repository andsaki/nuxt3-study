<script setup lang="ts">
import { css } from '~/styled-system/css'
import { ref } from 'vue'

useSeoMeta({
  title: 'ミラーの法則デモ - Nuxt 3 Study',
  description: '人間の短期記憶は7±2個の項目を保持できる。記憶容量の限界とチャンキングの効果を体験できるインタラクティブデモ',
})

// ゲーム状態
type GamePhase = 'ready' | 'memorize' | 'input' | 'result'

const gamePhaseShort = ref<GamePhase>('ready')
const gamePhaseLong = ref<GamePhase>('ready')

// 短い数列（7個）
const shortSequence = ref<number[]>([])
const shortUserInput = ref('')
const shortResult = ref<boolean | null>(null)

// 長い数列（11個）
const longSequence = ref<number[]>([])
const longUserInput = ref('')
const longResult = ref<boolean | null>(null)

// ゲーム開始（短い数列）
const startShortGame = () => {
  shortSequence.value = Array.from({ length: 7 }, () => Math.floor(Math.random() * 10))
  shortUserInput.value = ''
  shortResult.value = null
  gamePhaseShort.value = 'memorize'

  // 3秒後に入力フェーズへ
  setTimeout(() => {
    gamePhaseShort.value = 'input'
  }, 3000)
}

// ゲーム開始（長い数列）
const startLongGame = () => {
  longSequence.value = Array.from({ length: 11 }, () => Math.floor(Math.random() * 10))
  longUserInput.value = ''
  longResult.value = null
  gamePhaseLong.value = 'memorize'

  // 3秒後に入力フェーズへ
  setTimeout(() => {
    gamePhaseLong.value = 'input'
  }, 3000)
}

// 答え合わせ（短い数列）
const checkShortAnswer = () => {
  const correct = shortSequence.value.join('')
  shortResult.value = shortUserInput.value === correct
  gamePhaseShort.value = 'result'
}

// 答え合わせ（長い数列）
const checkLongAnswer = () => {
  const correct = longSequence.value.join('')
  longResult.value = longUserInput.value === correct
  gamePhaseLong.value = 'result'
}

// リセット
const resetShortGame = () => {
  gamePhaseShort.value = 'ready'
  shortSequence.value = []
  shortUserInput.value = ''
  shortResult.value = null
}

const resetLongGame = () => {
  gamePhaseLong.value = 'ready'
  longSequence.value = []
  longUserInput.value = ''
  longResult.value = null
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
  color: 'purple.600',
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
  padding: '2rem',
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

const numberDisplayClass = css({
  fontSize: '2.5rem',
  fontWeight: 'bold',
  letterSpacing: '0.5rem',
  color: 'purple.600',
  marginBottom: '2rem',
  fontFamily: 'monospace',
})

const inputClass = css({
  width: '100%',
  maxWidth: '300px',
  padding: '1rem',
  fontSize: '1.5rem',
  textAlign: 'center',
  border: '2px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontFamily: 'monospace',
  letterSpacing: '0.3rem',
  _focus: {
    outline: 'none',
    borderColor: 'purple.500',
  },
})

const buttonClass = css({
  padding: '1rem 2rem',
  fontSize: '1rem',
  fontWeight: 'semibold',
  backgroundColor: 'purple.500',
  color: 'white',
  border: 'none',
  borderRadius: 'md',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'purple.600',
  },
})

const resultBoxClass = css({
  marginTop: '1rem',
  padding: '1.5rem',
  borderRadius: 'md',
  textAlign: 'center',
})

const resultTextClass = css({
  fontSize: '1.25rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
})
</script>

<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1 :class="titleClass">
        ミラーの法則デモ
      </h1>
      <p :class="subtitleClass">
        人間の短期記憶は7±2個の項目を保持できる
      </p>
    </header>

    <!-- セクション1: ナビゲーションメニューの項目数 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="1. ナビゲーションメニューの項目数"
        icon="📱"
        color-scheme="blue"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は7項目以内、右は12項目のメニューです。どちらが覚えやすいでしょうか？
        </p>

        <div :class="demoGridClass">
          <!-- 適切な項目数 -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                7項目以内
              </h3>
              <p :class="demoDescClass">
                記憶しやすく、目的の項目を見つけやすい
              </p>
            </div>
            <div :class="demoBoxClass">
              <nav :class="css({ width: '100%' })">
                <ul :class="css({ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' })">
                  <li :class="css({ padding: '0.75rem', backgroundColor: 'blue.50', borderRadius: 'md', fontWeight: 'semibold' })">
                    ホーム
                  </li>
                  <li :class="css({ padding: '0.75rem', backgroundColor: 'blue.50', borderRadius: 'md' })">
                    製品
                  </li>
                  <li :class="css({ padding: '0.75rem', backgroundColor: 'blue.50', borderRadius: 'md' })">
                    サービス
                  </li>
                  <li :class="css({ padding: '0.75rem', backgroundColor: 'blue.50', borderRadius: 'md' })">
                    会社情報
                  </li>
                  <li :class="css({ padding: '0.75rem', backgroundColor: 'blue.50', borderRadius: 'md' })">
                    採用情報
                  </li>
                  <li :class="css({ padding: '0.75rem', backgroundColor: 'blue.50', borderRadius: 'md' })">
                    お問い合わせ
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <!-- 多すぎる項目数 -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                12項目
              </h3>
              <p :class="demoDescClass">
                項目が多く、記憶や検索が困難
              </p>
            </div>
            <div :class="demoBoxClass">
              <nav :class="css({ width: '100%' })">
                <ul :class="css({ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.25rem', fontSize: '0.875rem' })">
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    ホーム
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    製品一覧
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    サービス
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    会社概要
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    ニュース
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    採用情報
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    IR情報
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    サポート
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    FAQ
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    パートナー
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    お問い合わせ
                  </li>
                  <li :class="css({ padding: '0.5rem', backgroundColor: 'red.50', borderRadius: 'sm' })">
                    サイトマップ
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション2: チャンキングの効果 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="2. チャンキング（グループ化）の効果"
        icon="🧩"
        color-scheme="green"
        variant="bordered"
      >
        <p :class="demoDescClass">
          情報をグループ化することで、覚えやすくなります。電話番号はその典型的な例です。
        </p>

        <div :class="demoGridClass">
          <!-- チャンキングなし -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                グループ化なし
              </h3>
              <p :class="demoDescClass">
                11桁の数字を一度に覚えるのは困難
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'gray.700' })">
                09012345678
              </div>
            </div>
          </div>

          <!-- チャンキングあり -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                グループ化あり
              </h3>
              <p :class="demoDescClass">
                3-4-4に分割すると覚えやすい
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ fontSize: '2rem', fontWeight: 'bold', fontFamily: 'monospace', color: 'green.600' })">
                090-1234-5678
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション3: 記憶ゲーム -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="3. 記憶力テスト"
        icon="🧠"
        color-scheme="purple"
        variant="bordered"
      >
        <p :class="demoDescClass">
          数字を3秒間記憶して、入力してください。短期記憶の限界を体験できます。
        </p>

        <div :class="demoGridClass">
          <!-- 7桁の記憶テスト -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">7桁</span>
                記憶しやすい
              </h3>
              <p :class="demoDescClass">
                7個の数字を記憶してください
              </p>
            </div>
            <div :class="demoBoxClass">
              <!-- 準備状態 -->
              <div v-if="gamePhaseShort === 'ready'">
                <button :class="buttonClass" @click="startShortGame">
                  スタート
                </button>
              </div>

              <!-- 記憶フェーズ -->
              <div v-else-if="gamePhaseShort === 'memorize'" :class="css({ textAlign: 'center' })">
                <p :class="css({ fontSize: '1rem', color: 'gray.600', marginBottom: '1rem' })">
                  覚えてください！
                </p>
                <div :class="numberDisplayClass">
                  {{ shortSequence.join(' ') }}
                </div>
              </div>

              <!-- 入力フェーズ -->
              <div v-else-if="gamePhaseShort === 'input'" :class="css({ textAlign: 'center', width: '100%' })">
                <p :class="css({ fontSize: '1rem', color: 'gray.600', marginBottom: '1rem' })">
                  数字を入力してください（スペースなし）
                </p>
                <input
                  v-model="shortUserInput"
                  :class="inputClass"
                  type="text"
                  maxlength="7"
                  placeholder="0000000"
                  @keyup.enter="checkShortAnswer"
                >
                <button
                  :class="css({ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: 'purple.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontWeight: 'semibold', _hover: { backgroundColor: 'purple.600' } })"
                  @click="checkShortAnswer"
                >
                  確認
                </button>
              </div>

              <!-- 結果フェーズ -->
              <div v-else-if="gamePhaseShort === 'result'" :class="css({ textAlign: 'center', width: '100%' })">
                <div :class="resultBoxClass" :style="{ backgroundColor: shortResult ? '#dcfce7' : '#fee2e2' }">
                  <p :class="resultTextClass" :style="{ color: shortResult ? '#166534' : '#991b1b' }">
                    {{ shortResult ? '正解！🎉' : '不正解...' }}
                  </p>
                  <p :class="css({ fontSize: '1rem', color: 'gray.700', marginBottom: '0.5rem' })">
                    正解: {{ shortSequence.join('') }}
                  </p>
                  <p :class="css({ fontSize: '1rem', color: 'gray.700', marginBottom: '1rem' })">
                    あなたの回答: {{ shortUserInput }}
                  </p>
                  <button
                    :class="css({ padding: '0.75rem 1.5rem', backgroundColor: 'gray.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontWeight: 'semibold', _hover: { backgroundColor: 'gray.600' } })"
                    @click="resetShortGame"
                  >
                    もう一度
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 11桁の記憶テスト -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">11桁</span>
                記憶が困難
              </h3>
              <p :class="demoDescClass">
                11個の数字を記憶してください
              </p>
            </div>
            <div :class="demoBoxClass">
              <!-- 準備状態 -->
              <div v-if="gamePhaseLong === 'ready'">
                <button :class="buttonClass" @click="startLongGame">
                  スタート
                </button>
              </div>

              <!-- 記憶フェーズ -->
              <div v-else-if="gamePhaseLong === 'memorize'" :class="css({ textAlign: 'center' })">
                <p :class="css({ fontSize: '1rem', color: 'gray.600', marginBottom: '1rem' })">
                  覚えてください！
                </p>
                <div :class="numberDisplayClass">
                  {{ longSequence.join(' ') }}
                </div>
              </div>

              <!-- 入力フェーズ -->
              <div v-else-if="gamePhaseLong === 'input'" :class="css({ textAlign: 'center', width: '100%' })">
                <p :class="css({ fontSize: '1rem', color: 'gray.600', marginBottom: '1rem' })">
                  数字を入力してください（スペースなし）
                </p>
                <input
                  v-model="longUserInput"
                  :class="inputClass"
                  type="text"
                  maxlength="11"
                  placeholder="00000000000"
                  @keyup.enter="checkLongAnswer"
                >
                <button
                  :class="css({ marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: 'purple.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontWeight: 'semibold', _hover: { backgroundColor: 'purple.600' } })"
                  @click="checkLongAnswer"
                >
                  確認
                </button>
              </div>

              <!-- 結果フェーズ -->
              <div v-else-if="gamePhaseLong === 'result'" :class="css({ textAlign: 'center', width: '100%' })">
                <div :class="resultBoxClass" :style="{ backgroundColor: longResult ? '#dcfce7' : '#fee2e2' }">
                  <p :class="resultTextClass" :style="{ color: longResult ? '#166534' : '#991b1b' }">
                    {{ longResult ? '正解！🎉' : '不正解...' }}
                  </p>
                  <p :class="css({ fontSize: '1rem', color: 'gray.700', marginBottom: '0.5rem' })">
                    正解: {{ longSequence.join('') }}
                  </p>
                  <p :class="css({ fontSize: '1rem', color: 'gray.700', marginBottom: '1rem' })">
                    あなたの回答: {{ longUserInput }}
                  </p>
                  <button
                    :class="css({ padding: '0.75rem 1.5rem', backgroundColor: 'gray.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontWeight: 'semibold', _hover: { backgroundColor: 'gray.600' } })"
                    @click="resetLongGame"
                  >
                    もう一度
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- ミラーの法則の説明 -->
    <DesignSystemInfoBox
      variant="info"
      title="ミラーの法則とは？"
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
          ミラーの法則（Miller's Law）は、人間の短期記憶容量に関する法則です。
        </p>
        <div
          :class="css({
            padding: '1rem',
            backgroundColor: 'gray.50',
            borderRadius: 'md',
            marginBottom: '1rem',
            textAlign: 'center',
          })"
        >
          <strong style="font-size: 1.5rem;">7 ± 2</strong>
          <p :class="css({ fontSize: '0.875rem', marginTop: '0.5rem', color: 'gray.600' })">
            短期記憶は平均して7個（5〜9個）の項目を保持できる
          </p>
        </div>
        <ul
          :class="css({
            listStyle: 'disc',
            paddingLeft: '1.5rem',
          })"
        >
          <li><strong>短期記憶の容量は限られている</strong> - 7±2個の「チャンク」を保持</li>
          <li>チャンキング（グループ化）により記憶容量を拡張できる</li>
          <li>電話番号を3-4-4に分割するのがチャンキングの例</li>
          <li>情報を意味のあるグループにまとめると覚えやすくなる</li>
          <li>提唱者: ジョージ・ミラー（George A. Miller）- 1956年</li>
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
        <li>✅ ナビゲーションメニューは5〜7項目以内に抑える</li>
        <li>✅ 多い場合はカテゴリでグループ化する</li>
        <li>✅ 電話番号、クレジットカード番号は適切に分割表示</li>
        <li>✅ ステップ形式のフォームは5〜7ステップ以内に</li>
        <li>✅ 選択肢が多い場合は検索機能を追加</li>
        <li>✅ 関連する情報は視覚的にグループ化</li>
        <li>✅ ブレッドクラムは3〜5階層程度に</li>
        <li>✅ タブメニューは7個以内、超える場合はドロップダウンに</li>
      </ul>
    </DesignSystemInfoBox>

    <!-- チャンキングの例 -->
    <DesignSystemInfoBox
      variant="warning"
      title="チャンキングの活用例"
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
          <strong>電話番号</strong>: 090-1234-5678（3-4-4のグループ化）
        </li>
        <li>
          <strong>クレジットカード</strong>: 1234 5678 9012 3456（4桁ずつ）
        </li>
        <li>
          <strong>郵便番号</strong>: 123-4567（3-4の分割）
        </li>
        <li>
          <strong>URL</strong>: https:// example.com /path/to/page（スラッシュで区切り）
        </li>
        <li>
          <strong>ナビゲーション</strong>: 製品 > カテゴリ > 商品名（階層化）
        </li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
