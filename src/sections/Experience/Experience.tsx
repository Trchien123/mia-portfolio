import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import styles from './Experience.module.css'

export function Experience() {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <SectionHeading id="experience-title">Experience</SectionHeading>
    </section>
  )
}
