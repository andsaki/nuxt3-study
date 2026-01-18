export type SearchProject = {
  id: number
  title: string
  description: string
  stack: string
  tags: string[]
  difficulty: '入門' | '中級' | '上級'
  lastUpdate: string
  metrics: {
    stars: number
    saves: number
  }
}

export const searchProjects: SearchProject[] = [
  {
    id: 1,
    title: 'Nuxt 3 検索候補 UI',
    description:
      'Algoliaライクな候補表示とキーボード操作に対応した検索バー。Composableでデバウンスと検索履歴を分離。',
    stack: 'Nuxt 3 + Vite + useAsyncData',
    tags: ['debounce', 'history', 'composable'],
    difficulty: '中級',
    lastUpdate: '2024-07-01',
    metrics: {
      stars: 124,
      saves: 312,
    },
  },
  {
    id: 2,
    title: 'アクセシブル検索フォーム',
    description:
      'スクリーンリーダーとキーボード操作を最優先に設計した検索フォーム。ARIA属性とライブリージョンを完備。',
    stack: 'Nuxt 3 + Panda CSS',
    tags: ['a11y', 'aria', 'form'],
    difficulty: '入門',
    lastUpdate: '2024-05-18',
    metrics: {
      stars: 89,
      saves: 198,
    },
  },
  {
    id: 3,
    title: 'マルチフィルター ダッシュボード検索',
    description:
      'Piniaで集約したステートを使ってカテゴリ・期間・タグの三段階フィルターを実装。SSR/CSRを問わない作り。',
    stack: 'Nuxt 3 + Pinia',
    tags: ['dashboard', 'filter', 'pinia'],
    difficulty: '上級',
    lastUpdate: '2024-08-10',
    metrics: {
      stars: 231,
      saves: 452,
    },
  },
  {
    id: 4,
    title: 'Markdownコンテンツ検索',
    description:
      'Nuxt Contentのインデックスをビルド時に生成し、フロント側はFuse.jsで曖昧検索。SSG案件向け。',
    stack: 'Nuxt Content + Fuse.js',
    tags: ['content', 'ssg', 'fuse'],
    difficulty: '中級',
    lastUpdate: '2024-03-02',
    metrics: {
      stars: 143,
      saves: 276,
    },
  },
  {
    id: 5,
    title: 'Nitro ベースの全文検索API',
    description:
      'Prisma + PostgreSQLの全文検索をNitroサーバーから提供。クエリ解析とキャッシュ層を備えた本格派。',
    stack: 'Nuxt 3 + Nitro + Prisma',
    tags: ['nitro', 'prisma', 'postgres'],
    difficulty: '上級',
    lastUpdate: '2024-06-25',
    metrics: {
      stars: 267,
      saves: 501,
    },
  },
  {
    id: 6,
    title: 'オフラインキャッシュ検索',
    description:
      'IndexedDBに保存した検索結果を優先的に表示し、バックグラウンド同期で最新状態を保つPWA向け実装。',
    stack: 'Nuxt 3 + PWA + IndexedDB',
    tags: ['offline', 'indexeddb', 'pwa'],
    difficulty: '中級',
    lastUpdate: '2024-04-11',
    metrics: {
      stars: 178,
      saves: 334,
    },
  },
]
