"use client"

import React from "react"
import {usePathname} from "next/navigation"
import SideMenu from "@/shared/ui/organisms/side-menu/SideMenu"
import * as styles from "./styles.css"
import {setZodErrorMap} from "@/shared/lib/validate/customErrorMap";

setZodErrorMap()

export default function RootLayout({
   children,
 }: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  // ログイン画面ではサイドバーを表示しない（ログイン後にのみ表示する）
  const hideSideMenu = pathname === "/login"

  return (
    <html lang="en">
      <body className={styles.BodyContainer}>
        {hideSideMenu ? (
          children
        ) : (
          <div className={styles.FlexContainer}>
            <div className={styles.SideMenuContainer}><SideMenu/></div>
            <div className={styles.ChildrenContainer}>{children}</div>
          </div>
        )}
      </body>
    </html>
  )
}
