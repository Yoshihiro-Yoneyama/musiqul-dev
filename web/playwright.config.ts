import { defineConfig, devices } from "@playwright/test";

/**
 * E2E テスト。`make dev`（docker compose）で web・api・db を起動してから実行する。
 * ログインが必要なテストは E2E_LOGIN_EMAIL / E2E_LOGIN_PASSWORD を指定したときだけ実行する。
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: process.env.E2E_BASE_URL ?? "http://localhost:34963",
    locale: "ja-JP",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
