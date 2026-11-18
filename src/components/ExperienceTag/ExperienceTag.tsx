import type { Role } from '../../content/types'
import { PricePosition } from '../PricePosition/PricePosition'
import { Rail } from '../Rail/Rail'
import { Tag } from '../Tag/Tag'
import styles from './ExperienceTag.module.css'

type ExperienceTagProps = { role: Role; index: number }

export function ExperienceTag({ role, index }: ExperienceTagProps) {
  const headingId = `role-${role.id}`
  return (
    <Tag labelledBy={headingId} kind="experience" index={index} className={styles.tag}>
      <div className={styles.hangRail} data-hang-rail>
        <Rail />
      </div>
      <Tag.Clip side="l" />
      <Tag.Clip side="r" />
      <Tag.Face>
        <div className={styles.item}>
          <h3 id={headingId} className={`${styles.role} cond`}>
            {role.title}
          </h3>
          <div className={styles.priceArea}>
            <PricePosition start={role.priceStart} end={role.priceEnd} spoken={role.datesSpoken} />
          </div>
          <p className={styles.company}>{role.company}</p>
          {role.subLine ? <p className={`${styles.sub} num`}>{role.subLine}</p> : null}
          <ul className={styles.duties}>
            {role.duties.map((duty) => (
              <li key={duty}>{duty}</li>
            ))}
          </ul>
        </div>
      </Tag.Face>
    </Tag>
  )
}
