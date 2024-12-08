import {Space, spaces} from "@/shared/themes/spaces";
import {
  createElement,
  type CSSProperties,
  type FC,
  type ReactNode
} from "react";
import {clsx} from "clsx";
import * as styles from "@/shared/ui/atoms/box/Box.css";
import optimizeSpacingValue from "@/shared/function/optimizeSpacingValue";
import namedMemo from "@/shared/hooks/namedMemo";

type BoxSpacingProps = '0' | Space

export type Props = {
  readonly as?: 'div' | 'section' | 'span' | 'li'
  readonly display?:
    | 'flex'
    | 'block'
    | 'inline'
    | 'grid'
    | 'inline-block'
    | 'inline-flex'
    | 'inline-grid'
  readonly m?: BoxSpacingProps
  readonly mx?: BoxSpacingProps
  readonly my?: BoxSpacingProps
  readonly mt?: BoxSpacingProps
  readonly mb?: BoxSpacingProps
  readonly ml?: BoxSpacingProps
  readonly mr?: BoxSpacingProps
  readonly p?: BoxSpacingProps
  readonly px?: BoxSpacingProps
  readonly py?: BoxSpacingProps
  readonly pt?: BoxSpacingProps
  readonly pb?: BoxSpacingProps
  readonly pl?: BoxSpacingProps
  readonly pr?: BoxSpacingProps
  readonly gap?: keyof typeof spaces
  readonly children?: ReactNode
  readonly style?: CSSProperties
  readonly className?: string
  readonly align?:
    | 'center'
    | 'start'
    | 'end'
    | 'stretch'
    | 'baseline'
    | 'flex-start'
    | 'flex-end'
  readonly justify?:
    | 'center'
    | 'start'
    | 'end'
    | 'stretch'
    | 'baseline'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'normal'
  readonly flexDirection?: 'column' | 'row'
  readonly testId?: string
}

const Box: FC<Props> = ({
  as = 'div',
  display = 'block',
  m,
  mx,
  my,
  mt,
  mb,
  ml,
  mr,
  p,
  px,
  py,
  pt,
  pb,
  pl,
  pr,
  gap,
  children,
  style,
  className,
  align,
  justify,
  flexDirection,
  testId
}) => {
  const margin = optimizeSpacingValue({
    all: m,
    x: mx,
    y: my,
    top: mt,
    right: mr,
    bottom: mb,
    left: ml
  });
  
  const padding = optimizeSpacingValue({
    all: p,
    x: px,
    y: py,
    top: pt,
    right: pr,
    bottom: pb,
    left: pl
  });
  
  return createElement(
    as,
    {
      className: clsx(
        margin.top !== '0' && styles.mt,
        margin.right !== '0' && styles.mr,
        margin.bottom !== '0' && styles.mb,
        margin.left !== '0' && styles.ml,
        padding.top !== '0' && styles.pt,
        padding.right !== '0' && styles.pr,
        padding.bottom !== '0' && styles.pb,
        padding.left !== '0' && styles.pl,
        className
      ),
      style: {
        display,
        gap: gap ? spaces[gap]: 0,
        alignItems: align,
        justifyContent: justify,
        flexDirection: flexDirection,
        ...style
      },
      'data-testid': testId,
    },
    children
  )
}

export default namedMemo(Box, 'Box')