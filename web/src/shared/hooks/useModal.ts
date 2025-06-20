'use client'

import {ModalProps} from "@/shared/ui/organisms/modal/Modal";
import {atom, useAtom} from "jotai";

type ModalOptions = Omit<ModalProps, 'isOpen' | 'onOpenChange'>

const isOpenAtom = atom(false)

const modalOptionsAtom = atom<ModalOptions>({
  children: null,
  dialogAriaLabel: 'モーダル',
  isXClose: false,
  isDismissable: true,
})

// React 19: React Compiler optimizes this automatically - no need for manual memoization
const useModal = () => {
  const [isOpen, setIsOpen] = useAtom(isOpenAtom)
  const [modalOptions, setModalOptions] = useAtom(modalOptionsAtom)
  
  const openModal = (options: ModalOptions) => {
    setModalOptions(options)
    setIsOpen(true)
  }
  
  const closeModal = () => {
    setIsOpen(false)
  }
  
  return {
    isOpen,
    modalOptions,
    openModal,
    closeModal,
  }
}

export default useModal