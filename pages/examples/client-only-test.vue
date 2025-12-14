<script setup lang="ts">
const timestamp = new Date().toISOString()
</script>

<template>
  <div class="container">
    <h1>ClientOnly 動作確認</h1>

    <div class="instruction">
      <h2>🔍 確認方法</h2>
      <ol>
        <li>このページで右クリック → 「ページのソースを表示」</li>
        <li>HTMLソースに何が含まれているか確認</li>
        <li>DevTools（F12）で実際のDOMを確認</li>
        <li>違いを比較</li>
      </ol>
    </div>

    <div class="example-section">
      <h2>例1: fallbackあり</h2>
      <div class="demo-box">
        <ClientOnly>
          <div class="client-content">
            <p><strong>クライアント側の内容</strong></p>
            <p>この内容は<code>HTMLソース</code>には含まれません</p>
            <p>DevToolsでのみ見えます</p>
          </div>
          <template #fallback>
            <div class="server-content">
              <p><strong>サーバー側の内容（fallback）</strong></p>
              <p>この内容は<code>HTMLソース</code>に含まれます</p>
              <p>Hydration後に上の内容に切り替わります</p>
            </div>
          </template>
        </ClientOnly>
      </div>
    </div>

    <div class="example-section">
      <h2>例2: fallbackなし</h2>
      <div class="demo-box">
        <ClientOnly>
          <div class="client-content">
            <p><strong>クライアント側のみ</strong></p>
            <p>HTMLソースには何も出力されません</p>
            <p>空のコメントノードだけが出力されます</p>
          </div>
        </ClientOnly>
      </div>
    </div>

    <div class="example-section">
      <h2>例3: 通常のSSR（比較用）</h2>
      <div class="demo-box">
        <div class="ssr-content">
          <p><strong>通常のSSRコンテンツ</strong></p>
          <p>この内容は<code>HTMLソース</code>に含まれます</p>
          <p>タイムスタンプ: {{ timestamp }}</p>
        </div>
      </div>
    </div>

    <div class="html-source">
      <h2>📄 HTMLソースに含まれるもの</h2>
      <table>
        <thead>
          <tr>
            <th>ケース</th>
            <th>HTMLソース</th>
            <th>DevTools（DOM）</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>fallbackあり</td>
            <td>✅ fallbackの内容</td>
            <td>✅ デフォルトスロット</td>
          </tr>
          <tr>
            <td>fallbackなし</td>
            <td>❌ コメントノードのみ</td>
            <td>✅ デフォルトスロット</td>
          </tr>
          <tr>
            <td>通常のSSR</td>
            <td>✅ 全内容</td>
            <td>✅ 全内容</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="lifecycle">
      <h2>⏱️ ClientOnlyのライフサイクル</h2>
      <div class="timeline">
        <div class="step">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>サーバー側レンダリング</h3>
            <p><code>#fallback</code>をHTMLとして出力</p>
            <code>&lt;p&gt;サーバー側の内容&lt;/p&gt;</code>
          </div>
        </div>
        <div class="arrow">↓</div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>ブラウザでHTML受信</h3>
            <p>fallbackの内容が表示される</p>
            <code>&lt;p&gt;サーバー側の内容&lt;/p&gt;</code>
          </div>
        </div>
        <div class="arrow">↓</div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>Hydration（マッチング）</h3>
            <p>fallbackとサーバーHTMLが一致 ✅</p>
            <code>&lt;p&gt;サーバー側の内容&lt;/p&gt;</code>
          </div>
        </div>
        <div class="arrow">↓</div>
        <div class="step">
          <div class="step-number">4</div>
          <div class="step-content">
            <h3>onMounted後</h3>
            <p>デフォルトスロットに切り替え</p>
            <code>&lt;p&gt;クライアント側の内容&lt;/p&gt;</code>
          </div>
        </div>
      </div>
    </div>

    <div class="code-example">
      <h2>💻 実装</h2>
      <pre><code>&lt;ClientOnly&gt;
  &lt;!-- この部分はHTMLソースに含まれない --&gt;
  &lt;p&gt;クライアント側の内容&lt;/p&gt;

  &lt;!-- この部分がHTMLソースに含まれる --&gt;
  &lt;template #fallback&gt;
    &lt;p&gt;サーバー側の内容&lt;/p&gt;
  &lt;/template&gt;
&lt;/ClientOnly&gt;</code></pre>
    </div>

    <div class="hydration-section">
      <h2>⚠️ Hydrationエラーが起きるケース・起きないケース</h2>

      <div class="case-grid">
        <div class="case-card safe">
          <h3>✅ エラーにならない（安全）</h3>
          <pre v-pre><code>&lt;script setup&gt;
const isClient = ref(false)
onMounted(() => {
  isClient.value = true
})
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- 初期値が一致するのでOK --&gt;
  &lt;p&gt;{{ isClient ? "クライアント" : "サーバー" }}&lt;/p&gt;
&lt;/template&gt;</code></pre>
          <p class="explanation">
            <strong>理由:</strong> サーバーもクライアントも初期値は<code>false</code>なので一致する
          </p>
        </div>

        <div class="case-card danger">
          <h3>❌ エラーになる（危険）</h3>
          <pre v-pre><code>&lt;template&gt;
  &lt;!-- サーバーとクライアントで値が違う --&gt;
  &lt;p&gt;{{ new Date().toISOString() }}&lt;/p&gt;

  &lt;!-- 毎回違う値 --&gt;
  &lt;p&gt;{{ Math.random() }}&lt;/p&gt;

  &lt;!-- 環境で最初から値が異なる --&gt;
  &lt;p&gt;{{ import.meta.client ? "クライアント" : "サーバー" }}&lt;/p&gt;
&lt;/template&gt;</code></pre>
          <p class="explanation">
            <strong>理由:</strong> サーバーとクライアントでHydration時の値が異なる
          </p>
        </div>
      </div>

      <div class="comparison-box">
        <h3>パターン別比較</h3>
        <table>
          <thead>
            <tr>
              <th>パターン</th>
              <th>サーバー</th>
              <th>クライアント（Hydration）</th>
              <th>結果</th>
            </tr>
          </thead>
          <tbody>
            <tr class="safe-row">
              <td><code>ref(false)</code> + 三項演算子</td>
              <td>"サーバー"</td>
              <td>"サーバー"</td>
              <td>✅ 一致</td>
            </tr>
            <tr class="safe-row">
              <td><code>ref(false)</code> + v-if</td>
              <td>elseブロック表示</td>
              <td>elseブロック表示</td>
              <td>✅ 一致</td>
            </tr>
            <tr class="safe-row">
              <td><code>ClientOnly</code></td>
              <td>fallback表示</td>
              <td>fallback表示</td>
              <td>✅ 一致（特別扱い）</td>
            </tr>
            <tr class="danger-row">
              <td><code>new Date()</code></td>
              <td>2024-01-01T10:00:00</td>
              <td>2024-01-01T10:00:01</td>
              <td>❌ 不一致</td>
            </tr>
            <tr class="danger-row">
              <td><code>import.meta.client</code></td>
              <td>false</td>
              <td>true</td>
              <td>❌ 不一致</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="vif-section">
      <h2>🔀 v-if vs 三項演算子 vs ClientOnly</h2>

      <div class="method-grid">
        <div class="method-card">
          <h3>三項演算子</h3>
          <pre v-pre><code>&lt;p&gt;{{ isClient ? "A" : "B" }}&lt;/p&gt;</code></pre>
          <ul>
            <li>DOM構造は不変</li>
            <li>テキストノードのみ変更</li>
            <li>軽量</li>
          </ul>
        </div>

        <div class="method-card">
          <h3>v-if / v-else</h3>
          <pre v-pre><code>&lt;p v-if="isClient"&gt;A&lt;/p&gt;
&lt;p v-else&gt;B&lt;/p&gt;</code></pre>
          <ul>
            <li>要素の削除・追加</li>
            <li>DOM構造が変化</li>
            <li>やや重い</li>
          </ul>
        </div>

        <div class="method-card">
          <h3>ClientOnly</h3>
          <pre><code>&lt;ClientOnly&gt;
  &lt;p&gt;A&lt;/p&gt;
  &lt;template #fallback&gt;
    &lt;p&gt;B&lt;/p&gt;
  &lt;/template&gt;
&lt;/ClientOnly&gt;</code></pre>
          <ul>
            <li>Vueが特別扱い</li>
            <li>明示的で安全</li>
            <li>SEO/JSオフ考慮</li>
          </ul>
        </div>
      </div>

      <div class="recommendation-final">
        <h3>💡 推奨される使い分け</h3>
        <ul>
          <li><strong>初期値が一致:</strong> 三項演算子やv-ifでOK（シンプル）</li>
          <li><strong>初期値が異なる:</strong> ClientOnlyを使う（安全）</li>
          <li><strong>SEOが重要:</strong> ClientOnly + fallback（検索エンジン対応）</li>
          <li><strong>ブラウザAPI依存:</strong> ClientOnly（window, localStorage等）</li>
        </ul>
      </div>
    </div>

    <NuxtLink to="/" class="back-link">← トップページに戻る</NuxtLink>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  color: #00dc82;
  margin-bottom: 2rem;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.3rem;
}

h3 {
  color: #555;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.instruction {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
}

.instruction ol {
  margin-top: 1rem;
  padding-left: 1.5rem;
}

.instruction li {
  margin: 0.5rem 0;
}

.example-section {
  margin-bottom: 2rem;
}

.demo-box {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: white;
}

.client-content {
  background: #dbeafe;
  border: 2px solid #3b82f6;
  padding: 1rem;
  border-radius: 6px;
}

.server-content {
  background: #fef3c7;
  border: 2px solid #f59e0b;
  padding: 1rem;
  border-radius: 6px;
}

.ssr-content {
  background: #d1fae5;
  border: 2px solid #10b981;
  padding: 1rem;
  border-radius: 6px;
}

.client-content p,
.server-content p,
.ssr-content p {
  margin: 0.5rem 0;
}

code {
  background: rgba(0, 0, 0, 0.05);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.html-source {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

th {
  background: #f9fafb;
  font-weight: 600;
  color: #374151;
}

tbody tr:last-child td {
  border-bottom: none;
}

.lifecycle {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.timeline {
  margin-top: 1.5rem;
}

.step {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 1rem 0;
}

.step-number {
  background: #00dc82;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
  background: #f9fafb;
  padding: 1rem;
  border-radius: 6px;
}

.step-content code {
  display: block;
  margin-top: 0.5rem;
  background: #1f2937;
  color: #f9fafb;
  padding: 0.5rem;
  border-radius: 4px;
}

.arrow {
  text-align: center;
  font-size: 1.5rem;
  color: #00dc82;
  margin: 0.5rem 0;
}

.code-example {
  background: #1f2937;
  color: #f9fafb;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.code-example pre {
  background: #111827;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
  margin-top: 1rem;
}

.code-example code {
  background: transparent;
  color: #f9fafb;
  padding: 0;
}

.back-link {
  display: inline-block;
  color: #00dc82;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border: 2px solid #00dc82;
  border-radius: 6px;
  transition: all 0.2s;
}

.back-link:hover {
  background: #00dc82;
  color: white;
}

.hydration-section {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.case-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.case-card {
  border: 2px solid;
  border-radius: 8px;
  padding: 1.5rem;
}

.case-card.safe {
  background: #d1fae5;
  border-color: #10b981;
}

.case-card.danger {
  background: #fee2e2;
  border-color: #ef4444;
}

.case-card h3 {
  margin-bottom: 1rem;
}

.case-card pre {
  margin: 1rem 0;
}

.explanation {
  margin-top: 1rem;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 6px;
  font-size: 0.9rem;
}

.comparison-box {
  margin-top: 2rem;
}

.comparison-box table {
  margin-top: 1rem;
}

.safe-row {
  background: #f0fdf4;
}

.danger-row {
  background: #fef2f2;
}

.vif-section {
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 2rem;
  margin-bottom: 2rem;
}

.method-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.method-card {
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.5rem;
  background: #f9fafb;
}

.method-card h3 {
  color: #00dc82;
  margin-bottom: 1rem;
}

.method-card pre {
  margin: 1rem 0;
  background: #1f2937;
}

.method-card ul {
  margin: 0;
  padding-left: 1.5rem;
  font-size: 0.9rem;
}

.method-card li {
  margin: 0.4rem 0;
}

.recommendation-final {
  background: #f0f9ff;
  border-left: 4px solid #0ea5e9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-top: 2rem;
}

.recommendation-final h3 {
  color: #0c4a6e;
  margin-bottom: 1rem;
}

.recommendation-final ul {
  margin: 0;
  padding-left: 1.5rem;
}

.recommendation-final li {
  margin: 0.75rem 0;
  line-height: 1.6;
}
</style>
