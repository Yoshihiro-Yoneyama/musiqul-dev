import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";
import { Card } from "@/shared/ui/card";
import { Heading } from "@/shared/ui/heading";
import { Stack } from "@/shared/ui/stack";
import * as styles from "./LoginPage.css";

export const metadata: Metadata = { title: "ログイン" };

export function LoginPage() {
  return (
    <main className={styles.root}>
      <Card className={styles.card}>
        <Stack gap="5">
          <p className={styles.brand}>musiqul</p>
          <Heading level={1}>ログイン</Heading>
          <LoginForm />
        </Stack>
      </Card>
    </main>
  );
}
