import { NowFlag } from '../NowFlag/NowFlag'
import styles from './PricePosition.module.css'

type PricePositionProps = { start: string; end?: string; spoken: string }

function priceLabel(start: string, end: string | undefined): string {
  if (end === 'NOW') return `${start} –`
  if (end) return `${start}–${end}`
  return start
}

export function PricePosition({ start, end, spoken }: PricePositionProps) {
  const isNow = end === 'NOW'
  return (
    <p className={`${styles.price} cond num`}>
      <span className="vh">{spoken}</span>
      <span aria-hidden="true">{priceLabel(start, end)}</span>
      {isNow ? (
        <span aria-hidden="true">
          <NowFlag />
        </span>
      ) : null}
    </p>
  )
}
