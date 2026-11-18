import { useCallback, useState } from 'react'
import { ExperienceTag } from '../../components/ExperienceTag/ExperienceTag'
import { Rail } from '../../components/Rail/Rail'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { profile } from '../../content/profile'
import type { Role } from '../../content/types'
import { dataOn } from '../../motion/motion'
import styles from './Experience.module.css'

function toShelves(roles: Role[]): Role[][] {
  const shelves: Role[][] = []
  for (let i = 0; i < roles.length; i += 2) shelves.push(roles.slice(i, i + 2))
  return shelves
}

type ShelfProps = { roles: Role[] }

/** A shelf rail with up to two tags. The rail draws when either tag enters view. */
function Shelf({ roles }: ShelfProps) {
  const [on, setOn] = useState(false)
  const show = useCallback(() => setOn(true), [])
  return (
    <div data-shelf data-on={dataOn(on)}>
      <div className={styles.shelfRail} data-draw="view" data-on={dataOn(on)}>
        <Rail />
      </div>
      <div className={styles.tags}>
        {roles.map((role, i) => (
          <ExperienceTag key={role.id} role={role} index={i} onShow={show} />
        ))}
      </div>
    </div>
  )
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" lede={profile.ledes.experience}>
        Experience
      </SectionHeading>
      <div className={styles.aisle}>
        {toShelves(profile.experience).map((shelf) => (
          <Shelf key={shelf[0].id} roles={shelf} />
        ))}
      </div>
    </section>
  )
}
