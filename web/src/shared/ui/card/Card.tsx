import type { ComponentProps } from "react";
import { card } from "./Card.css";

export function Card({ className, ...props }: ComponentProps<"section">) {
  return <section className={[card, className].filter(Boolean).join(" ")} {...props} />;
}
