"use client"

import React from "react";
import * as styles from "@/components/atoms/button/button.css";
import {ButtonContent, ButtonWrapper} from "@/components/atoms/button/border.button.css";

type ButtonProps = {
  variant: "default" | "secondary" | "success" | "danger";
  children: React.ReactNode;
  onClick: () => void;
}

const BorderButton: React.FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <div className={ButtonWrapper}>
      <button className={ButtonContent} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default BorderButton