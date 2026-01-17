<script setup lang="ts">
import { computed, customRef, ref, watch, watchEffect, watchPostEffect, watchSyncEffect } from 'vue'
import { css } from '~/styled-system/css'

const makeDebouncedRef = (initial = '', delay = 400) => {
  return customRef<string>((track, trigger) => {
    let value = initial
    let timer: ReturnType<typeof setTimeout>
    return {
      get() {
        track()
        return value
      },
      set(newValue: string) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      },
    }
  })
}

const message = ref('Nuxt')
const debouncedQuery = makeDebouncedRef('', 500)
const uppercase = computed(() => message.value.toUpperCase())

const watcherLog = ref<
  {
    tag: string
    detail: string
    id: number
  }[]
>([])

let logId = 0
const pushLog = (tag: string, detail: string) => {
  const entry = { tag, detail, id: logId++ }
  queueMicrotask(() => {
    watcherLog.value = [...watcherLog.value.slice(-7), entry]
  })
}

watch(message, (newValue, oldValue) => {
  pushLog('watch', `${oldValue} → ${newValue}`)
})

watchEffect(() => {
  pushLog('watchEffect', `length=${message.value.length}`)
})

watchPostEffect(() => {
  pushLog('watchPostEffect', `DOM updated for "${message.value}"`)
})

watchSyncEffect(() => {
  pushLog('watchSyncEffect', `pre-render snapshot="${message.value}"`)
})

watch(debouncedQuery, (value) => {
  pushLog('customRef', `debounced value="${value || 'empty'}"`)
})
const pageClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

const headerClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
})

const gridClass = css({
  display: 'grid',
  gap: '4',
  gridTemplateColumns: {
    base: '1fr',
    lg: 'repeat(2, minmax(0, 1fr))',
  },
})

const inputSectionClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'green.200',
  backgroundColor: 'green.50',
  p: '4',
})

const logSectionClass = css({
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'gray.200',
  backgroundColor: 'gray.50',
  p: '4',
})

const highlightTextClass = css({
  color: 'green.900',
  fontWeight: 'semibold',
})

const logListClass = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  fontSize: 'sm',
  color: 'gray.900',
})

const logItemClass = css({
  borderRadius: 'lg',
  borderWidth: '1px',
  borderColor: 'gray.200',
  backgroundColor: 'white',
  paddingInline: '3',
  paddingBlock: '2',
})

const logTagClass = css({
  fontFamily: 'mono',
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: 'gray.500',
})
</script>

<template>
  <div :class="pageClass">
    <header :class="headerClass">
      <DesignSystemText variant="h3">
        ウォッチャ &amp; customRef
      </DesignSystemText>
      <DesignSystemText variant="body-small" color="gray.600">
        <code>watch</code> / <code>watchEffect</code> / <code>watchPostEffect</code> /
        <code>watchSyncEffect</code> のタイミングと <code>customRef</code> を使ったデバウンス入力をログに残します。
      </DesignSystemText>
    </header>

    <div :class="gridClass">
      <section :class="inputSectionClass">
        <DesignSystemInput
          label="message (ref)"
          v-model="message"
          helper-text="Type anything"
          size="sm"
        />

        <DesignSystemText variant="body-small" :class="highlightTextClass">
          computed uppercase:
          <span :class="highlightTextClass">{{ uppercase }}</span>
        </DesignSystemText>

        <DesignSystemInput
          label="debouncedQuery (customRef)"
          v-model="debouncedQuery"
          helper-text="500ms debounce"
          size="sm"
        />
      </section>

      <section :class="logSectionClass">
        <DesignSystemText variant="h4" color="gray.800">
          発火ログ (最新8件)
        </DesignSystemText>
        <ul :class="logListClass">
          <li
            v-for="entry in [...watcherLog].reverse()"
            :key="entry.id"
            :class="logItemClass"
          >
            <span :class="logTagClass">{{ entry.tag }}</span>
            <div>{{ entry.detail }}</div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
