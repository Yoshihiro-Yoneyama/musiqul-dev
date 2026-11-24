import { expect, test, type Page } from "@playwright/test";

const email = process.env.E2E_LOGIN_EMAIL;
const password = process.env.E2E_LOGIN_PASSWORD;

test.skip(!email || !password, "E2E_LOGIN_EMAIL と E2E_LOGIN_PASSWORD を指定したときだけ実行する");

async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("メールアドレス", { exact: true }).fill(email!);
  await page.getByLabel("パスワード", { exact: true }).fill(password!);
  await page.getByRole("button", { name: "ログイン" }).click();
  await expect(page).toHaveURL(/\/$/);
}

test("募集を入力・確認して作成し、ログアウトできる", async ({ page }) => {
  await login(page);
  await expect(page).toHaveTitle("ホーム | musiqul");

  await page
    .getByRole("navigation", { name: "メインメニュー" })
    .getByRole("link", { name: "募集を作成" })
    .click();
  await expect(page).toHaveTitle("募集を作成 | musiqul");

  // 必須項目が空のまま送信するとエラーになる
  await page.getByRole("button", { name: "確認画面へ" }).click();
  await expect(page.getByText("募集名を入力してください")).toBeVisible();
  await expect(page.getByText("募集する楽器の人数を1つ以上入力してください")).toBeVisible();
  await expect(page.getByText("締め切りを入力してください")).toBeVisible();

  await page.getByRole("textbox", { name: "募集名", exact: true }).fill("E2E テストの募集");
  await page.getByRole("textbox", { name: "曲名", exact: true }).fill("テストの曲");
  await page.getByRole("group", { name: "ジャンル" }).getByLabel("ロック").check();
  await page.getByRole("group", { name: "あなたの担当楽器" }).getByLabel("ギター").check();
  await page.getByRole("group", { name: /募集する楽器と人数/ }).getByLabel("ドラム").fill("1");
  await page.getByRole("group", { name: "募集する年代" }).getByLabel("20代").check();
  await page.getByRole("textbox", { name: "締め切り", exact: true }).fill("2099-12-31T18:00");
  await page.getByRole("textbox", { name: "メモ", exact: true }).fill("よろしくお願いします");
  await page.getByRole("button", { name: "確認画面へ" }).click();

  await expect(page).toHaveTitle("募集内容の確認 | musiqul");
  await expect(page.getByText("E2E テストの募集")).toBeVisible();
  await expect(page.getByText("ドラム 1人")).toBeVisible();

  // 「修正する」で戻ると入力内容が残っている
  await page.getByRole("link", { name: "修正する" }).click();
  await expect(page.getByRole("textbox", { name: "募集名", exact: true })).toHaveValue("E2E テストの募集");
  await page.getByRole("button", { name: "確認画面へ" }).click();

  await page.getByRole("button", { name: "この内容で作成する" }).click();
  await expect(page.getByText("募集を作成しました。")).toBeVisible();

  await page.getByRole("button", { name: "ログアウト" }).click();
  await expect(page).toHaveURL(/\/login$/);
});
