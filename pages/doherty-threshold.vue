<script setup lang="ts">
import { css } from '~/styled-system/css'

useSeoMeta({
  title: 'ドハティの閾値デモ - Nuxt 3 Study',
  description: '400msの応答時間がユーザー体験に与える影響を体験できるインタラクティブデモ',
})

// ボタンクリックデモの状態
const fastButtonClicked = ref(false)
const slowButtonClicked = ref(false)

// いいねデモの状態
const optimisticLikes = ref(42)
const normalLikes = ref(42)
const optimisticLiked = ref(false)
const normalLiked = ref(false)
const normalLoading = ref(false)

// 検索デモの状態
const instantSearchQuery = ref('')
const debouncedSearchQuery = ref('')
const instantSearchCount = ref(0)
const debouncedSearchCount = ref(0)

// タイマーID
let debouncedTimer: NodeJS.Timeout | null = null

// ボタンクリック: 即座のフィードバック
const handleFastButtonClick = () => {
  fastButtonClicked.value = true
  setTimeout(() => {
    fastButtonClicked.value = false
  }, 150)
}

// ボタンクリック: 遅延フィードバック
const handleSlowButtonClick = () => {
  setTimeout(() => {
    slowButtonClicked.value = true
    setTimeout(() => {
      slowButtonClicked.value = false
    }, 150)
  }, 500)
}

// 楽観的UI: いいね（即座に反映）
const handleOptimisticLike = async () => {
  // 即座にUIを更新
  optimisticLiked.value = !optimisticLiked.value
  optimisticLikes.value += optimisticLiked.value ? 1 : -1

  // バックグラウンドでAPI呼び出し（シミュレーション）
  try {
    await new Promise(resolve => setTimeout(resolve, 500))
    // 成功
  }
  catch (error) {
    // エラー時はロールバック
    optimisticLiked.value = !optimisticLiked.value
    optimisticLikes.value += optimisticLiked.value ? 1 : -1
  }
}

// 通常UI: いいね（サーバー応答を待つ）
const handleNormalLike = async () => {
  normalLoading.value = true

  try {
    // API呼び出しを待つ（500ms）
    await new Promise(resolve => setTimeout(resolve, 500))

    // 成功後にUIを更新
    normalLiked.value = !normalLiked.value
    normalLikes.value += normalLiked.value ? 1 : -1
  }
  finally {
    normalLoading.value = false
  }
}

// 即座の検索
const handleInstantSearch = (value: string) => {
  instantSearchQuery.value = value
  instantSearchCount.value++
}

// デバウンスされた検索
const handleDebouncedSearch = (value: string) => {
  if (debouncedTimer)
    clearTimeout(debouncedTimer)

  debouncedTimer = setTimeout(() => {
    debouncedSearchQuery.value = value
    debouncedSearchCount.value++
  }, 300)
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
})

const likeButtonClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 'semibold',
  borderRadius: 'full',
  border: '2px solid',
  cursor: 'pointer',
  transition: 'all 100ms',
  backgroundColor: 'white',
  borderColor: 'gray.300',
  color: 'gray.700',
  _hover: {
    borderColor: 'red.400',
    backgroundColor: 'red.50',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

const likedButtonClass = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.75rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 'semibold',
  borderRadius: 'full',
  border: '2px solid',
  cursor: 'pointer',
  transition: 'all 100ms',
  backgroundColor: 'red.500',
  borderColor: 'red.500',
  color: 'white',
  _hover: {
    backgroundColor: 'red.600',
    borderColor: 'red.600',
  },
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

const metricBoxClass = css({
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: 'gray.50',
  borderRadius: 'md',
  fontSize: '0.875rem',
})

const metricRowClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0.5rem 0',
  borderBottom: '1px solid',
  borderColor: 'gray.200',
  _last: {
    borderBottom: 'none',
  },
})

const metricLabelClass = css({
  fontWeight: 'semibold',
  color: 'gray.700',
})

const metricValueClass = css({
  color: 'blue.600',
  fontWeight: 'bold',
})

const activeButtonOverlay = css({
  position: 'relative',
  _after: {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 'md',
  },
})
</script>

<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1 :class="titleClass">
        ドハティの閾値デモ
      </h1>
      <p :class="subtitleClass">
        400msの応答時間がユーザー体験に与える影響を体験しよう
      </p>
    </header>

    <!-- セクション1: ボタンクリックの応答時間 -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="1. ボタンクリックの応答時間"
        icon="⚡"
        color-scheme="blue"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左のボタンは即座（50ms以内）に反応し、右のボタンは500ms後に反応します。違いを体感してください。
        </p>

        <div :class="demoGridClass">
          <!-- 即座のフィードバック -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                即座のフィードバック
              </h3>
              <p :class="demoDescClass">
                応答時間: &lt;50ms
              </p>
            </div>
            <div :class="fastButtonClicked ? activeButtonOverlay : ''">
              <DesignSystemButton
                variant="primary"
                size="lg"
                @click="handleFastButtonClick"
              >
                クリックしてみて
              </DesignSystemButton>
            </div>
          </div>

          <!-- 遅延フィードバック -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                遅延フィードバック
              </h3>
              <p :class="demoDescClass">
                応答時間: 500ms（待たされる感覚）
              </p>
            </div>
            <div :class="slowButtonClicked ? activeButtonOverlay : ''">
              <DesignSystemButton
                variant="secondary"
                size="lg"
                @click="handleSlowButtonClick"
              >
                クリックしてみて
              </DesignSystemButton>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション2: 楽観的UI vs 通常UI -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="2. 楽観的UI vs 通常UI"
        icon="❤️"
        color-scheme="red"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左の「いいね」は即座に反映され、右は500msのサーバー応答を待ちます。
        </p>

        <div :class="demoGridClass">
          <!-- 楽観的UI -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                楽観的UI
              </h3>
              <p :class="demoDescClass">
                即座にUIを更新、バックグラウンドでAPI呼び出し
              </p>
            </div>
            <button
              :class="optimisticLiked ? likedButtonClass : likeButtonClass"
              @click="handleOptimisticLike"
            >
              <span>{{ optimisticLiked ? '❤️' : '🤍' }}</span>
              <span>{{ optimisticLikes }}</span>
            </button>
          </div>

          <!-- 通常UI -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                通常UI
              </h3>
              <p :class="demoDescClass">
                サーバー応答を待ってからUIを更新
              </p>
            </div>
            <button
              :class="normalLiked ? likedButtonClass : likeButtonClass"
              :disabled="normalLoading"
              @click="handleNormalLike"
            >
              <span>{{ normalLoading ? '⏳' : (normalLiked ? '❤️' : '🤍') }}</span>
              <span>{{ normalLikes }}</span>
            </button>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- セクション3: 検索のデバウンス -->
    <section :class="sectionClass">
      <DesignSystemCard
        title="3. 検索のデバウンス"
        icon="🔍"
        color-scheme="green"
        variant="bordered"
      >
        <p :class="demoDescClass">
          左は入力のたびに検索し、右は300msのデバウンスを使用します。API呼び出し回数を比較してください。
        </p>

        <div :class="demoGridClass">
          <!-- デバウンスなし -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="badBadgeClass">Bad</span>
                デバウンスなし
              </h3>
              <p :class="demoDescClass">
                入力ごとに即座に検索（API呼び出し過多）
              </p>
            </div>
            <div>
              <DesignSystemInput
                label="検索"
                placeholder="検索してみて..."
                :model-value="instantSearchQuery"
                clearable
                @update:model-value="handleInstantSearch"
              />
              <div :class="metricBoxClass">
                <div :class="metricRowClass">
                  <span :class="metricLabelClass">検索クエリ:</span>
                  <span :class="metricValueClass">{{ instantSearchQuery || '未入力' }}</span>
                </div>
                <div :class="metricRowClass">
                  <span :class="metricLabelClass">API呼び出し回数:</span>
                  <span :class="metricValueClass">{{ instantSearchCount }}回</span>
                </div>
              </div>
            </div>
          </div>

          <!-- デバウンスあり -->
          <div :class="css({ display: 'flex', flexDirection: 'column', gap: '1rem' })">
            <div>
              <h3 :class="demoTitleClass">
                <span :class="goodBadgeClass">Good</span>
                デバウンスあり（300ms）
              </h3>
              <p :class="demoDescClass">
                入力後300ms待ってから検索（効率的）
              </p>
            </div>
            <div>
              <DesignSystemInput
                label="検索"
                placeholder="検索してみて..."
                :model-value="debouncedSearchQuery"
                clearable
                @update:model-value="handleDebouncedSearch"
              />
              <div :class="metricBoxClass">
                <div :class="metricRowClass">
                  <span :class="metricLabelClass">検索クエリ:</span>
                  <span :class="metricValueClass">{{ debouncedSearchQuery || '未入力' }}</span>
                </div>
                <div :class="metricRowClass">
                  <span :class="metricLabelClass">API呼び出し回数:</span>
                  <span :class="metricValueClass">{{ debouncedSearchCount }}回</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DesignSystemCard>
    </section>

    <!-- 閾値情報 -->
    <DesignSystemInfoBox
      variant="info"
      title="ドハティの閾値とは？"
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
        <li><strong>400ms</strong> がユーザー体験の分岐点</li>
        <li>400ms以下: ユーザーは「即座」と感じる</li>
        <li>400ms以上: ユーザーは「待っている」と感じ、集中が途切れる</li>
        <li>最適な応答時間: <strong>100ms以下</strong></li>
        <li>アニメーション: <strong>300ms以下</strong>、60fps推奨</li>
        <li>楽観的UIで体感速度を向上させる</li>
      </ul>
    </DesignSystemInfoBox>
  </div>
</template>
