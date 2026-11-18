import type { CSSProperties, ReactNode, Ref } from 'react'
import { dataOn } from '../../motion/motion'
import { Clip } from '../Clip/Clip'
import { TagFace } from '../TagFace/TagFace'
import styles from './Tag.module.css'

type TagProps = {
  as?: 'article' | 'div'
  ref?: Ref<HTMLElement>
  labelledBy?: string
  /** Stable hook for choreography: rendered as data-tag. */
  kind?: string
  /** Stagger index, exposed as --i. */
  index?: number
  /** In-view state for the clip-on choreography: rendered as data-on. */
  on?: boolean
  className?: string
  children: ReactNode
}

function TagRoot({
  as: Element = 'article',
  ref,
  labelledBy,
  kind,
  index,
  on = false,
  className,
  children,
}: TagProps) {
  const style = index === undefined ? undefined : ({ '--i': index } as CSSProperties)
  return (
    <Element
      ref={ref as Ref<HTMLDivElement>}
      className={className ? `${styles.tag} ${className}` : styles.tag}
      aria-labelledby={labelledBy}
      data-tag={kind}
      data-on={dataOn(on)}
      style={style}
    >
      {children}
    </Element>
  )
}

export const Tag = Object.assign(TagRoot, { Clip, Face: TagFace })
