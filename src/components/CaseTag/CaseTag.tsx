import type { Case } from '../../content/types'
import { dataOn, TAG_VIEW } from '../../motion/motion'
import { useInViewOnce } from '../../motion/useInViewOnce'
import { PlaceholderSlot } from '../PlaceholderSlot/PlaceholderSlot'
import { PricePosition } from '../PricePosition/PricePosition'
import { Rail } from '../Rail/Rail'
import { Tag } from '../Tag/Tag'
import styles from './CaseTag.module.css'

type CaseTagProps = { item: Case }

export function CaseTag({ item }: CaseTagProps) {
  const headingId = `case-${item.id}`
  const [ref, on] = useInViewOnce<HTMLDivElement>(TAG_VIEW)
  return (
    <div ref={ref} className={styles.case} data-case data-draw="view" data-on={dataOn(on)}>
      <Rail />
      <Tag on={on} labelledBy={headingId} kind="case" className={styles.tag}>
        <Tag.Clip side="l" />
        <Tag.Clip side="r" />
        <Tag.Face>
          <div className={styles.face}>
            <div>
              <div className={styles.top}>
                <h3 id={headingId} className={`${styles.title} cond`}>
                  {item.title}
                </h3>
                <PricePosition start={item.year} spoken={item.year} />
              </div>
              <p className={styles.award}>{item.award}</p>
              <p className={styles.context}>{item.context}</p>
            </div>
            <dl className={styles.slots} aria-label="Case details">
              <PlaceholderSlot label="Brief" text={item.brief} />
              <PlaceholderSlot label="My role" text={item.role} />
              <PlaceholderSlot label="Outcome" text={item.outcome} />
            </dl>
          </div>
        </Tag.Face>
      </Tag>
    </div>
  )
}
