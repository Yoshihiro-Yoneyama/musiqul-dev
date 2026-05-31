import { useState } from "react";
import { z } from "zod";
import { useValidation } from "@/shared/lib/validate/useValidate";
import { login } from "@/entities/auth/session/api/login";

const loginSchema = z.object({
  loginId: z.string().email("メールアドレスの形式が正しくありません"),
  password: z.string().min(1, "パスワードを入力してください"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function useLogin(onSuccess: () => void) {
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { errorMessages, validate } = useValidation<typeof loginSchema>();

  const handleSubmit = async (values: LoginForm) => {
    const hasError = validate(values, loginSchema);
    if (hasError) return;

    setApiError(null);
    setIsLoading(true);
    try {
      await login(values.loginId, values.password);
      onSuccess();
    } catch (error: unknown) {
      const status =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 401) {
        setApiError("メールアドレスまたはパスワードが正しくありません");
      } else {
        setApiError("ログインに失敗しました。しばらくしてから再度お試しください");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { errorMessages, apiError, isLoading, handleSubmit };
}
