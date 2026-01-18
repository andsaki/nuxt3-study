import {
  computed,
  defineComponent,
  h,
  inject,
  ref,
  type InjectionKey,
  type Ref,
} from 'vue'
import { breadcrumbs as breadcrumbsRecipe } from '~/styled-system/recipes'
import { cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'

const createFilteredAttrs = (source: Record<string, unknown>, excludeKeys: string[]) => {
  const result: Record<string, unknown> = {}
  Object.entries(source).forEach(([key, value]) => {
    if (!excludeKeys.includes(key)) {
      result[key] = value
    }
  })
  return result
}

export const breadcrumbsLevelKey: InjectionKey<Ref<ComponentWCAGLevel>> = Symbol('breadcrumbs-level')

const useBreadcrumbsLevel = () => {
  const injected = inject(breadcrumbsLevelKey, ref<ComponentWCAGLevel>('AA'))
  return injected
}

export const BreadcrumbList = defineComponent({
  name: 'DesignSystemBreadcrumbList',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
    ariaLabel: {
      type: String,
      default: undefined,
    },
    role: {
      type: String,
      default: undefined,
    },
  },
  setup(listProps, { slots, attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const listClass = computed(() => cx(breadcrumbsRecipe({ wcagLevel: wcagLevel.value }).list, listProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class', 'aria-label', 'role']))

    return () =>
      h(
        'ol',
        {
          ...forwarded.value,
          class: listClass.value,
          'aria-label': listProps.ariaLabel,
          role: listProps.role,
        },
        slots.default?.(),
      )
  },
})

export const BreadcrumbItem = defineComponent({
  name: 'DesignSystemBreadcrumbItem',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
    isCurrent: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: undefined,
    },
  },
  setup(itemProps, { slots, attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const slotsClass = computed(() => breadcrumbsRecipe({ wcagLevel: wcagLevel.value }))
    const itemClass = computed(() => cx(slotsClass.value.item, itemProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class', 'aria-current', 'data-current', 'role']))

    return () =>
      h(
        'li',
        {
          ...forwarded.value,
          class: itemClass.value,
          'aria-current': itemProps.isCurrent ? 'page' : undefined,
          'data-current': itemProps.isCurrent ? 'true' : 'false',
          role: itemProps.role,
        },
        slots.default?.(),
      )
  },
})

export const BreadcrumbLink = defineComponent({
  name: 'DesignSystemBreadcrumbLink',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
    href: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      default: undefined,
    },
    rel: {
      type: String,
      default: undefined,
    },
    role: {
      type: String,
      default: undefined,
    },
  },
  setup(linkProps, { slots, attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const slotsClass = computed(() => breadcrumbsRecipe({ wcagLevel: wcagLevel.value }))
    const linkClass = computed(() => cx(slotsClass.value.link, linkProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class', 'href', 'target', 'rel', 'role']))

    return () => [
      h(
        'a',
        {
          ...forwarded.value,
          class: linkClass.value,
          href: linkProps.href,
          target: linkProps.target,
          rel: linkProps.rel,
          role: linkProps.role,
        },
        slots.default?.(),
      ),
      h(BreadcrumbSeparator),
    ]
  },
})

export const BreadcrumbSeparator = defineComponent({
  name: 'DesignSystemBreadcrumbSeparator',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(separatorProps, { attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const slotsClass = computed(() => breadcrumbsRecipe({ wcagLevel: wcagLevel.value }))
    const separatorClass = computed(() => cx(slotsClass.value.separator, separatorProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class']))

    return () =>
      h(
        'span',
        {
          ...forwarded.value,
          class: separatorClass.value,
        },
        [
          h(
            'svg',
            {
              'aria-hidden': 'true',
              class: slotsClass.value.icon,
              fill: 'none',
              height: '12',
              viewBox: '0 0 12 12',
              width: '12',
            },
            [
              h('path', {
                d: 'M4.5 2.25L8.25 6L4.5 9.75',
                stroke: 'currentColor',
                'stroke-width': '1.5',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round',
              }),
            ],
          ),
        ],
      )
  },
})
