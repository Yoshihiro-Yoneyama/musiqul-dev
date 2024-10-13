"use client"

import * as styles from "./error.message.css"
import React from "react";

type errorMessageProps = {
  message: string
}

const ErrorMessage: React.FC<errorMessageProps> = ({message}) => {
  return (
    <p className={styles.MessageStyle}>{message}</p>
  )
}

export default ErrorMessage