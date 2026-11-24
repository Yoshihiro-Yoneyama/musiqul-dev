"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { routes } from "@/shared/config";
import * as styles from "./AppSidebar.css";

const items = [
  { href: routes.home, label: "ホーム" },
  { href: routes.createRecruitment, label: "募集を作成" },
] as const;

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className={styles.navList}>
      {items.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={styles.navLink}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
