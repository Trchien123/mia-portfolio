import { useCallback, useEffect, useRef, useState } from 'react'
import { useAnnounce } from '../LiveRegion/LiveRegion'
import { PriceGunLabel } from '../PriceGunLabel/PriceGunLabel'
import styles from './CopyEmailButton.module.css'
import { copyText } from './copyText'

type CopyEmailButtonProps = { email: string }

const HOLD_MS = 1400

export function CopyEmailButton({ email }: CopyEmailButtonProps) {
  const announce = useAnnounce()
  const [label, setLabel] = useState('Copied')
  const [on, setOn] = useState(false)
  const timer = useRef<number | undefined>(undefined)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const onClick = useCallback(async () => {
    const ok = await copyText(email)
    setLabel(ok ? 'Copied' : 'Copy failed')
    announce(ok ? 'Email copied' : `Copy failed. The email is ${email}`)
    setOn(true)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setOn(false), HOLD_MS)
  }, [email, announce])

  return (
    <span className={styles.gun}>
      <button className={styles.copy} type="button" aria-label="Copy email address" onClick={onClick}>
        Copy
      </button>
      <PriceGunLabel text={label} on={on} />
    </span>
  )
}
