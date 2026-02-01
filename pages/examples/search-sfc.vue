<template>
  <div :class="styles.page">
    <div :class="styles.layout">
      <section :class="styles.searchCard">
        <p :class="styles.accentLabel">
          Templateベース
        </p>
        <h1 :class="styles.heading">
          検索UI (.vue SFC)
        </h1>
        <p :class="styles.description">
          `&lt;template&gt;` と `&lt;script setup&gt;` の素朴な構成で、Nuxt 3 コンポーネントがどれだけ宣言的に書けるかを確認するための比較用サンプル。
        </p>

        <SearchFilters
          :query="query"
          query-placeholder="Algolia, PWA, Prisma..."
          query-helper="title / description / tags / stack を横断して部分一致します。"
          :available-tags="availableTags"
          :selected-tag="selectedTag"
          :available-difficulties="availableDifficulties"
          :selected-difficulty="selectedDifficulty"
          @update:query="onUpdateQuery"
          @update:selected-tag="onUpdateTag"
          @update:selected-difficulty="onUpdateDifficulty"
        />
      </section>

      <SearchResults
        :stats="stats"
        method-label=".vue + template"
        subtitle="フィルター条件を組み合わせながらテンプレートのシンプルさを確認できます。"
        :active-filters="activeFilters"
        :projects="filteredProjects"
        empty-state="条件に一致するサンプルはありません。フィルターを調整してください。"
        @reset="resetFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SearchFilters from '~/components/examples/search/SearchFilters.vue'
import SearchResults from '~/components/examples/search/SearchResults.vue'
import type { DifficultyFilter } from '~/composables/useSearchProjects'
import { useSearchProjects } from '~/composables/useSearchProjects'
import { searchUiStyles as styles } from '~/utils/examples/search-ui-styles'
const {
  query,
  selectedTag,
  selectedDifficulty,
  availableTags,
  availableDifficulties,
  filteredProjects,
  stats,
  activeFilters,
  resetFilters,
} = useSearchProjects()

const onUpdateQuery = (value: string) => {
  query.value = value
}

const onUpdateTag = (value: string) => {
  selectedTag.value = value
}

const onUpdateDifficulty = (value: DifficultyFilter) => {
  selectedDifficulty.value = value
}
</script>
