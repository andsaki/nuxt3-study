import { defineStore } from 'pinia'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  // State (ref → state)
  const todos = ref<Todo[]>([
    { id: 1, text: 'Piniaの基本を学ぶ', completed: true },
    { id: 2, text: 'Setup Store形式を理解する', completed: false },
    { id: 3, text: 'Gettersの使い方を学ぶ', completed: false }
  ])
  const nextId = ref(4)

  // Getters (computed → getters)
  const completedTodos = computed(() =>
    todos.value.filter(todo => todo.completed)
  )

  const activeTodos = computed(() =>
    todos.value.filter(todo => !todo.completed)
  )

  const totalCount = computed(() => todos.value.length)

  const completedCount = computed(() => completedTodos.value.length)

  const progressPercentage = computed(() => {
    if (totalCount.value === 0) return 0
    return Math.round((completedCount.value / totalCount.value) * 100)
  })

  // Actions (function → actions)
  const addTodo = (text: string) => {
    if (!text.trim()) return

    todos.value.push({
      id: nextId.value++,
      text: text.trim(),
      completed: false
    })
  }

  const toggleTodo = (id: number) => {
    const todo = todos.value.find(t => t.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  const removeTodo = (id: number) => {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  const clearCompleted = () => {
    todos.value = todos.value.filter(t => !t.completed)
  }

  // Stateとメソッドを返す（すべて公開される）
  return {
    // State
    todos,
    // Getters
    completedTodos,
    activeTodos,
    totalCount,
    completedCount,
    progressPercentage,
    // Actions
    addTodo,
    toggleTodo,
    removeTodo,
    clearCompleted
  }
})
