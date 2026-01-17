<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = useSlots()

const attrKeys = computed(() => Object.keys(attrs).filter(Boolean))
const hasFooter = computed(() => Boolean(slots.footer))
</script>

<template>
  <article class="rounded-xl border border-indigo-200 bg-indigo-50 p-4 shadow-sm" v-bind="attrs">
    <header class="mb-3">
      <slot name="title">
        <h4 class="text-lg font-semibold text-indigo-900">SlotAwareCard</h4>
      </slot>
      <p class="text-xs uppercase tracking-wide text-indigo-500">
        slots: title / default / footer
      </p>
    </header>

    <div class="text-sm text-indigo-900">
      <slot>デフォルトスロットの内容です。</slot>
    </div>

    <footer v-if="hasFooter" class="mt-3 border-t border-indigo-200 pt-2 text-xs text-indigo-700">
      <slot name="footer" />
    </footer>

    <p class="mt-3 text-xs text-indigo-500">
      付与された attrs:
      <span class="font-mono">{{ attrKeys.length ? attrKeys.join(', ') : 'なし' }}</span>
    </p>
  </article>
</template>
