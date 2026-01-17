<script setup lang="ts">
import { defineComponent, h, onMounted, ref, type ComponentPublicInstance } from 'vue'
import { css } from '~/styled-system/css'

const componentStyles = {
  buggy: css({
    p: '4',
    bg: 'gray.50',
    borderRadius: 'lg',
  }),
  primaryButton: css({
    mt: '3',
    bg: 'blue.500',
    color: 'white',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    fontWeight: 'semibold',
    _hover: { bg: 'blue.600' },
    border: 'none',
  }),
  asyncButton: css({
    mt: '3',
    bg: 'purple.500',
    color: 'white',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    fontWeight: 'semibold',
    _hover: { bg: 'purple.600' },
    border: 'none',
  }),
}

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

    return () =>
      h('div', { class: componentStyles.buggy }, [
        h('p', `カウント: ${count.value}`),
        h(
          'button',
          {
            class: componentStyles.primaryButton,
            onClick: increment,
          },
          'クリックしてカウント（3でエラー）',
        ),
      ])
  },
})

const AsyncBuggyComponent = defineComponent({
  name: 'AsyncBuggyComponent',
  setup() {
    const throwError = () => {
      throw new Error('非同期エラーが発生しました！')
    }

    return () =>
      h('div', { class: componentStyles.buggy }, [
        h(
          'button',
          {
            class: componentStyles.asyncButton,
            onClick: throwError,
          },
          '非同期エラーを発生させる',
        ),
      ])
  },
})

const handleError = (error: Error, instance: ComponentPublicInstance | null) => {
  console.log('カスタムエラーハンドラが呼ばれました')
  console.log('エラー:', error.message)
  console.log('コンポーネント:', instance?.$options?.name)
}

const ImmediateErrorComponent = defineComponent({
  name: 'ImmediateErrorComponent',
  setup() {
    onMounted(() => {
      throw new Error('マウント時にエラーが発生しました！')
    })

    return () =>
      h('div', { class: componentStyles.buggy }, [h('p', 'マウント中...')])
  },
})

const styles = {
  page: css({
    bg: 'slate.50',
    minH: 'screen',
    py: '10',
  }),
  container: css({
    maxW: '6xl',
    mx: 'auto',
    px: { base: '4', md: '6' },
    display: 'flex',
    flexDirection: 'column',
    gap: '6',
  }),
  title: css({ fontSize: '4xl', fontWeight: 'bold', color: 'emerald.500' }),
  intro: css({
    bg: 'blue.50',
    borderLeftWidth: '4px',
    borderColor: 'cyan.500',
    borderRadius: 'xl',
    p: '6',
    color: 'slate.700',
  }),
  section: css({
    bg: 'white',
    borderRadius: '2xl',
    p: '6',
    borderWidth: '1px',
    borderColor: 'gray.200',
    boxShadow: 'md',
  }),
  sectionTitle: css({ fontSize: 'xl', fontWeight: 'semibold', color: 'slate.800', mb: '4' }),
  customError: css({
    mt: '4',
    textAlign: 'center',
    bg: 'orange.50',
    borderRadius: 'xl',
    borderWidth: '2px',
    borderColor: 'orange.400',
    p: '6',
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
  }),
  customReset: css({
    alignSelf: 'center',
    bg: 'orange.500',
    color: 'white',
    borderRadius: 'lg',
    px: '4',
    py: '2',
    fontWeight: 'semibold',
    border: 'none',
    _hover: { bg: 'orange.600' },
  }),
  nestedContainer: css({
    mt: '4',
    bg: 'emerald.50',
    borderRadius: 'xl',
    borderWidth: '2px',
    borderColor: 'emerald.400',
    p: '4',
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
  }),
  codeSection: css({
    bg: 'slate.900',
    color: 'slate.50',
    borderRadius: '2xl',
    p: '6',
    boxShadow: 'lg',
  }),
  codeBlock: css({
    mt: '4',
    bg: 'slate.800',
    borderRadius: 'lg',
    p: '4',
    fontFamily: 'mono',
    overflowX: 'auto',
  }),
  implementationList: css({
    mt: '3',
    pl: '5',
    lineHeight: 'tall',
    color: 'slate.100',
  }),
  backLink: css({
    color: 'emerald.500',
    fontWeight: 'medium',
    borderWidth: '2px',
    borderColor: 'emerald.500',
    borderRadius: 'xl',
    px: '4',
    py: '2',
    alignSelf: 'flex-start',
    _hover: { bg: 'emerald.500', color: 'white' },
  }),
}
</script>

<template>
  <div :class="styles.page">
    <div :class="styles.container">
      <h1 :class="styles.title">Error Boundary デモ</h1>

      <div :class="styles.intro">
        <p>
          Error Boundary（エラーバウンダリ）は、子コンポーネントで発生したエラーをキャッチして、アプリ全体がクラッシュするのを防ぎます。
        </p>
      </div>

      <section :class="styles.section">
        <h2 :class="styles.sectionTitle">例1: 基本的なエラーバウンダリ</h2>
        <ErrorBoundary>
          <BuggyComponent />
        </ErrorBoundary>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.sectionTitle">例2: カスタムエラー表示</h2>
        <ErrorBoundary fallback="おっと！何か問題が発生しました">
          <template #error="{ error, reset }">
            <div :class="styles.customError">
              <h3>🔥 カスタムエラー表示</h3>
              <p>{{ error?.message }}</p>
              <button :class="styles.customReset" @click="reset">
                リトライ
              </button>
            </div>
          </template>
          <BuggyComponent />
        </ErrorBoundary>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.sectionTitle">例3: 非同期エラーのキャッチ</h2>
        <ErrorBoundary :on-error="handleError">
          <AsyncBuggyComponent />
        </ErrorBoundary>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.sectionTitle">例4: マウント時のエラー</h2>
        <ErrorBoundary>
          <ImmediateErrorComponent />
        </ErrorBoundary>
      </section>

      <section :class="styles.section">
        <h2 :class="styles.sectionTitle">例5: ネストしたエラーバウンダリ</h2>
        <ErrorBoundary fallback="外側のエラーバウンダリ">
          <div :class="styles.nestedContainer">
            <p>外側のコンテナ</p>
            <ErrorBoundary fallback="内側のエラーバウンダリ">
              <BuggyComponent />
            </ErrorBoundary>
            <p>外側のコンテナは正常に表示される</p>
          </div>
        </ErrorBoundary>
      </section>

      <section :class="styles.codeSection">
        <h2 :class="styles.sectionTitle">💻 使い方</h2>
        <pre v-pre :class="styles.codeBlock"><code>&lt;ErrorBoundary&gt;
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
      </section>

      <section :class="styles.codeSection">
        <h2 :class="styles.sectionTitle">🔧 実装</h2>
        <p>ErrorBoundaryコンポーネントは以下を使用しています:</p>
        <ul :class="styles.implementationList">
          <li><code>onErrorCaptured</code> - 子コンポーネントのエラーをキャッチ</li>
          <li>falseを返してエラーの伝播を停止</li>
          <li>エラー状態を管理してフォールバックUIを表示</li>
          <li>リセット機能で再試行を可能に</li>
        </ul>
      </section>

      <NuxtLink to="/" :class="styles.backLink">← トップページに戻る</NuxtLink>
    </div>
  </div>
</template>
