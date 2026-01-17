<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import type { CSSProperties } from 'vue'
import { text as textRecipe } from '~/styled-system/recipes'
import { cx } from '~/styled-system/css'
import type { ComponentWCAGLevel } from './constants/accessibility'

defineOptions({
  inheritAttrs: false,
})

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body-large'
  | 'body'
  | 'body-small'
  | 'caption'
  | 'overline'

interface TextProps {
  variant?: TextVariant
  as?: string
  color?: string
  align?: 'left' | 'center' | 'right' | 'justify'
  wcagLevel?: ComponentWCAGLevel
  bold?: boolean
  italic?: boolean
  underline?: boolean
  strikethrough?: boolean
  class?: string
  style?: CSSProperties | string
}

const props = withDefaults(defineProps<TextProps>(), {
  variant: 'body',
  color: undefined,
  align: 'left',
  wcagLevel: 'AA',
  bold: false,
  italic: false,
  underline: false,
  strikethrough: false,
  class: '',
  style: undefined,
})

const attrs = useAttrs()
const defaultElementMap: Record<TextVariant, string> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  'body-large': 'p',
  body: 'p',
  'body-small': 'p',
  caption: 'span',
  overline: 'span',
}

const componentTag = computed(() => props.as ?? defaultElementMap[props.variant ?? 'body'])
const recipeClass = computed(() => textRecipe({ variant: props.variant, align: props.align, wcagLevel: props.wcagLevel }))

const attrClass = computed(() => (attrs.class as string | undefined))
const attrStyle = computed(() => attrs.style as CSSProperties | string | undefined)

const rootClass = computed(() => cx(recipeClass.value, props.class, attrClass.value))

const inlineStyle = computed<CSSProperties>(() => {
  const decorations = [
    props.underline ? 'underline' : null,
    props.strikethrough ? 'line-through' : null,
  ].filter(Boolean)

  return {
    margin: 0,
    color: props.color ?? 'inherit',
    textAlign: props.align,
    fontWeight: props.bold ? 'bold' : undefined,
    fontStyle: props.italic ? 'italic' : undefined,
    textDecoration: decorations.length ? decorations.join(' ') : undefined,
    ...(typeof props.style === 'object' ? props.style : {}),
  }
})

const combinedStyle = computed(() => {
  const styles: Array<CSSProperties | string> = []
  styles.push(inlineStyle.value)
  if (typeof props.style === 'string') styles.push(props.style)
  if (attrStyle.value) styles.push(attrStyle.value)
  return styles
})

const forwardedAttrs = computed(() => {
  const { class: _class, style: _style, ...rest } = attrs as Record<string, unknown>
  return rest
})
</script>

<template>
  <component
    :is="componentTag"
    v-bind="forwardedAttrs"
    :class="rootClass"
    :style="combinedStyle"
  >
    <slot />
  </component>
</template>
