import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import styles from './About.module.css'

export function About() {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <SectionHeading id="about-title">About me</SectionHeading>
    </section>
  )
}
