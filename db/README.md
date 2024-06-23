マイグレーション実行
```shell
docker compose run --rm flyway migrate
```

マイグレーションファイルの確認
```shell
docker compose run --rm flyway info
```

DBのclean
```shell
docker compose run --rm flyway clean
```