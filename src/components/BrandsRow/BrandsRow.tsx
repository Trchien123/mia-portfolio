import { Fragment } from 'react'
import styles from './BrandsRow.module.css'

type BrandsRowProps = { brands: readonly string[] }

function Sep() {
  return <span className={styles.sep} aria-hidden="true" />
}

export function BrandsRow({ brands }: BrandsRowProps) {
  const head = brands.slice(0, -2)
  const tail = brands.slice(-2)
  return (
    <div className={styles.brands}>
      <span className={styles.label}>Brands</span>
      <p className={`cond ${styles.list}`}>
        {head.map((brand) => (
          <Fragment key={brand}>
            {brand}
            <Sep />
          </Fragment>
        ))}
        <span className={styles.keep}>
          {tail.map((brand, i) => (
            <Fragment key={brand}>
              {i > 0 && <Sep />}
              {brand}
            </Fragment>
          ))}
        </span>
      </p>
    </div>
  )
}
