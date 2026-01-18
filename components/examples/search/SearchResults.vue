<template>
  <DesignSystemCard :title="`結果: ${stats.matched} / ${stats.total}`" icon="🔍" color-scheme="purple">
    <div :class="styles.summary">
      <p :class="styles.subtitle">
        {{ subtitle }}
      </p>
      <span :class="styles.methodBadge">
        {{ methodLabel }}
      </span>
    </div>

    <DesignSystemInfoBox
      v-if="activeFilters.length"
      variant="info"
      icon="🎯"
      left-border
    >
      <div :class="styles.activeFilters">
        <span
          v-for="chip in activeFilters"
          :key="chip"
          :class="styles.activeChip"
        >
          {{ chip }}
        </span>
        <DesignSystemButton variant="secondary" size="sm" @click="emit('reset')">
          条件をリセット
        </DesignSystemButton>
      </div>
    </DesignSystemInfoBox>

    <DesignSystemInfoBox
      v-if="!projects.length"
      variant="warning"
      icon="😕"
      left-border
    >
      <p>{{ emptyState }}</p>
    </DesignSystemInfoBox>

    <div
      v-else
      :class="styles.resultGrid"
    >
      <DesignSystemCard
        v-for="project in projects"
        :key="project.id"
        variant="bordered"
        :title="project.title"
        :color-scheme="difficultyColorMap[project.difficulty]"
      >
        <p :class="styles.projectMeta">
          {{ project.stack }} ・ {{ project.difficulty }}
        </p>
        <DesignSystemInfoBox variant="tip" left-border>
          <p>{{ project.description }}</p>
        </DesignSystemInfoBox>
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
              :class="styles.tag"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </DesignSystemCard>
    </div>
  </DesignSystemCard>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'
import type { SearchProject } from '~/data/search-projects'
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

const styles = {
  summary: css({
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: '3',
    mb: '4',
  }),
  subtitle: css({
    color: 'contents.secondary',
    fontSize: 'sm',
  }),
  methodBadge: css({
    alignSelf: 'flex-start',
    borderRadius: 'full',
    background: 'purple.50',
    color: 'purple.700',
    fontSize: 'sm',
    fontWeight: 'semibold',
    px: '4',
    py: '2',
  }),
  activeFilters: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2',
    alignItems: 'center',
  }),
  activeChip: css({
    borderRadius: 'full',
    background: 'gray.100',
    color: 'gray.700',
    fontSize: 'sm',
    px: '3',
    py: '1',
  }),
  resultGrid: css({
    display: 'grid',
    gap: '4',
    mt: '4',
  }),
  projectMeta: css({
    fontSize: 'sm',
    color: 'contents.secondary',
    mb: '3',
  }),
  cardFooter: css({
    display: 'flex',
    flexDirection: { base: 'column', md: 'row' },
    justifyContent: 'space-between',
    gap: '3',
    mt: '4',
  }),
  metrics: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3',
    fontSize: 'sm',
    color: 'contents.secondary',
  }),
  tagList: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2',
  }),
  tag: css({
    borderRadius: 'full',
    background: 'bg.secondary',
    color: 'contents.secondary',
    fontSize: 'xs',
    px: '3',
    py: '1',
  }),
}

const difficultyColorMap: Record<SearchProject['difficulty'], 'green' | 'blue' | 'purple'> = {
  入門: 'green',
  中級: 'blue',
  上級: 'purple',
}

const { stats, subtitle, methodLabel, activeFilters, projects, emptyState } = toRefs(props)
</script>
