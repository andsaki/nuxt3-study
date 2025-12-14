<script setup lang="ts">
import type { ComponentPublicInstance } from 'vue'

interface ErrorInfo {
  componentName: string
  info: string
}

interface Props {
  fallback?: string
  onError?: (error: Error, instance: ComponentPublicInstance | null) => void
}

const props = withDefaults(defineProps<Props>(), {
  fallback: 'エラーが発生しました',
})

const hasError = ref(false)
const error = ref<Error | null>(null)
const errorInfo = ref<ErrorInfo | null>(null)

// エラーをキャッチ
onErrorCaptured((err, instance, info) => {
  hasError.value = true
  error.value = err
  errorInfo.value = {
    componentName: instance?.$options?.name || 'Unknown',
    info,
  }

  // カスタムエラーハンドラを実行
  if (props.onError) {
    props.onError(err, instance)
  }

  // ログに記録
  console.error('ErrorBoundary caught:', err)
  console.error('Component:', errorInfo.value.componentName)
  console.error('Info:', info)

  // エラーの伝播を停止
  return false
})

// エラーをリセット
const resetError = () => {
  hasError.value = false
  error.value = null
  errorInfo.value = null
}
</script>

<template>
  <div v-if="hasError" class="error-boundary">
    <slot name="error" :error="error" :error-info="errorInfo" :reset="resetError">
      <!-- デフォルトのエラー表示 -->
      <div class="error-container">
        <div class="error-icon">⚠️</div>
        <h2 class="error-title">{{ fallback }}</h2>
        <details class="error-details">
          <summary>エラー詳細</summary>
          <div class="error-content">
            <p><strong>エラーメッセージ:</strong></p>
            <pre>{{ error?.message }}</pre>
            <p><strong>コンポーネント:</strong> {{ errorInfo?.componentName }}</p>
            <p><strong>スタックトレース:</strong></p>
            <pre>{{ error?.stack }}</pre>
          </div>
        </details>
        <button @click="resetError" class="reset-button">
          再試行
        </button>
      </div>
    </slot>
  </div>
  <div v-else>
    <!-- 正常時は子コンポーネントを表示 -->
    <slot />
  </div>
</template>

<style scoped>
.error-boundary {
  padding: 2rem;
}

.error-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  background: #fee2e2;
  border: 2px solid #ef4444;
  border-radius: 8px;
  text-align: center;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-title {
  color: #991b1b;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.error-details {
  text-align: left;
  background: white;
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.error-details summary {
  cursor: pointer;
  font-weight: 600;
  color: #991b1b;
  padding: 0.5rem;
  user-select: none;
}

.error-details summary:hover {
  background: #fef2f2;
  border-radius: 4px;
}

.error-content {
  margin-top: 1rem;
}

.error-content p {
  margin: 1rem 0 0.5rem 0;
  color: #374151;
}

.error-content pre {
  background: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.875rem;
  white-space: pre-wrap;
  word-break: break-all;
}

.reset-button {
  padding: 0.75rem 1.5rem;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.reset-button:hover {
  background: #dc2626;
}
</style>
