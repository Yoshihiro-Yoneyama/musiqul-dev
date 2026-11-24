import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

// Feature-Sliced Design のルールを検査する（npm run lint:fsd）
export default defineConfig([
  ...fsd.configs.recommended,
  {
    // 募集（recruitment）はサービスの中心となるドメインの概念で、今後の一覧・詳細・応募でも使うため、
    // 参照元が 1 つでも entities に置く
    files: ["./src/entities/recruitment/**"],
    rules: { "fsd/insignificant-slice": "off" },
  },
]);
