<template>
  <DesignSystemCard title="VueUse" icon="🧰" color-scheme="green">
    <div :class="contentClass">
      <DesignSystemText
        v-if="isLoading"
        variant="body-small"
        :class="mutedTextClass"
      >
        読み込み中...
      </DesignSystemText>

      <DesignSystemText
        v-else-if="error"
        variant="body-small"
        :class="errorTextClass"
      >
        エラー: {{ error ?? '不明なエラー' }}
      </DesignSystemText>

      <template v-else>
        <p :class="dataTextClass">
          <span :class="labelClass">取得データ:</span> {{ data }}
        </p>
        <div :class="metaListClass">
          <span>isFinished: {{ isFinished }}</span>
          <span>isFetching: {{ isFetching }}</span>
        </div>
        <DesignSystemButton
          variant="primary"
          size="sm"
          :class="actionButtonClass"
          :disabled="isFetching"
          @click="execute"
        >
          {{ isFetching ? '再取得中...' : '再取得' }}
        </DesignSystemButton>
      </template>
    </div>
  </DesignSystemCard>
</template>

<script setup lang="ts">
import { useFetch, type BeforeFetchContext, type AfterFetchContext } from '@vueuse/core'
import { ref, computed } from 'vue'
import { css } from '~/styled-system/css'

const counter = ref(0)

// VueUseのuseFetchを使用
const url = computed(() => `/api/demo?counter=${counter.value}`)

const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `データ (VueUse) - ${new Date().toLocaleTimeString()}`
}

const { data, error, isFetching, isFinished, execute } = useFetch(url, {
  immediate: true,
  beforeFetch({ options }: BeforeFetchContext) {
    // ここでヘッダーなどを設定可能
    return { options }
  },
  afterFetch(ctx: AfterFetchContext) {
    // データを加工
    ctx.data = fetchData()
    return ctx
  },
}).get().json()

// 手動で再取得
const isLoading = computed(() => isFetching.value && !isFinished.value)

const contentClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

const mutedTextClass = css({
  color: 'gray.600',
})

const errorTextClass = css({
  color: 'red.600',
  fontWeight: 'semibold',
})

const dataTextClass = css({
  fontSize: 'sm',
  color: 'gray.700',
})

const labelClass = css({
  fontWeight: 'semibold',
  color: 'gray.900',
  marginRight: '2',
})

const metaListClass = css({
  display: 'grid',
  gap: '1',
  fontSize: 'xs',
  color: 'gray.600',
})

const actionButtonClass = css({
  alignSelf: 'flex-start',
})
</script>
