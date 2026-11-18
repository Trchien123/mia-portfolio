import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

type Announce = (message: string) => void

const AnnounceContext = createContext<Announce>(() => undefined)

export function useAnnounce(): Announce {
  return useContext(AnnounceContext)
}

type LiveRegionProviderProps = { children: ReactNode }

export function LiveRegionProvider({ children }: LiveRegionProviderProps) {
  const [text, setText] = useState('')
  const timer = useRef<number | undefined>(undefined)

  const announce = useCallback<Announce>((message) => {
    window.clearTimeout(timer.current)
    setText('')
    timer.current = window.setTimeout(() => setText(message), 60)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  return (
    <AnnounceContext value={announce}>
      {children}
      <p className="vh" aria-live="polite">
        {text}
      </p>
    </AnnounceContext>
  )
}
