<template>
  <div class="container">
    <h1>Claude Code デモページ</h1>

    <section class="intro">
      <p>
        このページはClaude Codeの自動PRレビュー機能をテストするために作成されました。
      </p>
    </section>

    <section class="features">
      <h2>Claude Codeの主な機能</h2>

      <div class="feature-grid">
        <div class="feature-card">
          <h3>🤖 Plan Mode</h3>
          <p>読み取り専用モードでコードベースを安全に分析できます。</p>
          <code>Shift+Tab</code>でモード切り替え
        </div>

        <div class="feature-card">
          <h3>🔍 Code Review</h3>
          <p><code>/review</code>コマンドで即座にコードレビューを実行できます。</p>
        </div>

        <div class="feature-card">
          <h3>🚀 Subagents</h3>
          <p>特定タスクに特化したAIアシスタントが利用可能です。</p>
        </div>

        <div class="feature-card">
          <h3>⚡ GitHub Actions</h3>
          <p>PRに自動でレビューコメントを追加できます。</p>
        </div>
      </div>
    </section>

    <section class="demo">
      <h2>インタラクティブデモ</h2>
      <div class="demo-controls">
        <button class="btn-primary" @click="runDemo">
          デモを実行
        </button>
        <p v-if="demoResult" class="result">{{ demoResult }}</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const demoResult = ref<string>('')

const runDemo = () => {
  demoResult.value = 'Claude Code PR Review デモが実行されました！ ✨'

  setTimeout(() => {
    demoResult.value = ''
  }, 3000)
}
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.intro {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.features {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.8rem;
  color: #34495e;
  margin-bottom: 1.5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 1rem;
}

.feature-card {
  background: white;
  border: 2px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  transition: transform 0.2s, box-shadow 0.2s;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.feature-card p {
  color: #555;
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.feature-card code {
  background: #f1f3f5;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
}

.demo {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 12px;
}

.demo h2 {
  color: white;
}

.demo-controls {
  text-align: center;
  margin-top: 1.5rem;
}

.btn-primary {
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.btn-primary:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
}

.result {
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
