"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { routes } from "@/shared/config";
import { Button } from "@/shared/ui/button";
import { logout } from "../api/logout";

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      try {
        await logout();
      } catch {
        // セッションが切れているなどで失敗しても、ログイン画面へ戻す
      }
      router.replace(routes.login);
    });
  }

  return (
    <Button variant="ghost" size="sm" onClick={handleClick} disabled={isPending}>
      ログアウト
    </Button>
  );
}
