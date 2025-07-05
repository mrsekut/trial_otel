# OpenTelemetry Trial Project

TypeScript + Hono + OpenTelemetry + Jaeger による分散トレーシングの学習用プロジェクトです。

## 必要な環境

- Bun
- Docker & Docker Compose

## セットアップ

### 1. 依存関係のインストール

```bash
bun install
```

### 2. Jaeger の起動

```bash
bun run jaeger:up
```

または

```bash
docker compose up -d
```

### 3. アプリケーションの起動

```bash
bun run dev
```

## 使い方

### 1. サーバーの動作確認

```bash
curl "http://localhost:3000/rolldice?rolls=12"
```

### 2. トレーシングの確認

Jaeger UI にアクセスして、分散トレーシングの結果を確認できます：

http://localhost:16686/search

## 利用可能なコマンド

- `bun run dev` - アプリケーション起動（ホットリロード）
- `bun run jaeger:up` - Jaeger コンテナ起動
