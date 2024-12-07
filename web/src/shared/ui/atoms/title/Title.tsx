'use client'

import {createElement, FC, ReactNode} from "react";
import {clsx} from "clsx";
import {base, types} from "@/shared/ui/atoms/title/Title.css";
import namedMemo from "@/shared/hooks/namedMemo";

type Props = {
  /** The content to be displayed the title */
  readonly children?: ReactNode
  /**  */
  readonly order?: 1 | 2 | 3 | 4 | 5 | 6
  /** The style of text */
  readonly type?: 'page' | 'section' | 'modal'
}

const Title: FC<Props> = ({
  children,
  order = 1,
  type = 'page'
}) => {
  return createElement(
    `h${order}`,
    {
      className: clsx(base, types[type])
    },
    children
  )
}

export default namedMemo(Title, 'Title')