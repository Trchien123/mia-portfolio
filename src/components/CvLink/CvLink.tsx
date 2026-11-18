import { DownloadIcon } from '../DownloadIcon/DownloadIcon'
import styles from './CvLink.module.css'

type CvLinkProps = { href: string | null; size?: 'sm' | 'lg' }

export function CvLink({ href, size = 'sm' }: CvLinkProps) {
  if (href === null) return null
  return (
    <a className={styles.cv} href={href} download>
      Download CV (PDF)
      <DownloadIcon size={size} />
    </a>
  )
}
