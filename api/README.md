# musiqul-api

musiqul のバックエンドです。Kotlin と Spring Boot（WebFlux）で作り、ドメイン駆動設計（DDD）のレイヤー構成と、コマンドとクエリを分ける構成（CQRS）を採用しています。

| 対象 | バージョン |
|---|---|
| Java（toolchain） | 25 |
| Kotlin | 2.4 |
| Spring Boot | 4.2（Spring Framework 7、Spring Security 7、Jackson 3） |
| jOOQ | 3.21（`nu.studer.jooq` プラグインでコード生成） |
| Gradle | 9.9（wrapper） |
| テスト | JUnit 6、mockito-kotlin、Testcontainers 2 |
| フォーマッタ | Spotless + ktlint |

## 起動

通常はリポジトリのルートで `make dev` を実行し、コンテナ（`api`）で起動します（http://localhost:34962）。

ホストで直接起動する場合は、コンテナの api を止めてから、web が呼び出すポート（34962）で起動します。

```shell
docker compose stop api
cd api && SERVER_PORT=34962 ./gradlew bootRun --args='--spring.profiles.active=local'
```

`local` プロファイル（`application-local.properties`）は `localhost:34961` の DB に接続します。コンテナでは `DATASOURCE_URL` などの環境変数で接続先を指定しています（`application.properties`）。

## API

| メソッド | パス | 認証 | 内容 |
|---|---|---|---|
| POST | `/api/login` | 不要 | ログイン。ボディは `{ loginId, password }`（loginId はメールアドレス）。成功するとセッションを作り、CSRF トークン `{ headerName, token }` を返す。失敗は 401 |
| POST | `/api/logout` | 必要 | ログアウト（セッションを破棄） |
| POST | `/api/recruitments` | 必要 | 募集を作成し、`{ id }` を返す。オーナーはログイン中のプレイヤー |

- API のパスは `/api` で始めます
- 認証はセッション（Cookie）です。`/api/login` 以外の状態を変更するリクエストには、ログイン時に受け取った CSRF トークンを `headerName` のヘッダー（`X-CSRF-TOKEN`）で付けます
- 未認証のリクエストは 401 を返します
- CORS は web（`http://localhost:34963`）からのリクエストだけを許可しています（`WebConfig`）

## パッケージ構成

```
msq.musiqulapi
├── presentation     コントローラー、リクエストとレスポンスの DTO、認証・セキュリティの設定
├── application      ユースケース（アプリケーションサービス）
│   ├── command      状態を変更するユースケース（募集の作成など）
│   ├── query        参照用のユースケースとリードモデル
│   └── eventhandler ドメインイベントを受けて行う処理
├── domain           ドメインモデル（集約、値オブジェクト、ドメインイベント、リポジトリのインターフェース）
├── infrastructure   リポジトリの実装（jOOQ）、Bean の設定
│   ├── command      集約の保存
│   ├── query        リードモデルの保存と参照
│   └── mapper       テーブルごとの SQL
└── lib              レイヤーに依存しない汎用の型（IdFactory、NonEmptyMap など）
```

### 依存のルール

- **domain は他のレイヤーに依存しない**。リポジトリはインターフェースだけを domain に置き、infrastructure で実装する
- **presentation と application ではプリミティブな型を使い、ドメインの型を外に出さない**。presentation はリクエストを application の Input（`RecruitCommandInput` など）に変換し、application がドメインの値オブジェクトに変換する
- **入力の検証**：Kotlin の非 null 型と jackson-module-kotlin で、必須の項目が欠けたリクエストを受け付けた時点で拒否します。値の制約（文字数の上限など）は domain の値オブジェクトが `init` / `require` で検証します
- **ドメインイベント**：集約は発生したイベントを `occurredEvents` に持ち、アプリケーションサービスが保存後に `ApplicationEventPublisher` で発行します。クエリ側のプロジェクター（`CollabForSearchProjector`）がイベントを受けてリードモデルを更新します

### データベース

- コマンド側のテーブルは `musiqul_command` スキーマ、リードモデルは `musiqul_query` スキーマにあります（マイグレーションは `db/migration`）
- 募集の作成では、`RecruitmentRepositoryImpl` が `musiqul_command` の募集のテーブル群に保存します

## jOOQ のコード生成

jOOQ のクラスは、起動中の DB（`localhost:34961`）のスキーマ `musiqul_command` から生成します。

```shell
make jooq-generate   # cd api && ./gradlew generateJooq
```

- 出力先は `jooq/generated-src/jooq/main`、パッケージは `nu.studer.sample` です。Git では管理していません
- マイグレーションを追加・変更したら、`make migrate-up` のあとに実行します（`make db-reset` は生成まで行います）
- 接続先などの設定は `gradle.properties` の `jooq.*` です
- jOOQ のランタイムとコード生成のバージョンは `build.gradle.kts` の `jooqVersion` で揃えています（Spring Boot の BOM のバージョンも上書きしています）

## テストとフォーマット

```shell
./gradlew test            # テスト（MusiqulApiApplicationTests は Testcontainers で PostgreSQL を起動するので Docker が必要）
./gradlew spotlessApply   # ktlint で整形
./gradlew build           # コンパイル、spotlessCheck、テスト
```

- ktlint のルールは `build.gradle.kts` の `spotless` にあります（インデント 2、1 行 100 文字まで）
- `CreateRecruitmentController.kt` は整形の対象外にしています

## 実装中の機能

次の機能は準備だけしてあり、まだ API からは使っていません。

- 募集の編集・締め切り：`Recruitment.edit` / `close`、`EditRecruitmentCommandService`、`RecruitmentRepository.findById`
- 募集一覧のリードモデル：`application/query/colab/collab_for_search`、`infrastructure/query`（保存処理は未実装）
- 募集の詳細の参照：`RecruitmentFindQueryService`
- 募集作成時の X への投稿：`RecruitmentSender`
- プレイヤー：`Player` 集約
