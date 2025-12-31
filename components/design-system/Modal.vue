<template>
  <dialog
    ref="dialogRef"
    :class="slots.dialog"
    aria-labelledby="modal-title"
    aria-modal="true"
    @click="handleBackdropClick"
    @close="emit('close')"
  >
    <div :class="slots.header">
      <h2
        id="modal-title"
        :class="slots.title"
        tabindex="-1"
        data-modal-title="true"
      >
        {{ title }}
      </h2>
      <button
        type="button"
        :class="slots.closeButton"
        aria-label="モーダルを閉じる"
        @click="emit('close')"
      >
        ✕
      </button>
    </div>
    <div :class="slots.body">
      <slot />
    </div>
    <div v-if="$slots.footer" :class="slots.footer">
      <slot name="footer" />
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { modal as modalRecipe } from '~/styled-system/recipes'

type WCAGLevel = 'A' | 'AA' | 'AAA'

interface Props {
  isOpen: boolean
  title: string
  size?: 'sm' | 'md' | 'lg'
  wcagLevel?: WCAGLevel
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
  wcagLevel: 'AA',
})

const emit = defineEmits<{
  close: []
}>()

const dialogRef = ref<HTMLDialogElement>()
let previousActiveElement: HTMLElement | null = null

const slots = computed(() => modalRecipe({
  size: props.size,
  wcagLevel: props.wcagLevel,
}))

// フォーカス可能な要素のセレクター
const focusableSelector = [
  '[data-modal-title="true"]',
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
  '[role="button"]',
].join(', ')

const getFocusableElements = (root: HTMLElement): HTMLElement[] => {
  const dialog = root.closest('dialog') ?? root
  return Array.from(dialog.querySelectorAll<HTMLElement>(focusableSelector)).filter(
    (element) => element.getAttribute('aria-hidden') !== 'true'
  )
}

const handleBackdropClick = (e: MouseEvent) => {
  const dialog = dialogRef.value
  if (!dialog) return

  const rect = dialog.getBoundingClientRect()
  const isInDialog =
    rect.top <= e.clientY &&
    e.clientY <= rect.top + rect.height &&
    rect.left <= e.clientX &&
    e.clientX <= rect.left + rect.width

  if (!isInDialog) {
    emit('close')
  }
}

const handleKeyDown = (event: KeyboardEvent) => {
  const dialog = dialogRef.value
  if (!dialog || event.key !== 'Tab') return

  const focusable = getFocusableElements(dialog)
  if (focusable.length === 0) {
    event.preventDefault()
    return
  }

  const first = focusable[0]
  const last = focusable[focusable.length - 1]
  const activeElement = document.activeElement as HTMLElement | null

  if (event.shiftKey) {
    if (activeElement === first || !dialog.contains(activeElement)) {
      event.preventDefault()
      last.focus()
    }
  } else {
    if (activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }
}

watch(() => props.isOpen, (isOpen) => {
  const dialog = dialogRef.value
  if (!dialog) return

  if (isOpen) {
    previousActiveElement = document.activeElement as HTMLElement
    dialog.showModal()
    document.body.style.overflow = 'hidden'

    const focusable = getFocusableElements(dialog)
    const firstFocusable = focusable[0]
    if (firstFocusable) {
      firstFocusable.focus()
    } else {
      const title = dialog.querySelector('[data-modal-title="true"]') as HTMLElement | null
      title?.focus()
    }
  } else if (dialog.open) {
    dialog.close()
    document.body.style.overflow = ''

    // フォーカスを戻す
    if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
      previousActiveElement.focus()
    }
  }
})

onMounted(() => {
  const dialog = dialogRef.value
  if (!dialog) return

  dialog.addEventListener('keydown', handleKeyDown)

  onBeforeUnmount(() => {
    dialog.removeEventListener('keydown', handleKeyDown)
  })
})
</script>
