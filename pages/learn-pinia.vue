<template>
  <div :class="containerClass">
    <!-- ヘッダー -->
    <header :class="headerClass">
      <h1 :class="titleClass">Pinia 学習ガイド</h1>
      <p :class="subtitleClass">
        Vue 3の公式状態管理ライブラリを実践的に学ぶ
      </p>
    </header>

    <!-- セクション1: Options Store（カウンター） -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">
        1. Options Store 形式（カウンターストア）
      </h2>

      <div :class="descriptionClass">
        <p>
          <code>state</code>、<code>getters</code>、<code>actions</code> を明示的に定義する従来の方法です。
        </p>
      </div>

      <DesignSystemCard
        title="インタラクティブデモ"
        icon="🔢"
        color-scheme="blue"
      >
        <div :class="demoContentClass">
          <!-- カウント表示 -->
          <div :class="countDisplayClass">
            <div :class="countValueClass">{{ counterStore.count }}</div>
            <div :class="countLabelClass">カウント</div>
          </div>

          <!-- Gettersの表示 -->
          <div :class="gettersGridClass">
            <div :class="getterItemClass">
              <span :class="getterLabelClass">doubleCount:</span>
              <span :class="getterValueClass">{{ counterStore.doubleCount }}</span>
            </div>
            <div :class="getterItemClass">
              <span :class="getterLabelClass">isPositive:</span>
              <span :class="getterValueClass">{{ counterStore.isPositive }}</span>
            </div>
            <div :class="getterItemClass">
              <span :class="getterLabelClass">isNegative:</span>
              <span :class="getterValueClass">{{ counterStore.isNegative }}</span>
            </div>
            <div :class="getterItemClass">
              <span :class="getterLabelClass">countMessage:</span>
              <span :class="getterValueClass">{{ counterStore.countMessage }}</span>
            </div>
          </div>

          <!-- ボタン -->
          <div :class="buttonGroupClass">
            <DesignSystemButton
              variant="primary"
              size="md"
              @click="counterStore.increment"
            >
              +1
            </DesignSystemButton>
            <DesignSystemButton
              variant="secondary"
              size="md"
              @click="counterStore.decrement"
            >
              -1
            </DesignSystemButton>
            <DesignSystemButton
              variant="outline"
              size="md"
              @click="counterStore.reset"
            >
              リセット
            </DesignSystemButton>
          </div>
        </div>
      </DesignSystemCard>

      <!-- コードスニペット -->
      <div :class="codeBlockClass">
        <pre :class="codePreClass"><code>{{ optionsStoreCode }}</code></pre>
      </div>
    </section>

    <!-- セクション2: Setup Store（TODO） -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">
        2. Setup Store 形式（TODOストア）
      </h2>

      <div :class="descriptionClass">
        <p>
          Composition APIの<code>setup()</code>関数のように定義する方法です。
          <code>ref → state</code>、<code>computed → getters</code>、<code>function → actions</code>
        </p>
      </div>

      <DesignSystemCard
        title="インタラクティブデモ"
        icon="✅"
        color-scheme="green"
      >
        <div :class="demoContentClass">
          <!-- 進捗バー -->
          <div :class="progressSectionClass">
            <div :class="progressHeaderClass">
              <span>進捗状況</span>
              <span :class="progressPercentClass">{{ todoStore.progressPercentage }}%</span>
            </div>
            <div :class="progressBarBgClass">
              <div
                :class="progressBarFillClass"
                :style="{ width: `${todoStore.progressPercentage}%` }"
              />
            </div>
            <div :class="progressStatsClass">
              <span>完了: {{ todoStore.completedCount }}</span>
              <span>残り: {{ todoStore.activeTodos.length }}</span>
            </div>
          </div>

          <!-- TODO追加フォーム -->
          <form :class="formClass" @submit.prevent="handleAddTodo">
            <DesignSystemInput
              v-model="newTodoText"
              label="新しいタスク"
              placeholder="Piniaの使い方をマスターする..."
            />
            <DesignSystemButton
              type="submit"
              variant="primary"
              size="md"
            >
              追加
            </DesignSystemButton>
          </form>

          <!-- TODOリスト -->
          <div :class="todoListClass">
            <div
              v-for="todo in todoStore.todos"
              :key="todo.id"
              :class="todoItemClass"
            >
              <DesignSystemCheckbox
                :model-value="todo.completed"
                :label="todo.text"
                @update:model-value="todoStore.toggleTodo(todo.id)"
              />
              <button
                :class="deleteButtonClass"
                @click="todoStore.removeTodo(todo.id)"
                aria-label="削除"
              >
                🗑️
              </button>
            </div>
          </div>

          <!-- クリアボタン -->
          <div
            v-if="todoStore.completedCount > 0"
            :class="clearButtonContainerClass"
          >
            <DesignSystemButton
              variant="outline"
              size="sm"
              @click="todoStore.clearCompleted"
            >
              完了済みをクリア ({{ todoStore.completedCount }})
            </DesignSystemButton>
          </div>
        </div>
      </DesignSystemCard>

      <!-- コードスニペット -->
      <div :class="codeBlockClass">
        <pre :class="codePreClass"><code>{{ setupStoreCode }}</code></pre>
      </div>
    </section>

    <!-- セクション3: 主要な違い -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">
        3. Options vs Setup の比較
      </h2>

      <div :class="comparisonGridClass">
        <DesignSystemCard
          title="Options Store"
          icon="📋"
          color-scheme="blue"
        >
          <ul :class="comparisonListClass">
            <li>Vue Options APIに似た構文</li>
            <li>state、getters、actionsを明示的に分離</li>
            <li>初心者にわかりやすい</li>
            <li>TypeScript型推論が自動的</li>
          </ul>
        </DesignSystemCard>

        <DesignSystemCard
          title="Setup Store"
          icon="⚡"
          color-scheme="purple"
        >
          <ul :class="comparisonListClass">
            <li>Composition APIに似た構文</li>
            <li>ref/computed/functionで表現</li>
            <li>より柔軟で自由度が高い</li>
            <li>watchやコンポーザブルを使いやすい</li>
          </ul>
        </DesignSystemCard>
      </div>
    </section>

    <!-- セクション4: 学習リソース -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">
        4. 次のステップ
      </h2>

      <div :class="resourcesGridClass">
        <a
          href="https://pinia.vuejs.org/"
          target="_blank"
          rel="noopener noreferrer"
          :class="resourceCardClass"
        >
          <span :class="resourceIconClass">📚</span>
          <span :class="resourceTitleClass">公式ドキュメント</span>
          <span :class="resourceDescClass">Piniaの全機能を学ぶ</span>
        </a>

        <a
          href="https://pinia.vuejs.org/core-concepts/state.html"
          target="_blank"
          rel="noopener noreferrer"
          :class="resourceCardClass"
        >
          <span :class="resourceIconClass">🎯</span>
          <span :class="resourceTitleClass">コアコンセプト</span>
          <span :class="resourceDescClass">State/Getters/Actions</span>
        </a>

        <a
          href="https://pinia.vuejs.org/cookbook/"
          target="_blank"
          rel="noopener noreferrer"
          :class="resourceCardClass"
        >
          <span :class="resourceIconClass">👨‍🍳</span>
          <span :class="resourceTitleClass">クックブック</span>
          <span :class="resourceDescClass">実践的なレシピ集</span>
        </a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

// ストアの使用（Nuxt 3が自動インポート）
const counterStore = useCounterStore()
const todoStore = useTodoStore()

// TODO入力用
const newTodoText = ref('')

const handleAddTodo = () => {
  todoStore.addTodo(newTodoText.value)
  newTodoText.value = ''
}

// コードスニペット
const optionsStoreCode = `export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
    isPositive: (state) => state.count > 0
  },

  actions: {
    increment() { this.count++ }
  }
})`

const setupStoreCode = `export const useTodoStore = defineStore('todo', () => {
  // State (ref → state)
  const todos = ref<Todo[]>([])

  // Getters (computed → getters)
  const completedTodos = computed(() =>
    todos.value.filter(t => t.completed)
  )

  // Actions (function → actions)
  const addTodo = (text: string) => {
    todos.value.push({ id: Date.now(), text, completed: false })
  }

  return { todos, completedTodos, addTodo }
})`

// スタイル
const containerClass = css({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: 'gray.50',
  minHeight: '100vh'
})

const headerClass = css({
  textAlign: 'center',
  marginBottom: '3rem'
})

const titleClass = css({
  fontSize: '3xl',
  fontWeight: 'bold',
  color: 'gray.900',
  marginBottom: '0.5rem'
})

const subtitleClass = css({
  fontSize: 'lg',
  color: 'gray.600'
})

const sectionClass = css({
  marginBottom: '3rem'
})

const sectionTitleClass = css({
  fontSize: '2xl',
  fontWeight: 'bold',
  color: 'gray.900',
  marginBottom: '1rem'
})

const descriptionClass = css({
  marginBottom: '1.5rem',
  padding: '1rem',
  backgroundColor: 'blue.50',
  borderLeft: '4px solid',
  borderColor: 'blue.500',
  borderRadius: 'md',
  '& code': {
    backgroundColor: 'blue.100',
    padding: '0.125rem 0.375rem',
    borderRadius: 'sm',
    fontFamily: 'mono',
    fontSize: 'sm'
  }
})

const demoContentClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem'
})

const countDisplayClass = css({
  textAlign: 'center',
  padding: '2rem',
  backgroundColor: 'blue.50',
  borderRadius: 'lg'
})

const countValueClass = css({
  fontSize: '4xl',
  fontWeight: 'bold',
  color: 'blue.600'
})

const countLabelClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  marginTop: '0.5rem'
})

const gettersGridClass = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '1rem'
})

const getterItemClass = css({
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  backgroundColor: 'gray.50',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'gray.200'
})

const getterLabelClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  fontFamily: 'mono',
  marginBottom: '0.25rem'
})

const getterValueClass = css({
  fontSize: 'lg',
  fontWeight: 'bold',
  color: 'gray.900'
})

const buttonGroupClass = css({
  display: 'flex',
  gap: '0.75rem',
  justifyContent: 'center',
  flexWrap: 'wrap'
})

const progressSectionClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
})

const progressHeaderClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: 'sm',
  color: 'gray.700',
  fontWeight: 'medium'
})

const progressPercentClass = css({
  fontSize: 'lg',
  fontWeight: 'bold',
  color: 'green.600'
})

const progressBarBgClass = css({
  width: '100%',
  height: '0.75rem',
  backgroundColor: 'gray.200',
  borderRadius: 'full',
  overflow: 'hidden'
})

const progressBarFillClass = css({
  height: '100%',
  backgroundColor: 'green.500',
  transition: 'width 0.3s ease',
  borderRadius: 'full'
})

const progressStatsClass = css({
  display: 'flex',
  justifyContent: 'space-between',
  fontSize: 'sm',
  color: 'gray.600',
  fontWeight: 'medium'
})

const formClass = css({
  display: 'flex',
  gap: '0.75rem',
  alignItems: 'center',
})

const todoListClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
})

const todoItemClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '0.75rem',
  backgroundColor: 'white',
  borderRadius: 'md',
  border: '1px solid',
  borderColor: 'gray.200',
  transition: 'all 0.2s',
  _hover: {
    borderColor: 'green.300',
    boxShadow: 'sm'
  }
})

const deleteButtonClass = css({
  padding: '0.25rem 0.5rem',
  fontSize: 'lg',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  borderRadius: 'md',
  transition: 'all 0.2s',
  _hover: {
    backgroundColor: 'red.50',
    transform: 'scale(1.1)'
  }
})

const clearButtonContainerClass = css({
  display: 'flex',
  justifyContent: 'center'
})

const codeBlockClass = css({
  marginTop: '1.5rem',
  padding: '1rem',
  backgroundColor: 'gray.900',
  borderRadius: 'lg',
  overflow: 'auto'
})

const codePreClass = css({
  margin: '0',
  color: 'green.300',
  fontSize: 'sm',
  fontFamily: 'mono',
  lineHeight: '1.6'
})

const comparisonGridClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
  gap: '1.5rem'
})

const comparisonListClass = css({
  listStyle: 'none',
  padding: '0',
  margin: '0',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  '& li': {
    paddingLeft: '1.5rem',
    position: 'relative',
    _before: {
      content: '"✓"',
      position: 'absolute',
      left: '0',
      color: 'green.500',
      fontWeight: 'bold'
    }
  }
})

const resourcesGridClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(3, 1fr)' },
  gap: '1.5rem'
})

const resourceCardClass = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.75rem',
  padding: '2rem',
  backgroundColor: 'white',
  borderRadius: 'lg',
  border: '2px solid',
  borderColor: 'gray.200',
  textDecoration: 'none',
  transition: 'all 0.2s',
  cursor: 'pointer',
  _hover: {
    borderColor: 'blue.400',
    transform: 'translateY(-4px)',
    boxShadow: 'lg'
  }
})

const resourceIconClass = css({
  fontSize: '3xl'
})

const resourceTitleClass = css({
  fontSize: 'lg',
  fontWeight: 'bold',
  color: 'gray.900'
})

const resourceDescClass = css({
  fontSize: 'sm',
  color: 'gray.600',
  textAlign: 'center'
})
</script>
