import { ExperienceTag } from '../../components/ExperienceTag/ExperienceTag'
import { Rail } from '../../components/Rail/Rail'
import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import { profile } from '../../content/profile'
import type { Role } from '../../content/types'
import styles from './Experience.module.css'

function toShelves(roles: Role[]): Role[][] {
  const shelves: Role[][] = []
  for (let i = 0; i < roles.length; i += 2) shelves.push(roles.slice(i, i + 2))
  return shelves
}

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" lede={profile.ledes.experience}>
        Experience
      </SectionHeading>
      <div className={styles.aisle}>
        {toShelves(profile.experience).map((shelf) => (
          <div key={shelf[0].id} data-shelf>
            <div className={styles.shelfRail}>
              <Rail />
            </div>
            <div className={styles.tags}>
              {shelf.map((role, i) => (
                <ExperienceTag key={role.id} role={role} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
