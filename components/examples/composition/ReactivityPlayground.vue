<script setup lang="ts">
import {
  computed,
  isProxy,
  isReactive,
  isReadonly,
  isRef,
  markRaw,
  reactive,
  readonly,
  ref,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  toRef,
  toValue,
  triggerRef,
  unref,
} from 'vue'
import { css } from '~/styled-system/css'

const counter = ref(1)
const message = ref('こんにちは')

const userState = reactive({
  name: 'Hoge',
  stats: {
    visits: 1,
    likes: 2,
  },
})

const shallowProfile = shallowReactive({
  preferences: {
    tab: 'overview',
    accent: '#2563eb',
  },
})

const readonlyUser = readonly(userState)
const shallowProfileReadonly = shallowReadonly(shallowProfile)

const palette = shallowRef({
  theme: 'light',
  accent: '#2563eb',
})

const staticMap = markRaw(
  new Map<string, number>([
    ['saved', 1],
    ['archived', 0],
  ]),
)

const nameRef = toRef(userState, 'name')
const stats = toRef(userState, 'stats')

const paletteSummarySource = () => `${palette.value.theme} / ${palette.value.accent}`
const paletteSummary = computed(() => toValue(paletteSummarySource))

const statusLine = computed(() => {
  return `counter:${counter.value}, visits:${userState.stats.visits}, likes:${userState.stats.likes}`
})

const metaChecks = computed(() => ({
  counter: isRef(counter),
  userState: isReactive(userState),
  readonlyUser: isReadonly(readonlyUser),
  shallowProfile: isProxy(shallowProfile),
}))

const bumpAll = () => {
  counter.value++
  userState.stats.visits++
  userState.stats.likes += 2
  shallowProfile.preferences.tab = shallowProfile.preferences.tab === 'overview' ? 'activity' : 'overview'
  palette.value.accent = palette.value.accent === '#2563eb' ? '#dc2626' : '#2563eb'
  palette.value.theme = palette.value.theme === 'light' ? 'dark' : 'light'
  staticMap.set('saved', (staticMap.get('saved') ?? 0) + 1)
  triggerRef(palette)
}

const rename = () => {
  nameRef.value = nameRef.value === 'Hoge' ? 'Fuga' : 'Hoge'
}

const explainShallow = () => {
  shallowProfile.preferences.accent =
    shallowProfile.preferences.accent === '#2563eb' ? '#16a34a' : '#2563eb'
  // shallowRef/shallowReactive ではネストの変更を Vue が追跡しないため、必要に応じて triggerRef を使う
  triggerRef(palette)
}

const styles = {
  page: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '4',
  }),
  header: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  }),
  grid: css({
    display: 'grid',
    gap: '4',
    gridTemplateColumns: {
      base: '1fr',
      lg: 'repeat(2, minmax(0, 1fr))',
    },
  }),
  primarySection: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: 'gray.200',
    backgroundColor: 'white',
    p: '4',
  }),
  sectionTitle: css({
    color: 'gray.800',
    fontWeight: 'semibold',
  }),
  valueList: css({
    listStyle: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '2',
    fontSize: 'sm',
    color: 'gray.700',
  }),
  labelText: css({
    fontWeight: 'medium',
    color: 'gray.600',
    marginRight: '2',
  }),
  monoText: css({
    fontFamily: 'mono',
    color: 'gray.900',
  }),
  statusLine: css({
    borderRadius: 'lg',
    backgroundColor: 'gray.100',
    padding: '3',
    fontFamily: 'mono',
    fontSize: 'xs',
    color: 'gray.700',
  }),
  buttonRow: css({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '3',
  }),
  metaSection: css({
    display: 'flex',
    flexDirection: 'column',
    gap: '3',
    borderRadius: 'xl',
    borderWidth: '1px',
    borderColor: 'purple.200',
    backgroundColor: 'purple.50',
    p: '4',
  }),
  metaTitle: css({
    color: 'purple.900',
    fontWeight: 'semibold',
  }),
  metaList: css({
    display: 'grid',
    gap: '3',
    gridTemplateColumns: {
      base: '1fr',
      sm: 'repeat(2, minmax(0, 1fr))',
    },
    fontSize: 'sm',
    color: 'purple.900',
  }),
  metaLabel: css({
    fontSize: 'xs',
    textTransform: 'uppercase',
    letterSpacing: '0.15em',
    color: 'purple.600',
  }),
  metaValue: css({
    fontFamily: 'mono',
  }),
  metaParagraph: css({
    color: 'purple.900',
  }),
} as const
</script>

<template>
  <div :class="styles.page">
    <header :class="styles.header">
      <DesignSystemText variant="h3">
        リアクティビティ実験
      </DesignSystemText>
      <DesignSystemText variant="body-small" color="gray.600">
        ref / reactive / shallow 系 API をまとめて触り、<code>markRaw</code>・<code>toRef</code> などの挙動を確認できます。
      </DesignSystemText>
    </header>

    <div :class="styles.grid">
      <section :class="styles.primarySection">
        <DesignSystemText variant="h4" :class="styles.sectionTitle">
          主要値
        </DesignSystemText>
        <ul :class="styles.valueList">
          <li>
            <span :class="styles.labelText">counter (ref):</span>
            <span :class="styles.monoText">{{ counter }}</span>
          </li>
          <li>
            <span :class="styles.labelText">userState (reactive):</span>
            <span :class="styles.monoText">
              {{ userState.name }} / visits {{ userState.stats.visits }} / likes {{ userState.stats.likes }}
            </span>
          </li>
          <li>
            <span :class="styles.labelText">readonlyUser:</span>
            <span :class="styles.monoText">{{ readonlyUser.name }}</span>
          </li>
          <li>
            <span :class="styles.labelText">shallowProfile (shallowReactive):</span>
            <span :class="styles.monoText">
              tab {{ shallowProfile.preferences.tab }} / accent {{ shallowProfile.preferences.accent }}
            </span>
          </li>
          <li>
            <span :class="styles.labelText">palette (shallowRef + triggerRef):</span>
            <span :class="styles.monoText">{{ paletteSummary }}</span>
          </li>
          <li>
            <span :class="styles.labelText">markRaw Map:</span>
            <span :class="styles.monoText">saved {{ staticMap.get('saved') }}</span>
          </li>
        </ul>

        <p :class="styles.statusLine">
          statusLine: {{ statusLine }}
        </p>

        <div :class="styles.buttonRow">
          <DesignSystemButton variant="primary" size="sm" @click="bumpAll">
            まとめて更新
          </DesignSystemButton>
          <DesignSystemButton variant="outline" size="sm" @click="rename">
            名前をトグル (toRef)
          </DesignSystemButton>
          <DesignSystemButton variant="outline" size="sm" @click="explainShallow">
            shallowなネスト更新
          </DesignSystemButton>
        </div>
      </section>

      <section :class="styles.metaSection">
        <DesignSystemText variant="h4" :class="styles.metaTitle">
          メタ情報・ユーティリティ
        </DesignSystemText>
        <dl :class="styles.metaList">
          <div>
            <dt :class="styles.metaLabel">isRef(counter)</dt>
            <dd :class="styles.metaValue">{{ metaChecks.counter }}</dd>
          </div>
          <div>
            <dt :class="styles.metaLabel">isReactive(userState)</dt>
            <dd :class="styles.metaValue">{{ metaChecks.userState }}</dd>
          </div>
          <div>
            <dt :class="styles.metaLabel">isReadonly(readonlyUser)</dt>
            <dd :class="styles.metaValue">{{ metaChecks.readonlyUser }}</dd>
          </div>
          <div>
            <dt :class="styles.metaLabel">isProxy(shallowProfile)</dt>
            <dd :class="styles.metaValue">{{ metaChecks.shallowProfile }}</dd>
          </div>
        </dl>

        <DesignSystemText
          as="p"
          variant="body-small"
          :class="styles.metaParagraph"
        >
          <code>nameRef</code> と <code>stats</code>（toRef）は常に <code>userState</code> へ同期します:
          <span :class="styles.monoText">{{ nameRef }}</span>,
          visits ref:
          <span :class="styles.monoText">{{ stats.visits }}</span>
        </DesignSystemText>

        <DesignSystemText
          as="p"
          variant="body-small"
          :class="styles.metaParagraph"
        >
          <code>unref(message)</code>:
          <span :class="styles.monoText">{{ unref(message) }}</span>
        </DesignSystemText>
      </section>
    </div>
  </div>
</template>
