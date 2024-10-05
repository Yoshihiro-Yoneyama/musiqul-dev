"use client";

import { useRouter } from "next/navigation";
import * as styles from "./styles.css"

const SideMenu = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.SideMenu}>
      <div className={styles.SideMenuItem} onClick={() => handleNavigation("/collab/recruitment")}>
        コラボメンバーを募集する
      </div>
      <div className={styles.SideMenuItem} onClick={() => handleNavigation("/")}>
        コラボに応募する
      </div>
    </div>
  );
};

export default SideMenu;
