import { defineComponent } from 'vue'
import SearchFilters from '~/components/examples/search/SearchFilters.vue'
import SearchResults from '~/components/examples/search/SearchResults.vue'
import { useSearchProjects, type DifficultyFilter } from '~/composables/useSearchProjects'
import { searchUiStyles } from '~/utils/examples/search-ui-styles'

export default defineComponent({
  name: 'ExamplesSearchTsx',
  setup() {
    const search = useSearchProjects()
    const styles = searchUiStyles

    return () => (
      <div class={styles.page}>
        <div class={styles.layout}>
          <section class={styles.searchCard}>
            <p class={styles.accentLabel}>TSX</p>
            <h1 class={styles.heading}>検索UI (TSX)</h1>
            <p class={styles.description}>
              JSX/TSX の構文で Vue コンポーネントを記述した例。型補完が強めな反面、ディレクティブはフック経由で書き直す必要があります。
            </p>
            <SearchFilters
              query={search.query.value}
              queryPlaceholder="Nitro, offline..."
              queryHelper="TSXでは v-model ではなく value + onInput で束縛します。"
              availableTags={search.availableTags.value}
              selectedTag={search.selectedTag.value}
              availableDifficulties={search.availableDifficulties.value}
              selectedDifficulty={search.selectedDifficulty.value}
              {...{
                'onUpdate:query': (value: string) => {
                  search.query.value = value
                },
                'onUpdate:selectedTag': (value: string) => {
                  search.selectedTag.value = value
                },
                'onUpdate:selectedDifficulty': (value: DifficultyFilter) => {
                  search.selectedDifficulty.value = value
                },
              }}
            />
          </section>

          <SearchResults
            stats={search.stats.value}
            methodLabel="TSX render"
            subtitle="TypeScript の型情報を保ったまま条件分岐・ループを JS で扱えるのがメリットです。"
            activeFilters={search.activeFilters.value}
            projects={search.filteredProjects.value}
            emptyState="ヒットしませんでした。検索条件を調整してください。"
            onReset={search.resetFilters}
          />
        </div>
      </div>
    )
  },
})
