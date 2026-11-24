# db

| 対象 | バージョン |
|---|---|
| PostgreSQL | 19（`postgres:19-alpine`） |
| Flyway | 13（`flyway/flyway:13`、OSS Edition） |

- Flyway の設定は `db/conf/flyway.toml`（TOML 形式）です。compose で `/flyway/conf` にマウントしており、Flyway が自動で読み込みます
- マイグレーションは `db/migration`（`/flyway/sql` にマウント）に置きます。適用済みのファイルの中身はチェックサムが変わるため変更しないでください
- Flyway 13.13 は「PostgreSQL 19.0 は検証済みのバージョン（18）より新しい」という警告を表示しますが、動作に問題はありません

## マイグレーション

マイグレーション実行
```shell
docker compose run --rm flyway migrate   # make migrate-up
```

マイグレーションファイルの確認
```shell
docker compose run --rm flyway info      # make migrate-info
```

適用済みのマイグレーションの検証
```shell
docker compose run --rm flyway validate  # make migrate-validate
```

DBのclean
```shell
docker compose run --rm flyway clean     # make migrate-clean
```

> `clean` が削除するのは Flyway の管理スキーマ（`flyway`、スキーマ履歴テーブルを含む）だけです。
> マイグレーションで作成した `musiqul_command` と `musiqul_query` は残るため、clean のあとに migrate すると
> `schema "musiqul_command" already exists` で失敗します。DB を作り直すときは `make db-reset` を使ってください。

## DB の作り直し

```shell
make db-reset
```

db コンテナとボリューム `db-data` を削除して作り直し、マイグレーションを適用して jOOQ のクラスを再生成します。

## PostgreSQL のメジャーバージョンを上げるとき（16 → 19 など）

PostgreSQL のデータファイルはメジャーバージョン間で互換性がないため、古いバージョンで作ったボリューム `db-data` のままでは新しいイメージは起動しません。
また、PostgreSQL 18 以降の公式イメージはボリュームのマウント先が `/var/lib/postgresql/data` から `/var/lib/postgresql` に変わり、データは `/var/lib/postgresql/<メジャーバージョン>/docker` に置かれます。
古いボリュームのまま起動すると、db コンテナは次のエラーを出して起動に失敗します（`restart: unless-stopped` のため再起動を繰り返します）。

```
Error: in 18+, these Docker images are configured to store database data in a
       format which is compatible with "pg_ctlcluster" ...
       Counter to that, there appears to be PostgreSQL data in:
         /var/lib/postgresql
```

次のどちらかの手順で移行してください。

### A. 作り直す（推奨。データがマイグレーションだけのとき）

```shell
make db-reset
```

`make db-reset` は古い db コンテナとボリュームを削除するため、新しいイメージで空の DB を作り直し、V1 から順にマイグレーションを適用します。

### B. データを残す（dump して restore する）

データを残したいときは、**イメージを更新する前に**（古い db コンテナが動いている状態で）dump を取ります。

```shell
# 1. 古いバージョンの db コンテナが動いている状態で dump する（既定の出力先は ./msqdb-backup.sql。コミットしないこと）
make db-dump

# 2. db コンテナと古いボリュームを削除する
docker compose rm -s -f db
docker volume rm db-data

# 3. 新しいバージョンの db を起動する
docker compose up -d --wait db

# 4. dump を restore する（スキーマ履歴テーブルも復元されるため、migrate は不要）
make db-restore

# 5. 確認する
make migrate-validate
make migrate-info
```

出力先は `make db-dump DUMP_FILE=/path/to/file.sql` のように変更できます（`db-restore` も同じ）。
