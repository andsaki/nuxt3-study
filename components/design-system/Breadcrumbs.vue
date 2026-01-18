<script setup lang="ts">
import { computed, provide, toRef, useAttrs } from 'vue'
import { breadcrumbs as breadcrumbsRecipe } from '~/styled-system/recipes'
import { cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'
import { breadcrumbsLevelKey } from './breadcrumb-helpers'

defineOptions({
  inheritAttrs: false,
})

interface BreadcrumbsProps {
  class?: string
  label?: string
  wcagLevel?: ComponentWCAGLevel
}

const props = withDefaults(defineProps<BreadcrumbsProps>(), {
  class: '',
  label: 'パンくずリスト',
  wcagLevel: 'AA',
})

const attrs = useAttrs()
const navClass = computed(() => cx(breadcrumbsRecipe({ wcagLevel: props.wcagLevel }).root, props.class))

const navAttrs = computed(() => {
  const {
    class: _class,
    'aria-label': _ariaLabel,
    'data-wcag-level': _level,
    ...rest
  } = attrs as Record<string, unknown>
  return rest
})

provide(breadcrumbsLevelKey, toRef(props, 'wcagLevel'))
</script>

<template>
  <nav :class="navClass" aria-label="breadcrumb" :data-wcag-level="props.wcagLevel" v-bind="navAttrs">
    <slot />
  </nav>
</template>
