"use client";

import { useRouter } from "next/navigation";
import { LoginForm } from "@/features/auth/login/ui/LoginForm";
import * as styles from "./LoginPage.css";

export function LoginPage() {
  const router = useRouter();

  const handleLoginSuccess = () => {
    router.push("/");
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <div className={styles.heading}>
          <h1 className={styles.title}>ログイン</h1>
          <span className={styles.accentBar} />
        </div>
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>
    </main>
  );
}

export default LoginPage;
