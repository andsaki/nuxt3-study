# Vue Composition API チートシート

Vue 3 / Nuxt 3 で頻出する Composition API をカテゴリ別に整理しました。基本的なシグネチャと代表的な用途をざっくり確認できます。

ブラウザからは `/examples/vue-composition-api` を開くと、このページの内容に対応したインタラクティブなサンプルを触れます。

## 基本リアクティビティ

- **`ref(value)`**: プリミティブ値向けのリアクティブラッパー。`.value` でアクセス。
- **`shallowRef(value)`**: ネストを追跡しない `ref`。巨大オブジェクトなどで差分検知を抑えたい時に便利。
- **`reactive(obj)`**: オブジェクトをディープにプロキシ化。プロパティへ直接アクセスでき、テンプレートからもそのまま参照可能。
- **`shallowReactive(obj)`**: 第一階層のみリアクティブ化。内部の入れ子までは追跡しない。
- **`readonly(target)`**: 任意の ref/reactive を読み取り専用に。開発時は書き込みで警告が出る。
- **`shallowReadonly(target)`**: 直下だけ読み取り専用。ネスト内部は変更可。
- **`markRaw(obj)`**: 指定したオブジェクトをリアクティブ変換対象から除外。サードパーティインスタンスなどに。

```ts
const count = ref(0)
const state = reactive({ user: { name: 'Taro' } })
const config = markRaw(new Map())
```

## 派生状態とウォッチャ

- **`computed(getter | { get, set })`**: 依存を自動追跡する算出値。setter を定義すれば双方向化。
- **`watch(source, callback, options?)`**: 1つまたは複数のソースを手動で監視。旧値・新値を受け取れる。
- **`watchEffect(effect, options?)`**: 依存を実行時に自動収集するリアクティビティ副作用。旧値は使わないシンプルな監視に。
- **`watchPostEffect(effect)`**: DOM 更新後に走る `watchEffect`。レイアウト計測などに。
- **`watchSyncEffect(effect)`**: 同期的にすぐ走る `watchEffect`。DOM 依存の無いロジック向け。
- **`triggerRef(ref)`**: `shallowRef` などで内部を直接 mutate した後に手動で再評価させる。
- **`customRef(factory)`**: 値の get/set を自作できる ref。デバウンス等のカスタム挙動に。
- **`defineModel(options?)`**: `<script setup>` で `v-model` を定義する糖衣。値・イベント名や defaults をまとめて宣言できる（Nuxt 3 / Vue 3.3+）。

## ライフサイクルフック

- **`onBeforeMount`**, **`onMounted`**: コンポーネントのマウント前後。
- **`onBeforeUpdate`**, **`onUpdated`**: DOM 更新の前後。
- **`onBeforeUnmount`**, **`onUnmounted`**: コンポーネント破棄の前後。
- **`onActivated`**, **`onDeactivated`**: `<KeepAlive>` でラップされたときの再活性化／休止。
- **`onErrorCaptured`**: 子のエラーを捕捉。再スローやログ出力に。
- **`onRenderTracked`**, **`onRenderTriggered`**: レンダリング依存のデバッグ用フック。追跡対象やトリガ理由をチェックできる。

```ts
onMounted(() => {
  console.log('mounted')
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handler)
})
```

## Provide / Inject

- **`provide(key, value)`**: 祖先から子孫へ値を渡す。key はシンボルや文字列。
- **`inject(key, defaultValue?)`**: `provide` された値を受け取る。`defaultValue` やファクトリ関数も使える。

フォームコンテキストやテーマなど、props で渡しづらい共有状態に有効。

## 参照ユーティリティ

- **`toRef(object, key)`**: `reactive` オブジェクトの特定プロパティを ref 化。
- **`toRefs(object)`**: `reactive` の各プロパティを一括で ref 化。分割代入で reactivity を維持したい時に。
- **`unref(target)` / **`toValue(target)`**: ref なら `.value`、非 ref ならそのまま返す。`toValue` は `ref` / `computed` / getter 関数をまとめて解決する Vue 3.3+ の API。
- **`isRef`, `isReactive`, `isReadonly`, `isProxy`**: タイプガード的にリアクティブオブジェクトを判定。

```ts
const state = reactive({ count: 0 })
const count = toRef(state, 'count') // count.value と state.count が同期
```

## Attrs / Slots / インスタンス

- **`useAttrs()`**: コンポーネントに渡された未処理属性 (`$attrs`) をリアクティブに取得。
- **`useSlots()`**: スロット関数を取得し、存在チェックやカスタムレンダリングに活用。
- **`getCurrentInstance()`**: 現在のコンポーネントインスタンスを取得。プラグインや高度なユースケース向け。

## スコープ制御

- **`getCurrentScope()`**: 現在のエフェクトスコープ（`effectScope`）を取得。スコープ外なら `null`。
- **`effectScope(detached?)`**: 複数のリアクティブ副作用をまとめて管理できるスコープを作成。`scope.stop()` で全副作用を停止。
- **`onScopeDispose(fn)`**: 現在のスコープ終了時に実行するクリーンアップを登録。Composable 内部でリスナーを片付けたいときに便利。

```ts
const scope = effectScope()
scope.run(() => {
  const stop = watchEffect(() => console.log(message.value))
  onScopeDispose(() => stop())
})
// scope.stop() で watchEffect もまとめて停止
```

## まとめ

- `ref` / `reactive` 系で状態を作る → `computed` / `watch` で派生ロジック → ライフサイクルフックで副作用を管理。
- Provide/Inject はツリーを跨いだ共有状態に、`useAttrs` / `useSlots` はラッパーコンポーネントに役立つ。
- `effectScope` と `onScopeDispose` を使うと複雑な Composable でもクリーンアップ漏れを防げる。

このページをブックマークしておけば、Nuxt 3 でコンポーネントや Composable を実装するときのリファレンスとして素早く参照できます。
