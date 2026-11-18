import styles from './Clip.module.css'

type ClipProps = { side?: 'l' | 'r' }

export function Clip({ side = 'l' }: ClipProps) {
  return <span className={`${styles.clip} ${side === 'l' ? styles.l : styles.r}`} aria-hidden="true" />
}
