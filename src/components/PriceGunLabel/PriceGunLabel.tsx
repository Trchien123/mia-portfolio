import styles from './PriceGunLabel.module.css'

type PriceGunLabelProps = { text: string; on: boolean }

export function PriceGunLabel({ text, on }: PriceGunLabelProps) {
  return (
    <span className={`${styles.label} ${on ? styles.on : ''}`} aria-hidden="true">
      {text}
    </span>
  )
}
