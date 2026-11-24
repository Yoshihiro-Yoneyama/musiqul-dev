"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition, type FormEvent } from "react";
import { NetworkError, UnauthorizedError } from "@/shared/api";
import { routes } from "@/shared/config";
import { toFieldErrors, type FieldErrors } from "@/shared/lib";
import { Alert } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { Stack } from "@/shared/ui/stack";
import { TextInput } from "@/shared/ui/text-input";
import { login } from "../api/login";
import { credentialsSchema, type Credentials } from "../model/credentials";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<Credentials>>({});
  const [formError, setFormError] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = credentialsSchema.safeParse({
      email: formData.get("email") ?? "",
      password: formData.get("password") ?? "",
    });
    setFormError(null);
    if (!result.success) {
      setFieldErrors(toFieldErrors(result.error));
      return;
    }
    setFieldErrors({});

    startTransition(async () => {
      try {
        await login(result.data);
        router.replace(routes.home);
      } catch (error) {
        if (error instanceof UnauthorizedError) {
          setFormError("メールアドレスまたはパスワードが正しくありません。");
        } else if (error instanceof NetworkError) {
          setFormError("サーバーに接続できませんでした。時間をおいて再度お試しください。");
        } else {
          setFormError("ログインに失敗しました。時間をおいて再度お試しください。");
        }
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="ログイン">
      <Stack gap="4">
        {formError && <Alert tone="error">{formError}</Alert>}
        <Field label="メールアドレス" error={fieldErrors.email}>
          {(control) => <TextInput {...control} name="email" type="email" autoComplete="email" />}
        </Field>
        <Field label="パスワード" error={fieldErrors.password}>
          {(control) => (
            <TextInput {...control} name="password" type="password" autoComplete="current-password" />
          )}
        </Field>
        <Button type="submit" fullWidth disabled={isPending}>
          {isPending ? "ログイン中…" : "ログイン"}
        </Button>
      </Stack>
    </form>
  );
}
