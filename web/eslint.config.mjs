import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import storybook from "eslint-plugin-storybook";

export default defineConfig([
  ...nextVitals,
  ...storybook.configs["flat/recommended"],
  {
    // app/ と proxy.ts は Next.js のルーティング定義だけを置く（README のルール 5）。
    // 許すのは src/ からの再エクスポートと、Next.js が静的解析で読む設定値（リテラル）だけ
    files: ["app/**/*.{ts,tsx}", "proxy.ts"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: [
            "Program > :not(",
            "ExportNamedDeclaration[source],",
            "ExportNamedDeclaration",
            "[declaration.kind='const']",
            "[declaration.declarations.length=1]",
            "[declaration.declarations.0.id.name=/^(dynamic|dynamicParams|revalidate|fetchCache|runtime|preferredRegion|maxDuration|config)$/]",
            "[declaration.declarations.0.init.type=/^(Literal|ArrayExpression|ObjectExpression)$/]",
            ")",
          ].join(""),
          message:
            "app/ には src/ からの再エクスポートと Route Segment Config（リテラル）だけを書く。実装は src/ の FSD レイヤーに置く（web/README.md のルール 5）",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    "playwright-report/**",
    "test-results/**",
  ]),
]);
