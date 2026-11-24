#!/usr/bin/env bash
# db/seed/ の CSV をローカルの DB に投入する（make db-seed / make db-reset から呼ばれる）
#
# - ファイル名は <順番>_<スキーマ>.<テーブル>.csv。名前順に投入するので、外部キーの参照先を先にする
# - 1 行目はヘッダー（列名）。ヘッダーの列だけを投入し、それ以外の列はテーブルの既定値になる
# - すべてのファイルを 1 つのトランザクションで投入し、1 件でも失敗したら何も投入しない
set -euo pipefail

SEED_DIR="$(cd "$(dirname "$0")/seed" && pwd)"
shopt -s nullglob
files=("$SEED_DIR"/*.csv)
if [ ${#files[@]} -eq 0 ]; then
  echo "No seed files in $SEED_DIR"
  exit 0
fi

{
  for file in "${files[@]}"; do
    name="$(basename "$file" .csv)"
    table="${name#*_}"   # 先頭の「<順番>_」を除く
    columns="$(head -n 1 "$file" | tr -d '\r')"
    echo "\\echo Loading ${table}"
    # HEADER MATCH：CSV のヘッダーが列名の並びと一致しない場合はエラーにする
    echo "\\copy ${table} (${columns}) FROM '/seed/$(basename "$file")' WITH (FORMAT csv, HEADER MATCH)"
  done
} | docker compose exec -T db psql -v ON_ERROR_STOP=1 --single-transaction -U pgadmin -d msqdb -f -
