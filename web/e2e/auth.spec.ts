import { expect, test } from "@playwright/test";

test.describe("ログイン", () => {
  test("未ログインで画面を開くとログイン画面へ移動する", async ({ page }) => {
    await page.goto("/collab/recruitment");
    await expect(page).toHaveURL(/\/login$/);
    await expect(page).toHaveTitle("ログイン | musiqul");
    await expect(page.getByRole("heading", { level: 1, name: "ログイン" })).toBeVisible();
  });

  test("未入力で送信すると、項目ごとにエラーを表示する", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "ログイン" }).click();
    await expect(page.getByText("メールアドレスを入力してください")).toBeVisible();
    await expect(page.getByText("パスワードを入力してください")).toBeVisible();
  });

  test("メールアドレスとパスワードが正しくないとエラーを表示する", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("メールアドレス", { exact: true }).fill("nobody@example.com");
    await page.getByLabel("パスワード", { exact: true }).fill("wrong-password");
    await page.getByRole("button", { name: "ログイン" }).click();
    await expect(page.getByText("メールアドレスまたはパスワードが正しくありません。")).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
  });
});
