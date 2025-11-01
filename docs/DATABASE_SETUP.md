# データベースセットアップガイド

このドキュメントでは、Neon PostgreSQLとDrizzle ORMのセットアップ方法を説明します。

## 前提条件

- Neonアカウント（https://neon.tech）
- Node.js 18.x 以上

## Neonプロジェクトの作成

### 1. Neonにサインアップ/ログイン

https://console.neon.tech/ にアクセスしてアカウントを作成またはログインします。

### 2. 新しいプロジェクトを作成

1. 「New Project」をクリック
2. プロジェクト名を入力（例: `mindgames-ticket-dev`）
3. リージョンを選択（推奨: 近い場所、例: Asia Pacific (Tokyo)）
4. PostgreSQLバージョンを選択（デフォルトでOK）
5. 「Create Project」をクリック

### 3. 接続情報を取得

プロジェクト作成後、ダッシュボードに接続文字列が表示されます：

```
postgresql://[user]:[password]@[endpoint]/[dbname]?sslmode=require
```

この文字列をコピーしておきます。

## ローカル環境の設定

### 1. 環境変数ファイルの作成

プロジェクトルートで以下のコマンドを実行：

```bash
cp .env.example .env.local
```

### 2. DATABASE_URLを設定

`.env.local` ファイルを開き、`DATABASE_URL` にNeonの接続文字列を設定：

```env
DATABASE_URL=postgresql://[user]:[password]@[endpoint]/[dbname]?sslmode=require
```

**重要:** `DATABASE_URL` が未設定の場合、以下のコマンドはエラーをスローします：
```
Error: DATABASE_URL is required
```

これは環境変数のバリデーションによる意図的な挙動で、本番環境での設定ミスを防ぐためのものです。必ず `.env.local` に `DATABASE_URL` を設定してから次のステップに進んでください。

### 3. スキーマをデータベースにプッシュ

```bash
npm run db:push
```

このコマンドは、`src/db/schema.ts` で定義されたスキーマをデータベースに適用します。

成功すると以下のようなメッセージが表示されます：

```
✓ Changes applied
```

## Drizzle Studio（データベースGUI）

### Drizzle Studioの起動

```bash
npm run db:studio
```

ブラウザで https://local.drizzle.studio が開き、データベースの内容を視覚的に確認・編集できます。

### 機能

- テーブルの閲覧
- データの追加・編集・削除
- SQLクエリの実行
- スキーマの確認

## 利用可能なコマンド

| コマンド | 説明 |
|---------|------|
| `npm run db:generate` | マイグレーションファイルを生成 |
| `npm run db:push` | スキーマをデータベースに直接プッシュ（開発用） |
| `npm run db:migrate` | マイグレーションを実行（本番用） |
| `npm run db:studio` | Drizzle Studioを起動 |

## スキーマの管理

### スキーマファイルの場所

- **スキーマ定義**: `src/db/schema.ts`
- **データベース接続**: `src/db/index.ts`
- **Drizzle設定**: `drizzle.config.ts`

### 実装済みテーブル

プロジェクトには以下のテーブルが実装されています：

#### 認証関連（Better Auth）
- **user**: ユーザー基本情報
  - id, name, email, emailVerified, image, createdAt, updatedAt
- **account**: OAuth認証情報
  - id, userId, accountId, providerId, accessToken, refreshToken, idToken, accessTokenExpiresAt, refreshTokenExpiresAt, scope, password, createdAt, updatedAt
- **session**: セッション管理
  - id, userId, token, expiresAt, ipAddress, userAgent, createdAt, updatedAt
- **verification**: メール認証用
  - id, identifier, value, expiresAt, createdAt, updatedAt

詳細な設定は `docs/GOOGLE_OAUTH_SETUP.md` を参照してください。

### スキーマの変更手順

1. `src/db/schema.ts` でスキーマを編集
2. 開発環境の場合: `npm run db:push` で即座に反映
3. 本番環境の場合:
   - `npm run db:generate` でマイグレーションファイル生成
   - `npm run db:migrate` でマイグレーション実行

## トラブルシューティング

### 接続エラーが発生する場合

1. `.env.local` ファイルが存在することを確認
2. `DATABASE_URL` が正しく設定されていることを確認
3. Neonプロジェクトが起動していることを確認（NeonはアイドルでスリープすることがあるSleep状態の場合、接続すると自動的に起動します）

### スキーマプッシュが失敗する場合

```bash
# 環境変数が読み込まれているか確認
npm run db:push -- --verbose
```

## 開発環境と本番環境の分離

### ベストプラクティス

- **開発環境**: 別のNeonプロジェクトを作成（例: `mindgames-ticket-dev`）
- **本番環境**: 本番用のNeonプロジェクト（例: `mindgames-ticket-prod`）

### 環境ごとの設定

```env
# .env.local（開発環境、gitignore済み）
DATABASE_URL=postgresql://dev-user:password@dev-endpoint/dbname

# Vercel環境変数（本番環境）
DATABASE_URL=postgresql://prod-user:password@prod-endpoint/dbname
```

## 参考資料

- [Neon Documentation](https://neon.tech/docs/introduction)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Drizzle with Neon](https://orm.drizzle.team/docs/get-started-postgresql#neon)
- [TECH_STACK.md](./TECH_STACK.md)
