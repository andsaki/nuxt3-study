<template>
  <div>
    <AppHeader />

    <div :class="css({ maxW: '1200px', mx: 'auto', p: '8' })">
      <h1 :class="css({ fontSize: '3xl', fontWeight: 'bold', color: 'gray.900', mb: '8' })">
        ISR デモページ
      </h1>

      <!-- ISR説明カード -->
      <DesignSystemCard title="⚡ ISR (Incremental Static Regeneration)" color-scheme="blue">
        <div :class="css({ spaceY: '3' })">
          <p><strong>生成時刻:</strong> {{ pageInfo?.generatedAt }}</p>
          <p><strong>レンダリング:</strong> {{ pageInfo?.type }}</p>
          <p><strong>キャッシュ:</strong> {{ pageInfo?.cacheTime }}</p>
          <ul :class="css({ mt: '4', pl: '6', spaceY: '2', listStyleType: 'disc' })">
            <li>初回は静的生成されたページを配信</li>
            <li>60秒経過後、バックグラウンドで再生成</li>
            <li>古いキャッシュを返しつつ、新しいデータを生成（SWR）</li>
            <li>大量のページでも高速</li>
          </ul>
        </div>
      </DesignSystemCard>

      <!-- 動作確認カード -->
      <DesignSystemCard title="🔄 動作確認" color-scheme="green">
        <ol :class="css({ pl: '6', spaceY: '2', listStyleType: 'decimal' })">
          <li>このページをリロードして生成時刻を確認</li>
          <li>60秒以内なら同じ時刻が表示される</li>
          <li>60秒経過後にリロードすると、バックグラウンドで再生成</li>
          <li>次回アクセス時には新しい時刻が表示される</li>
        </ol>
      </DesignSystemCard>

      <!-- データ表示カード -->
      <DesignSystemCard title="📝 データ（ISR更新対象）">
        <div v-if="posts" :class="css({ spaceY: '4' })">
          <article
            v-for="post in posts"
            :key="post.id"
            :class="css({
              bg: 'white',
              border: '1px solid',
              borderColor: 'gray.200',
              rounded: 'lg',
              p: '6',
              transition: 'all 0.2s',
              _hover: { shadow: 'md', borderColor: 'gray.300' }
            })"
          >
            <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', color: 'gray.900', mb: '2' })">
              {{ post.title }}
            </h3>
            <p :class="css({ color: 'gray.600', lineHeight: '1.6' })">
              {{ post.body }}
            </p>
          </article>
        </div>
      </DesignSystemCard>

      <!-- 設定方法カード -->
      <DesignSystemCard title="⚙️ 設定方法（nuxt.config.ts）">
        <div :class="css({ bg: 'gray.900', color: 'gray.50', p: '6', rounded: 'lg', overflow: 'auto' })">
          <pre :class="css({ fontSize: 'sm' })"><code>export default defineNuxtConfig({
  routeRules: {
    '/isr-demo': { swr: 60 }, // 60秒キャッシュ + SWR
  }
})</code></pre>
        </div>
      </DesignSystemCard>

      <!-- キャッシュ情報カード -->
      <DesignSystemCard title="💾 キャッシュの保存場所">
        <p :class="css({ color: 'gray.600', mb: '6' })">
          環境によってキャッシュの場所が異なります:
        </p>

        <div
:class="css({
          display: 'grid',
          gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)' },
          gap: '4',
          mb: '8'
        })">
          <!-- 開発環境 -->
          <div :class="css({ bg: 'yellow.50', border: '2px solid', borderColor: 'yellow.400', rounded: 'lg', p: '5' })">
            <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2' })">
              🔧 開発環境
            </h3>
            <p :class="css({ fontSize: 'sm', color: 'gray.600', mb: '3' })">
              <code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm', fontSize: 'xs' })">npm run dev</code>
            </p>
            <ul :class="css({ fontSize: 'sm', spaceY: '2', pl: '5', listStyleType: 'disc' })">
              <li><strong>場所:</strong> Nitroのメモリキャッシュ</li>
              <li><strong>保持:</strong> サーバー再起動まで</li>
              <li><strong>種類:</strong> サーバー内部</li>
            </ul>
          </div>

          <!-- 本番環境（CDN） -->
          <div :class="css({ bg: 'green.50', border: '2px solid', borderColor: 'green.400', rounded: 'lg', p: '5' })">
            <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2' })">
              🌐 本番環境（CDN）
            </h3>
            <p :class="css({ fontSize: 'sm', color: 'gray.600', mb: '3' })">
              <code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm', fontSize: 'xs' })">Vercel / Netlify / Cloudflare Pages</code>
            </p>
            <ul :class="css({ fontSize: 'sm', spaceY: '2', pl: '5', listStyleType: 'disc' })">
              <li><strong>場所:</strong> エッジキャッシュ（CDN）</li>
              <li><strong>保持:</strong> グローバル分散</li>
              <li><strong>速度:</strong> 超高速（エッジ配信）</li>
            </ul>
          </div>

          <!-- 本番環境（Node.js） -->
          <div :class="css({ bg: 'blue.50', border: '2px solid', borderColor: 'blue.400', rounded: 'lg', p: '5' })">
            <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2' })">
              🖥️ 本番環境（Node.js）
            </h3>
            <p :class="css({ fontSize: 'sm', color: 'gray.600', mb: '3' })">
              <code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm', fontSize: 'xs' })">VPS / Docker / EC2</code>
            </p>
            <ul :class="css({ fontSize: 'sm', spaceY: '2', pl: '5', listStyleType: 'disc' })">
              <li><strong>場所:</strong> Nitroキャッシュレイヤー</li>
              <li><strong>保持:</strong> サーバーメモリ</li>
              <li><strong>種類:</strong> サーバー内部</li>
            </ul>
          </div>

          <!-- 静的ホスティング -->
          <div :class="css({ bg: 'red.50', border: '2px solid', borderColor: 'red.400', rounded: 'lg', p: '5' })">
            <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '2' })">
              📦 静的ホスティング
            </h3>
            <p :class="css({ fontSize: 'sm', color: 'gray.600', mb: '3' })">
              <code :class="css({ bg: 'gray.100', px: '2', py: '1', rounded: 'sm', fontSize: 'xs' })">S3 / GitHub Pages</code>
            </p>
            <ul :class="css({ fontSize: 'sm', spaceY: '2', pl: '5', listStyleType: 'disc' })">
              <li><strong>動作:</strong> ❌ ISRは機能しない</li>
              <li><strong>理由:</strong> サーバー再生成不可</li>
              <li><strong>代替:</strong> SSGを使用</li>
            </ul>
          </div>
        </div>

        <!-- ホスティング別対応表 -->
        <div :class="css({ mb: '6' })">
          <h3 :class="css({ fontSize: 'lg', fontWeight: 'semibold', mb: '4', color: 'gray.900' })">
            ホスティング別対応表
          </h3>
          <div :class="css({ overflowX: 'auto' })">
            <table
:class="css({
              w: 'full',
              bg: 'white',
              border: '1px solid',
              borderColor: 'gray.200',
              rounded: 'lg',
              overflow: 'hidden'
            })">
              <thead>
                <tr :class="css({ bg: 'gray.50' })">
                  <th :class="css({ px: '4', py: '3', textAlign: 'left', fontSize: 'sm', fontWeight: 'semibold', color: 'gray.700' })">
                    ホスティング
                  </th>
                  <th :class="css({ px: '4', py: '3', textAlign: 'left', fontSize: 'sm', fontWeight: 'semibold', color: 'gray.700' })">
                    キャッシュ場所
                  </th>
                  <th :class="css({ px: '4', py: '3', textAlign: 'left', fontSize: 'sm', fontWeight: 'semibold', color: 'gray.700' })">
                    ISR対応
                  </th>
                  <th :class="css({ px: '4', py: '3', textAlign: 'left', fontSize: 'sm', fontWeight: 'semibold', color: 'gray.700' })">
                    パフォーマンス
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr :class="css({ borderTop: '1px solid', borderColor: 'gray.200', transition: 'bg 0.2s', _hover: { bg: 'gray.50' } })">
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">Vercel</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">エッジキャッシュ（CDN）</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">✅ 完全対応</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">⚡⚡⚡</td>
                </tr>
                <tr :class="css({ borderTop: '1px solid', borderColor: 'gray.200', transition: 'bg 0.2s', _hover: { bg: 'gray.50' } })">
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">Netlify</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">エッジキャッシュ（CDN）</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">✅ 完全対応</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">⚡⚡⚡</td>
                </tr>
                <tr :class="css({ borderTop: '1px solid', borderColor: 'gray.200', transition: 'bg 0.2s', _hover: { bg: 'gray.50' } })">
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">Cloudflare Pages</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">Workers Cache API（CDN）</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">✅ 完全対応</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">⚡⚡⚡</td>
                </tr>
                <tr :class="css({ borderTop: '1px solid', borderColor: 'gray.200', transition: 'bg 0.2s', _hover: { bg: 'gray.50' } })">
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">Node.js Server</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">サーバーメモリ</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">⚠️ 部分対応</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">⚡⚡</td>
                </tr>
                <tr :class="css({ borderTop: '1px solid', borderColor: 'gray.200', transition: 'bg 0.2s', _hover: { bg: 'gray.50' } })">
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">S3 / GitHub Pages</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">なし</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">❌ 非対応</td>
                  <td :class="css({ px: '4', py: '3.5', fontSize: 'sm' })">⚡ (SSGのみ)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 推奨デプロイ先 -->
        <div :class="css({ bg: 'blue.50', border: '2px solid', borderColor: 'blue.200', rounded: 'lg', p: '6' })">
          <h3 :class="css({ fontSize: 'md', fontWeight: 'semibold', mb: '3', color: 'blue.900' })">
            💡 推奨デプロイ先
          </h3>
          <ul :class="css({ spaceY: '2', pl: '6', listStyleType: 'disc' })">
            <li><strong>ISRを使いたい:</strong> Vercel / Netlify / Cloudflare Pages</li>
            <li><strong>完全静的でOK:</strong> S3 / GitHub Pages + SSG</li>
            <li><strong>自前サーバー:</strong> Node.js + Redis/Memcached でキャッシュ強化</li>
          </ul>
        </div>
      </DesignSystemCard>

      <!-- 戻るリンク -->
      <NuxtLink
        to="/"
        :class="css({
          display: 'inline-block',
          mt: '8',
          px: '6',
          py: '3',
          color: 'green.600',
          fontWeight: 'medium',
          border: '2px solid',
          borderColor: 'green.600',
          rounded: 'md',
          transition: 'all 0.2s',
          _hover: {
            bg: 'green.600',
            color: 'white'
          }
        })"
      >
        ← トップページに戻る
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

interface Post {
  id: number
  title: string
  body: string
}

const { data: posts } = await useFetch<Post[]>(
  'https://jsonplaceholder.typicode.com/posts?_limit=5'
)

const { data: pageInfo } = await useAsyncData('isr-time', async () => {
  return {
    generatedAt: new Date().toISOString(),
    type: 'ISR (Incremental Static Regeneration)',
    cacheTime: '60秒',
  }
})
</script>
