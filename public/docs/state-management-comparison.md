# 状態管理ライブラリの比較

## Vue vs React の状態管理

### Vuex ≈ Redux (単一ストアアーキテクチャ)

**共通点:**

- 単一の大きなストア
- 厳格なアーキテクチャ
- ボイラープレートが多い
- mutations/reducers でステート更新

**Vuex の特徴:**

```js
// store/index.js
export default createStore({
  state: { count: 0 },
  mutations: {
    increment(state) { state.count++ }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000)
    }
  }
})
```

**Redux (従来型) の特徴:**

```js
// reducer
const reducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    default:
      return state
  }
}
```

**Redux Toolkit (現代的な Redux) の特徴:**

```ts
// Redux Toolkit - 現役で広く使われている
const counterSlice = createSlice({
  name: 'counter',
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count++ // immer で直接変更可能
    }
  }
})

// コンポーネント
const count = useSelector(state => state.counter.count)
dispatch(counterSlice.actions.increment())
```

---

### Pinia ≈ Recoil (分散ストアアーキテクチャ)

**共通点:**

- 複数の小さなストア/atom に分割
- シンプルな API
- TypeScript サポートが優れている
- DevTools サポート
- ボイラープレートが少ない

**Pinia の特徴:**

```ts
// stores/counter.ts
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  actions: {
    increment() {
      this.count++
    }
  }
})

// コンポーネント
const counter = useCounterStore()
counter.increment()
```

**Recoil の特徴:**

```ts
// atoms/counter.ts
export const countState = atom({
  key: 'countState',
  default: 0
})

// コンポーネント
const [count, setCount] = useRecoilState(countState)
setCount(count + 1)
```

---

## 移行について

### Vuex から Pinia への移行

❌ **破壊的変更ではない**

- Vuex は引き続き使用可能（非推奨ではない）
- Pinia は別のライブラリとして存在
- Vue 3 では Pinia が**公式推奨**

✅ **移行のメリット:**

- TypeScript サポートの向上
- コード量の削減
- モジュールの分割が容易
- Composition API との親和性

🔄 **移行時の注意:**

- API が異なるため書き換えが必要
- 段階的に移行可能（併用可能）

---

### Redux の選択肢

**Redux Toolkit (RTK) を使い続ける**

- 現役で広く使われている
- 大規模プロジェクトで実績がある
- RTK Query で API 管理も可能

**Recoil / Zustand / Jotai に移行**

- より軽量でシンプルな API
- atom 単位での再レンダリング最適化
- 小〜中規模プロジェクト向き
- ❌ Redux の「代替」ではなく「別の選択肢」

---

## どちらを選ぶべきか

### 既存プロジェクト

- Vuex/Redux (RTK) のままでも問題なし
- 移行は必須ではない

### 新規プロジェクト

- **Vue 3** → Pinia を推奨
- **React** → Redux Toolkit、Zustand、Jotai など（規模や好みで選択）

### プロジェクト規模別

- 小〜中規模: Pinia / Zustand / Jotai
- 大規模・複雑: Pinia / Redux Toolkit
- 極小規模: provide/inject、Context API で十分
