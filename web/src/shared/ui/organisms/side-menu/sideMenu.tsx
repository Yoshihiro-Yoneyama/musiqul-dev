"use client";

import { useRouter } from "next/navigation";
import * as styles from "@/shared/ui/organisms/side-menu/side.menu.css"
import Button from "@/shared/ui/atoms/button/Button";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";
import React from "react";

const SideMenu = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div className={styles.SideMenu}>
      <div className={styles.SideMenuItem}>
        <p className={styles.Title}>musiqul</p>
      </div>
      <div className={styles.SideMenuItem}>
        <Button variant={"default"} onClick={() => handleNavigation("/collab/recruitment")}>
          コラボメンバーを募集する
        </Button>
      </div>
      <div className={styles.SideMenuItem}>
        <BorderButton variant={"default"} onClick={() => handleNavigation("/")}>
          コラボに応募する
        </BorderButton>
      </div>
    
    </div>
  );
};

export default SideMenu;
