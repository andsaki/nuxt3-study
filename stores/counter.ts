import { defineStore } from 'pinia'

interface CounterState {
  count: number
}

export const useCounterStore = defineStore('counter', {
  state: (): CounterState => ({
    count: 0
  }),

  getters: {
    doubleCount: (state) => state.count * 2,
    isPositive: (state) => state.count > 0,
    isNegative: (state) => state.count < 0,
    countMessage(): string {
      if (this.count === 0) return 'ゼロです'
      if (this.isPositive) return `プラス${this.count}です`
      return `マイナス${Math.abs(this.count)}です`
    }
  },

  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
    reset() {
      this.count = 0
    }
  },

  persist: true
})
