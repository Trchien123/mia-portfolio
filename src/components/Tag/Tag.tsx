import type { ReactNode } from 'react'
import { Clip } from '../Clip/Clip'
import { TagFace } from '../TagFace/TagFace'
import styles from './Tag.module.css'

type TagProps = { as?: 'article' | 'div'; labelledBy?: string; children: ReactNode }

function TagRoot({ as: Element = 'article', labelledBy, children }: TagProps) {
  return (
    <Element className={styles.tag} aria-labelledby={labelledBy}>
      {children}
    </Element>
  )
}

export const Tag = Object.assign(TagRoot, { Clip, Face: TagFace })
