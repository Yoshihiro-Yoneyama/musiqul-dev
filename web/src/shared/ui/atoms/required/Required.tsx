"use client"

import * as styles from "./Required.css"
import React from "react";

type RequiredProps = {
  displayed: boolean,
}

const Required: React.FC<RequiredProps> = ({displayed}) => {
  return (
    displayed && <div className={styles.Label}>必須</div>
  )
}

export default Required