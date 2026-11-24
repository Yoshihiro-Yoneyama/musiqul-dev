import Link from "next/link";
import { routes } from "@/shared/config";
import * as styles from "./AppSidebar.css";
import { LogoutButton } from "./LogoutButton";
import { NavLinks } from "./NavLinks";

/** ログイン後の画面に共通のサイドメニュー（狭い画面では上部のバーになる） */
export function AppSidebar() {
  return (
    <header className={styles.root}>
      <Link href={routes.home} className={styles.brand}>
        musiqul
      </Link>
      <nav className={styles.nav} aria-label="メインメニュー">
        <NavLinks />
      </nav>
      <LogoutButton />
    </header>
  );
}
