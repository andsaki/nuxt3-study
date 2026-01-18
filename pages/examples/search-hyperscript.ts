import { defineComponent, h } from 'vue'
import SearchFilters from '~/components/examples/search/SearchFilters.vue'
import SearchResults from '~/components/examples/search/SearchResults.vue'
import { useSearchProjects, type DifficultyFilter } from '~/composables/useSearchProjects'
import { searchUiStyles } from '~/utils/examples/search-ui-styles'

export default defineComponent({
  name: 'ExamplesSearchHyperscript',
  setup() {
    const search = useSearchProjects()
    const styles = searchUiStyles

    return () =>
      h('div', { class: styles.page }, [
        h('div', { class: styles.layout }, [
          h('section', { class: styles.searchCard }, [
            h('p', { class: styles.accentLabel }, 'Hyperscript (h)'),
            h('h1', { class: styles.heading }, '検索UI (render関数)'),
            h(
              'p',
              { class: styles.description },
              'テンプレートを使わずに h() で UI を構築。レンダリングロジックを完全に JavaScript に寄せたいときの参考実装です。',
            ),
            h(SearchFilters, {
              query: search.query.value,
              queryPlaceholder: 'Dashboard, Prisma...',
              queryHelper: 'h() なので v-model は使わず、イベントを自前で束縛しています。',
              availableTags: search.availableTags.value,
              selectedTag: search.selectedTag.value,
              availableDifficulties: search.availableDifficulties.value,
              selectedDifficulty: search.selectedDifficulty.value,
              ['onUpdate:query']: (value: string) => {
                search.query.value = value
              },
              ['onUpdate:selectedTag']: (value: string) => {
                search.selectedTag.value = value
              },
              ['onUpdate:selectedDifficulty']: (value: DifficultyFilter) => {
                search.selectedDifficulty.value = value
              },
            }),
          ]),
          h(SearchResults, {
            stats: search.stats.value,
            methodLabel: 'render + h',
            subtitle: 'レンダリング処理を直接触りたいときに h() でどれだけ記述量が増えるかを体感できます。',
            activeFilters: search.activeFilters.value,
            projects: search.filteredProjects.value,
            emptyState: 'ヒットしませんでした。検索条件を見直してください。',
            onReset: search.resetFilters,
          }),
        ]),
      ])
  },
})
