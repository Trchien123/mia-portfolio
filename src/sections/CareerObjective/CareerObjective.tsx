import { Rail } from '../../components/Rail/Rail'
import { ShelfTalker } from '../../components/ShelfTalker/ShelfTalker'
import { Wobbler } from '../../components/Wobbler/Wobbler'
import { profile } from '../../content/profile'
import styles from './CareerObjective.module.css'

export function CareerObjective() {
  return (
    <section id="objective" className={styles.section} aria-labelledby="objective-title">
      <Rail />
      <div className={styles.row}>
        <ShelfTalker headingId="objective-title" heading="Career objective" text={profile.objective} />
        <Wobbler />
      </div>
    </section>
  )
}
