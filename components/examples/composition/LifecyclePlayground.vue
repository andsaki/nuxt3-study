<script setup lang="ts">
import {
  nextTick,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onUpdated,
  ref,
} from 'vue'
import { css } from '~/styled-system/css'
import ErrorGenerator from '~/components/examples/composition/ErrorGenerator.vue'

const tick = ref(0)
const failChild = ref(false)
const logEntries = ref<
  {
    label: string
    detail?: string
    id: number
  }[]
>([])

let logId = 0
const pushLog = (label: string, detail?: string) => {
  logEntries.value = [{ label, detail, id: logId++ }, ...logEntries.value].slice(0, 18)
}

const increment = () => {
  tick.value++
}

const throwFromChild = async () => {
  failChild.value = true
  await nextTick()
  failChild.value = false
}

onBeforeMount(() => pushLog('onBeforeMount'))
onMounted(() => pushLog('onMounted'))
onBeforeUpdate(() => pushLog('onBeforeUpdate'))
onUpdated(() => pushLog('onUpdated'))
onBeforeUnmount(() => pushLog('onBeforeUnmount'))
onUnmounted(() => pushLog('onUnmounted'))
onActivated(() => pushLog('onActivated'))
onDeactivated(() => pushLog('onDeactivated'))

onErrorCaptured((err) => {
  pushLog('onErrorCaptured', (err as Error).message)
  // return false to keep bubbling disabled
  return false
})

onRenderTracked((event) => {
  pushLog('onRenderTracked', `${event.key as string} via ${event.type}`)
})

onRenderTriggered((event) => {
  pushLog('onRenderTriggered', `${event.key as string} changed`)
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

const buttonRowClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '3',
})

const noteTextClass = css({
  color: 'gray.600',
})

const logListClass = css({
  listStyle: 'none',
  margin: 0,
  padding: 0,
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'gray.200',
  backgroundColor: 'gray.50',
  p: '4',
  fontSize: 'sm',
  color: 'gray.900',
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
})

const logItemClass = css({
  borderRadius: 'lg',
  backgroundColor: 'white',
  paddingInline: '3',
  paddingBlock: '2',
})

const logDetailClass = css({
  color: 'gray.500',
  marginLeft: '2',
})

const logLabelClass = css({
  fontWeight: 'semibold',
})
</script>

<template>
  <div :class="pageClass">
    <header :class="headerClass">
      <DesignSystemText variant="h3">
        ライフサイクルフックの流れ
      </DesignSystemText>
      <DesignSystemText variant="body-small" :class="noteTextClass">
        各フックが呼ばれる順序をログします。更新ボタンで再レンダー、エラーボタンで
        <code>onErrorCaptured</code> を確認できます。
      </DesignSystemText>
    </header>

    <div :class="buttonRowClass">
      <DesignSystemButton variant="primary" size="sm" @click="increment">
        tick を更新 ({{ tick }})
      </DesignSystemButton>
      <DesignSystemButton variant="danger" size="sm" @click="throwFromChild">
        子コンポーネントでエラー
      </DesignSystemButton>
    </div>

    <ErrorGenerator :fail="failChild" />

    <ul :class="logListClass">
      <li
        v-for="entry in logEntries"
        :key="entry.id"
        :class="logItemClass"
      >
        <span :class="logLabelClass">{{ entry.label }}</span>
        <span v-if="entry.detail" :class="logDetailClass">— {{ entry.detail }}</span>
      </li>
    </ul>
  </div>
</template>
