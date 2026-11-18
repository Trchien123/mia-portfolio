import type { ReactNode } from 'react'
import styles from './TagFace.module.css'

type TagFaceProps = { tone?: 'yellow' | 'paper'; children: ReactNode }

export function TagFace({ tone = 'yellow', children }: TagFaceProps) {
  return (
    <div data-face className={`${styles.face} ${tone === 'paper' ? styles.paper : styles.yellow}`}>
      {children}
    </div>
  )
}
