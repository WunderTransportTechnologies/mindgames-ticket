# mindgames チケット販売システム

mindgames 団体のイベントチケット販売 EC サイト

## 📋 プロジェクトステータス

**現在のフェーズ**: セットアップ完了、統合フェーズへ移行

今後の実装タスクと優先順位については [docs/NEXT_STEPS.md](./docs/NEXT_STEPS.md) を参照してください。

## 技術スタック

詳細は [docs/TECH_STACK.md](./docs/TECH_STACK.md) を参照してください。

### 主要技術

- **Frontend**: Next.js 15 + TypeScript + React 18
- **UI**: shadcn/ui + Tailwind CSS
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Auth**: Better Auth
- **Payment**: Stripe
- **Email**: Resend
- **Hosting**: Vercel

## セットアップ

### 前提条件

- Node.js 18.x 以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env.local
# .env.local を編集して必要な環境変数を設定
```

**必須の環境変数:**
- `DATABASE_URL`: Neon PostgreSQL接続文字列（[DATABASE_SETUP.md](./docs/DATABASE_SETUP.md)参照）
- `BETTER_AUTH_SECRET`: 認証用シークレット（`openssl rand -base64 32`で生成）
- `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`: Google OAuth認証情報（[GOOGLE_OAUTH_SETUP.md](./docs/GOOGLE_OAUTH_SETUP.md)参照）

詳細な環境変数の一覧は[docs/NEXT_STEPS.md](./docs/NEXT_STEPS.md#環境変数チェックリスト)を参照してください。

### データベースのセットアップ

Neonデータベースの設定とDrizzle ORMの連携については、[DATABASE_SETUP.md](./docs/DATABASE_SETUP.md) を参照してください。

```bash
# スキーマをデータベースにプッシュ
npm run db:push

# Drizzle Studio（データベースGUI）を起動
npm run db:studio
```

### 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアプリケーションが起動します。

## スクリプト

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番ビルド
- `npm run start` - 本番サーバーを起動
- `npm run lint` - Biome でリント
- `npm run format` - Biome でフォーマット
- `npm run type-check` - TypeScript の型チェック

## プロジェクト構成

```
.
├── src/
│   ├── app/          # Next.js App Router
│   ├── components/   # React コンポーネント
│   └── lib/          # ユーティリティ・ヘルパー
├── docs/             # ドキュメント
├── .github/          # GitHub 設定
└── ...
```

## 開発ワークフロー

詳細は [docs/GITHUB_WORKFLOW.md](./docs/GITHUB_WORKFLOW.md) を参照してください。

1. Issue を作成
2. ブランチを作成: `<type>/<issue-number>-<description>`
3. 実装・コミット（Conventional Commits）
4. PR を作成
5. レビュー
6. Squash and Merge

## ライセンス

Private
