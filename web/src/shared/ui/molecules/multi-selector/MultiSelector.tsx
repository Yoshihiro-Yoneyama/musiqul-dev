'use client'

import React, {useEffect, useRef, useState} from "react";
import * as styles from "./MultiSelector.css";
import Required from "@/shared/ui/atoms/required/Required";
import Icon from "@/shared/ui/atoms/icon/Icon";

type Option = {
  readonly value: string
  readonly label: string
}

type Props = {
  readonly title: string
  readonly displayedRequired: boolean
  readonly options: Option[]
  readonly selectedValues: string[]
  readonly placeholder?: string
  readonly isDisabled?: boolean
  readonly onChange: (values: string[]) => void
}

/**
 * 複数選択ドロップダウン。
 * 閉じている時は選択済みラベルを表示し、開くとチェック付きの選択肢を表示する。
 */
const MultiSelector: React.FC<Props> = ({
  title,
  displayedRequired,
  options,
  selectedValues,
  placeholder = "選択してください",
  isDisabled = false,
  onChange,
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // 外側クリックで閉じる
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const toggle = (value: string) => {
    const next = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    onChange(next)
  }

  const selectedLabels = options
    .filter((o) => selectedValues.includes(o.value))
    .map((o) => o.label)

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.titleContainer}>
        {title}
        <Required displayed={displayedRequired}/>
      </div>
      <button
        type="button"
        className={styles.control}
        disabled={isDisabled}
        onClick={() => setOpen((o) => !o)}
      >
        <span className={selectedLabels.length ? undefined : styles.placeholder}>
          {selectedLabels.length ? selectedLabels.join("、") : placeholder}
        </span>
        <Icon type="arrowDown" color="#ffffff"/>
      </button>
      {open && (
        <div className={styles.panel}>
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              className={styles.option}
              onClick={() => toggle(o.value)}
            >
              {o.label}
              <Icon
                type={selectedValues.includes(o.value) ? "squareCheck" : "square"}
                color="#ffffff"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default MultiSelector
