import type { ComponentPublicInstance } from 'vue'

export default defineNuxtPlugin((nuxtApp) => {
  // グローバルエラーハンドラ
  nuxtApp.vueApp.config.errorHandler = (
    error: unknown,
    instance: ComponentPublicInstance | null,
    info: string
  ) => {
    console.error('Global error handler:', error)
    console.error('Component:', instance?.$options?.name)
    console.error('Info:', info)

    // ここでエラーログサービスに送信
    // 例: Sentry, LogRocket, Bugsnag など
  }

  // Vueの警告ハンドラ
  nuxtApp.vueApp.config.warnHandler = (
    msg: string,
    instance: ComponentPublicInstance | null,
    trace: string
  ) => {
    // Suspenseの警告を抑制
    if (msg.includes('Suspense')) {
      return
    }
    console.warn(msg, instance?.$options?.name, trace)
  }

  // Promise rejection（未処理のPromiseエラー）
  if (import.meta.client) {
    window.addEventListener('unhandledrejection', (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason)
      // エラーログサービスに送信
    })
  }
})
