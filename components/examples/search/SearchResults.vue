<template>
  <section :class="styles.resultsCard">
    <div :class="styles.statsBar">
      <div>
        <p :class="styles.statsTitle">
          結果: {{ stats.matched }} / {{ stats.total }}
        </p>
        <p :class="styles.statsSubtitle">
          {{ subtitle }}
        </p>
      </div>
      <span :class="styles.methodBadge">
        {{ methodLabel }}
      </span>
    </div>

    <div
      v-if="activeFilters.length"
      :class="styles.activeFilters"
    >
      <span
        v-for="chip in activeFilters"
        :key="chip"
        :class="styles.activeChip"
      >
        {{ chip }}
      </span>
      <DesignSystemButton
        variant="secondary"
        size="sm"
        :class="styles.resetButton"
        @click="emit('reset')"
      >
        条件をリセット
      </DesignSystemButton>
    </div>

    <div
      v-if="!projects.length"
      :class="styles.emptyState"
    >
      {{ emptyState }}
    </div>

    <ul
      v-else
      :class="styles.resultList"
    >
      <li
        v-for="project in projects"
        :key="project.id"
        :class="styles.resultCard"
      >
        <div :class="styles.cardHeader">
          <div>
            <p :class="styles.cardTitle">
              {{ project.title }}
            </p>
            <p :class="styles.cardMeta">
              {{ project.stack }}
            </p>
          </div>
          <span :class="styles.difficultyBadge">
            {{ project.difficulty }}
          </span>
        </div>

        <p :class="styles.cardDescription">
          {{ project.description }}
        </p>

        <div :class="styles.cardFooter">
          <div :class="styles.metrics">
            <span>⭐ {{ project.metrics.stars }}</span>
            <span>💾 {{ project.metrics.saves }}</span>
            <span>🗓️ {{ project.lastUpdate }}</span>
          </div>
          <div :class="styles.tagList">
            <span
              v-for="tag in project.tags"
              :key="tag"
              :class="styles.resultTag"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import type { SearchProject } from '~/data/search-projects'
import { searchUiStyles as styles } from '~/utils/examples/search-ui-styles'

import { toRefs } from 'vue'

const props = defineProps<{
  stats: { total: number; matched: number }
  subtitle: string
  methodLabel: string
  activeFilters: string[]
  projects: SearchProject[]
  emptyState: string
}>()

const emit = defineEmits<{
  reset: []
}>()

const { stats, subtitle, methodLabel, activeFilters, projects, emptyState } = toRefs(props)
</script>
