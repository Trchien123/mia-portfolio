import type { CSSProperties, ReactNode } from 'react'
import { Clip } from '../Clip/Clip'
import { TagFace } from '../TagFace/TagFace'
import styles from './Tag.module.css'

type TagProps = {
  as?: 'article' | 'div'
  labelledBy?: string
  /** Stable hook for choreography (Task 8): rendered as data-tag. */
  kind?: string
  /** Stagger index, exposed as --i. */
  index?: number
  className?: string
  children: ReactNode
}

function TagRoot({ as: Element = 'article', labelledBy, kind, index, className, children }: TagProps) {
  const style = index === undefined ? undefined : ({ '--i': index } as CSSProperties)
  return (
    <Element
      className={className ? `${styles.tag} ${className}` : styles.tag}
      aria-labelledby={labelledBy}
      data-tag={kind}
      style={style}
    >
      {children}
    </Element>
  )
}

export const Tag = Object.assign(TagRoot, { Clip, Face: TagFace })
