<script setup lang="ts">
// エラーを発生させるコンポーネント
const BuggyComponent = defineComponent({
  name: 'BuggyComponent',
  setup() {
    const count = ref(0)

    const increment = () => {
      count.value++
      if (count.value >= 3) {
        throw new Error('カウントが3に達しました！意図的なエラーです。')
      }
    }

    return { count, increment }
  },
  template: `
    <div class="buggy-component">
      <p>カウント: {{ count }}</p>
      <button @click="increment" class="count-button">
        クリックしてカウント（3でエラー）
      </button>
    </div>
  `
})

const AsyncBuggyComponent = defineComponent({
  name: 'AsyncBuggyComponent',
  async setup() {
    const throwError = () => {
      throw new Error('非同期エラーが発生しました！')
    }

    return { throwError }
  },
  template: `
    <div class="buggy-component">
      <button @click="throwError" class="error-button">
        非同期エラーを発生させる
      </button>
    </div>
  `
})

import type { ComponentPublicInstance } from 'vue'

// カスタムエラーハンドラ
const handleError = (error: Error, instance: ComponentPublicInstance | null) => {
  console.log('カスタムエラーハンドラが呼ばれました')
  console.log('エラー:', error.message)
  console.log('コンポーネント:', instance?.$options?.name)
  // ここでエラーログサービスに送信など
}

// マウント時にエラーを発生させるコンポーネント
const ImmediateErrorComponent = defineComponent({
  name: 'ImmediateErrorComponent',
  setup() {
    onMounted(() => {
      throw new Error('マウント時にエラーが発生しました！')
    })

    return {}
  },
  template: '<div class="buggy-component"><p>マウント中...</p></div>'
})
</script>

<template>
  <div class="container">
    <h1>Error Boundary デモ</h1>

    <div class="intro">
      <p>
        Error Boundary（エラーバウンダリ）は、子コンポーネントで発生したエラーをキャッチして、
        アプリ全体がクラッシュするのを防ぎます。
      </p>
    </div>

    <!-- 例1: 基本的な使い方 -->
    <div class="demo-section">
      <h2>例1: 基本的なエラーバウンダリ</h2>
      <ErrorBoundary>
        <BuggyComponent />
      </ErrorBoundary>
    </div>

    <!-- 例2: カスタムフォールバック -->
    <div class="demo-section">
      <h2>例2: カスタムエラー表示</h2>
      <ErrorBoundary fallback="おっと！何か問題が発生しました">
        <template #error="{ error, reset }">
          <div class="custom-error">
            <h3>🔥 カスタムエラー表示</h3>
            <p>{{ error?.message }}</p>
            <button @click="reset" class="custom-reset">
              リトライ
            </button>
          </div>
        </template>
        <BuggyComponent />
      </ErrorBoundary>
    </div>

    <!-- 例3: 非同期エラー -->
    <div class="demo-section">
      <h2>例3: 非同期エラーのキャッチ</h2>
      <ErrorBoundary :on-error="handleError">
        <AsyncBuggyComponent />
      </ErrorBoundary>
    </div>

    <!-- 例4: 即座にエラー -->
    <div class="demo-section">
      <h2>例4: マウント時のエラー</h2>
      <ErrorBoundary>
        <ImmediateErrorComponent />
      </ErrorBoundary>
    </div>

    <!-- 例5: ネストしたエラーバウンダリ -->
    <div class="demo-section">
      <h2>例5: ネストしたエラーバウンダリ</h2>
      <ErrorBoundary fallback="外側のエラーバウンダリ">
        <div class="nested-container">
          <p>外側のコンテナ</p>
          <ErrorBoundary fallback="内側のエラーバウンダリ">
            <BuggyComponent />
          </ErrorBoundary>
          <p>外側のコンテナは正常に表示される</p>
        </div>
      </ErrorBoundary>
    </div>

    <!-- 使い方 -->
    <div class="usage-section">
      <h2>💻 使い方</h2>
      <pre v-pre><code>&lt;ErrorBoundary&gt;
  &lt;YourComponent /&gt;
&lt;/ErrorBoundary&gt;

&lt;!-- カスタムフォールバック --&gt;
&lt;ErrorBoundary fallback="エラーメッセージ"&gt;
  &lt;YourComponent /&gt;
&lt;/ErrorBoundary&gt;

&lt;!-- カスタムエラー表示 --&gt;
&lt;ErrorBoundary&gt;
  &lt;template #error="{ error, reset }"&gt;
    &lt;div&gt;
      &lt;p&gt;{{ error?.message }}&lt;/p&gt;
      &lt;button @click="reset"&gt;リトライ&lt;/button&gt;
    &lt;/div&gt;
  &lt;/template&gt;
  &lt;YourComponent /&gt;
&lt;/ErrorBoundary&gt;

&lt;!-- エラーハンドラ --&gt;
&lt;ErrorBoundary :on-error="handleError"&gt;
  &lt;YourComponent /&gt;
&lt;/ErrorBoundary&gt;</code></pre>
    </div>

    <!-- 実装 -->
    <div class="implementation-section">
      <h2>🔧 実装</h2>
      <p>ErrorBoundaryコンポーネントは以下を使用しています:</p>
      <ul>
        <li><code>onErrorCaptured</code> - 子コンポーネントのエラーをキャッチ</li>
        <li>falseを返してエラーの伝播を停止</li>
        <li>エラー状態を管理してフォールバックUIを表示</li>
        <li>リセット機能で再試行を可能に</li>
      </ul>
    </div>

    <NuxtLink to="/" class="back-link">← トップページに戻る</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #00dc82;
  margin-bottom: 2rem;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

.intro {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.demo-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.buggy-component {
  padding: 1rem;
  background: #f9fafb;
  border-radius: 6px;
}

.count-button,
.error-button {
  padding: 0.75rem 1.5rem;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}

.count-button:hover,
.error-button:hover {
  background: #2563eb;
}

.custom-error {
  padding: 2rem;
  background: #fff7ed;
  border: 2px solid #f59e0b;
  border-radius: 8px;
  text-align: center;
}

.custom-error h3 {
  color: #92400e;
  margin-bottom: 1rem;
}

.custom-reset {
  padding: 0.75rem 1.5rem;
  background: #f59e0b;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
}

.custom-reset:hover {
  background: #d97706;
}

.nested-container {
  padding: 1rem;
  background: #f0fdf4;
  border: 2px solid #10b981;
  border-radius: 6px;
}

.usage-section,
.implementation-section {
  background: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.usage-section h2,
.implementation-section h2 {
  color: #f9fafb;
}

.usage-section pre {
  background: #111827;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin-top: 1rem;
}

.usage-section code {
  color: #f9fafb;
  font-size: 0.875rem;
}

.implementation-section ul {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

.implementation-section li {
  margin: 0.5rem 0;
}

.implementation-section code {
  background: #374151;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
}

.back-link {
  display: inline-block;
  color: #00dc82;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid #00dc82;
  border-radius: 6px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #00dc82;
  color: white;
}
</style>
