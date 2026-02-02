# サイト構成まとめ

ナビゲーション周りの「どこがホームで、どこまでが共通レイアウトなのか」をひと目で把握できるように、Nuxt 3 Study のページ構成とディレクトリ対応表をまとめました。

## ページとレイアウトの関係

| 役割 | 中身/実装 | ルーティング | 備考 |
|------|-----------|--------------|------|
| **ホーム** | `pages/index.vue` | `/` | カウンター・主要デモのリンクが並ぶトップページ |
| **ヘッダー** | `components/AppNavigation.vue` | - | すべてのページで共通。`layouts/default.vue` に配置 |
| **レイアウト** | `layouts/default.vue` | - | `<AppNavigation />` + `<slot />` でページ本体を包む |
| **ページ本体** | `pages/**` | ディレクトリに連動 | 例: `pages/design-system.vue` → `/design-system` |

> ポイント: 「ホーム」は `/` のページコンテンツそのもの。ヘッダーはどの URL でも表示される共通ナビゲーションです。

## ディレクトリ早見表

| ディレクトリ | 用途 / 代表例 |
|--------------|--------------|
| `pages/` | ファイルがそのままルートになる。<br>`pages/portfolio/index.vue` → `/portfolio` |
| `components/` | 再利用 UI。`components/design-system/Input.vue` を書くと `<DesignSystemInput>` が自動で使える |
| `layouts/` | ページ共通の枠。`layouts/default.vue` でヘッダーを挿入 |
| `app.vue` | 最上位。`<NuxtLayout>` と `<NuxtPage>` を読み込むだけなので、実質的なエントリーポイント |
| `composables/` | `useSearchProjects` などのロジック。ここも自動インポート対象 |
| `styled-system/` `panda-config/` | Panda CSS のレシピ・トークン |
| `docs/` | このファイルのような補助ドキュメント |

## ナビゲーションカテゴリ

`components/AppNavigation.vue` では `navItems` 配列をもとにメニューが描画されています。カテゴリごとの配置をまとめると以下の通りです。

- **学習コンテンツ**: デザインシステム、ポートフォリオ、Vue Guide 系
- **デモ**: SSR / SSG / ISR / Doherty などレンダリング検証系
- **UX 法則**: Hicks, Fitts, Jakob, Paradox of Choice など
- **Examples**: Vue/Nuxt 基礎、レンダリング、データフェッチ、フォーム、検索 UI

この配列さえ見れば新規ページの導線をどこに追加すべきか判断できるようになっています。

---

> さらに詳細が必要な場合は README の「プロジェクト構造」セクションと合わせて参照してください。追加で整理したい箇所があれば遠慮なくどうぞ。***
