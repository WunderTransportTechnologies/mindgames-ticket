# GitHub ワークフローガイド

このドキュメントは、本プロジェクトにおけるGitHubを活用した開発フローを定義します。

## 目次

- [基本方針](#基本方針)
- [イシュー駆動開発](#イシュー駆動開発)
- [ブランチ戦略](#ブランチ戦略)
- [コミット規約](#コミット規約)
- [プルリクエスト](#プルリクエスト)
- [マージ戦略](#マージ戦略)
- [設計ドキュメント](#設計ドキュメント)
- [ラベルとマイルストーン](#ラベルとマイルストーン)

---

## 基本方針

### GitHub CLI (`gh`) を使用する

**本プロジェクトでは GitHub CLI (`gh`) を使用してイシューやPRを作成します。**

```bash
# GitHub CLI のインストール確認
gh --version

# 未インストールの場合
# macOS: brew install gh
# Windows: winget install --id GitHub.cli
# Linux: https://github.com/cli/cli#installation
```

**主な使用場面:**
- イシューの作成・確認・コメント
- PRの作成・レビュー・マージ
- リポジトリ情報の取得

### すべての作業はイシューから始める

- 機能追加、バグ修正、ドキュメント更新など、すべての作業はGitHub Issueから開始します
- 小さなタスクでも必ずイシューを作成し、作業内容を明確にします

### `git add .` と `git add -a` の使用禁止

**絶対に使用しないこと:**
```bash
# ❌ 禁止
git add .
git add -a
git add --all
```

**理由:**
- 意図しないファイル（デバッグ用のログ、一時ファイル、設定ファイルなど）の混入を防ぐため
- 各ファイルを個別に確認し、意図的にステージングする習慣を徹底する

**正しい方法:**
```bash
# ✅ 推奨
git add src/components/Login.tsx
git add src/services/auth.ts
git add tests/auth.test.ts

# または複数ファイルを明示的に指定
git add src/components/Login.tsx src/services/auth.ts tests/auth.test.ts
```

---

## イシュー駆動開発

### イシューの作成

**`gh` コマンドを使用してイシューを作成します:**

```bash
# インタラクティブにイシューを作成
gh issue create

# タイトルと本文を指定して作成
gh issue create --title "[Feature] ユーザーログイン機能" --body "ユーザー認証機能を実装する"

# テンプレートを使用して作成
gh issue create --template feature_request.md

# Webブラウザで作成
gh issue create --web
```

**イシューに含めるべき情報:**
1. 明確なタイトル
2. 作業内容の詳細説明
3. 期待される結果
4. 関連する情報（スクリーンショット、エラーログなど）

**イシューの確認:**
```bash
# イシュー一覧を表示
gh issue list

# 特定のイシューを表示
gh issue view 123

# Webブラウザで表示
gh issue view 123 --web
```

### イシューテンプレートの活用

本プロジェクトでは以下のイシューテンプレートを用意しています:
- **機能追加** (Feature Request) - `feature_request.md`
- **バグ報告** (Bug Report) - `bug_report.md`
- **ドキュメント** (Documentation) - `documentation.md`

---

## ブランチ戦略

### ブランチ保護ルール

**`main` ブランチの保護設定（必須）:**
- `main` ブランチへの直接pushを禁止
- すべての変更はプルリクエスト経由でマージ
- Approveは不要（個人開発のため0人に設定）
- マージ前にすべてのCIチェックがパスしていること（CI設定後）

### ブランチ命名規則

すべてのブランチは以下の形式で命名します:

```
<タイプ>/<イシュー番号>-<短い説明>
```

**タイプ一覧:**
- `feature/` - 新機能の開発
- `fix/` - バグ修正
- `refactor/` - リファクタリング
- `docs/` - ドキュメントの修正
- `chore/` - ビルドツールや設定の変更

**命名例:**
```bash
feature/123-add-user-login-form
fix/456-fix-header-alignment-issue
refactor/789-improve-auth-service
docs/101-update-api-documentation
chore/202-update-dependencies
```

**ブランチ作成手順:**
```bash
# 1. main ブランチを最新化
git checkout main
git pull origin main

# 2. イシュー番号を含む新しいブランチを作成
git checkout -b feature/123-add-user-login-form
```

---

## コミット規約

### Conventional Commits

本プロジェクトでは **Conventional Commits** 規約に従います。

**フォーマット:**
```
<type>(<scope>): <subject>

<body>
```

**type（必須）:**
- `feat` - 新機能
- `fix` - バグ修正
- `docs` - ドキュメントのみの変更
- `style` - コードの意味に影響しない変更（空白、フォーマットなど）
- `refactor` - バグ修正や機能追加を伴わないコード変更
- `test` - テストの追加や修正
- `chore` - ビルドプロセスやツールの変更

**scope（任意）:**
変更の範囲を示す（例: `auth`, `ui`, `api`）

**subject（必須）:**
変更内容を50文字以内で簡潔に記述

**コミットメッセージ例:**
```bash
# 良い例
git commit -m "feat(auth): ユーザーログイン機能を実装"
git commit -m "fix(ui): ダークモード時のボタン色を修正"
git commit -m "docs(readme): インストール手順を更新"
git commit -m "refactor(api): 認証サービスのコードを整理"

# より詳細な例（bodyを含む）
git commit -m "feat(auth): パスワードリセットAPIを実装

- メール送信機能を追加
- トークン生成ロジックを実装
- 有効期限チェックを追加

Closes #123"
```

**悪い例:**
```bash
# ❌ 型が不明確
git commit -m "update code"

# ❌ 説明が不十分
git commit -m "fix bug"

# ❌ 日本語のみで型がない
git commit -m "ログイン機能追加"
```

### コミットの粒度

- **1コミット = 1つの論理的な変更**
- 複数の無関係な変更を1つのコミットにまとめない
- コミット履歴を見て、各変更の目的が明確に分かるようにする

---

## プルリクエスト

### PRの作成基準

**適切なPRサイズ:**
- 変更行数: 目安として200〜400行以内
- レビュー時間: 30分以内でレビュー可能なサイズ
- 1PR = 1つの機能または1つのバグ修正

**大きな機能を実装する場合:**
- 複数のPRに分割する
- 各PRは独立してレビュー・マージ可能にする

### PRテンプレートの活用

PRを作成する際は、必ず `.github/pull_request_template.md` のチェックリストに従ってください。

**最低限含めるべき情報:**
1. **関連イシュー** - `Closes #123` 形式で記載
2. **変更の概要** - 何を変更したか、なぜ変更したか
3. **テスト方法** - レビュワーがどう動作確認するか
4. **スクリーンショット** - UIの変更がある場合は必須
5. **セルフチェックリスト** - マージ前に自分で確認

### PRの作成手順

**`gh` コマンドを使用してPRを作成します:**

```bash
# 1. 変更をコミット
git add src/components/Login.tsx
git commit -m "feat(auth): ログインフォームのUIを実装"

# 2. リモートにプッシュ
git push origin feature/123-add-user-login-form

# 3. gh コマンドでPRを作成
gh pr create

# または、タイトルと本文を指定して作成
gh pr create --title "feat(auth): ユーザーログイン機能を実装" --body "Closes #123"

# Webブラウザで作成（PRテンプレートを埋める）
gh pr create --web

# PRテンプレートを使って埋める
gh pr create --fill
```

**PRの確認とレビュー:**
```bash
# PR一覧を表示
gh pr list

# 特定のPRを表示
gh pr view 123

# PRの差分を確認
gh pr diff 123

# PRをWebブラウザで表示
gh pr view 123 --web

# PRをチェックアウト（ローカルでレビュー）
gh pr checkout 123
```

**PRのマージ:**
```bash
# Squash and merge
gh pr merge 123 --squash

# マージ確認を自動承認
gh pr merge 123 --squash --auto
```

### レビュープロセス

**レビュワーの責任:**
- 24時間以内にレビューを開始する
- コードの品質、ロジック、テストを確認
- 建設的なフィードバックを提供

**レビューコメントの例:**
```markdown
# ✅ 良いコメント
この実装だとNユーザーが増えた際にパフォーマンス問題が起きる可能性があります。
キャッシュを導入するか、ページネーションを検討してはどうでしょうか？

# ❌ 避けるべきコメント
このコードはダメです。
```

---

## マージ戦略

### Squash and Merge（推奨）

**本プロジェクトでは Squash and Merge を採用します。**

**設定方法:**
1. GitHubリポジトリ設定 > "Pull Requests"
2. "Allow squash merging" のみをONにする
3. "Allow merge commits" と "Allow rebase merging" はOFFにする

**理由:**
- `main` ブランチの履歴がクリーンになる
- 1PR = 1コミット で機能単位の履歴が追える
- コミット履歴が読みやすく、`git log` が有用になる

**マージ時のコミットメッセージ:**
```
feat(auth): ユーザーログイン機能を実装 (#123)

- ログインフォームのUIを実装
- 認証APIとの連携を実装
- エラーハンドリングを追加
```

---

## 設計ドキュメント

### ADR (Architecture Decision Records)

**重要な技術的決定は必ずADRとして記録します。**

### PRと設計ドキュメントの関係

**ルール:**
- **1つのPRに対して1つの設計ドキュメントを作成**
- 設計ドキュメントのファイル名には **PRナンバーを含める**

**ファイル命名規則:**
```
docs/adr/YYYY-MM-DD-<PR番号>-<タイトル>.md
```

**例:**
```
docs/adr/2025-10-31-123-implement-user-authentication.md
docs/adr/2025-11-05-124-introduce-react-query.md
docs/adr/2025-11-10-125-migrate-to-typescript.md
```

### ADRのテンプレート

ADRの作成には `docs/adr/template.md` を使用してください。

**含めるべき内容:**
- **ステータス** - Proposed / Accepted / Deprecated
- **コンテキスト** - なぜこの決定が必要か
- **決定内容** - 何を決定したか
- **結果** - この決定により何が得られるか、トレードオフは何か
- **関連PR** - `#123` 形式でPRを参照

---

## ラベルとマイルストーン

### 推奨ラベル

以下のラベルを活用してイシューとPRを分類します:

**種類:**
- `enhancement` - 新機能
- `bug` - バグ
- `documentation` - ドキュメント
- `refactoring` - リファクタリング

**優先度:**
- `priority: high` - 高優先度
- `priority: medium` - 中優先度
- `priority: low` - 低優先度

**ステータス:**
- `status: ready` - 着手可能
- `status: in-progress` - 作業中
- `status: blocked` - ブロックされている

**その他:**
- `good first issue` - 初心者向け
- `help wanted` - 協力者募集

### マイルストーン

リリースやスプリント単位でマイルストーンを作成し、関連するイシューをまとめます。

**例:**
- `v1.0.0 Release`
- `Sprint 2024-11`
- `Q1 2025`

---

## ペンディング項目

以下の項目は将来的に導入を検討します:

- **CODEOWNERS** - 特定ファイルの自動レビュワー割り当て
- **CI/CD自動チェック** - Lint、テスト、フォーマットの自動実行

---

## 参考リンク

- [GitHub CLI (gh)](https://cli.github.com/)
- [GitHub CLI Manual](https://cli.github.com/manual/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow)
- [Architecture Decision Records (ADR)](https://adr.github.io/)
