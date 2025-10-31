# テックスタック

このドキュメントでは、プロジェクトで使用する技術スタックを定義します。

## 概要

mindgames という団体のチケット販売 EC システムです。イベントチケットの販売、決済、配信を行います。

## フロントエンド

### フレームワーク・言語
- **Next.js**: React ベースのフルスタックフレームワーク（App Router）
- **TypeScript**: 型安全性の確保
- **React**: UI ライブラリ（最新安定版を使用）

### UI・スタイリング
- **shadcn/ui**: 再利用可能な UI コンポーネント
- **Tailwind CSS**: ユーティリティファーストな CSS フレームワーク
- **Radix UI**: アクセシブルな UI プリミティブ（shadcn/ui の基盤）

### 状態管理
- **React Server Components**: サーバーサイドでのデータ取得
- **Server Actions**: フォーム処理とミューテーション
- 必要に応じて Zustand / Jotai を検討

## バックエンド

### フレームワーク・言語
- **Next.js API Routes / Server Actions**: TypeScript で実装
- **TypeScript**: 型安全な API 実装

### データベース
- **Neon**: サーバーレス PostgreSQL
- **Drizzle ORM**: 型安全な TypeScript ORM
  - スキーマ定義とマイグレーション
  - 型推論による開発体験の向上

## インフラ・デプロイ

### Git ホスティング
- **GitHub**: ソースコード管理、Issue 管理、PR レビュー
- **GitHub CLI**: `gh` コマンドによる操作の標準化

### ホスティング
- **Vercel**: Next.js アプリケーションのホスティング
  - 自動デプロイ（main ブランチへの push で本番デプロイ）
  - プレビューデプロイ（PR ごとにプレビュー環境を自動生成）
  - Edge Functions 対応

### データベースホスティング
- **Neon**: PostgreSQL データベース
  - サーバーレスアーキテクチャ
  - 自動スケーリング
  - ブランチング機能（開発/本番環境の分離）

### ファイルストレージ
- **Vercel Blob**: 画像・ファイルストレージ
  - イベント画像、チケット添付ファイルなど
  - CDN 統合
  - Vercel との統合が容易

### CI/CD
- **Vercel**: 自動ビルド・デプロイ
- **GitHub Actions**: 今後導入予定
  - リント・型チェック
  - テスト実行
  - セキュリティスキャン

## 開発ツール

### バージョン管理
- **Git**: ソースコード管理
- **GitHub**: リモートリポジトリ、コラボレーション

### コミュニケーション
- **Claude Code**: AI アシスタントによる開発支援
- **Gemini MCP**: 技術調査、設計検証、壁打ち

### ドキュメント管理
- **Markdown**: ドキュメント記述
- **ADR (Architecture Decision Records)**: 技術的決定の記録

### コード品質
- **Biome**: 高速な Linter/Formatter（ESLint + Prettier の代替）
  - JavaScript/TypeScript のリント
  - コードフォーマッター
  - 1つのツールで完結、設定がシンプル
  - 高速な実行速度
- **TypeScript**: 型チェック（tsc）

## 開発フロー

### 必須ツール
- Git
- GitHub CLI (`gh`)
- エディタ（VS Code 推奨）

### ワークフロー
1. **Issue 駆動開発**: すべての作業は GitHub Issue から開始
2. **ブランチ戦略**: `<type>/<issue-number>-<description>` 形式
3. **コミット規約**: Conventional Commits
4. **PR レビュー**: テンプレートに基づくレビュー
5. **マージ戦略**: Squash and Merge
6. **ADR**: 重要な技術的決定を記録

詳細は [GITHUB_WORKFLOW.md](./GITHUB_WORKFLOW.md) を参照してください。

## 外部サービス連携

### 認証・認可
- **Better Auth**: モダンな TypeScript 認証ライブラリ
  - 2024年10月に Auth.js（旧 NextAuth.js）が Better Auth に統合
  - TypeScript ネイティブで型安全な認証実装
  - メール/パスワード認証
  - OAuth プロバイダー連携（Google, GitHub など）
  - セッション管理
  - RBAC（ロールベースアクセス制御）対応
  - 参考: [Auth.js joins Better Auth](https://www.better-auth.com/blog/authjs-joins-better-auth)

### 決済処理
- **Stripe**: チケット販売の決済処理
  - クレジットカード決済
  - Checkout Session
  - Webhook による決済完了通知
  - サブスクリプション対応（将来的な会員制機能向け）

### メール送信
- **Resend**: トランザクションメール配信
  - チケット購入確認メール
  - イベントリマインダー
  - パスワードリセット
  - React Email によるテンプレート作成

## セキュリティ

### セキュリティ対策
- **環境変数**: `.env.local` ファイルで秘密情報を管理（Vercel Environment Variables と連携）
- **Better Auth**: セキュアな認証実装
  - CSRF 保護
  - セッションセキュリティ
  - パスワードハッシュ化
- **Stripe**: PCI DSS 準拠の決済処理
- **依存関係**: Dependabot によるセキュリティアップデート
- **OWASP Top 10**: セキュリティベストプラクティスの遵守
- **CSP (Content Security Policy)**: Next.js の設定で実装

## モニタリング・ログ

### 現在導入予定なし（将来的に検討）
- **エラートラッキング**: Sentry
- **パフォーマンス監視**: Vercel Analytics
- **ログ管理**: Vercel Logs

### 開発環境でのモニタリング
- Next.js の開発サーバーのログ
- Vercel のデプロイログとランタイムログ
- Stripe Dashboard でのトランザクション確認

## テスト戦略

### 現在未定（今後導入を検討）
- **単体テスト**: Vitest または Jest
- **E2E テスト**: Playwright
- **型チェック**: TypeScript（tsc --noEmit）
- **TDD**: テスト駆動開発の採用を検討

## パフォーマンス最適化

### Next.js の標準機能
- **Image Optimization**: `next/image` による自動画像最適化
- **Font Optimization**: `next/font` による Web フォント最適化
- **Code Splitting**: 自動コード分割
- **Server Components**: サーバーサイドレンダリングによる高速化

### Vercel による最適化
- **Edge Network**: グローバル CDN
- **ISR (Incremental Static Regeneration)**: 静的ページの段階的再生成
- **Compression**: Gzip/Brotli 圧縮

### 今後の最適化検討項目
- バンドルサイズの分析と最適化
- データベースクエリの最適化（Drizzle ORM のクエリ最適化）
- キャッシュ戦略の強化

## アクセシビリティ

### shadcn/ui と Radix UI による基盤
- **Radix UI**: アクセシブルな UI プリミティブ
  - キーボードナビゲーション対応
  - スクリーンリーダー対応
  - ARIA 属性の適切な実装

### 開発方針
- セマンティック HTML の使用
- WCAG 2.1 AA レベル準拠を目指す
- カラーコントラスト比の確保
- フォーカス管理の適切な実装

## 技術選定の理由

### なぜ Next.js + TypeScript なのか？
- **フルスタック開発**: フロントエンドとバックエンドを統合
- **型安全性**: TypeScript による開発体験の向上
- **パフォーマンス**: Server Components による高速化
- **エコシステム**: React の豊富なライブラリ

### なぜ Drizzle ORM なのか？
- **型安全性**: TypeScript ファーストな設計
- **軽量**: 小さなバンドルサイズ
- **開発体験**: SQL ライクなクエリビルダー
- **Neon 対応**: サーバーレス PostgreSQL との相性が良い

### なぜ Better Auth なのか？
- **TypeScript ネイティブ**: 型安全な認証実装
- **モダン**: 最新の認証ベストプラクティス
- **柔軟性**: カスタマイズ可能な設計
- **Next.js 統合**: Server Actions との相性が良い

### なぜ shadcn/ui なのか？
- **カスタマイズ性**: コンポーネントをコピーして使用
- **アクセシビリティ**: Radix UI ベース
- **Tailwind CSS**: スタイリングの一貫性
- **型安全性**: TypeScript 完全対応

## 更新履歴

| 日付 | バージョン | 変更内容 | PR |
|------|-----------|---------|-----|
| 2025-10-31 | 1.0.0 | 初版作成 | #3 |

## 参考資料

### プロジェクトドキュメント
- [GitHub Workflow](./GITHUB_WORKFLOW.md)
- [CLAUDE.md](../CLAUDE.md)
- [ADR テンプレート](./adr/template.md)

### 公式ドキュメント
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview)
- [Better Auth Documentation](https://www.better-auth.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Neon Documentation](https://neon.tech/docs/introduction)
- [Stripe Documentation](https://stripe.com/docs)
- [Resend Documentation](https://resend.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
