import { SectionHeading } from '../../components/SectionHeading/SectionHeading'
import styles from './SelectedWork.module.css'

export function SelectedWork() {
  return (
    <section id="selected-work" className={styles.section} aria-labelledby="selected-work-title">
      <SectionHeading id="selected-work-title">Selected work</SectionHeading>
    </section>
  )
}
