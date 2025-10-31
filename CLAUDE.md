# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

mindgames団体のイベントチケット販売ECシステム。Next.js 15 (App Router) + TypeScript + Drizzle ORM (Neon PostgreSQL) で構築されたフルスタックアプリケーション。

**技術スタック**: Next.js 15, TypeScript, Drizzle ORM, Neon, Better Auth (予定), Stripe (予定), Resend (予定), Vercel Blob (予定)

**詳細**: [docs/TECH_STACK.md](docs/TECH_STACK.md), [docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)

## 必須事項：GitHub ワークフロー

### GitHub CLI の使用

**すべての GitHub 操作は `gh` コマンドを使用してください。**

```bash
# イシューの作成
gh issue create
gh issue create --template feature_request.md

# PRの作成
gh pr create
gh pr create --web

# PRのマージ（Squash and merge）
gh pr merge <PR番号> --squash
```

### Git操作の制約

**絶対に使用禁止:**
```bash
git add .
git add -a
git add --all
```

**必ず個別ファイルを指定:**
```bash
git add src/file1.ts src/file2.ts
```

この制約の理由は意図しないファイルの混入を防ぐためです。

## 開発コマンド

### 開発サーバー
```bash
npm run dev              # Next.js開発サーバー起動 (http://localhost:3000)
npm run build            # 本番ビルド
npm run start            # 本番サーバー起動
```

### コード品質
```bash
npm run lint             # Biomeでリント
npm run format           # Biomeでフォーマット
npm run type-check       # TypeScript型チェック
```

### データベース (Drizzle ORM)
```bash
npm run db:push          # スキーマをDBに反映 (マイグレーション不要な開発時)
npm run db:generate      # マイグレーションファイル生成
npm run db:migrate       # マイグレーション実行
npm run db:studio        # Drizzle Studio GUI起動 (https://local.drizzle.studio)
```

**重要**: データベーススキーマ変更時は `npm run db:push` を実行してNeonに反映すること。

## アーキテクチャ

### ディレクトリ構造
```
src/
├── app/              # Next.js App Router (ページ・レイアウト)
├── components/       # Reactコンポーネント (将来的にshadcn/ui含む)
├── db/
│   ├── index.ts      # Drizzle クライアント初期化
│   └── schema.ts     # データベーススキーマ定義
└── lib/              # ユーティリティ・ヘルパー
    └── utils.ts      # shadcn/ui用ユーティリティ (cn関数)
```

### データベース設計
- **ORM**: Drizzle ORM (型安全なTypeScript ORM)
- **DB**: Neon (サーバーレスPostgreSQL)
- **スキーマ**: `src/db/schema.ts` で定義 (現在はusersテーブルのみサンプル実装)
- **接続**: `src/db/index.ts` でNeon HTTPクライアント経由で接続

**スキーマ変更フロー**:
1. `src/db/schema.ts` を編集
2. `npm run db:push` でNeonに反映
3. Drizzle Studioで確認: `npm run db:studio`

### Next.js App Router構成
- **Server Components**: デフォルトでサーバーコンポーネント (データフェッチに最適)
- **Client Components**: `"use client"` ディレクティブで明示的に使用
- **Server Actions**: フォーム処理・ミューテーションに使用予定

### 環境変数
- `.env.local`: ローカル開発用 (Gitにコミット禁止)
- `DATABASE_URL`: Neon接続文字列 (必須)
- 将来追加予定: `AUTH_SECRET`, `STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `BLOB_READ_WRITE_TOKEN`

## 開発フロー

### 1. イシュー駆動開発

すべての作業は GitHub Issue から開始します:

```bash
# イシューを作成
gh issue create --template feature_request.md

# イシュー番号を確認
gh issue list
```

### 2. ブランチ作成

ブランチ命名規則: `<type>/<issue-number>-<description>`

```bash
git checkout main
git pull origin main
git checkout -b feature/123-add-login-form
```

**type の種類:**
- `feature/` - 新機能
- `fix/` - バグ修正
- `refactor/` - リファクタリング
- `docs/` - ドキュメント
- `chore/` - ビルド・設定変更

### 3. コミット

Conventional Commits 規約に従います:

```bash
git add src/components/Login.tsx
git commit -m "feat(auth): ログインフォームを実装"
```

**type:**
- `feat` - 新機能
- `fix` - バグ修正
- `docs` - ドキュメント
- `style` - フォーマット
- `refactor` - リファクタリング
- `test` - テスト
- `chore` - ビルド・ツール

### 4. PR作成

```bash
git push origin feature/123-add-login-form
gh pr create --web  # テンプレートを使用
```

**PRの要件:**
- 変更行数: 200〜400行以内を目安
- 1PR = 1機能 または 1バグ修正
- PRテンプレートのチェックリストをすべて確認

### 5. 設計ドキュメント（ADR）

**重要な技術的決定は必ずADRを作成:**

```bash
cp docs/adr/template.md docs/adr/2025-10-31-<PR番号>-<タイトル>.md
```

**命名規則:** `YYYY-MM-DD-<PR番号>-<タイトル>.md`

**含めるべき内容:**
- ステータス（Proposed/Accepted/Deprecated）
- コンテキスト（なぜ必要か）
- 決定内容
- トレードオフ
- 関連PR番号

**重要:** 1PR = 1ADR

## マージ戦略

本プロジェクトは **Squash and Merge** を採用しています。

- `main` ブランチの履歴は1PR = 1コミット
- PRのすべてのコミットは1つにまとめられる
- コミットメッセージはPRタイトルとなる

## ディレクトリ構成

```
.
├── .github/
│   ├── ISSUE_TEMPLATE/      # イシューテンプレート
│   │   ├── bug_report.md
│   │   ├── feature_request.md
│   │   └── documentation.md
│   └── pull_request_template.md
├── docs/
│   ├── GITHUB_WORKFLOW.md   # 詳細なワークフローガイド
│   └── adr/                 # Architecture Decision Records
│       ├── README.md
│       └── template.md
└── CLAUDE.md                # このファイル
```

## 重要なドキュメント

すべての詳細は [docs/GITHUB_WORKFLOW.md](docs/GITHUB_WORKFLOW.md) を参照してください:

- ブランチ保護ルール
- コミット規約の詳細
- PRレビュープロセス
- ラベルとマイルストーン戦略

## 開発時の注意点

### 新しい作業を始める前に

1. イシューを作成: `gh issue create`
2. イシュー番号を確認: `gh issue list`
3. ブランチ作成: `git checkout -b <type>/<issue-number>-<description>`

### コミット前の確認

- [ ] `git add .` を使っていないか
- [ ] コミットメッセージは Conventional Commits に従っているか
- [ ] 1コミット = 1つの論理的変更か

### PR作成前の確認

- [ ] PRテンプレートのチェックリストをすべて確認
- [ ] 関連イシューを `Closes #123` で紐付け
- [ ] ADRを作成（技術的決定がある場合）
- [ ] 変更行数は適切か（200〜400行が目安）

### レビュー時の観点

- コードの品質・可読性
- ロジックの正確性
- テストの妥当性
- パフォーマンスへの影響
- セキュリティ上の問題

## ラベルの使用

イシューとPRには適切なラベルを付与してください:

**優先度:**
- `priority: high` / `priority: medium` / `priority: low`

**種類:**
- `enhancement` / `bug` / `documentation` / `refactoring`

**ステータス:**
- `status: ready` / `status: in-progress` / `status: blocked`

## 統合サービス (Phase 2で実装予定)

次のフェーズで統合する外部サービス ([docs/NEXT_STEPS.md](docs/NEXT_STEPS.md)参照):
1. **Better Auth** - 認証基盤 (`src/lib/auth.ts`に実装予定)
2. **Stripe** - 決済処理 (`src/lib/stripe.ts`に実装予定)
3. **Resend** - メール送信 (`src/lib/email.ts`に実装予定)
4. **Vercel Blob** - ファイルストレージ (イベント画像・QRコード)

各サービスの実装時は、必ずADRを作成すること。

## ペンディング項目

将来的に導入予定:
- CODEOWNERS（特定ファイルの自動レビュワー割り当て）
- CI/CD 自動チェック（Lint、テスト、フォーマット）
- テストフレームワーク (Vitest/Jest, Playwright)
