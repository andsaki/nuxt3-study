<template>
  <div :class="styles.filtersStack">
    <DesignSystemInput
      label="キーワード"
      :model-value="props.query"
      :placeholder="props.queryPlaceholder"
      :helper-text="props.queryHelper"
      clearable
      type="search"
      @update:model-value="onUpdateQuery"
      @clear="onClearQuery"
    />

    <div>
      <p :class="styles.inputLabel">
        タグで絞り込み
      </p>
      <div :class="styles.tagList">
        <DesignSystemButton
          v-for="tag in props.availableTags"
          :key="tag"
          type="button"
          variant="outline"
          size="sm"
          :class="cx(styles.tagButton, props.selectedTag === tag && styles.tagButtonActive)"
          @click="emit('update:selectedTag', tag)"
        >
          {{ tag === 'all' ? 'すべて' : `#${tag}` }}
        </DesignSystemButton>
      </div>
    </div>

    <DesignSystemSelect
      label="難易度"
      :model-value="props.selectedDifficulty"
      :options="difficultyOptions"
      :helper-text="difficultyHelper"
      @update:model-value="onDifficultyChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cx } from '~/styled-system/css'
import type { DifficultyFilter } from '~/composables/useSearchProjects'
import { searchUiStyles as styles } from '~/utils/examples/search-ui-styles'

const props = defineProps<{
  query: string
  queryPlaceholder: string
  queryHelper: string
  availableTags: string[]
  selectedTag: string
  availableDifficulties: DifficultyFilter[]
  selectedDifficulty: DifficultyFilter
}>()

const emit = defineEmits<{
  'update:query': [value: string]
  'update:selectedTag': [value: string]
  'update:selectedDifficulty': [value: DifficultyFilter]
}>()

const difficultyOptions = computed(() =>
  props.availableDifficulties.map(level => ({
    value: level,
    label: level === 'all' ? 'すべて' : level,
  })),
)

const difficultyHelper = computed(() => 'プロジェクトのレベル感で粗く分類')

const onUpdateQuery = (value: string) => {
  emit('update:query', value)
}

const onClearQuery = () => {
  emit('update:query', '')
}

const onDifficultyChange = (value: string) => {
  emit('update:selectedDifficulty', value as DifficultyFilter)
}
</script>
