import { computed, ref } from 'vue'
import type { SearchProject } from '~/data/search-projects'
import { searchProjects } from '~/data/search-projects'

export type DifficultyFilter = 'all' | SearchProject['difficulty']

export const useSearchProjects = () => {
  const query = ref('')
  const selectedTag = ref<'all' | string>('all')
  const selectedDifficulty = ref<DifficultyFilter>('all')

  const availableTags = computed(() => {
    const tags = new Set<string>()
    for (const project of searchProjects) {
      project.tags.forEach(tag => tags.add(tag))
    }
    return ['all', ...Array.from(tags)]
  })

  const availableDifficulties = computed<DifficultyFilter[]>(() => {
    const levels = new Set<SearchProject['difficulty']>()
    for (const project of searchProjects) {
      levels.add(project.difficulty)
    }
    return ['all', ...Array.from(levels)]
  })

  const filteredProjects = computed(() => {
    const normalizedQuery = query.value.trim().toLowerCase()

    return searchProjects.filter(project => {
      const matchesQuery =
        normalizedQuery.length === 0 ||
        project.title.toLowerCase().includes(normalizedQuery) ||
        project.description.toLowerCase().includes(normalizedQuery) ||
        project.tags.some(tag => tag.toLowerCase().includes(normalizedQuery)) ||
        project.stack.toLowerCase().includes(normalizedQuery)

      const matchesTag = selectedTag.value === 'all' || project.tags.includes(selectedTag.value)
      const matchesDifficulty = selectedDifficulty.value === 'all' || project.difficulty === selectedDifficulty.value

      return matchesQuery && matchesTag && matchesDifficulty
    })
  })

  const stats = computed(() => ({
    total: searchProjects.length,
    matched: filteredProjects.value.length,
  }))

  const activeFilters = computed(() => {
    const filters: string[] = []
    if (query.value.trim()) {
      filters.push(`"${query.value.trim()}"`)
    }
    if (selectedTag.value !== 'all') {
      filters.push(`#${selectedTag.value}`)
    }
    if (selectedDifficulty.value !== 'all') {
      filters.push(selectedDifficulty.value)
    }
    return filters
  })

  const resetFilters = () => {
    query.value = ''
    selectedTag.value = 'all'
    selectedDifficulty.value = 'all'
  }

  return {
    query,
    selectedTag,
    selectedDifficulty,
    availableTags,
    availableDifficulties,
    filteredProjects,
    stats,
    activeFilters,
    resetFilters,
  }
}
