<template>
  <DesignSystemCard title="TanStack Vue Query" icon="🧠" color-scheme="blue">
    <div :class="contentClass">
      <DesignSystemText
        v-if="isPending"
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
        エラー: {{ error?.message ?? '不明なエラー' }}
      </DesignSystemText>

      <template v-else>
        <p :class="dataTextClass">
          <span :class="labelClass">取得データ:</span> {{ data }}
        </p>
        <div :class="metaListClass">
          <span>isFetching: {{ isFetching }}</span>
          <span>isRefetching: {{ isRefetching }}</span>
          <span>status: {{ status }}</span>
        </div>
        <DesignSystemButton
          variant="primary"
          size="sm"
          :class="actionButtonClass"
          :disabled="isRefetching"
          @click="refetch"
        >
          {{ isRefetching ? '再取得中...' : '再取得' }}
        </DesignSystemButton>
      </template>
    </div>
  </DesignSystemCard>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { css } from '~/styled-system/css'

// シンプルなデータフェッチ関数
const fetchData = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return `データ (TanStack Query) - ${new Date().toLocaleTimeString()}`
}

const { data, error, isPending, isFetching, isRefetching, status, refetch } = useQuery({
  queryKey: ['demo-data'],
  queryFn: fetchData,
  refetchOnWindowFocus: false,
})

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
