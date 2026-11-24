import type { ComponentProps } from "react";
import { control } from "./TextInput.css";

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return <input className={[control, className].filter(Boolean).join(" ")} {...props} />;
}
