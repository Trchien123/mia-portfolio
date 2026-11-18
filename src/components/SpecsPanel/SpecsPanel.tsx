import type { Spec } from '../../content/types'
import styles from './SpecsPanel.module.css'

type SpecsPanelProps = { id: string; specs: Spec[] }

export function SpecsPanel({ id, specs }: SpecsPanelProps) {
  return (
    <div className={styles.panel}>
      <h2 id={id} className={`${styles.heading} cond`}>
        Specifications
      </h2>
      <dl>
        {specs.map(({ label, value }) => (
          <div key={label} className={styles.row}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
