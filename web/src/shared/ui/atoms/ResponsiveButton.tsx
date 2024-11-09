"use client"

import React from "react";
import {Responsive} from "@/type/styles";
import {FontSize} from "@/utils/styles";


export type ButtonVariant = 'primary' | 'secondary' | 'danger'

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  fontSize?: Responsive<FontSize>
}
