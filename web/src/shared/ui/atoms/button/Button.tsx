'use client'

import React, {ReactNode} from 'react'
import * as styles from './Button.css'
import {Button as AriaButton} from 'react-aria-components'
import {clsx} from 'clsx'

type Props = {
  readonly children: ReactNode
  readonly appearance?: 'primary'
  readonly isDisabled?: boolean
  readonly className?: string
  readonly type?: 'button' | 'submit'
  readonly onPress?: () => void
  readonly ref?: React.Ref<HTMLButtonElement>
}

// React 19: Direct ref prop support instead of forwardRef
const Button = ({
  children,
  appearance,
  isDisabled = false,
  className,
  type = 'button',
  onPress,
  ref,
  ...props
}: Props) => {
  return (
    <AriaButton
      ref={ref}
      className={clsx(
        styles.baseStyle,
        appearance && [styles.appearances[appearance]],
        className
      )}
      isDisabled={isDisabled}
      type={type}
      onPress={onPress}
      {...props}
    >
      {children}
    </AriaButton>
  )
}

export default Button