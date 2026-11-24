"use client";

import { useState } from "react";
import { useLogin } from "../model/useLogin";
import InputForm from "@/shared/ui/molecules/input-form/InputForm";
import Button from "@/shared/ui/atoms/button/Button";
import ErrorMessage from "@/shared/ui/atoms/error-message/ErrorMessage";
import * as styles from "./LoginForm.css";

type Props = {
  onLoginSuccess: () => void;
};

export function LoginForm({ onLoginSuccess }: Props) {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const { errorMessages, apiError, isLoading, handleSubmit } =
    useLogin(onLoginSuccess);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit({ loginId, password });
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.field}>
        <InputForm
          label="メールアドレス"
          displayedRequired
          type="email"
          autoComplete="email"
          textBoxProps={{ onChange: setLoginId, isDisabled: isLoading }}
        />
        {errorMessages.loginId && <ErrorMessage message={errorMessages.loginId} />}
      </div>
      <div className={styles.field}>
        <InputForm
          label="パスワード"
          displayedRequired
          type="password"
          autoComplete="current-password"
          textBoxProps={{ onChange: setPassword, isDisabled: isLoading }}
        />
        {errorMessages.password && (
          <ErrorMessage message={errorMessages.password} />
        )}
      </div>
      {apiError && <ErrorMessage message={apiError} />}
      <Button
        type="submit"
        appearance="primary"
        isDisabled={isLoading}
        className={styles.submit}
      >
        {isLoading ? "ログイン中..." : "ログイン"}
      </Button>
    </form>
  );
}