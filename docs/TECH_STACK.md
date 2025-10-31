# テックスタック

このドキュメントでは、プロジェクトで使用する技術スタックを定義します。

## 概要

本プロジェクトは、GitHub を活用した開発ワークフローとプロジェクト管理の基盤を提供するリポジトリです。

## フロントエンド

### 現在の状態
- まだ実装されていません

### 今後の検討技術
- **UI フレームワーク**: React / Vue.js / Next.js
- **スタイリング**: Tailwind CSS / styled-components
- **状態管理**: Redux / Zustand / Recoil
- **TypeScript**: 型安全性の確保

## バックエンド

### 現在の状態
- まだ実装されていません

### 今後の検討技術
- **言語**: Node.js / Python / Go
- **フレームワーク**: Express / FastAPI / Gin
- **データベース**: PostgreSQL / MySQL / MongoDB
- **ORM**: Prisma / TypeORM / SQLAlchemy

## インフラ・デプロイ

### Git ホスティング
- **GitHub**: ソースコード管理、Issue 管理、PR レビュー
- **GitHub CLI**: `gh` コマンドによる操作の標準化

### CI/CD
- **GitHub Actions**: 自動テスト、ビルド、デプロイ（今後導入予定）

### ホスティング（検討中）
- Vercel / Netlify（フロントエンド）
- AWS / GCP / Azure（バックエンド）
- Heroku / Railway / Render（フルスタック）

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
#### 今後導入予定
- **Linter**: ESLint / Pylint
- **Formatter**: Prettier / Black
- **型チェック**: TypeScript / mypy
- **テスティング**: Jest / pytest / Vitest

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

## セキュリティ

### 認証・認可（今後実装予定）
- OAuth 2.0 / JWT
- セッション管理
- RBAC (Role-Based Access Control)

### セキュリティ対策
- **環境変数**: `.env` ファイルで秘密情報を管理
- **依存関係**: Dependabot によるセキュリティアップデート
- **OWASP Top 10**: セキュリティベストプラクティスの遵守

## モニタリング・ログ（今後導入予定）

- **エラートラッキング**: Sentry / Rollbar
- **ログ管理**: CloudWatch / Datadog
- **パフォーマンス**: Lighthouse / Web Vitals

## テスト戦略（今後導入予定）

- **単体テスト**: Jest / pytest
- **統合テスト**: Supertest / pytest
- **E2E テスト**: Playwright / Cypress
- **TDD**: テスト駆動開発の採用

## パフォーマンス最適化（今後検討）

- バンドルサイズの最適化
- 画像最適化
- キャッシュ戦略
- CDN の活用

## アクセシビリティ（今後検討）

- WCAG 2.1 準拠
- セマンティック HTML
- ARIA 属性の適切な使用
- キーボードナビゲーション

## 更新履歴

| 日付 | バージョン | 変更内容 | PR |
|------|-----------|---------|-----|
| 2025-10-31 | 1.0.0 | 初版作成 | #3 |

## 参考資料

- [GitHub Workflow](./GITHUB_WORKFLOW.md)
- [CLAUDE.md](../CLAUDE.md)
- [ADR テンプレート](./adr/template.md)
