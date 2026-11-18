import type { Spec } from '../../content/types'
import { dataOn, HEADING_VIEW } from '../../motion/motion'
import { useInViewOnce } from '../../motion/useInViewOnce'
import styles from './SpecsPanel.module.css'

type SpecsPanelProps = { id: string; specs: Spec[] }

export function SpecsPanel({ id, specs }: SpecsPanelProps) {
  const [panelRef, on] = useInViewOnce<HTMLDivElement>(HEADING_VIEW)
  return (
    <div ref={panelRef} className={styles.panel}>
      <h2 id={id} className={`${styles.heading} cond`} data-on={dataOn(on)}>
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
