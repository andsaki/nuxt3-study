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

const counter = ref(1)
const message = ref('こんにちは')

const userState = reactive({
  name: 'Hotaru',
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
  nameRef.value = nameRef.value === 'Hotaru' ? 'Yuduki' : 'Hotaru'
}

const explainShallow = () => {
  shallowProfile.preferences.accent =
    shallowProfile.preferences.accent === '#2563eb' ? '#16a34a' : '#2563eb'
  // shallowRef/shallowReactive ではネストの変更を Vue が追跡しないため、必要に応じて triggerRef を使う
  triggerRef(palette)
}
</script>

<template>
  <div class="space-y-4">
    <header class="space-y-1">
      <h3 class="text-lg font-semibold text-gray-900">リアクティビティ実験</h3>
      <p class="text-sm text-gray-600">
        ref / reactive / shallow 系 API をまとめて触り、<code>markRaw</code>・<code>toRef</code> などの挙動を確認できます。
      </p>
    </header>

    <div class="grid gap-4 lg:grid-cols-2">
      <section class="space-y-3 rounded-xl border border-slate-200 p-4">
        <h4 class="font-semibold text-slate-800">主要値</h4>
        <ul class="space-y-2 text-sm text-slate-700">
          <li>
            counter (ref):
            <span class="font-mono text-slate-900">{{ counter }}</span>
          </li>
          <li>
            userState (reactive):
            <span class="font-mono text-slate-900">
              {{ userState.name }} / visits {{ userState.stats.visits }} / likes {{ userState.stats.likes }}
            </span>
          </li>
          <li>
            readonlyUser:
            <span class="font-mono text-slate-900">{{ readonlyUser.name }}</span>
          </li>
          <li>
            shallowProfile (shallowReactive):
            <span class="font-mono text-slate-900">
              tab {{ shallowProfile.preferences.tab }} / accent {{ shallowProfile.preferences.accent }}
            </span>
          </li>
          <li>
            palette (shallowRef + triggerRef):
            <span class="font-mono text-slate-900">{{ paletteSummary }}</span>
          </li>
          <li>
            markRaw Map:
            <span class="font-mono text-slate-900">saved {{ staticMap.get('saved') }}</span>
          </li>
        </ul>

        <p class="rounded-lg bg-slate-100 p-3 font-mono text-xs text-slate-700">
          statusLine: {{ statusLine }}
        </p>

        <div class="flex flex-wrap gap-3">
          <button class="rounded-md bg-slate-900 px-3 py-2 text-sm font-semibold text-white" @click="bumpAll">
            まとめて更新
          </button>
          <button class="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800" @click="rename">
            名前をトグル (toRef)
          </button>
          <button class="rounded-md border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-800" @click="explainShallow">
            shallowなネスト更新
          </button>
        </div>
      </section>

      <section class="space-y-3 rounded-xl border border-purple-200 bg-purple-50/60 p-4">
        <h4 class="font-semibold text-purple-900">メタ情報・ユーティリティ</h4>
        <dl class="grid grid-cols-2 gap-3 text-sm text-purple-900">
          <div>
            <dt class="text-xs uppercase tracking-wide text-purple-600">isRef(counter)</dt>
            <dd class="font-mono">{{ metaChecks.counter }}</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-purple-600">isReactive(userState)</dt>
            <dd class="font-mono">{{ metaChecks.userState }}</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-purple-600">isReadonly(readonlyUser)</dt>
            <dd class="font-mono">{{ metaChecks.readonlyUser }}</dd>
          </div>
          <div>
            <dt class="text-xs uppercase tracking-wide text-purple-600">isProxy(shallowProfile)</dt>
            <dd class="font-mono">{{ metaChecks.shallowProfile }}</dd>
          </div>
        </dl>

        <p class="text-sm text-purple-900">
          <code>nameRef</code> と <code>stats</code>（toRef）は
          常に <code>userState</code> へ同期します:
          <span class="font-mono">{{ nameRef }}</span>,
          visits ref:
          <span class="font-mono">{{ stats.visits }}</span>
        </p>

        <p class="text-sm text-purple-900">
          <code>unref(message)</code>:
          <span class="font-mono">{{ unref(message) }}</span>
        </p>
      </section>
    </div>
  </div>
</template>
