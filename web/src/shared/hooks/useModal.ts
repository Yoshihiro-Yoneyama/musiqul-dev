'use client'

import {ModalProps} from "@/shared/ui/organisms/modal/Modal";
import {atom, useAtom} from "jotai";
import {useCallback, useMemo} from "react";

type ModalOptions = Omit<ModalProps, 'isOpen' | 'onOpenChange'>

const isOpenAtom = atom(false)

const modalOptionsAtom = atom<ModalOptions>({
  children: null,
  dialogAriaLabel: 'モーダル',
  isXClose: false,
  isDismissable: true,
})

const useModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom)
  const [modalOptions, setModalOptions] = useAtom(modalOptionsAtom)
  
  const openModal = useCallback(
    (options: ModalOptions) => {
      setModalOptions(options)
      setIsOpen(true)
    },
    [setModalOptions, setIsOpen]
  )
  
  const closeModal = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])
  
  return useMemo(() => ({
      isOpen,
      modalOptions,
      openModal,
      closeModal,
    }),
    [isOpen, modalOptions, openModal, closeModal]
  )
}

export default useModal