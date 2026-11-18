import type { ReactNode } from 'react'
import styles from './TearOffStrip.module.css'

type TearOffStripProps = { children: ReactNode }

export function TearOffStrip({ children }: TearOffStripProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.strip}>{children}</div>
    </div>
  )
}
