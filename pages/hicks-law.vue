<script setup lang="ts">
import { css } from '~/styled-system/css'
import { ref, computed } from 'vue'

useSeoMeta({
  title: 'ヒックの法則デモ - Nuxt 3 Study',
  description: '選択肢が増えるほど、意思決定にかかる時間が長くなる。選択肢の数と決定時間の関係を体験できるインタラクティブデモ',
})

// タイマー管理（3択用）
const startTimeSimple = ref<number | null>(null)
const endTimeSimple = ref<number | null>(null)
const isTimerRunningSimple = ref(false)

const elapsedTimeSimple = computed(() => {
  if (startTimeSimple.value && endTimeSimple.value) {
    return ((endTimeSimple.value - startTimeSimple.value) / 1000).toFixed(3)
  }
  return null
})

const startTimerSimple = () => {
  startTimeSimple.value = Date.now()
  endTimeSimple.value = null
  isTimerRunningSimple.value = true
}

const stopTimerSimple = () => {
  if (isTimerRunningSimple.value) {
    endTimeSimple.value = Date.now()
    isTimerRunningSimple.value = false
  }
}

const resetTimerSimple = () => {
  startTimeSimple.value = null
  endTimeSimple.value = null
  isTimerRunningSimple.value = false
}

// タイマー管理（12択用）
const startTimeComplex = ref<number | null>(null)
const endTimeComplex = ref<number | null>(null)
const isTimerRunningComplex = ref(false)

const elapsedTimeComplex = computed(() => {
  if (startTimeComplex.value && endTimeComplex.value) {
    return ((endTimeComplex.value - startTimeComplex.value) / 1000).toFixed(3)
  }
  return null
})

const startTimerComplex = () => {
  startTimeComplex.value = Date.now()
  endTimeComplex.value = null
  isTimerRunningComplex.value = true
}

const stopTimerComplex = () => {
  if (isTimerRunningComplex.value) {
    endTimeComplex.value = Date.now()
    isTimerRunningComplex.value = false
  }
}

const resetTimerComplex = () => {
  startTimeComplex.value = null
  endTimeComplex.value = null
  isTimerRunningComplex.value = false
}

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
  padding: '1.5rem',
  backgroundColor: 'white',
  border: '2px solid',
  borderColor: 'gray.200',
  borderRadius: 'lg',
})

// メニューボタンのスタイル
const menuButtonClass = css({
  width: '100%',
  padding: '0.75rem',
  backgroundColor: 'white',
  border: '2px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  cursor: 'pointer',
  textAlign: 'left',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'purple.50',
    borderColor: 'purple.400',
  },
})

const menuGridSimpleClass = css({
  display: 'grid',
  gap: '0.75rem',
})

const menuGridComplexClass = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '0.5rem',
})

// アクションボタンのスタイル
const actionButtonSimpleClass = css({
  width: '100%',
  padding: '1rem',
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

const actionButtonComplexClass = css({
  width: '100%',
  padding: '0.5rem',
  fontSize: '0.75rem',
  backgroundColor: 'gray.500',
  color: 'white',
  border: 'none',
  borderRadius: 'sm',
  cursor: 'pointer',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'gray.600',
  },
})

// ドロップダウンのスタイル
const selectClass = css({
  width: '100%',
  padding: '0.75rem',
  border: '2px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontSize: '1rem',
  cursor: 'pointer',
  _focus: {
    outline: 'none',
    borderColor: 'purple.500',
  },
})

const selectLargeClass = css({
  width: '100%',
  padding: '0.75rem',
  border: '2px solid',
  borderColor: 'gray.300',
  borderRadius: 'md',
  fontSize: '0.875rem',
  cursor: 'pointer',
  height: '150px',
  _focus: {
    outline: 'none',
    borderColor: 'purple.500',
  },
})

// タイマー表示のスタイル
const timerBoxClass = css({
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: 'purple.50',
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
  color: 'purple.600',
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
        ヒックの法則デモ
      </h1>
      <p :class="subtitleClass">
        選択肢が増えるほど、意思決定に時間がかかる
      </p>
    </header>

    <!-- セクション1: メニューの選択肢 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="1. メニューの選択肢数"
        icon="📋"
        color-scheme="blue"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左はシンプルな3択、右は15択です。どちらが素早く決定できるか試してみてください。
        </p>

        <div :class="demoGridClass">
          <!-- シンプルなメニュー -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                シンプルなメニュー（3択）
              </h3>
              <p :class="demoDescClass">
                選択肢が少なく、素早く決定できる
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="menuGridSimpleClass">
                <button :class="menuButtonClass">
                  🏠 ホーム
                </button>
                <button :class="menuButtonClass">
                  📦 製品
                </button>
                <button :class="menuButtonClass">
                  📞 お問い合わせ
                </button>
              </div>
            </div>
          </div>

          <!-- 複雑なメニュー -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                複雑なメニュー（15択）
              </h3>
              <p :class="demoDescClass">
                選択肢が多く、決定に時間がかかる
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="menuGridComplexClass">
                <button :class="menuButtonClass">
                  ホーム
                </button>
                <button :class="menuButtonClass">
                  製品一覧
                </button>
                <button :class="menuButtonClass">
                  新着情報
                </button>
                <button :class="menuButtonClass">
                  会社概要
                </button>
                <button :class="menuButtonClass">
                  採用情報
                </button>
                <button :class="menuButtonClass">
                  IR情報
                </button>
                <button :class="menuButtonClass">
                  サポート
                </button>
                <button :class="menuButtonClass">
                  FAQ
                </button>
                <button :class="menuButtonClass">
                  ブログ
                </button>
                <button :class="menuButtonClass">
                  ニュース
                </button>
                <button :class="menuButtonClass">
                  プライバシー
                </button>
                <button :class="menuButtonClass">
                  利用規約
                </button>
                <button :class="menuButtonClass">
                  パートナー
                </button>
                <button :class="menuButtonClass">
                  お問い合わせ
                </button>
                <button :class="menuButtonClass">
                  サイトマップ
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション2: アクションボタンの数 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="2. アクションボタンの数"
        icon="🔘"
        color-scheme="green"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は主要なアクション2つ、右は10個のボタンがあります。どちらが使いやすいでしょうか？
        </p>

        <div :class="demoGridClass">
          <!-- シンプルなアクション -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                主要なアクション（2つ）
              </h3>
              <p :class="demoDescClass">
                最も重要なアクションのみ表示
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })">
                <button :class="actionButtonSimpleClass">
                  購入する
                </button>
                <button
                  :class="css({
                    width: '100%',
                    padding: '1rem',
                    fontSize: '1rem',
                    backgroundColor: 'white',
                    color: 'purple.600',
                    border: '2px solid',
                    borderColor: 'purple.500',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    _hover: {
                      backgroundColor: 'purple.50',
                    },
                  })"
                >
                  詳細を見る
                </button>
              </div>
            </div>
          </div>

          <!-- 複雑なアクション -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                多数のアクション（10個）
              </h3>
              <p :class="demoDescClass">
                どのボタンを押すべきか迷う
              </p>
            </div>
            <div :class="demoBoxClass">
              <div :class="css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' })">
                <button :class="actionButtonComplexClass">
                  購入
                </button>
                <button :class="actionButtonComplexClass">
                  カートに追加
                </button>
                <button :class="actionButtonComplexClass">
                  お気に入り
                </button>
                <button :class="actionButtonComplexClass">
                  比較
                </button>
                <button :class="actionButtonComplexClass">
                  共有
                </button>
                <button :class="actionButtonComplexClass">
                  レビュー
                </button>
                <button :class="actionButtonComplexClass">
                  詳細
                </button>
                <button :class="actionButtonComplexClass">
                  ダウンロード
                </button>
                <button :class="actionButtonComplexClass">
                  印刷
                </button>
                <button :class="actionButtonComplexClass">
                  保存
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション3: ドロップダウンの項目数 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="3. ドロップダウンの項目数"
        icon="📝"
        color-scheme="purple"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は5項目、右は50項目のドロップダウンです。どちらが選びやすいでしょうか？
        </p>

        <div :class="demoGridClass">
          <!-- シンプルなドロップダウン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                絞り込まれた選択肢（5項目）
              </h3>
              <p :class="demoDescClass">
                よく使われる項目のみ表示
              </p>
            </div>
            <div :class="demoBoxClass">
              <label :class="css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'semibold' })">
                国を選択：
              </label>
              <select :class="selectClass">
                <option>日本</option>
                <option>アメリカ</option>
                <option>イギリス</option>
                <option>中国</option>
                <option>その他</option>
              </select>
            </div>
          </div>

          <!-- 複雑なドロップダウン -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                全ての選択肢（50項目）
              </h3>
              <p :class="demoDescClass">
                スクロールして探す必要がある
              </p>
            </div>
            <div :class="demoBoxClass">
              <label :class="css({ display: 'block', marginBottom: '0.5rem', fontWeight: 'semibold', fontSize: '0.875rem' })">
                国を選択（スクロールしてください）：
              </label>
              <select :class="selectLargeClass" multiple>
                <option>アイスランド</option>
                <option>アイルランド</option>
                <option>アゼルバイジャン</option>
                <option>アフガニスタン</option>
                <option>アメリカ</option>
                <option>アラブ首長国連邦</option>
                <option>アルジェリア</option>
                <option>アルゼンチン</option>
                <option>アルバニア</option>
                <option>アルメニア</option>
                <option>アンゴラ</option>
                <option>イエメン</option>
                <option>イギリス</option>
                <option>イスラエル</option>
                <option>イタリア</option>
                <option>イラク</option>
                <option>イラン</option>
                <option>インド</option>
                <option>インドネシア</option>
                <option>ウガンダ</option>
                <option>ウクライナ</option>
                <option>ウズベキスタン</option>
                <option>ウルグアイ</option>
                <option>エクアドル</option>
                <option>エジプト</option>
                <option>エストニア</option>
                <option>エチオピア</option>
                <option>オーストラリア</option>
                <option>オーストリア</option>
                <option>オランダ</option>
                <option>オマーン</option>
                <option>ガーナ</option>
                <option>カザフスタン</option>
                <option>カタール</option>
                <option>カナダ</option>
                <option>カメルーン</option>
                <option>韓国</option>
                <option>カンボジア</option>
                <option>ギリシャ</option>
                <option>キルギス</option>
                <option>グアテマラ</option>
                <option>クウェート</option>
                <option>グルジア</option>
                <option>クロアチア</option>
                <option>ケニア</option>
                <option>コスタリカ</option>
                <option>コロンビア</option>
                <option>コンゴ</option>
                <option>サウジアラビア</option>
                <option>ザンビア</option>
              </select>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション4: インタラクティブ計測デモ -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="4. 反応時間を計測してみよう"
        icon="⏱️"
        color-scheme="yellow"
        variant="bordered"
      >
        <p :class="demoDescClass">
          「開始」ボタンを押してから、目的のボタンを押すまでの時間を計測します。選択肢の数で反応時間がどう変わるか体験できます。
        </p>

        <div :class="demoGridClass">
          <!-- 少ない選択肢での計測 -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">3択</span>
                選択肢が少ない
              </h3>
              <p :class="demoDescClass">
                「青」のボタンを見つけてクリック
              </p>
            </div>
            <div :class="demoBoxClass">
              <button
                :class="css({
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'green.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'md',
                  cursor: 'pointer',
                  fontWeight: 'semibold',
                  _hover: { backgroundColor: 'green.600' },
                })"
                @click="startTimerSimple"
              >
                開始
              </button>
              <div :class="menuGridSimpleClass">
                <button
                  :class="css({
                    padding: '1rem',
                    backgroundColor: 'red.500',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    fontWeight: 'semibold',
                  })"
                  @click="stopTimerSimple"
                >
                  赤
                </button>
                <button
                  :class="css({
                    padding: '1rem',
                    backgroundColor: 'blue.500',
                    color: 'white',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    fontWeight: 'semibold',
                  })"
                  @click="stopTimerSimple"
                >
                  青（これ！）
                </button>
                <button
                  :class="css({
                    padding: '1rem',
                    backgroundColor: 'yellow.500',
                    color: 'gray.800',
                    border: 'none',
                    borderRadius: 'md',
                    cursor: 'pointer',
                    fontWeight: 'semibold',
                  })"
                  @click="stopTimerSimple"
                >
                  黄
                </button>
              </div>
              <div v-if="elapsedTimeSimple" :class="timerBoxClass">
                <p :class="timerTextClass">
                  反応時間
                </p>
                <p :class="timerValueClass">
                  {{ elapsedTimeSimple }}秒
                </p>
                <button :class="resetButtonClass" @click="resetTimerSimple">
                  リセット
                </button>
              </div>
            </div>
          </div>

          <!-- 多い選択肢での計測 -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">12択</span>
                選択肢が多い
              </h3>
              <p :class="demoDescClass">
                「青」のボタンを見つけてクリック
              </p>
            </div>
            <div :class="demoBoxClass">
              <button
                :class="css({
                  width: '100%',
                  padding: '1rem',
                  marginBottom: '1rem',
                  backgroundColor: 'green.500',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'md',
                  cursor: 'pointer',
                  fontWeight: 'semibold',
                  _hover: { backgroundColor: 'green.600' },
                })"
                @click="startTimerComplex"
              >
                開始
              </button>
              <div :class="css({ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' })">
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'red.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  赤
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'orange.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  橙
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'yellow.500', color: 'gray.800', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  黄
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'green.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  緑
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'blue.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  青
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'purple.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  紫
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'pink.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  桃
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'gray.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  灰
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'brown.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  茶
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'cyan.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  水
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'teal.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  青緑
                </button>
                <button
                  :class="css({ padding: '0.75rem', backgroundColor: 'indigo.500', color: 'white', border: 'none', borderRadius: 'md', cursor: 'pointer', fontSize: '0.875rem' })"
                  @click="stopTimerComplex"
                >
                  藍
                </button>
              </div>
              <div v-if="elapsedTimeComplex" :class="timerBoxClass">
                <p :class="timerTextClass">
                  反応時間
                </p>
                <p :class="timerValueClass">
                  {{ elapsedTimeComplex }}秒
                </p>
                <button :class="resetButtonClass" @click="resetTimerComplex">
                  リセット
                </button>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- ヒックの法則の説明 -->
    <DesignSystemInfoBox
      variant="info"
      title="ヒックの法則とは？"
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
          ヒックの法則（Hick's Law）は、選択肢の数と意思決定時間の関係を表す法則です。
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
          <strong>RT = a + b × log₂(n)</strong>
          <p :class="css({ fontSize: '0.875rem', marginTop: '0.5rem', color: 'gray.600' })">
            RT: 反応時間 / n: 選択肢の数 / a, b: 定数
          </p>
        </div>
        <ul
          :class="css({
            listStyle: 'disc',
            paddingLeft: '1.5rem',
          })"
        >
          <li><strong>選択肢が増えると、意思決定に時間がかかる</strong></li>
          <li>選択肢が2倍になると、決定時間は一定量増加する（対数的関係）</li>
          <li>複雑な決定を単純な決定に分割すると効率的</li>
          <li>緊急性の高いアクションほど選択肢を減らすべき</li>
          <li>提唱者: ウィリアム・エドマンド・ヒック（William Edmund Hick）とレイ・ハイマン（Ray Hyman）</li>
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
        <li>✅ メインナビゲーションは5〜7項目以内に抑える</li>
        <li>✅ 主要なアクションボタンは1〜2個に絞る</li>
        <li>✅ ドロップダウンは10項目以下、それ以上なら検索機能を追加</li>
        <li>✅ 複雑な選択は段階的に分割（ステップ形式）</li>
        <li>✅ よく使われる選択肢を上位に配置</li>
        <li>✅ デフォルト値を設定して選択の負担を減らす</li>
        <li>✅ カテゴリーでグループ化して視覚的に整理</li>
        <li>✅ 緊急時のアクション（削除、送信など）は選択肢を最小限に</li>
      </ul>
    </DesignSystemInfoBox>

    <!-- 関連する法則 -->
    <DesignSystemInfoBox
      variant="warning"
      title="関連するUX法則"
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
          <strong>フィッツの法則</strong>: ターゲットが大きく近いほど、素早く正確に操作できる
        </li>
        <li>
          <strong>ミラーの法則</strong>: 人間の短期記憶は7±2個の項目を保持できる
        </li>
        <li>
          <strong>選択のパラドックス</strong>: 選択肢が多すぎると、決定できなくなる
        </li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
