'use client'

import React, {FC, ReactNode} from "react";
import {Modal as AriaModal, ModalOverlay, Dialog} from "react-aria-components";
import namedMemo from "@/shared/hooks/namedMemo";
import * as styles from './Modal.css'

export type ModalProps = {
  readonly isOpen: boolean
  readonly onOpenChange: (value: boolean) => void
  readonly children: ReactNode
  readonly dialogAriaLabel: string
  readonly isXClose?: boolean
  readonly isDismissable?: boolean
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onOpenChange,
  children,
  dialogAriaLabel,
  isXClose = false,
  isDismissable = false
}) => {
  return (
    <ModalOverlay
      isDismissable={isDismissable}
      isOpen={isOpen}
      className={styles.overlay}
      onOpenChange={onOpenChange}
    >
      <AriaModal>
        <Dialog
          className={styles.modal}
          aria-label={dialogAriaLabel}
        >
          {({close}) => (
            <>
              {isXClose && (
                <span
                  className={styles.closeButton}
                  onClick={close}
                  onKeyDown={(
                    event: React.KeyboardEvent<HTMLSpanElement>
                  ) => {
                    if (
                      event.key === 'Enter' ||
                      event.key === ' '
                    ) {
                      event.preventDefault()
                      close
                    }
                  }}
                  role='button'
                  tabIndex={0}
                ></span>
              )}
            </>
          )}
        </Dialog>
      </AriaModal>
    </ModalOverlay>
  )
}

export default namedMemo(Modal, 'Modal')