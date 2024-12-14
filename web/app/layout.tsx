"use client"

import React from "react"
import SideMenu from "@/shared/ui/organisms/side-menu/SideMenu"
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