import { Tag } from '../Tag/Tag'
import styles from './ShelfTalker.module.css'

type ShelfTalkerProps = { headingId: string; heading: string; text: string }

export function ShelfTalker({ headingId, heading, text }: ShelfTalkerProps) {
  return (
    <div className={styles.hang}>
      <span className={styles.arm} aria-hidden="true" />
      <Tag.Clip side="center" />
      <div className={styles.card}>
        <Tag as="article" labelledBy={headingId}>
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
