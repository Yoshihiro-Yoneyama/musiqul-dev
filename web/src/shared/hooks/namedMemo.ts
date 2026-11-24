'use client'

import React, {FC, memo} from "react";

export default function namedMemo<P>(Component: React.FC<P>, name: string) {
  const memorized = memo<FC<P>>(Component)
  memorized.displayName = name
  return memorized
}