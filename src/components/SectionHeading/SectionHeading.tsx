import type { ReactNode } from 'react'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  id: string
  level?: 2
  children: ReactNode
  lede?: string
}

export function SectionHeading({ id, level = 2, children, lede }: SectionHeadingProps) {
  const Tag = `h${level}` as const
  return (
    <div className={styles.row}>
      <Tag id={id} className={styles.heading}>
        {children}
      </Tag>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </div>
  )
}
