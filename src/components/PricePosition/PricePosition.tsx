import { NowFlag } from '../NowFlag/NowFlag'
import styles from './PricePosition.module.css'

type PricePositionProps = { start: string; end?: string | 'NOW'; spoken: string }

export function PricePosition({ start, end, spoken }: PricePositionProps) {
  const isNow = end === 'NOW'
  return (
    <p className={`${styles.price} cond num`}>
      <span className="vh">{spoken}</span>
      <span aria-hidden="true">{isNow ? `${start} –` : end ? `${start}–${end}` : start}</span>
      {isNow ? (
        <span aria-hidden="true">
          <NowFlag />
        </span>
      ) : null}
    </p>
  )
}
