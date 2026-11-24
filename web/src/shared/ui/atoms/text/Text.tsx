'use client'

import React, {FC, ReactNode} from "react";
import {fontSize} from "@/shared/themes/fontSize.css";
import {fontWeight} from "@/shared/themes/fontWeight.css";
import {color} from "@/shared/themes/color.css";
import {lineHeight} from "@/shared/themes/lineHeight.css";
import {clsx} from "clsx";
import namedMemo from "@/shared/hooks/namedMemo";

type Props = {
  readonly children?: ReactNode
  readonly size?: keyof typeof fontSize
  readonly weight?: keyof typeof fontWeight
  readonly color?: keyof typeof color
  readonly lineHeight?: keyof typeof lineHeight
  readonly as?: string
  readonly className?: string
}

const Text: FC<Props> = ({
  children = '',
  size = 'l',
  weight = 'regular',
  color = 'bodyText',
  lineHeight = 'l',
  as = 'p',
  className,
}) => {
  return React.createElement(
    as,
    {
      className: clsx(
        size,
        weight,
        color,
        lineHeight,
        className
      ),
    },
    children
  )
}

export default namedMemo(Text, 'Text')