import type { ComponentProps, ElementType } from "react";
import { stack, type StackVariants } from "./Stack.css";

type StackProps = ComponentProps<"div"> & StackVariants & { as?: ElementType };

/** 子要素を縦または横に一定の間隔で並べる */
export function Stack({ as: Component = "div", direction, gap, justify, className, ...props }: StackProps) {
  return (
    <Component className={[stack({ direction, gap, justify }), className].filter(Boolean).join(" ")} {...props} />
  );
}
