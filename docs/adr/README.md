# Architecture Decision Records (ADR)

このディレクトリには、プロジェクトにおける重要な技術的決定を記録したADR（Architecture Decision Records）を保管します。

## ADRとは

ADRは、プロジェクトにおいて行われた重要なアーキテクチャや技術選定の決定を文書化したものです。

**記録する理由:**
- なぜその技術・手法を選んだのか、将来の開発者が理解できる
- 決定時のコンテキストを保持し、後から「なぜこうなっているのか」を追跡可能にする
- 同じ議論を繰り返さないための記録

## ADRの作成タイミング

以下のような場合にADRを作成します:

- 新しい技術スタックやライブラリの導入
- アーキテクチャパターンの選択
- 重要な設計方針の決定
- パフォーマンス・セキュリティに関わる重要な判断
- 既存の決定を変更・非推奨にする場合

**重要:** 1つのPRに対して1つのADRを作成します。

## 命名規則

```
YYYY-MM-DD-<PR番号>-<タイトル>.md
```

**例:**
```
2025-10-31-123-implement-user-authentication.md
2025-11-05-124-introduce-react-query.md
2025-11-10-125-migrate-to-typescript.md
```

## ADRの作成方法

1. **テンプレートをコピー:**
   ```bash
   cp docs/adr/template.md docs/adr/2025-10-31-123-your-decision.md
   ```

2. **内容を記入:**
   - ステータス（Proposed / Accepted / Deprecated）
   - コンテキスト（なぜこの決定が必要か）
   - 検討した選択肢（複数の選択肢とそれぞれのメリット・デメリット）
   - 決定内容（何を選択したか、その理由）
   - 結果（期待される効果、トレードオフ、リスク）
   - 関連PR番号

3. **PRと一緒にコミット:**
   ```bash
   git add docs/adr/2025-10-31-123-your-decision.md
   git commit -m "docs(adr): ユーザー認証方式の決定を記録"
   ```

## ADRのライフサイクル

### Proposed（提案中）
- 決定内容をレビュー中
- PR作成時の初期ステータス

### Accepted（承認済み）
- PRがマージされ、決定が確定
- このステータスのADRに従って実装を進める

### Deprecated（非推奨）
- 後続の決定により非推奨となった
- 理由と代替案を記載

### Superseded（置き換え）
- 別のADRにより置き換えられた
- 新しいADR番号を記載

## ADRの更新

ADR自体は基本的に**変更しません**（歴史的記録のため）。

決定を変更する場合:
1. 新しいADRを作成
2. 古いADRのステータスを「Superseded by ADR-XXX」に変更
3. 新しいADRに古いADRへの参照を記載

## ADR一覧

<!-- 新しいADRを追加したら、以下に追記してください -->

| 日付 | ADR番号 | タイトル | ステータス | 関連PR |
|------|---------|---------|-----------|--------|
| YYYY-MM-DD | 001 | タイトル | Accepted | #123 |

## 参考資料

- [ADR GitHub](https://adr.github.io/)
- [Architecture Decision Records (Joel Parker Henderson)](https://github.com/joelparkerhenderson/architecture-decision-record)
