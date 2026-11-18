import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import styles from './Specifications.module.css'

export function Specifications() {
  return (
    <section id="specifications" className={styles.section} aria-labelledby="specifications-title">
      <SectionHeading id="specifications-title">Specifications</SectionHeading>
    </section>
  )
}
