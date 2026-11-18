import { dataOn } from '../../motion/motion'
import { Tag } from '../Tag/Tag'
import styles from './ShelfTalker.module.css'

type ShelfTalkerProps = { headingId: string; heading: string; text: string; on?: boolean }

export function ShelfTalker({ headingId, heading, text, on = false }: ShelfTalkerProps) {
  return (
    <div className={styles.hang} data-on={dataOn(on)}>
      <span className={styles.arm} aria-hidden="true" />
      <Tag.Clip side="center" />
      <div className={styles.card}>
        <Tag as="article">
          <Tag.Face tone="paper">
            <div className={styles.face}>
              <h2 id={headingId} className={`cond ${styles.heading}`}>
                {heading}
              </h2>
              <p className={styles.text}>{text}</p>
            </div>
          </Tag.Face>
        </Tag>
      </div>
    </div>
  )
}
