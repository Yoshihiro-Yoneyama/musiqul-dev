'use client'

import React, {ReactNode} from 'react'
import * as styles from './button.css'
import {Button as AriaButton} from 'react-aria-components'
import {clsx} from 'clsx';

type Props = {
  readonly children: ReactNode
  readonly appearance?: 'primary'
  readonly isDisabled?: boolean
  readonly className?: string
  readonly type?: 'button' | 'submit'
  readonly onPress?: () => void
}

const Button: React.FC<Props> = ({
  children,
  appearance,
  isDisabled = false,
  className,
  type = 'button',
  onPress,
  ...props
}) => {
  return (
    <AriaButton
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
  );
}

export default Button