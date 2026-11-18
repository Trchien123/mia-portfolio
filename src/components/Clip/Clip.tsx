import styles from './Clip.module.css'

type ClipProps = { side?: 'l' | 'r' | 'center' }

const sideClass = { l: styles.l, r: styles.r, center: styles.center } as const

export function Clip({ side = 'l' }: ClipProps) {
  return <span className={`${styles.clip} ${sideClass[side]}`} aria-hidden="true" data-clip />
}
