import type { ReactNode } from "react";
import { heading } from "./Heading.css";

type HeadingProps = { level: 1 | 2 | 3; id?: string; children: ReactNode };

export function Heading({ level, id, children }: HeadingProps) {
  const Tag = `h${level}` as const;
  return (
    <Tag id={id} className={heading({ level })}>
      {children}
    </Tag>
  );
}
