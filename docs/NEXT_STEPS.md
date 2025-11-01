# Next Steps - 今後の実装タスク

> **最終更新**: 2025-10-31
> **ステータス**: セットアップフェーズ完了、統合フェーズへ移行

## 進捗状況

### ✅ 完了済み

1. **基本プロジェクトセットアップ**
   - Next.js 15 プロジェクト作成
   - TypeScript + Biome 設定
   - shadcn/ui 導入

2. **データベース環境構築**
   - Neon PostgreSQL データベース作成
   - Drizzle ORM セットアップ
   - 基本スキーマ定義（users, events, tickets テーブル）
   - マイグレーション環境整備

3. **開発環境整備**
   - GitHub ワークフロー設定
   - イシュー・PRテンプレート作成
   - ADR（Architecture Decision Records）フレームワーク導入
   - ドキュメント整備

4. **Better Auth 認証基盤**（PR #14）
   - Better Auth のセットアップ完了
   - Google OAuth プロバイダー統合
   - 認証データベーススキーマ実装（user, account, session, verification）
   - 認証UIコンポーネント実装（SignInButton, SignOutButton, UserInfo）
   - セッション管理機能
   - Google OAuth設定ガイド作成

### 🚧 進行中のタスク

現在該当なし

---

## 📋 今後の実装タスク

### フェーズ2: 認証・決済・通知基盤の統合

#### 1. ~~Better Auth のセットアップ~~ ✅ 完了

**目的**: ユーザー認証基盤の構築

**完了内容**:
- [x] Better Auth のインストール
- [x] 認証設定ファイルの作成（`src/lib/auth.ts`）
- [x] Google OAuth プロバイダー統合
- [x] セッション管理の実装
- [x] ログイン・ログアウトAPI実装
- [x] 認証UIコンポーネント実装
- [x] データベーススキーマ実装
- [x] 環境変数設定（`BETTER_AUTH_SECRET`, `AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`）

**参考ドキュメント**:
- [Better Auth 公式ドキュメント](https://www.better-auth.com/)
- [Google OAuth設定ガイド](./GOOGLE_OAUTH_SETUP.md)

**関連イシュー**: #13
**関連PR**: #14

---

#### 2. ~~Stripe SDK のインストール~~ ✅ 完了

**目的**: 決済機能の統合

**完了内容**:
- [x] Stripe SDK のインストール
  ```bash
  npm install stripe @stripe/stripe-js
  ```
- [x] Stripe API設定（`src/lib/stripe.ts`）
- [x] Checkout Session作成API実装（`src/app/api/checkout/route.ts`）
- [x] Webhookエンドポイントの実装（`src/app/api/webhooks/stripe/route.ts`）
- [x] Webhook署名検証の実装
- [x] テスト環境での動作確認
- [x] 環境変数設定（`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`）
- [x] セットアップガイド作成（`docs/STRIPE_SETUP.md`）
- [x] ADR作成（`docs/adr/2025-11-01-15-stripe-payment-integration.md`）

**セキュリティ考慮事項**:
- ✅ Webhook署名検証の実装
- ✅ 本番キーとテストキーの適切な管理
- ✅ PCI DSS準拠の確認

**参考ドキュメント**:
- [Stripe Node.js SDK](https://stripe.com/docs/api/node)
- [Stripe セットアップガイド](./STRIPE_SETUP.md)

**関連イシュー**: #15
**関連PR**: #16

---

#### 3. Resend SDK のインストール

**目的**: メール送信機能の統合

**タスク詳細**:
- [ ] Resend SDK のインストール
  ```bash
  npm install resend
  ```
- [ ] メール送信設定（`src/lib/email.ts`）
- [ ] メールテンプレートの作成
  - チケット購入確認メール
  - イベント開催リマインダー
  - パスワードリセット
- [ ] 環境変数設定（`RESEND_API_KEY`）

**必要なメールテンプレート**:
1. ユーザー登録確認
2. チケット購入完了
3. QRコード付きチケット
4. イベントリマインダー
5. パスワードリセット

**参考ドキュメント**:
- [Resend 公式ドキュメント](https://resend.com/docs)

**関連イシュー**: #TBD

---

#### 4. Vercel Blob のセットアップ

**目的**: ファイルストレージ基盤の構築（イベント画像、QRコードなど）

**タスク詳細**:
- [ ] Vercel Blob のインストール
  ```bash
  npm install @vercel/blob
  ```
- [ ] ファイルアップロード機能の実装
- [ ] 画像最適化処理の実装
- [ ] QRコード生成・保存機能
- [ ] 環境変数設定（`BLOB_READ_WRITE_TOKEN`）

**ストレージ要件**:
- イベント画像（サムネイル、詳細画像）
- ユーザーアバター（将来的に）
- チケットQRコード
- 領収書PDF（将来的に）

**参考ドキュメント**:
- [Vercel Blob ドキュメント](https://vercel.com/docs/storage/vercel-blob)

**関連イシュー**: #TBD

---

### フェーズ3: コア機能実装

#### 5. イベント管理機能

**機能要件**:
- イベント一覧表示
- イベント詳細ページ
- イベント作成・編集（管理者）
- イベント画像管理
- イベント検索・フィルタリング

**必要なページ**:
- `/events` - イベント一覧
- `/events/[id]` - イベント詳細
- `/admin/events/new` - イベント作成
- `/admin/events/[id]/edit` - イベント編集

**データベーステーブル**:
- `events` テーブルの拡張（既存）
- `event_images` テーブル（新規）
- `event_categories` テーブル（新規）

**関連イシュー**: #TBD

---

#### 6. チケット販売機能

**機能要件**:
- チケット選択UI
- カート機能
- Stripe決済フロー
- 購入完了処理
- チケットQRコード生成
- 購入確認メール送信

**必要なページ**:
- `/events/[id]/tickets` - チケット選択
- `/checkout` - 決済画面
- `/orders/[id]` - 購入完了・チケット表示

**データベーステーブル**:
- `tickets` テーブルの拡張（既存）
- `orders` テーブル（新規）
- `payments` テーブル（新規）

**決済フロー**:
1. チケット選択
2. Stripe Checkout Session作成
3. 決済完了Webhook受信
4. チケット発行
5. メール送信

**関連イシュー**: #TBD

---

#### 7. ユーザーマイページ

**機能要件**:
- 購入履歴表示
- チケット一覧・QRコード表示
- プロフィール編集
- パスワード変更

**必要なページ**:
- `/mypage` - ダッシュボード
- `/mypage/tickets` - 購入チケット一覧
- `/mypage/profile` - プロフィール編集

**関連イシュー**: #TBD

---

#### 8. 管理画面

**機能要件**:
- イベント管理（CRUD）
- チケット販売状況確認
- 売上レポート
- ユーザー管理

**必要なページ**:
- `/admin` - ダッシュボード
- `/admin/events` - イベント管理
- `/admin/sales` - 売上管理
- `/admin/users` - ユーザー管理

**権限管理**:
- 管理者ロールの実装
- アクセス制御ミドルウェア

**関連イシュー**: #TBD

---

## 優先順位

### 最優先（Phase 2）
1. ~~Better Auth セットアップ~~ ✅ 完了
2. Stripe SDK インストール
3. Resend SDK インストール
4. Vercel Blob セットアップ

### 高優先度（Phase 3 - コア機能）
5. イベント管理機能
6. チケット販売機能

### 中優先度（Phase 3 - ユーザー体験向上）
7. ユーザーマイページ
8. 管理画面

---

## 環境変数チェックリスト

実装前に `.env.local` に設定が必要な環境変数:

```bash
# Database (✅ 設定済み)
DATABASE_URL=

# Authentication (✅ 設定済み - Phase 2)
BETTER_AUTH_SECRET=  # Generate with: openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000  # Used by auth-client.ts
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Stripe (Phase 2)
STRIPE_SECRET_KEY=
STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=

# Resend (Phase 2)
RESEND_API_KEY=

# Vercel Blob (Phase 2)
BLOB_READ_WRITE_TOKEN=
```

---

## マイルストーン

### Milestone 1: 基盤統合完了（Phase 2）
**目標日**: TBD
**完了条件**:
- すべての外部サービス（Auth, Stripe, Resend, Blob）が動作確認済み
- テスト環境での統合テスト成功

### Milestone 2: MVP完成（Phase 3）
**目標日**: TBD
**完了条件**:
- イベント作成・表示可能
- チケット購入フロー完動
- メール送信・QRコード発行成功

### Milestone 3: 本番リリース準備
**目標日**: TBD
**完了条件**:
- セキュリティ監査完了
- パフォーマンステスト実施
- 本番環境構築

---

## 注意事項

### セキュリティ
- すべての認証情報は環境変数で管理
- Webhook署名検証を必ず実装
- XSS, CSRF対策の徹底
- SQLインジェクション対策（Drizzle ORMで自動対応）

### パフォーマンス
- 画像の最適化（Next.js Image コンポーネント使用）
- データベースクエリの最適化
- キャッシュ戦略の検討

### テスト
- 単体テスト（Jest）
- E2Eテスト（Playwright検討）
- Stripe テストモードでの決済テスト

---

## 参考リンク

- [プロジェクトREADME](../README.md)
- [技術スタック詳細](./TECH_STACK.md)
- [データベースセットアップ](./DATABASE_SETUP.md)
- [GitHub ワークフロー](./GITHUB_WORKFLOW.md)
- [ADR（設計判断記録）](./adr/)

---

**次のアクション**: Phase 2の次のタスク「Stripe SDK のインストール」を開始
