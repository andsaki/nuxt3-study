<script setup lang="ts">
import { css } from '~/styled-system/css'

type HookInfo = {
  name: string
  category: string
  description: string
}

const reactHooks: HookInfo[] = [
  { name: 'useState', category: 'State', description: 'ローカル state を宣言する最も基本的なフック。プリミティブやオブジェクトを扱える。' },
  { name: 'useEffect', category: 'Effects', description: 'レンダーの結果に付随する副作用（データ取得や購読など）を登録する。' },
  { name: 'useLayoutEffect', category: 'Effects', description: 'DOM への変更がブラウザに描画される前に同期的に副作用を実行する。' },
  { name: 'useInsertionEffect', category: 'Effects', description: 'CSS-in-JS のようにスタイルを DOM に挿入する際の最速フック。' },
  { name: 'useContext', category: 'Context', description: 'Context API で提供された値を階層のどこからでも購読する。' },
  { name: 'useReducer', category: 'State', description: 'リデューサーとディスパッチで複雑な state 遷移を扱う。Redux 的なパターン。' },
  { name: 'useMemo', category: 'Memoization', description: '依存配列に応じて計算結果をメモ化し、不要な再計算を防ぐ。' },
  { name: 'useCallback', category: 'Memoization', description: '関数の参照をメモ化して子コンポーネントの再レンダーを抑える。' },
  { name: 'useRef', category: 'Refs', description: '描画に影響しないミュータブルな値や DOM 参照を保持する。' },
  { name: 'useImperativeHandle', category: 'Refs', description: 'forwardRef と組み合わせて外部へ公開する参照 API をカスタマイズ。' },
  { name: 'useId', category: 'SSR', description: 'SSR/CSR を跨いでも衝突しない一意の ID を生成する。' },
  { name: 'useDebugValue', category: 'DevTools', description: 'カスタムフックが React DevTools 上で表示するラベルを設定する。' },
  { name: 'useSyncExternalStore', category: 'External State', description: '外部ストアをスナップショットで購読し、並行レンダリング下でも安全に同期。' },
  { name: 'useTransition', category: 'Concurrent UI', description: '更新を優先度ごとに分離し、急ぎではない更新を遅延させる。' },
  { name: 'useDeferredValue', category: 'Concurrent UI', description: '入力値の更新を遅らせて重い再レンダーを緩和する。' },
  { name: 'useActionState', category: 'Server Actions', description: 'React 19 のサーバーアクション結果と pending 状態をまとめて扱う。' },
  { name: 'useFormState', category: 'Server Actions', description: 'フォーム送信結果・エラーを子コンポーネントへ共有する React 19 の新フック。' },
  { name: 'useFormStatus', category: 'Server Actions', description: 'フォームの送信中/エラー状態をボタンなどで参照できる React 19 のステータスフック。' },
  { name: 'useOptimistic', category: 'Concurrent UI', description: 'サーバーアクションを待たずに楽観的 UI を即時反映する。' },
]

const vueHooks: HookInfo[] = [
  { name: 'ref', category: 'Reactivity', description: 'プリミティブや単一値にリアクティビティを与える基本的な参照。' },
  { name: 'reactive', category: 'Reactivity', description: 'オブジェクトに深いリアクティビティを付与するプロキシ。' },
  { name: 'readonly', category: 'Reactivity', description: '既存のリアクティブ値を読み取り専用ラッパーで保護する。' },
  { name: 'shallowRef', category: 'Reactivity', description: 'トップレベルのみを追跡する軽量な ref。' },
  { name: 'shallowReactive', category: 'Reactivity', description: 'shallowRef のオブジェクト版。ネストは追跡されない。' },
  { name: 'shallowReadonly', category: 'Reactivity', description: 'トップレベルだけを読み取り専用にする。' },
  { name: 'computed', category: 'Derived State', description: '依存関係から計算される値を宣言。キャッシュされる。' },
  { name: 'watch', category: 'Watchers', description: '特定のソースを監視して副作用を登録する。' },
  { name: 'watchEffect', category: 'Watchers', description: '依存関係を自動収集して即座に実行される副作用。' },
  { name: 'watchPostEffect', category: 'Watchers', description: 'DOM 更新後に走る watchEffect 派生。' },
  { name: 'watchSyncEffect', category: 'Watchers', description: 'DOM 更新前に同期実行される watchEffect。' },
  { name: 'onBeforeMount', category: 'Lifecycle', description: 'マウント直前に一度だけ実行されるライフサイクルフック。' },
  { name: 'onMounted', category: 'Lifecycle', description: 'コンポーネントが DOM に挿入された直後に呼ばれる。' },
  { name: 'onBeforeUpdate', category: 'Lifecycle', description: '再レンダーで DOM を更新する直前に呼び出される。' },
  { name: 'onUpdated', category: 'Lifecycle', description: 'DOM が更新された後に実行される。' },
  { name: 'onBeforeUnmount', category: 'Lifecycle', description: 'コンポーネントが破棄される直前にクリーンアップを行う。' },
  { name: 'onUnmounted', category: 'Lifecycle', description: '破棄が完了した直後に呼び出される。' },
  { name: 'onErrorCaptured', category: 'Lifecycle', description: '子ツリーで発生したエラーを捕捉して処理する。' },
  { name: 'onRenderTracked', category: 'Lifecycle', description: 'リアクティブ依存が追跡されたときにデバッグ用に呼ばれる。' },
  { name: 'onRenderTriggered', category: 'Lifecycle', description: '依存が変更されレンダーがトリガーされたときに呼び出される。' },
  { name: 'onActivated', category: 'Lifecycle', description: 'KeepAlive されたコンポーネントが再アクティブ化されたとき。' },
  { name: 'onDeactivated', category: 'Lifecycle', description: 'KeepAlive コンポーネントが離脱したタイミング。' },
  { name: 'provide', category: 'DI', description: '依存性注入コンテナに値を登録し、子孫へ共有する。' },
  { name: 'inject', category: 'DI', description: '祖先が provide した値を取り出す。' },
  { name: 'toRef', category: 'Reactivity', description: 'reactive オブジェクトのプロパティを個別の ref として切り出す。' },
  { name: 'toRefs', category: 'Reactivity', description: 'reactive オブジェクトの全プロパティを ref 群に変換する。' },
  { name: 'toValue', category: 'Reactivity', description: 'MaybeRefOrGetter を確実に値へ解決するユーティリティ。' },
  { name: 'unref', category: 'Reactivity', description: 'ref であれば value を、通常値ならそのまま返す。' },
  { name: 'isRef', category: 'Reactivity', description: '値が ref かどうかを真偽で返す。' },
  { name: 'isReactive', category: 'Reactivity', description: 'reactive またはその派生かどうかを判定する。' },
  { name: 'isReadonly', category: 'Reactivity', description: 'readonly でラップされているかどうか。' },
  { name: 'isProxy', category: 'Reactivity', description: 'ref/reactive/readonly が返す Proxy かを判定。' },
  { name: 'markRaw', category: 'Advanced', description: 'オブジェクトをリアクティブ変換から除外して生データとして扱う。' },
  { name: 'triggerRef', category: 'Advanced', description: 'shallowRef などの依存を手動で再評価させる。' },
  { name: 'customRef', category: 'Advanced', description: 'トラッキング/トリガーの挙動を自分で制御する ref を作る。' },
  { name: 'defineModel', category: 'SFC', description: 'script setup で v-model の入出力を型安全に宣言する。' },
  { name: 'useAttrs', category: 'SFC', description: '親から受け取った属性を取得し、透過的に渡せる。' },
  { name: 'useSlots', category: 'SFC', description: 'スロット関数群へアクセスして動的に描画する。' },
  { name: 'getCurrentInstance', category: 'Advanced', description: '現在のコンポーネントインスタンスへ直接アクセスする。' },
  { name: 'getCurrentScope', category: 'Effect Scope', description: '現在の効果スコープを取得し、子のサブスコープを制御する。' },
  { name: 'onScopeDispose', category: 'Effect Scope', description: '効果スコープが破棄されるときのクリーンアップを登録。' },
  { name: 'effectScope', category: 'Effect Scope', description: '複数のリアクティブ副作用をまとめて管理するためのスコープを作成。' },
]

const verifiedHooks = ref<Record<string, boolean>>({})

const toggleHook = (hookName: string) => {
  verifiedHooks.value[hookName] = !verifiedHooks.value[hookName]
}

const isHookDone = (hookName: string) => Boolean(verifiedHooks.value[hookName])

const calcProgress = (hooks: HookInfo[]) => {
  const total = hooks.length
  const done = hooks.reduce((acc, hook) => acc + (isHookDone(hook.name) ? 1 : 0), 0)
  const percent = Math.round((done / total) * 100)
  return { total, done, percent }
}

const reactProgress = computed(() => calcProgress(reactHooks))
const vueProgress = computed(() => calcProgress(vueHooks))
const totalProgress = computed(() => {
  const total = reactProgress.value.total + vueProgress.value.total
  const done = reactProgress.value.done + vueProgress.value.done
  const percent = Math.round((done / total) * 100)
  return { total, done, percent }
})

const styles = {
  page: css({ minH: 'screen', bg: 'gray.50', py: '12', px: { base: '4', md: '8' } }),
  container: css({ maxW: '7xl', mx: 'auto', display: 'flex', flexDirection: 'column', gap: '8' }),
  hero: css({
    bg: 'white',
    rounded: '2xl',
    border: '1px solid',
    borderColor: 'gray.100',
    boxShadow: 'xl',
    p: { base: '6', md: '8' },
    spaceY: '4',
  }),
  heroTitle: css({ fontSize: { base: '3xl', md: '4xl' }, fontWeight: 'bold', color: 'gray.900' }),
  heroText: css({ color: 'gray.700', fontSize: 'lg', lineHeight: 'relaxed' }),
  summaryGrid: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: { base: 'repeat(1, minmax(0, 1fr))', md: 'repeat(3, minmax(0, 1fr))' },
  }),
  summaryStat: css({
    bg: 'gray.900',
    color: 'white',
    rounded: 'xl',
    p: '4',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  }),
  summaryValue: css({ fontSize: '2xl', fontWeight: 'bold' }),
  summaryLabel: css({ fontSize: 'sm', textTransform: 'uppercase', letterSpacing: 'wide', color: 'gray.200' }),
  progressBar: css({ w: 'full', h: '2', bg: 'gray.200', rounded: 'full', overflow: 'hidden', mt: '2' }),
  progressFill: css({ h: 'full', bg: 'green.500', transition: 'width 0.2s ease' }),
  grid: css({ display: 'grid', gap: '6', gridTemplateColumns: { base: '1fr', lg: 'repeat(2, minmax(0, 1fr))' } }),
  sectionHeader: css({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '3',
    flexWrap: 'wrap',
    mb: '4',
  }),
  sectionTitle: css({ fontSize: '2xl', fontWeight: 'bold', color: 'gray.900' }),
  sectionSubtitle: css({ color: 'gray.600' }),
  progressBadge: css({
    fontSize: 'sm',
    fontWeight: 'semibold',
    bg: 'gray.900',
    color: 'white',
    px: '4',
    py: '2',
    rounded: 'full',
  }),
  hooksList: css({ display: 'flex', flexDirection: 'column', gap: '3' }),
  hookRow: css({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '4',
    bg: 'white',
    border: '1px solid',
    borderColor: 'gray.100',
    rounded: 'xl',
    p: '4',
    boxShadow: 'sm',
    alignItems: 'flex-start',
  }),
  hookRowDone: css({ borderColor: 'green.200', bg: 'green.50' }),
  hookName: css({ fontWeight: 'semibold', fontSize: 'lg', color: 'gray.900' }),
  hookCategory: css({
    fontSize: 'xs',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 'wider',
    color: 'gray.600',
    bg: 'gray.100',
    px: '2',
    py: '1',
    rounded: 'full',
  }),
  hookDesc: css({ color: 'gray.600', fontSize: 'sm', mt: '1' }),
  toggleBase: css({
    borderRadius: 'full',
    fontWeight: 'semibold',
    px: '4',
    py: '2',
    transition: 'all 0.2s ease',
    border: 'none',
    cursor: 'pointer',
  }),
  toggleActive: css({ bg: 'green.500', color: 'white', _hover: { bg: 'green.600' } }),
  toggleInactive: css({
    bg: 'gray.100',
    color: 'gray.800',
    border: '1px solid',
    borderColor: 'gray.200',
    _hover: { borderColor: 'gray.400' },
  }),
}

const toggleClasses = (done: boolean) =>
  [styles.toggleBase, done ? styles.toggleActive : styles.toggleInactive].join(' ')
</script>

<template>
  <div :class="styles.page">
    <div :class="styles.container">
      <section :class="styles.hero">
        <div>
          <p :class="css({ fontSize: 'sm', fontWeight: 'bold', letterSpacing: 'wide', color: 'green.600' })">
            Hooks Verification Tracker
          </p>
          <h1 :class="styles.heroTitle">
            React (19) / Vue (42) Hooks 検証
          </h1>
        </div>
        <p :class="styles.heroText">
          React 19 で追加された最新フックと Vue 3 Composition API を一覧化し、検証状況を即座に可視化できるページです。
          ローカル state だけで完結しているので、勉強会やレビュー時にその場でチェックを入れて進捗を共有できます。
        </p>
        <div :class="css({ fontSize: 'sm', color: 'gray.500' })">
          ※ チェック状態はブラウザメモリにのみ保持され、ページを再読み込みするとリセットされます。
        </div>
      </section>

      <DesignSystemCard title="✅ 検証サマリー" icon="📊" color-scheme="green">
        <div :class="styles.summaryGrid">
          <div :class="styles.summaryStat">
            <span :class="styles.summaryLabel">Total Hooks</span>
            <span :class="styles.summaryValue">{{ totalProgress.total }}</span>
            <span>{{ totalProgress.done }} / {{ totalProgress.total }} 完了</span>
          </div>
          <div :class="styles.summaryStat">
            <span :class="styles.summaryLabel">React 19</span>
            <span :class="styles.summaryValue">{{ reactProgress.done }}/{{ reactProgress.total }}</span>
            <span>{{ reactProgress.percent }}%</span>
          </div>
          <div :class="styles.summaryStat">
            <span :class="styles.summaryLabel">Vue 3</span>
            <span :class="styles.summaryValue">{{ vueProgress.done }}/{{ vueProgress.total }}</span>
            <span>{{ vueProgress.percent }}%</span>
          </div>
        </div>
        <div :class="styles.progressBar">
          <div :class="styles.progressFill" :style="{ width: `${totalProgress.percent}%` }" />
        </div>
      </DesignSystemCard>

      <div :class="styles.grid">
        <DesignSystemCard title="⚛️ React Hooks" color-scheme="blue">
          <div :class="styles.sectionHeader">
            <div>
              <p :class="styles.sectionTitle">React 19 Hooks</p>
              <p :class="styles.sectionSubtitle">
                並行レンダリングとサーバーアクション周りを含む 19 個の公式フック
              </p>
            </div>
            <span :class="styles.progressBadge">{{ reactProgress.done }} / {{ reactProgress.total }} 完了</span>
          </div>
          <div :class="styles.hooksList">
            <div
              v-for="hook in reactHooks"
              :key="hook.name"
              :class="[styles.hookRow, isHookDone(hook.name) ? styles.hookRowDone : '']"
            >
              <div :class="css({ flex: '1', minW: '0' })">
                <div :class="css({ display: 'flex', alignItems: 'center', gap: '3', flexWrap: 'wrap' })">
                  <span :class="styles.hookName">{{ hook.name }}</span>
                  <span :class="styles.hookCategory">{{ hook.category }}</span>
                </div>
                <p :class="styles.hookDesc">
                  {{ hook.description }}
                </p>
              </div>
              <button type="button" :class="toggleClasses(isHookDone(hook.name))" @click="toggleHook(hook.name)">
                {{ isHookDone(hook.name) ? '検証済み' : '未検証' }}
              </button>
            </div>
          </div>
        </DesignSystemCard>

        <DesignSystemCard title="🧩 Vue Hooks" color-scheme="purple">
          <div :class="styles.sectionHeader">
            <div>
              <p :class="styles.sectionTitle">Vue 3 Composition API</p>
              <p :class="styles.sectionSubtitle">
                リアクティビティ・ウォッチャー・スコープなど 42 個の API
              </p>
            </div>
            <span :class="styles.progressBadge">{{ vueProgress.done }} / {{ vueProgress.total }} 完了</span>
          </div>
          <div :class="styles.hooksList">
            <div
              v-for="hook in vueHooks"
              :key="hook.name"
              :class="[styles.hookRow, isHookDone(hook.name) ? styles.hookRowDone : '']"
            >
              <div :class="css({ flex: '1', minW: '0' })">
                <div :class="css({ display: 'flex', alignItems: 'center', gap: '3', flexWrap: 'wrap' })">
                  <span :class="styles.hookName">{{ hook.name }}</span>
                  <span :class="styles.hookCategory">{{ hook.category }}</span>
                </div>
                <p :class="styles.hookDesc">
                  {{ hook.description }}
                </p>
              </div>
              <button type="button" :class="toggleClasses(isHookDone(hook.name))" @click="toggleHook(hook.name)">
                {{ isHookDone(hook.name) ? '検証済み' : '未検証' }}
              </button>
            </div>
          </div>
        </DesignSystemCard>
      </div>
    </div>
  </div>
</template>
