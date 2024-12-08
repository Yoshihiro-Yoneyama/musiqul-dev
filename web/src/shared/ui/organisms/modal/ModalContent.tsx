'use client'

import React, {FC, ReactNode} from "react";
import Title from "@/shared/ui/atoms/title/Title";
import namedMemo from "@/shared/hooks/namedMemo";
import Box from "@/shared/ui/atoms/box/Box";
import TextBox from "@/shared/ui/atoms/textbox/TextBox";
import Button from "@/shared/ui/atoms/button/Button";
import BorderButton from "@/shared/ui/atoms/button/BorderButton";

export type Props = {
  /** A function that gets called when the modal is closed */
  readonly onClose?: () => void
  /** A function that gets called when the value inside the modal is changed */
  readonly onChanged?: () => void
  /** The text displayed in the modal's header section */
  readonly title: string
  /** The content to be displayed the modal */
  readonly children: ReactNode
  /** The label text displayed on the button used to change values */
  readonly changeButtonLabel?: string
  /** The label text displayed on the button used to close the modal */
  readonly closeButtonLabel?: string
}

const ModalContent: FC<Props> = ({
  onClose,
  onChanged,
  title,
  children,
  changeButtonLabel = 'OK',
  closeButtonLabel = 'キャンセル'
}) => {
  return (
    <Box display='flex' gap='s' style={{ flexDirection: 'column' }}>
      <Title type='modal'>{title}</Title>
      {typeof children === 'string' ? (
        <TextBox>{children}</TextBox>
      ) : (
        children
      )}
      {(onClose || onChanged) && (
        <Box display='flex' justify='center' gap='s' pt='s'>
          {onClose && (
            <BorderButton
              appearance='primary'
              onPress={onClose}
            >
              {closeButtonLabel}
            </BorderButton>
          )}
          {onChanged && (
            <Button
              appearance='primary'
              onPress={onChanged}
            >
              {changeButtonLabel}
            </Button>
          )}
        </Box>
      )}
    </Box>
  )
}

export default namedMemo(ModalContent, 'ModalContent')

