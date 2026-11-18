import { SpecsPanel } from '../../components/SpecsPanel/SpecsPanel'
import { profile } from '../../content/profile'
import styles from './Specifications.module.css'

export function Specifications() {
  return (
    <section id="specifications" className={styles.section} aria-labelledby="specifications-title">
      <SpecsPanel id="specifications-title" specs={profile.specs} />
    </section>
  )
}
