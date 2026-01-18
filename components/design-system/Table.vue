<script setup lang="ts">
import {
  computed,
  provide,
  useAttrs,
} from 'vue'
import { cx } from '~/styled-system/css'
import { table as tableRecipe } from '~/styled-system/recipes'
import type { ComponentWCAGLevel } from './constants/accessibility'
import {
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableCell,
  TableCaption,
  tableContextKey,
  defaultContext,
  type TableContextValue,
} from './table-helpers'

defineOptions({
  inheritAttrs: false,
})

export type TableVariant = 'simple' | 'striped'
export type TableSize = 'sm' | 'md' | 'lg'

type TableProps = {
  caption?: string
  captionPlacement?: 'top' | 'bottom'
  srOnlyCaption?: boolean
  variant?: TableVariant
  size?: TableSize
  stickyHeader?: boolean
  highlightOnHover?: boolean
  showColumnDividers?: boolean
  wcagLevel?: ComponentWCAGLevel
  responsiveLabel?: string
  responsive?: boolean
  class?: string
}

const attrs = useAttrs()

const props = withDefaults(defineProps<TableProps>(), {
  caption: undefined,
  captionPlacement: 'top',
  srOnlyCaption: false,
  variant: 'simple',
  size: 'md',
  stickyHeader: false,
  highlightOnHover: true,
  showColumnDividers: false,
  wcagLevel: 'AA',
  responsiveLabel: 'スクロール可能なテーブル',
  responsive: true,
  class: '',
})

const contextValue = computed<TableContextValue>(() => ({
  size: props.size,
  variant: props.variant,
  stickyHeader: props.stickyHeader,
  highlightOnHover: props.highlightOnHover,
  showColumnDividers: props.showColumnDividers,
  wcagLevel: props.wcagLevel,
}))

provide(tableContextKey, contextValue)

const classes = computed(() => tableRecipe({
  size: props.size,
  variant: props.variant,
  wcagLevel: props.wcagLevel,
  responsive: props.responsive,
  stickyHeader: props.stickyHeader,
  highlightOnHover: props.highlightOnHover,
  showColumnDividers: props.showColumnDividers,
}))

const attrClass = computed(() => attrs.class as string | undefined)
const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs as Record<string, unknown>
  return rest
})

</script>

<template>
  <div
    :class="classes.container"
    :data-responsive="responsive ? 'true' : 'false'"
    :role="responsive ? 'region' : undefined"
    :aria-label="responsive ? responsiveLabel : undefined"
    :tabindex="responsive ? 0 : undefined"
  >
    <table
      v-bind="forwardedAttrs"
      :class="cx(classes.root, props.class, attrClass)"
      :data-variant="variant"
      :data-size="size"
      :data-sticky-header="stickyHeader ? 'true' : 'false'"
      :data-hover="highlightOnHover ? 'true' : 'false'"
      :data-column-dividers="showColumnDividers ? 'true' : 'false'"
      :data-wcag-level="wcagLevel"
      role="table"
    >
      <TableCaption
        v-if="caption"
        :placement="captionPlacement"
        :sr-only="srOnlyCaption"
      >
        {{ caption }}
      </TableCaption>
      <slot />
    </table>
  </div>
</template>
