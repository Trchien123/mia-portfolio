import { useCallback, useState } from 'react'
import { useAnnounce } from '../LiveRegion/LiveRegion'
import { PriceGunLabel } from '../PriceGunLabel/PriceGunLabel'
import styles from './CopyEmailButton.module.css'
import { copyText } from './copyText'

type CopyEmailButtonProps = { email: string }

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const announce = useAnnounce()
  const [label, setLabel] = useState('Copied')
  const [shot, setShot] = useState(0)

  const onClick = useCallback(async () => {
    const ok = await copyText(email)
    setLabel(ok ? 'Copied' : 'Copy failed')
    announce(ok ? 'Email copied' : `Copy failed. The email is ${email}`)
    setShot((n) => n + 1)
  }, [email, announce])

  return (
    <span className={styles.gun}>
      <button
        className={styles.copy}
        type="button"
        aria-label="Copy email address"
        onClick={onClick}
      >
        Copy
      </button>
      <PriceGunLabel text={label} shot={shot} />
    </span>
  )
}
