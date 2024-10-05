"use client"

import React from "react";
import * as styles from "./button.css"

type ButtonProps = {
  variant: "primary" | "secondary" | "success" | "danger";
  children: React.ReactNode;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ variant, children, onClick }) => {
  return (
    <button
      className={`${styles.buttonBase} ${styles.buttonVariants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button