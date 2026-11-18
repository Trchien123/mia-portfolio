import styles from './PlaceholderSlot.module.css'

type PlaceholderSlotProps = { label: string; text: string | null }

/** A dt/dd row: real copy when it exists, otherwise the unprinted "To be added" label. */
export function PlaceholderSlot({ label, text }: PlaceholderSlotProps) {
  return (
    <div className={text ? styles.filled : styles.slot} data-slot>
      <dt>{label}</dt>
      <dd>{text ?? 'To be added'}</dd>
    </div>
  )
}
