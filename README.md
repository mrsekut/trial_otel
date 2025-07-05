# OpenTelemetry Trial Project

TypeScript + Hono + GraphQL + OpenTelemetry + Jaeger による分散トレーシングの学習用プロジェクトです。

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

### 3. アプリケーションの起動

```bash
bun run dev
```

## 使い方

### 1. GraphQL の動作確認

#### GraphiQL インターフェース

ブラウザで以下にアクセス：

http://localhost:3000/graphql

#### サンプルクエリ

```graphql
# シンプルなクエリ
query {
  hello
  rollTheDice(rolls: 5, min: 1, max: 6)
}

# ネストしたクエリ
query {
  player(id: "1") {
    name
    level
    stats {
      health
      mana
      rollAbilityCheck(skill: "strength")
    }
    games {
      name
      currentRound
      rollInitiative {
        player {
          name
        }
        roll
      }
    }
  }
}

# 複数のプレイヤー
query {
  players {
    name
    level
    stats {
      health
      strength
    }
  }
}
```

#### cURL での実行例

```bash
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ rollTheDice(rolls: 3, min: 1, max: 6) }"}'
```

### 2. トレーシングの確認

Jaeger UI にアクセスして、分散トレーシングの結果を確認できます：

http://localhost:16686/search

## 利用可能なプレイヤー ID

- `1` - Aragorn
- `2` - Gandalf
- `3` - Legolas

## 利用可能なゲーム ID

- `1` - The Fellowship Quest
- `2` - Battle of Helm's Deep
