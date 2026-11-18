import styles from './PlaceholderBlock.module.css'

type PlaceholderBlockProps = { text: string | null; placeholder: string }

export function PlaceholderBlock({ text, placeholder }: PlaceholderBlockProps) {
  if (text) return <p className={styles.copy}>{text}</p>
  return <p className={styles.blank}>{placeholder}</p>
}
