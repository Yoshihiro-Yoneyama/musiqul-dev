"use client"

import React, {ReactNode} from "react";
import {ButtonContent, ButtonWrapper} from './BorderButton.css'
import {Button as AriaButton} from 'react-aria-components'

type Props = {
  readonly children: ReactNode
  readonly appearance?: 'primary'
  readonly isDisabled?: boolean
  readonly className?: string
  readonly type?: 'button' | 'submit'
  readonly onPress?: () => void
}

const BorderButton: React.FC<Props> = ({
  children,
  appearance,
  isDisabled = false,
  className,
  type = 'button',
  onPress,
  ...props
}) => {
  return (
    <div className={ButtonWrapper}>
      <AriaButton
        className={ButtonContent}
        isDisabled={isDisabled}
        type={type}
        onPress={onPress}
        {...props}>
        {children}
      </AriaButton>
    </div>
  );
}

export default BorderButton