import { z } from "zod";

export const credentialsSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { error: "メールアドレスを入力してください" })
    .pipe(z.email({ error: "メールアドレスの形式で入力してください" })),
  password: z.string().min(1, { error: "パスワードを入力してください" }),
});

export type Credentials = z.infer<typeof credentialsSchema>;
