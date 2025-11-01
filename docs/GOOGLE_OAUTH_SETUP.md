# Google OAuth 設定ガイド

Better Authで Google OAuth 認証を有効化するための設定手順です。

## 前提条件

- Googleアカウント
- Google Cloud Consoleへのアクセス権限

## 手順

### 1. Google Cloud Consoleプロジェクト作成

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. 画面上部のプロジェクト選択メニューをクリック
3. 「新しいプロジェクト」を選択
4. プロジェクト名: `mindgames-ticket` (任意)
5. 「作成」ボタンをクリック

### 2. OAuth同意画面の設定

1. 左側メニュー: 「APIとサービス」 > 「OAuth同意画面」
2. **User Type**: 「外部」を選択 (Googleアカウント保持者全員が対象)
3. 「作成」をクリック

#### アプリ情報入力

- **アプリ名**: `mindgamesチケット販売システム`
- **ユーザーサポートメール**: ご自身のメールアドレス
- **デベロッパーの連絡先情報**: ご自身のメールアドレス
- 「保存して次へ」をクリック

#### スコープ設定

1. 「スコープを追加または削除」をクリック
2. 以下のスコープを選択:
   - `.../auth/userinfo.email` (メールアドレス)
   - `.../auth/userinfo.profile` (名前、プロフィール写真)
   - `openid`
3. 「更新」をクリック
4. 「保存して次へ」をクリック

#### テストユーザー追加

1. 「+ ADD USERS」をクリック
2. ご自身のGoogleアカウントのメールアドレスを入力
3. 「追加」をクリック
4. 「保存して次へ」をクリック

### 3. OAuth 2.0クライアントID作成

1. 左側メニュー: 「APIとサービス」 > 「認証情報」
2. 「+ 認証情報を作成」 > 「OAuthクライアントID」
3. **アプリケーションの種類**: 「ウェブ アプリケーション」
4. **名前**: `Mindgames Ticket Web App`

#### 承認済みのJavaScript生成元

- `http://localhost:3000` (ローカル開発用)
- `https://<あなたのVercelドメイン>` (本番環境用、後で追加可)

#### 承認済みのリダイレクトURI

**重要**: 以下のURIを正確に入力してください

- `http://localhost:3000/api/auth/callback/google` (ローカル開発用)
- `https://<あなたのVercelドメイン>/api/auth/callback/google` (本番環境用、後で追加可)

5. 「作成」をクリック

### 4. クライアントIDとシークレットを取得

作成完了後、以下が表示されます:

- **クライアントID**: `xxxxxx.apps.googleusercontent.com`
- **クライアントシークレット**: `GOCSPX-xxxxxxxxxx`

これらをコピーして、プロジェクトの `.env.local` ファイルに追加します。

```bash
# .env.local に追加
BETTER_AUTH_SECRET="ここにシークレットを貼り付け"  # openssl rand -base64 32 で生成
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

AUTH_GOOGLE_ID="ここにクライアントIDを貼り付け"
AUTH_GOOGLE_SECRET="ここにクライアントシークレットを貼り付け"
```

**重要な環境変数:**
- `BETTER_AUTH_SECRET`: セッション暗号化用のシークレットキー（必須）
  - 生成方法: `openssl rand -base64 32`
  - 本番環境では必ず新しいシークレットを生成すること
- `BETTER_AUTH_URL`: 認証サーバーのベースURL
- `NEXT_PUBLIC_APP_URL`: クライアント側で使用するアプリケーションのURL
- `AUTH_GOOGLE_ID`: Google OAuthクライアントID
- `AUTH_GOOGLE_SECRET`: Google OAuthクライアントシークレット

**セキュリティ注意事項:**
- これらの環境変数は `.env.local` ファイルに保存し、Gitにコミットしないこと
- 本番環境では必ず異なるシークレットを使用すること
- `BETTER_AUTH_SECRET` が未設定の場合、アプリケーションはエラーをスローします

### 5. 開発サーバーを再起動

環境変数を変更した場合は、開発サーバーの再起動が必要です。

```bash
# 開発サーバーを停止して再起動
npm run dev
```

### 6. 動作確認

1. ブラウザで http://localhost:3000 を開く
2. 「Sign in with Google」ボタンをクリック
3. Googleアカウントでログイン
4. ログイン成功後、ユーザー情報が表示されることを確認

## トラブルシューティング

### Error 400: redirect_uri_mismatch

**原因**: リダイレクトURIの不一致

**解決策**:
- Google Cloud Consoleの「承認済みのリダイレクトURI」を確認
- `http` と `https` の違い、末尾のスラッシュなどを厳密にチェック
- 正確なURI: `http://localhost:3000/api/auth/callback/google`

### Error 401: invalid_client

**原因**: クライアントIDまたはシークレットが正しくない

**解決策**:
- `.env.local` の値がGoogle Cloud Consoleの値と完全一致しているか確認
- コピー＆ペーストのミスがないかチェック
- 開発サーバーを再起動

### Error 403: access_denied

**原因**: テストユーザー以外がログインしようとした

**解決策**:
- OAuth同意画面の「テストユーザー」に自分のアカウントが登録されているか確認
- テストユーザーとして登録したアカウントでログイン

## 本番環境への展開

Vercelにデプロイする際は、以下を追加してください:

1. Google Cloud Consoleで本番環境のURLを追加:
   - 承認済みのJavaScript生成元: `https://your-app.vercel.app`
   - 承認済みのリダイレクトURI: `https://your-app.vercel.app/api/auth/callback/google`

2. Vercelの環境変数設定:
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL=https://your-app.vercel.app`

---

**最終更新**: 2025-10-31
