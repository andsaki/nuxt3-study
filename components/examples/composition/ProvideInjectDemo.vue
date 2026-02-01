<script setup lang="ts">
import { computed, provide, ref } from 'vue'
import { css } from '~/styled-system/css'
import ModelCounter from '~/components/examples/composition/ModelCounter.vue'
import SlotAwareCard from '~/components/examples/composition/SlotAwareCard.vue'
import ThemeConsumer from '~/components/examples/composition/ThemeConsumer.vue'
import { themeContextKey } from '~/components/examples/composition/theme-context'

const mode = ref<'light' | 'dark'>('light')
const accent = ref('#2563eb')

const toggleMode = () => {
  mode.value = mode.value === 'light' ? 'dark' : 'light'
}

const setAccent = (hex: string) => {
  accent.value = hex
}

provide(themeContextKey, {
  mode,
  accent,
  toggleMode,
  setAccent,
})

const parentCount = ref(3)
const themePanelStyle = computed(() => ({
  borderColor: accent.value,
  background: mode.value === 'light' ? 'white' : '#0f172a',
  color: mode.value === 'light' ? '#0f172a' : 'white',
}))

const sectionClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

const themePanelClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
  borderRadius: '2xl',
  borderWidth: '1px',
  p: '5',
  shadow: 'sm',
})

const panelContentClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '4',
})

const accentTextClass = css({
  fontWeight: 'semibold',
})

const modelWrapperClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '2',
  borderRadius: 'xl',
  borderWidth: '1px',
  borderStyle: 'dashed',
  borderColor: 'currentcolor',
  p: '4',
  fontSize: 'sm',
})

const monoTextClass = css({
  fontFamily: 'mono',
})
</script>

<template>
  <section :class="sectionClass">
    <div
      :class="themePanelClass"
      :style="themePanelStyle"
    >
      <ThemeConsumer />

      <div :class="panelContentClass">
        <SlotAwareCard>
          <template #title>
            <DesignSystemText variant="h4">SlotAwareCard</DesignSystemText>
          </template>
          provide/inject で共有されたテーマカラー:
          <span :class="accentTextClass">{{ accent }}</span>
          <template #footer>useSlots() でフッタースロットの存在を検知</template>
        </SlotAwareCard>

        <div :class="modelWrapperClass">
          <p>
            親から見る <code>v-model</code> の値:
            <span :class="monoTextClass">{{ parentCount }}</span>
          </p>
          <ModelCounter v-model="parentCount" />
        </div>
      </div>
    </div>
  </section>
</template>
