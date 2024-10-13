"use client"

import React from "react";
import SideMenu from "@/components/organisms/side-menu/sideMenu";
import * as styles from "./styles.css"

export default function RootLayout({
   children,
 }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={styles.BodyContainer}>
        <div className={styles.FlexContainer}>
          <div className={styles.SideMenuContainer}><SideMenu/></div>
          <div className={styles.ChildrenContainer}>{children}</div>
        </div>
      </body>
    </html>
  )
}