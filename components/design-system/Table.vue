<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  useAttrs,
  useId,
} from 'vue'
import type {
  CSSProperties,
  InjectionKey,
  PropType,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
  Ref,
  VNodeChild,
} from 'vue'
import { cx } from '~/styled-system/css'
import { table as tableRecipe } from '~/styled-system/recipes'
import type { ComponentWCAGLevel } from './constants/accessibility'

defineOptions({
  inheritAttrs: false,
})

export type TableVariant = 'simple' | 'striped'
export type TableSize = 'sm' | 'md' | 'lg'

interface TableProps extends TableHTMLAttributes {
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

interface TableContextValue {
  size: TableSize
  variant: TableVariant
  stickyHeader: boolean
  highlightOnHover: boolean
  showColumnDividers: boolean
  wcagLevel: ComponentWCAGLevel
}

const tableContextKey: InjectionKey<Ref<TableContextValue>> = Symbol('table-context')

const defaultContext: TableContextValue = {
  size: 'md',
  variant: 'simple',
  stickyHeader: false,
  highlightOnHover: true,
  showColumnDividers: false,
  wcagLevel: 'AA',
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

const useTableContext = () => inject(tableContextKey, computed(() => defaultContext))!

export const TableHeader = defineComponent({
  name: 'DesignSystemTableHeader',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'thead',
        attrs as Record<string, unknown>,
        slots.default?.(),
      )
  },
})

export const TableBody = defineComponent({
  name: 'DesignSystemTableBody',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'tbody',
        attrs as Record<string, unknown>,
        slots.default?.(),
      )
  },
})

export const TableFooter = defineComponent({
  name: 'DesignSystemTableFooter',
  inheritAttrs: false,
  setup(_, { slots, attrs }) {
    return () =>
      h(
        'tfoot',
        attrs as Record<string, unknown>,
        slots.default?.(),
      )
  },
})

export const TableRow = defineComponent({
  name: 'DesignSystemTableRow',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(rowProps, { slots, attrs }) {
    const rowClasses = tableRecipe()
    const forwarded = computed(() => {
      const { class: _class, ...rest } = attrs as Record<string, unknown>
      return rest
    })

    return () =>
      h(
        'tr',
        {
          ...forwarded.value,
          class: cx(rowClasses.row, rowProps.class),
        },
        slots.default?.(),
      )
  },
})

export const TableHeaderCell = defineComponent({
  name: 'DesignSystemTableHeaderCell',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
    align: {
      type: String as () => 'left' | 'center' | 'right',
      default: 'left',
    },
    helpText: {
      type: [String, Object] as PropType<VNodeChild>,
      default: undefined,
    },
    sortDirection: {
      type: String as () => 'ascending' | 'descending' | 'none',
      default: undefined,
    },
    scope: {
      type: String,
      default: 'col',
    },
  },
  setup(cellProps, { slots, attrs }) {
    const context = useTableContext()
    const helpId = useId()
    const cellClasses = computed(() => tableRecipe({
      size: context.value.size,
      wcagLevel: context.value.wcagLevel,
      stickyHeader: context.value.stickyHeader,
      showColumnDividers: context.value.showColumnDividers,
    }))
    const forwarded = computed(() => {
      const { class: _class, ...rest } = attrs as Record<string, unknown>
      return rest
    })

    return () =>
      h(
        'th',
        {
          ...forwarded.value,
          scope: cellProps.scope,
          'aria-sort': cellProps.sortDirection,
          'aria-describedby': cellProps.helpText ? helpId : undefined,
          'data-align': cellProps.align,
          class: cx(cellClasses.value.headerCell, cellProps.class),
          style: { textAlign: cellProps.align },
        },
        [
          h('span', { style: { display: 'block' } }, slots.default?.()),
          cellProps.helpText
            ? h(
              'span',
              {
                id: helpId,
                style: {
                  display: 'block',
                  marginTop: '0.25rem',
                  fontSize: '0.75rem',
                  fontWeight: 'normal',
                  color: 'var(--colors-contents-tertiary)',
                },
              },
              cellProps.helpText,
            )
            : null,
        ],
      )
  },
})

export const TableCell = defineComponent({
  name: 'DesignSystemTableCell',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
    align: {
      type: String as () => 'left' | 'center' | 'right',
      default: 'left',
    },
    isNumeric: {
      type: Boolean,
      default: false,
    },
  },
  setup(cellProps, { slots, attrs }) {
    const context = useTableContext()
    const cellClasses = computed(() => tableRecipe({
      size: context.value.size,
      wcagLevel: context.value.wcagLevel,
      showColumnDividers: context.value.showColumnDividers,
    }))
    const forwarded = computed(() => {
      const { class: _class, ...rest } = attrs as Record<string, unknown>
      return rest
    })

    const textAlign = computed(() => (cellProps.isNumeric ? 'right' : cellProps.align))

    return () =>
      h(
        'td',
        {
          ...forwarded.value,
          'data-align': textAlign.value,
          class: cx(cellClasses.value.cell, cellProps.class),
          style: {
            textAlign: textAlign.value,
            fontVariantNumeric: cellProps.isNumeric ? 'tabular-nums' : undefined,
          },
        },
        slots.default?.(),
      )
  },
})

export const TableCaption = defineComponent({
  name: 'DesignSystemTableCaption',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
    placement: {
      type: String as () => 'top' | 'bottom',
      default: 'top',
    },
    srOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(captionProps, { slots, attrs }) {
    const context = useTableContext()
    const captionClasses = computed(() => tableRecipe({ wcagLevel: context.value.wcagLevel }))
    const forwarded = computed(() => {
      const { class: _class, ...rest } = attrs as Record<string, unknown>
      return rest
    })

    const srOnlyStyle: CSSProperties = {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      margin: '-1px',
      overflow: 'hidden',
      clip: 'rect(0, 0, 0, 0)',
      whiteSpace: 'nowrap',
      border: '0',
    }

    return () =>
      h(
        'caption',
        {
          ...forwarded.value,
          class: cx(captionClasses.value.caption, captionProps.class),
          style: {
            captionSide: captionProps.placement,
            ...(captionProps.srOnly ? srOnlyStyle : {}),
          },
          'data-sr-only': captionProps.srOnly ? 'true' : undefined,
        },
        slots.default?.(),
      )
  },
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
