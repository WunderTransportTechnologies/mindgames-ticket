# Stripe セットアップガイド

このガイドでは、mindgames-ticketプロジェクトでStripe決済機能を設定する手順を説明します。

## 目次

1. [Stripeアカウント作成](#1-stripeアカウント作成)
2. [APIキーの取得](#2-apiキーの取得)
3. [環境変数の設定](#3-環境変数の設定)
4. [Webhookの設定](#4-webhookの設定)
5. [動作確認](#5-動作確認)

---

## 1. Stripeアカウント作成

1. [Stripe](https://stripe.com/) にアクセス
2. 「今すぐ始める」をクリックしてアカウント作成
3. メールアドレス、パスワードを設定
4. ダッシュボードにログイン

---

## 2. APIキーの取得

### テストモードのAPIキー取得

開発環境では**テストモード**のキーを使用します。

1. Stripeダッシュボードにログイン
2. 右上のトグルで「テストモード」がONになっていることを確認
3. 左メニューから **開発者 → APIキー** を選択
4. 以下のキーをコピー:
   - **公開可能キー** (Publishable key): `pk_test_...`
   - **シークレットキー** (Secret key): `sk_test_...`

⚠️ **注意**: シークレットキーは絶対に公開しないでください。

---

## 3. 環境変数の設定

### 3.1 環境変数ファイルの作成

プロジェクトルートに `.env.local` ファイルを作成します（すでにある場合は追記）。

```bash
# Stripe Configuration
STRIPE_SECRET_KEY=sk_test_あなたのシークレットキー
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_あなたの公開可能キー
STRIPE_WEBHOOK_SECRET=whsec_あなたのWebhookシークレット
```

### 3.2 環境変数の説明

| 環境変数 | 説明 | 例 |
|---------|------|-----|
| `STRIPE_SECRET_KEY` | サーバーサイドで使用するシークレットキー | `sk_test_51A...` |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | クライアントサイドで使用する公開キー | `pk_test_51A...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook署名検証用シークレット | `whsec_...` |

---

## 4. Webhookの設定

Stripe Webhookを使用して、決済完了などのイベントを受け取ります。

### 4.1 ローカル開発環境でのWebhook設定

ローカル開発では**Stripe CLI**を使用します。

#### Stripe CLIのインストール

**macOS (Homebrew):**
```bash
brew install stripe/stripe-cli/stripe
```

**その他のOS:**
[Stripe CLI ドキュメント](https://stripe.com/docs/stripe-cli#install)を参照

#### Stripe CLIでログイン

```bash
stripe login
```

ブラウザが開き、認証が完了します。

#### Webhookのリッスン開始

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

実行すると、Webhook署名シークレット（`whsec_...`）が表示されます。
これを `.env.local` の `STRIPE_WEBHOOK_SECRET` にコピーします。

**出力例:**
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx (^C to quit)
```

### 4.2 本番環境でのWebhook設定

本番環境では、Stripeダッシュボードから設定します。

1. Stripeダッシュボード → **開発者 → Webhook**
2. 「エンドポイントを追加」をクリック
3. 以下を設定:
   - **エンドポイントURL**: `https://your-domain.com/api/webhooks/stripe`
   - **リスンするイベント**:
     - `checkout.session.completed`
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
4. 「エンドポイントを追加」をクリック
5. **署名シークレット**をコピーして、本番環境の環境変数に設定

---

## 5. 動作確認

### 5.1 開発サーバーの起動

```bash
npm run dev
```

### 5.2 Webhookリスニングの起動（別ターミナル）

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 5.3 テスト決済の実行

Stripe提供のテストカード番号を使用します。

#### テストカード番号

| カード番号 | 結果 |
|-----------|------|
| `4242 4242 4242 4242` | 成功 |
| `4000 0000 0000 0002` | カード拒否 |
| `4000 0000 0000 9995` | 残高不足 |

- **有効期限**: 任意の未来の日付（例: `12/34`）
- **CVC**: 任意の3桁（例: `123`）
- **郵便番号**: 任意（例: `12345`）

### 5.4 APIテスト（curlコマンド）

Checkout Session作成APIをテスト:

```bash
curl -X POST http://localhost:3000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{
    "eventId": "test-event-1",
    "ticketTypeId": "general",
    "quantity": 2
  }'
```

成功すると、以下のようなレスポンスが返ります:

```json
{
  "sessionId": "cs_test_...",
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

返ってきた `url` をブラウザで開くと、Stripe Checkoutページが表示されます。

---

## トラブルシューティング

### エラー: `STRIPE_SECRET_KEY is not defined`

`.env.local` ファイルが正しく読み込まれていません。

**解決方法:**
1. `.env.local` がプロジェクトルートにあることを確認
2. 開発サーバーを再起動（`npm run dev`）

### Webhookが受信されない

**確認事項:**
1. `stripe listen` が起動しているか
2. `.env.local` の `STRIPE_WEBHOOK_SECRET` が正しいか
3. Webhookエンドポイント（`/api/webhooks/stripe`）が実装されているか

### 決済がテストモードで完了しない

**確認事項:**
1. Stripeダッシュボードが「テストモード」になっているか
2. テストカード番号（`4242 4242 4242 4242`）を使用しているか

---

## セキュリティのベストプラクティス

### 1. シークレットキーの管理

- ❌ コードに直接記述しない
- ❌ GitHubにコミットしない
- ✅ 環境変数で管理
- ✅ `.env.local` を `.gitignore` に追加（すでに設定済み）

### 2. Webhook署名検証

本プロジェクトでは、すべてのWebhookリクエストで署名検証を実施しています。

実装箇所: `src/app/api/webhooks/stripe/route.ts`

### 3. 本番キーとテストキーの分離

- **開発環境**: テストキー（`sk_test_...`, `pk_test_...`）
- **本番環境**: 本番キー（`sk_live_...`, `pk_live_...`）

---

## 参考リンク

- [Stripe 公式ドキュメント](https://stripe.com/docs)
- [Stripe Node.js SDK](https://stripe.com/docs/api/node)
- [Stripe CLI](https://stripe.com/docs/stripe-cli)
- [Stripe Webhooks ガイド](https://stripe.com/docs/webhooks)
- [Stripe テストカード](https://stripe.com/docs/testing)

---

**最終更新**: 2025-11-01
