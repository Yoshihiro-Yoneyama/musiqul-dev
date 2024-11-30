"use client"

import React from "react";
import {Responsive} from "@/shared/type/styles";
import {FontSize} from "@/shared/utils/styles";


export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  fontSize?: Responsive<FontSize>
}
