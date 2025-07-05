# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

- **Purpose**: OpenTelemetry (OTEL) trial project for learning distributed tracing
- **Language**: TypeScript with strict mode enabled
- **Runtime**: Bun (not Node.js)
- **Main Features**: OpenTelemetry instrumentation, distributed tracing
- **Planned integrations**: Hono (web framework), Jaeger (tracing), GraphQL (API)

## Development Commands

- **Install dependencies**: `bun install`
- **Run the application**: `bun run index.ts` or `bun index.ts`
- **Run tests**: `bun test`
- **Type check**: `bunx tsc --noEmit`
- **Hot reload**: `bun --hot ./index.ts`

## TypeScript コーディングルール

### 基本原則

- 型定義は interface ではなく、type を使用する
- for よりも map や filter などの関数型メソッドを優先して使用する
- 変数の宣言には const のみを使用する
- 外部で使われていない場合は export しない
- 使用していない import や変数や関数などは削除
- class は使用せず、関数を使用する

### インポート・エクスポート

- ES Modules 使用時は .js 拡張子を明示してインポート
- 相対パス指定時は一貫したベースパスを使用
- デフォルトエクスポートよりも名前付きエクスポートを優先

### 型安全性

- any 型の使用を避け、適切な型定義を行う
- オプショナル型は `?:` を使用
- Union types で状態を明確に表現
- 配列アクセス時は bounds check を実装

### エラーハンドリング

- Promise ベースの処理では適切な catch を実装
- 型ガードを使用して実行時型チェックを行う
- Error 型を継承したカスタムエラークラスを定義

## General Coding Practices

### 原則

- 純粋関数を優先
- 不変データ構造を使用
- 副作用を分離
- 型安全性を確保
- 過度な抽象化を避ける
- コードよりも型を重視
- 使用していない変数、関数、import、ライブラリ、ファイルは削除
- 先を見越して過剰な method を先に定義しない

### 実装手順

1. **型設計** - まず型を定義し、ドメインの言語を型で表現
2. **純粋関数から実装** - 外部依存のない関数を先に、テストを先に書く
3. **副作用を分離** - IO 操作は関数の境界に押し出す
4. **アダプター実装** - 外部サービスや DB へのアクセスを抽象化

### ディレクトリ構成 (Package by Feature)

機能単位でコードを整理し、関連するファイルをすべて同じディレクトリにまとめる:

```
src/
  features/
    auth/
      LoginForm.tsx
      useLogin.ts
      service.ts
      types.ts
      test.ts
    user/
      UserProfile.tsx
      useUserProfile.ts
      service.ts
      types.ts
      test.ts
```

原則として components, hooks, services, types, tests などの技術単位のディレクトリは作成しない。

### コードスタイル

- 基本的に関数で実装し、class は一切使用しない
- main 関数を上部に配置
- 関数を小さく分割し、一つの関数の内部は抽象度が揃った可読性の高いコードにする
- 早期リターンで条件分岐をフラット化

### MVP を重視する実装方針

- MVP の作成を重視し、その後段階的に拡張する
- 優先順位を判断して実装方針を提案する
- ユーザに確認を促す前に自分で動作確認やレビューを行う

## Git Practices

### コミットの作成

- できるだけ小さい粒度で commit を作成する
- commit 前に、format, lint, typecheck, test を実行する
- 「なぜ」に焦点を当てたコミットメッセージを作成
- 関係ないファイルは含めない
- 空のコミットは作成しない
- git 設定は変更しない

### コミットメッセージの例

```bash
# 新機能の追加
feat: エラー処理の導入

# 既存機能の改善
update: キャッシュ機能のパフォーマンス改善

# バグ修正
fix: 認証トークンの期限切れ処理を修正

# リファクタリング
refactor: Adapterパターンを使用して外部依存を抽象化

# テスト追加
test: エラーケースのテストを追加

# ドキュメント更新
docs: エラー処理のベストプラクティスを追加
```

## Bun-Specific Guidelines

### コマンド使用法

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>`
- Bun automatically loads .env, so don't use dotenv

### Bun APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`
- `Bun.redis` for Redis. Don't use `ioredis`
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`
- `WebSocket` is built-in. Don't use `ws`
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa

### Testing with Bun

```ts
import { test, expect } from "bun:test";

test("hello world", () => {
	expect(1).toBe(1);
});
```

## OpenTelemetry Integration Guidelines

When implementing OpenTelemetry:

- Use OpenTelemetry SDK for JavaScript/TypeScript
- Configure exporters for Jaeger when setting up distributed tracing
- Instrument Hono routes for automatic span creation
- Consider using auto-instrumentation packages where available
- Implement proper context propagation for distributed tracing
- Use semantic conventions for span attributes

## GraphQL Integration Guidelines

When adding GraphQL:

- Consider using GraphQL Yoga or similar Bun-compatible GraphQL server
- Ensure OpenTelemetry instrumentation is added to GraphQL resolvers
- Use DataLoader pattern for efficient data fetching
- Implement proper error handling and type safety

## Project Structure

Currently minimal - expand as needed following Package by Feature pattern:

- `index.ts` - Main entry point
- Future structure should use `src/features/` organization
- Each feature should contain all related files (components, types, tests, etc.)

## Security Considerations

- Never commit secrets or API keys to the repository
- Use environment variables for sensitive configuration
- Validate all external inputs
- Implement proper authentication and authorization when needed

## Testing Strategy

- 純粋関数の単体テストを優先
- インメモリ実装によるリポジトリテスト
- テスト可能性を設計に組み込む
- アサートファースト：期待結果から逆算
- Red-Green-Refactor サイクルで TDD を実践

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.
