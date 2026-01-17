<script setup lang="ts">
import {
  computed,
  defineComponent,
  h,
  inject,
  provide,
  ref,
  toRef,
  useAttrs,
} from 'vue'
import type { InjectionKey, OlHTMLAttributes, LiHTMLAttributes, AnchorHTMLAttributes } from 'vue'
import { breadcrumbs as breadcrumbsRecipe } from '~/styled-system/recipes'
import { cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'

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

type WcagLevelRef = import('vue').Ref<ComponentWCAGLevel>
const breadcrumbsLevelKey: InjectionKey<WcagLevelRef> = Symbol('breadcrumbs-level')
provide(breadcrumbsLevelKey, toRef(props, 'wcagLevel'))

const useBreadcrumbsLevel = () => {
  const injected = inject(breadcrumbsLevelKey, ref<ComponentWCAGLevel>('AA'))
  return injected
}

const createFilteredAttrs = (source: Record<string, unknown>, excludeKeys: string[]) => {
  const result: Record<string, unknown> = {}
  Object.entries(source).forEach(([key, value]) => {
    if (!excludeKeys.includes(key)) {
      result[key] = value
    }
  })
  return result
}

export interface BreadcrumbListProps extends OlHTMLAttributes {
  class?: string
}

export const BreadcrumbList = defineComponent({
  name: 'BreadcrumbList',
  inheritAttrs: false,
  props: {
    class: {
      type: String,
      default: '',
    },
  },
  setup(listProps, { slots, attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const listClass = computed(() => cx(breadcrumbsRecipe({ wcagLevel: wcagLevel.value }).list, listProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class']))

    return () =>
      h(
        'ol',
        {
          ...forwarded.value,
          class: listClass.value,
        },
        slots.default?.(),
      )
  },
})

export interface BreadcrumbItemProps extends LiHTMLAttributes {
  class?: string
  isCurrent?: boolean
}

export const BreadcrumbItem = defineComponent({
  name: 'BreadcrumbItem',
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
  },
  setup(itemProps, { slots, attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const slotsClass = computed(() => breadcrumbsRecipe({ wcagLevel: wcagLevel.value }))
    const itemClass = computed(() => cx(slotsClass.value.item, itemProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class', 'aria-current', 'data-current']))

    return () =>
      h(
        'li',
        {
          ...forwarded.value,
          class: itemClass.value,
          'aria-current': itemProps.isCurrent ? 'page' : undefined,
          'data-current': itemProps.isCurrent ? 'true' : 'false',
        },
        slots.default?.(),
      )
  },
})

export interface BreadcrumbLinkProps extends AnchorHTMLAttributes {
  class?: string
  href: string
}

export const BreadcrumbLink = defineComponent({
  name: 'BreadcrumbLink',
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
  },
  setup(linkProps, { slots, attrs }) {
    const wcagLevel = useBreadcrumbsLevel()
    const slotsClass = computed(() => breadcrumbsRecipe({ wcagLevel: wcagLevel.value }))
    const linkClass = computed(() => cx(slotsClass.value.link, linkProps.class))
    const forwarded = computed(() => createFilteredAttrs(attrs as Record<string, unknown>, ['class', 'href']))

    return () => [
      h(
        'a',
        {
          ...forwarded.value,
          class: linkClass.value,
          href: linkProps.href,
        },
        slots.default?.(),
      ),
      h(BreadcrumbSeparator),
    ]
  },
})

export interface BreadcrumbSeparatorProps {
  class?: string
}

export const BreadcrumbSeparator = defineComponent({
  name: 'BreadcrumbSeparator',
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
</script>

<template>
  <nav
    v-bind="navAttrs"
    :aria-label="label"
    :class="navClass"
    :data-wcag-level="wcagLevel"
  >
    <slot />
  </nav>
</template>
