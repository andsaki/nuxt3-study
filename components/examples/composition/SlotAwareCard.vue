<script setup lang="ts">
import { computed, useAttrs, useSlots } from 'vue'
import { css } from '~/styled-system/css'

defineOptions({
  inheritAttrs: false,
})

const attrs = useAttrs()
const slots = useSlots()

const attrKeys = computed(() => Object.keys(attrs).filter(Boolean))
const hasFooter = computed(() => Boolean(slots.footer))

const forwardedAttrs = computed(() => {
  const { class: _class, ...rest } = attrs as Record<string, unknown>
  return rest
})

const externalClass = computed(() => attrs.class as string | undefined)

const cardClass = css({
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'purple.200',
  backgroundColor: 'purple.50',
  p: '4',
  shadow: 'sm',
})

const headerClass = css({
  marginBottom: '3',
})

const defaultTitleClass = css({
  fontSize: 'lg',
  fontWeight: 'semibold',
  color: 'purple.900',
})

const helperTextClass = css({
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'purple.500',
})

const contentClass = css({
  fontSize: 'sm',
  color: 'purple.900',
})

const footerClass = css({
  marginTop: '3',
  borderTop: '1px solid',
  borderColor: 'purple.200',
  paddingTop: '2',
  fontSize: 'xs',
  color: 'purple.700',
})

const attrsInfoClass = css({
  marginTop: '3',
  fontSize: 'xs',
  color: 'purple.500',
})

const attrsHighlightClass = css({
  fontFamily: 'mono',
})
</script>

<template>
  <article
    :class="[cardClass, externalClass]"
    v-bind="forwardedAttrs"
  >
    <header :class="headerClass">
      <slot name="title">
        <h4 :class="defaultTitleClass">SlotAwareCard</h4>
      </slot>
      <p :class="helperTextClass">
        slots: title / default / footer
      </p>
    </header>

    <div :class="contentClass">
      <slot>デフォルトスロットの内容です。</slot>
    </div>

    <footer v-if="hasFooter" :class="footerClass">
      <slot name="footer" />
    </footer>

    <p :class="attrsInfoClass">
      付与された attrs:
      <span :class="attrsHighlightClass">{{ attrKeys.length ? attrKeys.join(', ') : 'なし' }}</span>
    </p>
  </article>
</template>
