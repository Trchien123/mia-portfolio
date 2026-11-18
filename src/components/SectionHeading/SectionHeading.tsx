import type { ReactNode } from 'react'
import { dataOn, HEADING_VIEW } from '../../motion/motion'
import { useInViewOnce } from '../../motion/useInViewOnce'
import styles from './SectionHeading.module.css'

type SectionHeadingProps = {
  id: string
  level?: 2
  children: ReactNode
  lede?: string
}

export function SectionHeading({ id, level = 2, children, lede }: SectionHeadingProps) {
  const Tag = `h${level}` as const
  // Observe the row, not the heading: a fully clipped heading never reports as intersecting.
  const [rowRef, on] = useInViewOnce<HTMLDivElement>(HEADING_VIEW)
  return (
    <div ref={rowRef} className={styles.row}>
      <Tag id={id} className={styles.heading} data-on={dataOn(on)}>
        {children}
      </Tag>
      {lede ? <p className={styles.lede}>{lede}</p> : null}
    </div>
  )
}
