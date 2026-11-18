import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import styles from './CareerObjective.module.css'

export function CareerObjective() {
  return (
    <section id="objective" className={styles.section} aria-labelledby="objective-title">
      <SectionHeading id="objective-title">Career objective</SectionHeading>
    </section>
  )
}
