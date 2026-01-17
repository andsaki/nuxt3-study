<script setup lang="ts">
import { computed, effectScope, getCurrentScope, onScopeDispose, ref, watchEffect } from 'vue'
import { css } from '~/styled-system/css'

const manualSource = ref(0)
const events = ref<string[]>([])
const scopeRef = ref<ReturnType<typeof effectScope> | null>(null)
let eventStore: string[] = []

const log = (message: string) => {
  eventStore = [message, ...eventStore].slice(0, 10)
  events.value = eventStore
}

const startScope = () => {
  stopScope()
  const scope = effectScope()
  scopeRef.value = scope
  scope.run(() => {
    log(`scope started (has scope? ${Boolean(getCurrentScope())})`)

    const cleanup = watchEffect(() => {
      log(`watchEffect sees value=${manualSource.value}`)
    })

    onScopeDispose(() => {
      log('onScopeDispose → watchEffect を停止')
      cleanup()
    })
  })
}

const stopScope = () => {
  if (scopeRef.value) {
    scopeRef.value.stop()
    scopeRef.value = null
  }
}

const bumpSource = () => {
  manualSource.value++
}

const scopeStatus = computed(() => (scopeRef.value ? 'active' : 'idle'))

const sectionClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '3',
  borderRadius: 'xl',
  borderWidth: '1px',
  borderColor: 'purple.200',
  backgroundColor: 'purple.50',
  p: '4',
  fontSize: 'sm',
  color: 'purple.900',
})

const headerClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '3',
})

const eyebrowTextClass = css({
  fontSize: 'xs',
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'purple.500',
  marginBottom: '1',
})

const buttonGroupClass = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '2',
  justifyContent: 'flex-end',
})

const inlineButtonClass = css({
  alignSelf: 'flex-start',
})

const logListClass = css({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
  borderRadius: 'lg',
  borderWidth: '1px',
  borderColor: 'purple.200',
  backgroundColor: 'white',
  p: '3',
  fontFamily: 'mono',
  fontSize: 'xs',
  color: 'purple.900',
})

const logItemClass = css({
  lineHeight: '1.4',
})
</script>

<template>
  <section :class="sectionClass">
    <header :class="headerClass">
      <div>
        <p :class="eyebrowTextClass">effectScope / getCurrentScope</p>
        <DesignSystemText variant="body-large" bold>
          scope: {{ scopeStatus }}
        </DesignSystemText>
      </div>
      <div :class="buttonGroupClass">
        <DesignSystemButton
          variant="primary"
          size="sm"
          @click="startScope"
        >
          scope再生成
        </DesignSystemButton>
        <DesignSystemButton
          variant="outline"
          size="sm"
          @click="stopScope"
        >
          stop
        </DesignSystemButton>
      </div>
    </header>

    <DesignSystemButton
      variant="secondary"
      size="sm"
      :class="inlineButtonClass"
      @click="bumpSource"
    >
      manualSource を更新 ({{ manualSource }})
    </DesignSystemButton>

    <ul :class="logListClass">
      <li
        v-for="(event, index) in events"
        :key="index"
        :class="logItemClass"
      >
        {{ event }}
      </li>
    </ul>
  </section>
</template>
