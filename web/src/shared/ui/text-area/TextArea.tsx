import type { ComponentProps } from "react";
import { control } from "../text-input/TextInput.css";
import { textArea } from "./TextArea.css";

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={[control, textArea, className].filter(Boolean).join(" ")} {...props} />;
}
