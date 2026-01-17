<script setup lang="ts">
const count = defineModel<number>({ default: 0 })

const increment = () => {
  count.value++
}

const decrement = () => {
  count.value--
}
</script>

<template>
  <div class="flex items-center gap-4 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3">
    <button class="rounded-md bg-orange-200 px-2 py-1 font-mono text-lg" @click="decrement">-</button>
    <span class="text-2xl font-semibold text-orange-900">{{ count }}</span>
    <button class="rounded-md bg-orange-200 px-2 py-1 font-mono text-lg" @click="increment">+</button>
  </div>
</template>
